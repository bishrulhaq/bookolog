const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const ipWhitelistMiddleware = require('../middleware/ipWhitelistMiddleware');

// Define a route to get all books
// Example : http://localhost:4000/api/category
router.get('/', ipWhitelistMiddleware, categoryController.getHomeScreenCategories);

// Example : http://localhost:4000/api/category/all
router.get('/all', ipWhitelistMiddleware, categoryController.getAllCategories);

module.exports = router;