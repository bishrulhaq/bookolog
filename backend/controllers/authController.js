const {Sequelize} = require("sequelize");
const {user, token} = require("../models");
const bcrypt = require("bcrypt");
const registerValidation = require("../validations/registerValidation");
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const {saveUriImage} = require("../helpers/utils");

// Secret key for JWT signing
const secretKey = process.env.NEXTAUTH_SECRET;

const authController = {
    authorize: async (req, res) => {
        const {email, password} = req.body;

        try {
            const existingUser = await user.findOne({where: {email}});

            if (existingUser && bcrypt.compareSync(password, existingUser.password)) {

                const {id, email, first_name, last_name, name, image, unique_id} = existingUser;

                const d_name = first_name && last_name ? `${first_name} ${last_name}` : name ? name : email;

                const j_token = jwt.sign({email}, secretKey, {expiresIn: '6h'});

                const expiresInMs = jwt.decode(j_token).exp * 1000;
                const expiresAt = new Date(Date.now() + expiresInMs);

                const tokenRecord = await token.create({
                    token: j_token,
                    user_id: existingUser.id,
                    expires_at: expiresAt,
                });

                res.status(200).json({
                    status: 200,
                    message: "Authorization Successful",
                    data: {id, email, name: d_name, picture: image, j_token: j_token, unique_id: unique_id},
                });
            } else {
                res.status(401).json({status: 401, message: "Invalid credentials"});
            }
        } catch (error) {
            res.status(500).json({status: 500, message: "Internal server error"});
        }
    },

    providerAuthorize: async (req, res) => {
        const {email, sub, provider, first_name, last_name, image} = req.body;

        try {
            if (provider === "google") {
                let existingUser = await user.findOne({where: {email}});

                let currentProviders = existingUser && existingUser.provider ? JSON.parse(existingUser.provider) : [];

                if (existingUser) {

                    if (currentProviders && !currentProviders.includes("google")) {
                        currentProviders.push("google");
                        existingUser.provider = currentProviders;
                        existingUser.google_sub = sub;
                        await existingUser.save();
                    }

                    return res
                        .status(200)
                        .json({status: 200, message: "User created"});

                } else {
                    const newUser = await user.create({
                        email: email,
                        first_name: first_name,
                        last_name: last_name,
                        google_sub: sub,
                        provider: ["google"],
                    });

                    const saveImage = await saveUriImage(newUser.unique_id + '.jpg', '/app/backend/images/profile_picture', image)

                    if (saveImage) {
                        newUser.image = newUser.unique_id + '.jpg';
                        await newUser.save();
                    }

                    return res
                        .status(200)
                        .json({status: 200, message: "User created"});
                }
            }

            return res.status(400).json({status: 400, message: "Invalid provider"});
        } catch (error) {
            res.status(500).json({status: 500, message: "Internal server error"});
        }
    },

    register: async (req, res) => {
        const {error} = registerValidation.validate(req.body);

        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }

        const {email, password, first_name, last_name} = req.body;

        try {
            const existingUser = await user.findOne({where: {email}});

            let currentProviders = existingUser && existingUser.provider ? JSON.parse(existingUser.provider) : [];

            if (existingUser && currentProviders?.includes("credentials")) {
                return res.status(400).json({message: "User already exists"});
            }

            currentProviders.push("credentials");

            let [userInstance, created] = await user.findOrCreate({
                where: {email}, defaults: {
                    email, first_name, last_name, password, provider: currentProviders,
                },
            });

            if (!created) {
                await userInstance.update({
                    provider: currentProviders, password, first_name, last_name,
                });
            }

            return res
                .status(200)
                .json({
                    message: created ? "User created successfully" : "User updated successfully",
                });
        } catch (error) {
            res.status(500).json({message: "Internal server error"});
        }
    },
    getUser: async (req, res) => {

        const {email} = req.body;

        try {
            const existingUser = await user.findOne({where: {email}});

            if (existingUser) {
                const {id, email, first_name, last_name, name, country_code, image, unique_id} = existingUser;
                const d_name = first_name && last_name ? `${first_name} ${last_name}` : name ? name : email;
                res.status(200).json({
                    status: 200,
                    message: "User found",
                    data: {id, email, name: d_name, country_code, unique_id, profile_pic: image},
                });
            } else {
                res.status(404).json({status: 404, message: "User not found"});
            }
        } catch (error) {
            res.status(500).json({status: 500, message: "Internal server error"});
        }

    },

    getProviderUser: async (req, res) => {

        const {email} = req.body;

        try {
            const existingUser = await user.findOne({where: {email}});

            if (existingUser) {
                const {id, email, first_name, last_name, name, country_code, image, unique_id} = existingUser;

                const d_name = first_name && last_name ? `${first_name} ${last_name}` : name ? name : email;

                const j_token = jwt.sign({email}, secretKey, {expiresIn: '6h'});

                const expiresInMs = jwt.decode(j_token).exp * 1000;
                const expiresAt = new Date(Date.now() + expiresInMs);

                const tokenRecord = await token.create({
                    token: j_token,
                    user_id: existingUser.id,
                    expires_at: expiresAt,
                });

                res.status(200).json({
                    status: 200,
                    message: "User Found",
                    data: {id, email, name: d_name, picture: image, country_code, j_token: j_token, unique_id: unique_id},
                });
            } else {
                res.status(404).json({status: 404, message: "User not found"});
            }
        } catch (error) {
            res.status(500).json({status: 500, message: "Internal server error"});
        }

    }
};

module.exports = authController;
