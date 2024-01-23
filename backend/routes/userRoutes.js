const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const ipWhitelistMiddleware = require('../middleware/ipWhitelistMiddleware');
const authenticateJWT = require("../middleware/authMiddleware");

// Password change route
router.post('/password', ipWhitelistMiddleware, authenticateJWT, userController.changePassword);

// update user details route
router.post('/update', ipWhitelistMiddleware, authenticateJWT, userController.updateUser);

// Added user id
router.get('/:id', ipWhitelistMiddleware, authenticateJWT, userController.getUserDetails);

// Name update route
router.put('/name', ipWhitelistMiddleware, userController.updateName);

// Profile picture upload route
router.post('/profile-picture', ipWhitelistMiddleware, userController.uploadProfilePicture);

module.exports = router;