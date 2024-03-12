const {Sequelize} = require('sequelize');
const {user, userInteraction, book} = require('../models');
const multer = require('multer');
const path = require('path');

const userController = {
    changePassword: async (req, res) => {
        const {userId, newPassword} = req.body;

        try {
            const selectedUser = await user.findByPk(userId); // Find the user in the database

            if (!selectedUser) {
                return res.status(404).json({message: 'User not found'});
            }

            selectedUser.password = newPassword;
            await selectedUser.save();

            return res.status(200).json({status: 200, message: 'Password changed successfully'});
        } catch (error) {
            return res.status(500).json({status: 500, message: 'Internal server error'});
        }
    },

    getUserDetails: async (req, res) => {
        const {id} = req.params;

        try {
            const selectedUser = await user.findByPk(id);

            if (!selectedUser) {
                return res.status(404).json({message: 'User not found'});
            }

            return res.status(200).json({status: 200, success: true, data: selectedUser});

        } catch (error) {
            return res.status(500).json({status: 500, message: 'Internal server error'});
        }
    },

    getUserDetailsByUUID: async (req, res) => {

        const {uuid} = req.body;

        try {
            const selectedUser = await user.findOne({
                where: {
                    unique_id: uuid
                }
            });

            if (!selectedUser) {
                return res.status(404).json({message: 'User not found'});
            }

            return res.status(200).json({status: 200, success: true, data: selectedUser});

        } catch (error) {
            return res.status(500).json({status: 500, message: 'Internal server error'});
        }
    },

    updateName: async (req, res) => {
        const {userId, newName} = req.body;

        try {
            const selectedUser = await user.findByPk(userId); // Find the user in the database

            if (!selectedUser) {
                return res.status(404).json({status: 404, message: 'User not found'});
            }

            selectedUser.name = newName;
            await selectedUser.save();

            return res.status(200).json({status: 200, message: 'Name updated successfully'});
        } catch (error) {
            return res.status(500).json({status: 500, message: 'Internal server error'});
        }
    },

    updateUser: async (req, res) => {
        const {first_name, last_name, date_of_birth, country_code, id, gender} = req.body;

        try {
            const selectedUser = await user.findByPk(id);

            if (!selectedUser) {
                return res.status(404).json({status: 404, message: 'User not found'});
            }

            selectedUser.first_name = first_name;
            selectedUser.gender = gender;
            selectedUser.last_name = last_name;
            selectedUser.date_of_birth = date_of_birth;
            selectedUser.country_code = country_code;

            await selectedUser.save();

            return res.status(200).json({status: 200, message: 'User updated successfully'});
        } catch (error) {
            return res.status(500).json({status: 500, message: 'Internal server error'});
        }

    },

    uploadProfilePicture: async (req, res) => {

        const uniqueId = req.body.uniqueId;
        const file = req.file;

        if (!uniqueId || !file) {
            return res.status(400).json({status: 400, error: 'UserId and file are required.'});
        }

        try {

            const selectedUser = await user.findOne({
                where: {
                    unique_id: uniqueId
                }
            });

            selectedUser.image = file.filename;
            await selectedUser.save();

            return res.status(200).json({
                status: 200,
                message: 'Profile picture uploaded successfully',
                data: selectedUser
            });

        } catch (error) {
            return res.status(500).json({status: 500, message: 'Internal server error'});
        }
    }
};

module.exports = userController;