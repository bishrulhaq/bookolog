const {book, bookInteraction, user, category} = require('../models');
const {Sequelize} = require('sequelize');


const bookInteractionController = {
    insertBookInteraction: async (req, res) => {
        const {formData} = req.body;
        const selected_book_id = formData.selected_book[0]?.book_id;

        try {
            if (formData.interaction_type === 'exchange') {
                let searchField, searchValue;
                if (formData.type === 'genres') {
                    searchField = 'search_by_genre_id';
                    searchValue = formData.genres.map(genre => genre.id);
                } else {
                    searchField = 'search_by_book_id';
                    searchValue = formData.exchange_book.map(exchange => exchange.book_id);
                }

                const interaction = await bookInteraction.create({
                    book_id: selected_book_id,
                    user_id: formData.user_id,
                    description: formData.description,
                    country_code: formData.country_code,
                    type: formData.interaction_type,
                    [searchField]: searchValue
                });
                res.status(200).json({status: 200, message: 'Book interaction saved successfully', data: interaction});
            } else if (formData.interaction_type === 'sell') {
                const interaction = await bookInteraction.create({
                    book_id: selected_book_id,
                    user_id: formData.user_id,
                    country_code: formData.country_code,
                    description: formData.description,
                    type: formData.interaction_type,
                    price: formData.price,
                    condition: formData.condition,
                    negotiable: formData.negotiable
                });
                res.status(200).json({status: 200, message: 'Book interaction saved successfully', data: interaction});
            }
        } catch (error) {
            res.status(500).json({status: 500, error: 'Failed to insert book interaction'});
        }
    },


    getBookInteractionsByCountryCode: async (req, res) => {
        const {code} = req.params;

        try {
            const interactions = await bookInteraction.findAll({
                where: {
                    country_code: code
                }, include: [{model: user,  attributes: ['id', 'first_name', 'last_name', 'image']}, {model: book, attributes: ['id', 'title', 'slug', 'description', 'book_uid']},]
            });

            const parsedInteractions = await Promise.all(interactions.map(async interaction => {
                const parsedInteraction = interaction.toJSON();

                parsedInteraction.search_by_book_id = JSON.parse(parsedInteraction.search_by_book_id);
                if (parsedInteraction.search_by_book_id.length > 0) {
                    parsedInteraction.search_books = await book.findAll({
                        where: {
                            id: {[Sequelize.Op.in]: parsedInteraction.search_by_book_id}
                        },
                        attributes: ['id', 'title', 'slug', 'description', 'book_uid']
                    });
                }else{
                    parsedInteraction.search_books = []
                }

                parsedInteraction.search_by_genre_id = JSON.parse(parsedInteraction.search_by_genre_id);
                if (parsedInteraction.search_by_genre_id.length > 0) {
                    parsedInteraction.search_genres = await category.findAll({
                        where: {
                            id: {[Sequelize.Op.in]: parsedInteraction.search_by_genre_id}
                        },
                        attributes: ['id', 'category_title']
                    });
                }else{
                    parsedInteraction.search_genres = []
                }

                return parsedInteraction;
            }));

            res.status(200).json({status: 200, data: parsedInteractions});
        } catch (error) {
            console.error('Error fetching book interactions:', error);
            res.status(500).json({status: 500, error: 'Failed to fetch book interactions'});
        }
    }
};

module.exports = bookInteractionController;