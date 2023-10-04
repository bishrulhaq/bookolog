const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const ipWhitelistMiddleware = require('../middleware/ipWhitelistMiddleware');

// Route for getting an author by ID
// Example : http://localhost:4000/api/author/:id
router.get('/:id', ipWhitelistMiddleware, authorController.getById);

// Fetch author by author_uid
// Example : http://localhost:4000/api/author/:author_uid
router.get('/:author_uid', ipWhitelistMiddleware, authorController.getAuthorByAuthorUid);

// Example : http://localhost:4000/api/author/search?name=YourNameHere
router.get('/search', ipWhitelistMiddleware, authorController.searchByName);

// Example : http://localhost:4000/api/author/with-books/:id
router.get('/with-books/:id', ipWhitelistMiddleware, authorController.getAuthorWithBooksById);

// Export the router
module.exports = router;