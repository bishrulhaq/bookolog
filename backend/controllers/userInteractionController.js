const {userInteraction} = require('../models');

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
                case 'isFavorite':
                    interaction.isFavorite = value;
                    break;
                case 'isReading':
                    interaction.isReading = value;
                    break;
                case 'isToRead':
                    interaction.isToRead = value;
                    break;
            }

            await interaction.save();

            return res.status(200).json({status: 200, message: `Book ${interactionType} status updated successfully.`});
        } catch (error) {
            console.error(error);
            return res.status(500).json({status: 500, error: 'Internal server error.'});
        }
    },
};

module.exports = userInteractionController;
