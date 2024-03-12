const {userInteraction, book} = require('../models');
const {Sequelize} = require('sequelize');

const userInteractionController = {

    updateInteractionStatus: async (req, res) => {
        const {userId, bookId, interactionType, value} = req.body;

        try {
            let interaction = await userInteraction.findOne({
                where: {user_id: userId, book_id: bookId},
            });

            if (!interaction) {
                interaction = await userInteraction.create({user_id: userId, book_id: bookId});
            }

            switch (interactionType) {
                case 'liked':
                    interaction.liked = value;
                    break;
                case 'read_status':
                    interaction.read_status = value;
                    break;
                case 'rating':
                    interaction.rating = value;
                    break;
            }

            await interaction.save();

            return res.status(200).json({status: 200, message: `Book ${interactionType} status updated successfully.`});
        } catch (error) {
            console.error(error);
            return res.status(500).json({status: 500, error: 'Internal server error.'});
        }
    },

    getUserInteraction: async (req, res) => {

        const {book_id, user_id} = req.body;

        try {
            const bookResponse = await book.findOne({where: {uuid: book_id}});

            if (!bookResponse) {
                return res.status(404).json({status: 404, message: 'Book not found'});
            }

            const interactions = await userInteraction.findOne({
                attributes: ['rating', 'liked', 'read_status'],
                where: {
                    book_id: bookResponse.id,
                    user_id: user_id
                }
            });

            return res.status(200).json({status: 200, message: 'Success', data: interactions});

        } catch (error) {
            return res.status(500).json({status: 500, message: 'Internal server error'});
        }
    },

    getUserInteractionCount: async (req, res) => {

        const {id} = req.params;

        try {

            const interactionCounts = await userInteraction.findOne({
                where: {book_id: id},
                attributes: [
                    [Sequelize.fn('COUNT', Sequelize.literal('CASE WHEN liked = true THEN 1 ELSE 0 END')), 'likeCount'],
                    [Sequelize.fn('COUNT', Sequelize.literal('CASE WHEN read_status = \'reading\' THEN 1 END')), 'readingCount'],
                    [Sequelize.fn('COUNT', Sequelize.literal('CASE WHEN read_status = \'toRead\' THEN 1 END')), 'toReadCount'],
                    [Sequelize.fn('COUNT', Sequelize.literal('CASE WHEN read_status = \'completed\' THEN 1 END')), 'completedCount'],
                ],
            });
            return res.status(200).json({status: 200, message: 'Success', data: interactionCounts});
        } catch (error) {
            return res.status(500).json({status: 500, message: 'Internal server error'});
        }
    }
};

module.exports = userInteractionController;
