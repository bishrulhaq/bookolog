const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const ipWhitelistMiddleware = require('../middleware/ipWhitelistMiddleware');

// Password change route
router.post('/password', ipWhitelistMiddleware, userController.changePassword);

// update user details route
router.post('/update', ipWhitelistMiddleware, userController.updateUser);

// Added user id
router.get('/:id', ipWhitelistMiddleware, userController.getUserDetails);

// Name update route
router.put('/name', ipWhitelistMiddleware, userController.updateName);

// Profile picture upload route
router.post('/profile-picture', ipWhitelistMiddleware, userController.uploadProfilePicture);

module.exports = router;