const express = require('express');
const router = express.Router();
const commonController = require('../controllers/commonController');
const ipWhitelistMiddleware = require('../middleware/ipWhitelistMiddleware');
const authenticateJWT = require("../middleware/authMiddleware");

// Define a route to get quote
// Example : http://localhost:4000/api/com/quote
router.get('/quote', ipWhitelistMiddleware, commonController.getRandomQuote);

router.get('/countries', ipWhitelistMiddleware, authenticateJWT, commonController.getCountries);

module.exports = router;