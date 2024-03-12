const express = require('express');
const router = express.Router();
const nudgeController = require('../controllers/nudgeController');
const ipWhitelistMiddleware = require('../middleware/ipWhitelistMiddleware');
const authenticateJWT = require("../middleware/authMiddleware");

// Define a route to add Nudge
// Example : http://localhost:4000/api/nudge/add
router.post('/add', ipWhitelistMiddleware, authenticateJWT, nudgeController.addNudge);

// Define a route to get all Nudge
// Example : http://localhost:4000/api/nudge/get
router.get('/get', ipWhitelistMiddleware, authenticateJWT, nudgeController.getNudge);


module.exports = router;