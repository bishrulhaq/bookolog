const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const ipWhitelistMiddleware = require('../middleware/ipWhitelistMiddleware');

// Route for login
// Example : http://localhost:4000/auth/authorize
router.post('/authorize', ipWhitelistMiddleware, authController.authorize);

// Route for getting the user
// Example : http://localhost:4000/api/auth/user
router.post('/user', ipWhitelistMiddleware, authController.getUser);

// Route for getting the user
// Example : http://localhost:4000/api/auth/provider-user
router.post('/provider-user', ipWhitelistMiddleware, authController.getProviderUser);

// Route for Provider login and Signup
// Example : http://localhost:4000/auth/provider-authorize
router.post('/provider-authorize', ipWhitelistMiddleware, authController.providerAuthorize);

// Route for register
// Example : http://localhost:4000/auth/register
router.post('/register', ipWhitelistMiddleware, authController.register);

// Export the router
module.exports = router;