const sequelize = require('../config/db');
const authorController = require('../controllers/authorController');
const mockResponse = require('node-mocks-http');

describe('authorController Routes', () => {

  const req = {};
  const res = mockResponse.createResponse();

  describe('GET /api/author/:id', () => {
    it('should return an author by ID', async () => {
      req.params = { id: 1 };
      await authorController.getById(req, res);
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /api/author/authors/:author_uid', () => {
    it('should return an author by author_uid', async () => {
      req.params = { author_uid: 'OL3123262A' };
      await authorController.getAuthorByAuthorUid(req, res);
      expect(res.statusCode).toBe(200);

    });
  });

  describe('GET /api/author/search', () => {
    it('should search authors by name', async () => {
      req.query = { name: 'Jhon' };
      await authorController.searchByName(req, res);
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /api/author/with-books/:id', () => {
    it('should return an author with books by ID', async () => {
      req.params = { id: 1 };
      await authorController.getAuthorWithBooksById(req, res);
      expect(res.statusCode).toBe(200);
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });
});