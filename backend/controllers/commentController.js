const {Sequelize} = require('sequelize');
const {bookComment, user} = require('../models');


const commentController = {
    addComment: async (req, res) => {
        try {
            const {bookId, userId, commentText} = req.body;

            const newComment = await bookComment.create({
                book_id: bookId,
                user_id: userId,
                content: commentText,
            });

            const commentWithUser = await bookComment.findOne({
                where: {id: newComment.id},
                include: [
                    {
                        model: user,
                        attributes: [
                            'id',
                            'email',
                            [
                                Sequelize.fn(
                                    'COALESCE',
                                    Sequelize.fn('CONCAT', Sequelize.col('user.first_name'), ' ', Sequelize.col('user.last_name')),
                                    Sequelize.col('user.name'),
                                    Sequelize.col('user.email')
                                ),
                                'user_name'
                            ]
                        ]
                    }
                ]
            });

            res.status(200).json({success: true, data: commentWithUser});

        } catch (error) {
            console.error('Error adding comment:', error);
            res.status(500).json({success: false, error: 'Internal Server Error'});
        }
    },

    addReply: async (req, res) => {
        try {
            const {bookId, userId, commentText, parentCommentId} = req.body;

            const newReply = await bookComment.create({
                book_id: bookId,
                user_id: userId,
                content: commentText,
                parent_comment_id: parentCommentId,
            });

            const replyWithUser = await bookComment.findOne({
                where: {id: newReply.id},
                include: [
                    {
                        model: user,
                        attributes: [
                            'id',
                            'email',
                            [
                                Sequelize.fn(
                                    'COALESCE',
                                    Sequelize.fn('CONCAT', Sequelize.col('user.first_name'), ' ', Sequelize.col('user.last_name')),
                                    Sequelize.col('user.name'),
                                    Sequelize.col('user.email')
                                ),
                                'user_name'
                            ]
                        ]
                    }
                ]
            });


            res.status(201).json({success: true, data: replyWithUser});
        } catch (error) {
            console.error('Error adding reply:', error);
            res.status(500).json({success: false, error: 'Internal Server Error'});
        }
    },

    getComment: async (req, res) => {
        try {
            const {book_id, limit, offset} = req.query;

            const comments = await bookComment.findAll({
                where: {
                    book_id: book_id,
                    parent_comment_id: null,
                },
                order: [['createdAt', 'DESC']],
                limit: parseInt(limit),
                offset: parseInt(offset),
                include: [
                    {
                        model: bookComment,
                        as: 'replies',
                        include: [
                            {
                                model: user, attributes: [
                                    'id',
                                    'email',
                                    [
                                        Sequelize.fn(
                                            'COALESCE',
                                            Sequelize.fn('CONCAT', Sequelize.col('user.first_name'), ' ', Sequelize.col('user.last_name')),
                                            Sequelize.col('user.name'),
                                            Sequelize.col('user.email')
                                        ),
                                        'user_name'
                                    ]
                                ]
                            }
                        ],
                    },
                    {
                        model: user,
                        attributes: [
                            'id',
                            'email',
                            [
                                Sequelize.fn(
                                    'COALESCE',
                                    Sequelize.fn('CONCAT', Sequelize.col('user.first_name'), ' ', Sequelize.col('user.last_name')),
                                    Sequelize.col('user.name'),
                                    Sequelize.col('user.email')
                                ),
                                'user_name'
                            ]
                        ]
                    }
                ],
            });

            res.status(200).json({success: true, data: comments});
        } catch (error) {
            res.status(500).json({success: false, error: 'Internal Server Error'});
        }
    }
};

module.exports = commentController;