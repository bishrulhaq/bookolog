const express = require('express');
const request = require('supertest');
const commentController = require('../controllers/commentController');

jest.mock('../controllers/commentController');

const app = express();
app.use(express.json());

const commentRouter = require('../routes/commentRoutes');
app.use('/api/comment', commentRouter);

describe('Comment Routes', () => {
    describe('POST /api/comment/add', () => {
        it('should add a new comment and return the comment with user info', async () => {
            commentController.addComment.mockImplementationOnce(async (req, res) => {
                res.status(200).json({ success: true, data: { id: 1, user_name: 'John Doe', content: 'Great book!' } });
            });

            const response = await request(app)
                .post('/api/comment/add')
                .send({ bookId: 1, userId: 1, commentText: 'Great book!' })
                .expect(200);

            expect(response.body).toEqual({ success: true, data: { id: 1, user_name: 'John Doe', content: 'Great book!' } });
        });

        it('should handle errors and return 500', async () => {
            commentController.addComment.mockImplementationOnce(async (req, res) => {
                res.status(500).json({ success: false, error: 'Internal Server Error' });
            });

            const response = await request(app)
                .post('/api/comment/add')
                .send({ bookId: 1, userId: 1, commentText: 'Great book!' })
                .expect(500);

            expect(response.body).toEqual({ success: false, error: 'Internal Server Error' });
        });
    });

    describe('POST /api/comment/add-reply', () => {
        it('should add a new reply and return the reply with user info', async () => {
            commentController.addReply.mockImplementationOnce(async (req, res) => {
                res.status(201).json({ success: true, data: { id: 2, user_name: 'Jane Doe', content: 'Thanks for the comment!' } });
            });

            const response = await request(app)
                .post('/api/comment/add-reply')
                .send({ bookId: 1, userId: 2, commentText: 'Thanks for the comment!', parentCommentId: 1 })
                .expect(201);

            expect(response.body).toEqual({ success: true, data: { id: 2, user_name: 'Jane Doe', content: 'Thanks for the comment!' } });
        });

        it('should handle errors and return 500', async () => {
            commentController.addReply.mockImplementationOnce(async (req, res) => {
                res.status(500).json({ success: false, error: 'Internal Server Error' });
            });

            const response = await request(app)
                .post('/api/comment/add-reply')
                .send({ bookId: 1, userId: 2, commentText: 'Thanks for the comment!', parentCommentId: 1 })
                .expect(500);

            expect(response.body).toEqual({ success: false, error: 'Internal Server Error' });
        });
    });

    describe('GET /api/comment/get', () => {
        it('should get all comments and replies for a book', async () => {
            commentController.getComment.mockImplementationOnce(async (req, res) => {
                res.status(200).json({
                    success: true,
                    data: [
                        { id: 1, user_name: 'John Doe', content: 'Great book!', replies: [] },
                        { id: 2, user_name: 'Jane Doe', content: 'Thanks!', replies: [] },
                    ],
                });
            });

            const response = await request(app)
                .get('/api/comment/get')
                .query({ book_id: 1, limit: 10, offset: 0 })
                .expect(200);

            expect(response.body).toEqual({
                success: true,
                data: [
                    { id: 1, user_name: 'John Doe', content: 'Great book!', replies: [] },
                    { id: 2, user_name: 'Jane Doe', content: 'Thanks!', replies: [] },
                ],
            });
        });

        it('should handle errors and return 500', async () => {
            commentController.getComment.mockImplementationOnce(async (req, res) => {
                res.status(500).json({ success: false, error: 'Internal Server Error' });
            });

            const response = await request(app)
                .get('/api/comment/get')
                .query({ book_id: 1, limit: 10, offset: 0 })
                .expect(500);

            expect(response.body).toEqual({ success: false, error: 'Internal Server Error' });
        });
    });

});
