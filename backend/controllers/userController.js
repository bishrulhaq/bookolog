const {Sequelize} = require('sequelize');
const {user} = require('../models');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the folder to save uploaded files
    }, filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
});

const upload = multer({storage: storage}).single('profilePicture');

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
        const {first_name, last_name, date_of_birth, country, id} = req.body;

        try {
            const selectedUser = await user.findByPk(id);

            if (!selectedUser) {
                return res.status(404).json({status: 404, message: 'User not found'});
            }

            selectedUser.first_name = first_name;
            selectedUser.last_name = last_name;
            selectedUser.date_of_birth = date_of_birth;
            selectedUser.country = country;

            await selectedUser.save();

            return res.status(200).json({status: 200, message: 'User updated successfully'});
        } catch (error) {
            return res.status(500).json({status: 500, message: 'Internal server error'});
        }

    },

    uploadProfilePicture: async (req, res) => {
        const {userId} = req.body;

        try {
            upload(req, res, async function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(400).json({status: 400, message: 'File upload error'});
                } else if (err) {
                    return res.status(500).json({status: 500, message: 'Internal server error'});
                }

                const selectedUser = await user.findByPk(userId); // Find the user in the database

                if (!selectedUser) {
                    return res.status(404).json({status: 404, message: 'User not found'});
                }

                selectedUser.profilePicture = req.file.path;
                await selectedUser.save();

                return res.status(200).json({status: 200, message: 'Profile picture uploaded successfully'});
            });
        } catch (error) {
            return res.status(500).json({status: 500, message: 'Internal server error'});
        }
    },
};

module.exports = userController;