const express = require('express');
const router = express.Router();
const userInteractionController = require('../controllers/userInteractionController');
const bookInteractionController = require('../controllers/bookInteractionController');
const ipWhitelistMiddleware = require('../middleware/ipWhitelistMiddleware');
const authenticateJWT = require("../middleware/authMiddleware");

// user-book interaction
router.post('/update-interaction', ipWhitelistMiddleware, authenticateJWT, userInteractionController.updateInteractionStatus);

// User Interaction for Books
router.post('/get-interaction', ipWhitelistMiddleware, authenticateJWT, userInteractionController.getUserInteraction);

// Get Interaction Count
router.get('/get-int-count/:id', ipWhitelistMiddleware, userInteractionController.getUserInteractionCount);

// Define a route to increase views
// Example : http://localhost:4000/api/user-book/insert-book-exchange
router.post('/insert-book-interaction', ipWhitelistMiddleware, bookInteractionController.insertBookInteraction);

// Define a route for timeline
// Example : http://localhost:4000/api/user-book/timeline
router.get('/timeline/:code', ipWhitelistMiddleware, bookInteractionController.getBookInteractionsByCountryCode);

module.exports = router;