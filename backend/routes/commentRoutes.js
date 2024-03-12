const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const ipWhitelistMiddleware = require('../middleware/ipWhitelistMiddleware');

// Define a route to add comment
// Example : http://localhost:4000/api/comment/add
router.post('/add', ipWhitelistMiddleware, commentController.addComment);

// Define a route to add reply
// Example : http://localhost:4000/api/comment/add-reply
router.post('/add-reply', ipWhitelistMiddleware, commentController.addReply);

// Define a route to get reply
// Example : http://localhost:4000/api/comment/get-reply
router.get('/get-reply/:id', ipWhitelistMiddleware, commentController.getReply);

// Define a route to get all comment and reply
// Example : http://localhost:4000/api/comment/get
router.get('/get', ipWhitelistMiddleware, commentController.getComment);


module.exports = router;