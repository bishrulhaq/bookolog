const express = require('express');
const request = require('supertest');
const userController = require('../controllers/userController');

jest.mock('../controllers/userController');

const app = express();
app.use(express.json());

const userRouter = require('../routes/userRoutes');
const authRouter = require('../routes/authRoutes');

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

describe('User Routes', () => {

    describe('POST /api/user/password', () => {

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should change user password', async () => {
            userController.changePassword.mockImplementationOnce(async (req, res) => {
                res.status(200).json({ message: 'Password changed successfully' });
            });

            const registrationResponse = await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'testuser11@example.com',
                    password: 'Test!password@123',
                    first_name: 'Test',
                    last_name: 'User'
                });

            const loginResponse = await request(app)
                .post('/api/auth/authorize')
                .send({ email: 'testuser11@example.com', password: 'Test!password@123' });

            const token = loginResponse.body.data.j_token;

            const response = await request(app)
                .post('/api/user/password')
                .send({ userId: loginResponse.body.id, newPassword: 'Test!password@145' })
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(response.body).toEqual({ message: 'Password changed successfully' });
        });

        it('should handle user not found and return 404', async () => {
            userController.changePassword.mockImplementationOnce(async (req, res) => {
                res.status(404).json({ message: 'User not found' });
            });

            const registrationResponse = await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'testuser22@example.com',
                    password: 'Test!password@123',
                    first_name: 'Test',
                    last_name: 'User'
                });

            const loginResponse = await request(app)
                .post('/api/auth/authorize')
                .send({ email: 'testuser22@example.com', password: 'Test!password@123' });

            const token = loginResponse.body.data.j_token;

            const response = await request(app)
                .post('/api/user/password')
                .send({ userId: 999, newPassword: 'Test!password@145' })
                .set('Authorization', `Bearer ${token}`)
                .expect(404);

            expect(response.body).toEqual({ message: 'User not found' });
        });

        it('should handle errors and return 500', async () => {
            userController.changePassword.mockImplementationOnce(async (req, res) => {
                res.status(500).json({ message: 'Internal Server Error' });
            });


            const registrationResponse = await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'testuser33@example.com',
                    password: 'Test!password@123',
                    first_name: 'Test',
                    last_name: 'User'
                });

            const loginResponse = await request(app)
                .post('/api/auth/authorize')
                .send({ email: 'testuser33@example.com', password: 'Test!password@123' });

            const token = loginResponse.body.data.j_token;

            const response = await request(app)
                .post('/api/user/password')
                .set('Authorization', `Bearer ${token}`)
                .send({ userId: 1, newPassword: 'Test!password@145' })
                .expect(500);

            expect(response.body).toEqual({ message: 'Internal Server Error' });
        });
    });

});
