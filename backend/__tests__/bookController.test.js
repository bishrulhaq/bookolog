const sequelize = require('../config/db');
const bookController = require('../controllers/bookController');
const mockResponse = require('node-mocks-http');

describe('bookController Routes', () => {

    const req = {};
    const res = mockResponse.createResponse();
  
    describe('GET /api/book', () => {
      it('should return all books', async () => {
        await bookController.getAll(req, res);
        expect(res.statusCode).toBe(200);
        const responseData = JSON.parse(res._getData());
        expect(Array.isArray(responseData)).toBe(true);
      });
    });
  
    describe('GET /api/book/search-title', () => {
      it('should search books by title', async () => {
        req.query = { title: 'Science' }; 
        await bookController.searchByTitle(req, res);
        expect(res.statusCode).toBe(200);
      });
    });
  
    describe('GET /api/book/search-category', () => {
      it('should search books by category', async () => {
        req.query = { category: 'Science' };
        await bookController.searchByCategory(req, res);
        expect(res.statusCode).toBe(200);
      });
    });
  
    describe('GET /api/book/books-with-authors', () => {
      it('should return paginated books with authors', async () => {
        req.query = { page: 1, limit: 10 }; 
        await bookController.getPaginatedBooksWithAuthors(req, res);
        expect(res.statusCode).toBe(200);
      });
    });
  
    describe('GET /api/book/search', () => {
      it('should search books by various criteria', async () => {
        req.query = { search: 'Science' }; 
        await bookController.searchBooks(req, res);
        expect(res.statusCode).toBe(200);
      });
    });
  
    describe('GET /api/book/isbn', () => {
      it('should search books by ISBN', async () => {
        req.query = { isbn: '1593270771' }; 
        await bookController.searchByISBN(req, res);
        expect(res.statusCode).toBe(200);
      });
    });
  
    afterAll(async () => {
      await sequelize.close();
    });
  });