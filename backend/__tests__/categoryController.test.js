const express = require('express');
const request = require('supertest');
const categoryController = require('../controllers/categoryController');

jest.mock('../controllers/categoryController');

const app = express();
app.use(express.json());

const categoryRouter = require('../routes/categoryRoutes');
app.use('/api/category', categoryRouter);

describe('Category Routes', () => {
    describe('GET /api/category', () => {
        it('should return home screen categories', async () => {
            categoryController.getHomeScreenCategories.mockImplementationOnce(async (req, res) => {
                res.json([{id: 1, name: 'Category 1'}, {id: 2, name: 'Category 2'}]);
            });

            const response = await request(app)
                .get('/api/category')
                .expect(200);

            expect(response.body).toEqual([{id: 1, name: 'Category 1'}, {id: 2, name: 'Category 2'}]);
        });

        it('should handle errors and return 500', async () => {
            categoryController.getHomeScreenCategories.mockImplementationOnce(async (req, res) => {
                res.status(500).json({error: 'An error occurred'});
            });

            const response = await request(app)
                .get('/api/category')
                .expect(500);

            expect(response.body).toEqual({error: 'An error occurred'});
        });
    });

    describe('GET /api/category/all', () => {
        it('should return all categories', async () => {
            categoryController.getAllCategories.mockImplementationOnce(async (req, res) => {
                res.json([{id: 1, name: 'Category 1'}, {id: 2, name: 'Category 2'}]);
            });

            const response = await request(app)
                .get('/api/category/all')
                .expect(200);

            expect(response.body).toEqual([{id: 1, name: 'Category 1'}, {id: 2, name: 'Category 2'}]);
        });

        it('should handle errors and return 500', async () => {
            categoryController.getAllCategories.mockImplementationOnce(async (req, res) => {
                res.status(500).json({error: 'An error occurred'});
            });

            const response = await request(app)
                .get('/api/category/all')
                .expect(500);

            expect(response.body).toEqual({error: 'An error occurred'});
        });
    });

});
