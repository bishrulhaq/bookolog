const express = require('express');
const request = require('supertest');
const authorController = require('../controllers/authorController');

jest.mock('../controllers/authorController');

const app = express();
app.use(express.json());

const authorRouter = require('../routes/authorRoutes');
app.use('/api/author', authorRouter);

describe('Author Routes', () => {
  describe('GET /api/author/:id', () => {
    it('should return an author by ID', async () => {

      authorController.getById.mockImplementationOnce(async (req, res) => {
        res.json({ id: 1, name: 'John Doe' });
      });

      const response = await request(app)
          .get('/api/author/1')
          .expect(200);

      expect(response.body).toEqual({ id: 1, name: 'John Doe' });
    });

    it('should return 404 if author not found by ID', async () => {

      authorController.getById.mockImplementationOnce(async (req, res) => {
        res.status(404).json({ error: 'Author not found' });
      });

      const response = await request(app)
          .get('/api/author/2')
          .expect(404);

      expect(response.body).toEqual({ error: 'Author not found' });
    });

    it('should handle errors and return 500', async () => {

      authorController.getById.mockImplementationOnce(async (req, res) => {
        res.status(500).json({ error: 'An error occurred' });
      });

      const response = await request(app)
          .get('/api/author/3')
          .expect(500);

      expect(response.body).toEqual({ error: 'An error occurred' });
    });
  });

});
