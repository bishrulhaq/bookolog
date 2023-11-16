const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const ipWhitelistMiddleware = require('../middleware/ipWhitelistMiddleware');

// Route for login
// Example : http://localhost:4000/auth/authorize
router.post('/authorize', ipWhitelistMiddleware, authController.authorize);

// Route for register
// Example : http://localhost:4000/auth/register
router.post('/register', ipWhitelistMiddleware, authController.register);

// Export the router
module.exports = router;