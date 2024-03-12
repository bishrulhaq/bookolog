const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const ipWhitelistMiddleware = require('../middleware/ipWhitelistMiddleware');
const authenticateJWT = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('/app/backend/images', 'profile_picture'));
    }, filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
});

const upload = multer({ storage: storage });

// Password change route
router.post('/password', ipWhitelistMiddleware, authenticateJWT, userController.changePassword);

// update user details route
router.post('/update', ipWhitelistMiddleware, authenticateJWT, userController.updateUser);

// Added user id
router.get('/:id', ipWhitelistMiddleware, authenticateJWT, userController.getUserDetails);

// get user with UUID
router.post('/uuid', ipWhitelistMiddleware, userController.getUserDetailsByUUID);

// Name update route
router.put('/name', ipWhitelistMiddleware, userController.updateName);

// Profile picture upload route
router.post('/profile-picture', ipWhitelistMiddleware, upload.single('file'), userController.uploadProfilePicture);


module.exports = router;