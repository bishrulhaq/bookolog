const express = require('express');
const request = require('supertest');
const bookController = require('../controllers/bookController');

jest.mock('../controllers/bookController');

const app = express();
app.use(express.json());

const bookRouter = require('../routes/bookRoutes');
app.use('/api/book', bookRouter);

describe('Book Routes', () => {
    describe('GET /api/book/:id', () => {
        it('should return a book by ID', async () => {
            bookController.getById.mockImplementationOnce(async (req, res) => {
                res.json({ id: 1, title: 'Example Book' });
            });

            const response = await request(app)
                .get('/api/book/1')
                .expect(200);

            expect(response.body).toEqual({ id: 1, title: 'Example Book' });
        });

        it('should return 404 if book not found by ID', async () => {
            bookController.getById.mockImplementationOnce(async (req, res) => {
                res.status(404).json({ error: 'Book not found' });
            });

            const response = await request(app)
                .get('/api/book/2')
                .expect(404);

            expect(response.body).toEqual({ error: 'Book not found' });
        });

        it('should handle errors and return 500', async () => {
            bookController.getById.mockImplementationOnce(async (req, res) => {
                res.status(500).json({ error: 'An error occurred' });
            });

            const response = await request(app)
                .get('/api/book/3')
                .expect(500);

            expect(response.body).toEqual({ error: 'An error occurred' });
        });
    });

});
