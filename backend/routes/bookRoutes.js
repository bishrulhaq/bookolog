const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const ipWhitelistMiddleware = require('../middleware/ipWhitelistMiddleware');

// Define a route to get all books
// Example : http://localhost:4000/api/book
router.get('/', ipWhitelistMiddleware, bookController.getAll);

// Search By Title
// Example : http://localhost:4000/api/book/title?search-title=YourTitleHere
router.get('/search-title', ipWhitelistMiddleware, bookController.searchByTitle);

// Search By Category
// Example : http://localhost:4000/api/book/category?category=YourCategoryHere
router.get('/search-category', ipWhitelistMiddleware, bookController.searchByCategory);

// Search By Category
// Example : http://localhost:4000/api/book/get-categories
router.get('/get-categories', ipWhitelistMiddleware, bookController.getCategories);

// route to get Book and Authors based on pagination
// Example : http://localhost:4000/api/book/books-with-authors?page=1&limit=10
router.get('/books-with-authors', ipWhitelistMiddleware, bookController.getPaginatedBooksWithAuthors);

// route to get Search Books
// Example : http://localhost:4000/api/book/search?search=YourSearchHere
router.get('/search', ipWhitelistMiddleware, bookController.searchBooks);

// route to get Search Books
// Example : http://localhost:4000/api/book/search-authors?author=YourSearchHere
router.get('/search-authors', ipWhitelistMiddleware, bookController.searchByAuthors);

// Example route to search for books by ISBN
// Example : http://localhost:4000/api/book/searchByISBN?isbn=YourISBNHere
router.get('/isbn', bookController.searchByISBN);

// Define a route to get all books
// Example : http://localhost:4000/api/book/id?id
router.get('/:id', ipWhitelistMiddleware, bookController.getById);

// Define a route to increase views
// Example : http://localhost:4000/api/book/increment-view
router.post('/increment-view', ipWhitelistMiddleware, bookController.incrementView);



module.exports = router;