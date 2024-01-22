const express = require('express');
const router = express.Router();
const userInteractionController = require('../controllers/userInteractionController');
const ipWhitelistMiddleware = require('../middleware/ipWhitelistMiddleware');

// user-book interaction
router.post('/interaction-status', ipWhitelistMiddleware, userInteractionController.updateInteractionStatus);

module.exports = router;