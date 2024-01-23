const express = require('express');
const request = require('supertest');
const authController = require('../controllers/authController');

jest.mock('../controllers/authController');

const app = express();
app.use(express.json());

const authRouter = require('../routes/authRoutes');
app.use('/api/auth', authRouter);

describe('Authentication Routes', () => {
    describe('POST /api/auth/authorize', () => {
        it('should authorize a user', async () => {
            authController.authorize.mockImplementationOnce(async (req, res) => {
                res.status(200).json({ status: 200, message: 'Authorization Successful', data: { id: 1, email: 'user@example.com', name: 'John Doe', picture: 'path/to/image.jpg' } });
            });

            const response = await request(app)
                .post('/api/auth/authorize')
                .send({ email: 'user@example.com', password: 'password123' })
                .expect(200);

            expect(response.body).toEqual({
                status: 200,
                message: 'Authorization Successful',
                data: { id: 1, email: 'user@example.com', name: 'John Doe', picture: 'path/to/image.jpg' },
            });
        });

        it('should handle invalid credentials and return 401', async () => {
            authController.authorize.mockImplementationOnce(async (req, res) => {
                res.status(401).json({ status: 401, message: 'Invalid credentials' });
            });

            const response = await request(app)
                .post('/api/auth/authorize')
                .send({ email: 'user@example.com', password: 'wrongpassword' })
                .expect(401);

            expect(response.body).toEqual({ status: 401, message: 'Invalid credentials' });
        });

        it('should handle errors and return 500', async () => {
            authController.authorize.mockImplementationOnce(async (req, res) => {
                res.status(500).json({ status: 500, message: 'Internal Server Error' });
            });

            const response = await request(app)
                .post('/api/auth/authorize')
                .send({ email: 'user@example.com', password: 'password123' })
                .expect(500);

            expect(response.body).toEqual({ status: 500, message: 'Internal Server Error' });
        });
    });

});
