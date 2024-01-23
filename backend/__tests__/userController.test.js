const express = require('express');
const request = require('supertest');
const userController = require('../controllers/userController');

jest.mock('../controllers/userController');

const app = express();
app.use(express.json());

const userRouter = require('../routes/userRoutes');
app.use('/api/user', userRouter);

describe('User Routes', () => {
    describe('POST /api/user/password', () => {
        it('should change user password', async () => {
            userController.changePassword.mockImplementationOnce(async (req, res) => {
                res.status(200).json({ message: 'Password changed successfully' });
            });

            const response = await request(app)
                .post('/api/user/password')
                .send({ userId: 1, newPassword: 'newpassword123' })
                .expect(200);

            expect(response.body).toEqual({ message: 'Password changed successfully' });
        });

        it('should handle user not found and return 404', async () => {
            userController.changePassword.mockImplementationOnce(async (req, res) => {
                res.status(404).json({ message: 'User not found' });
            });

            const response = await request(app)
                .post('/api/user/password')
                .send({ userId: 999, newPassword: 'newpassword123' })
                .expect(404);

            expect(response.body).toEqual({ message: 'User not found' });
        });

        it('should handle errors and return 500', async () => {
            userController.changePassword.mockImplementationOnce(async (req, res) => {
                res.status(500).json({ message: 'Internal Server Error' });
            });

            const response = await request(app)
                .post('/api/user/password')
                .send({ userId: 1, newPassword: 'newpassword123' })
                .expect(500);

            expect(response.body).toEqual({ message: 'Internal Server Error' });
        });
    });

});
