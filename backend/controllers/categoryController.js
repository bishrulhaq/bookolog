const { Sequelize } = require('sequelize');
const { category } = require('../models');

const categoryController = {
    getHomeScreenCategories: async (req, res) => {
        try {
            const categories = await category.findAll({
                where: {
                    displayed_in: 1,
                },
            });
            res.json(categories);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        }
    },

    getAllCategories: async (req, res) => {
        try {
            const categories = await category.findAll();
            res.json(categories);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        }
    },

};

module.exports = categoryController;