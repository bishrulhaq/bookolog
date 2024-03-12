const {quote, country} = require('../models');
const seedrandom = require('seedrandom');

const commonController = {
    getRandomQuote: async (req, res) => {

        try {
            const currentDate = new Date();
            const dateString = currentDate.toISOString().split('T')[0];
            const numericDate = parseInt(dateString.replace(/-/g, ''));
            seedrandom(numericDate.toString(), {global: true});
            const randomNum = Math.floor(Math.random() * 80) + 1;

            const selectedQuote = await quote.findOne({
                where: {id: randomNum}, attributes: ['author', 'quote'],
            });

            return res.status(200).json({status: 200, success: true, data: selectedQuote});

        } catch (error) {
            return res.status(500).json({status: 500, success: false, error: 'Internal Server Error',});
        }
    },

    getCountries: async (req, res) => {
        try {
            const countries = await country.findAll();
            return res.status(200).json({status: 200, success: true, data: countries});

        } catch (error) {
            return res.status(500).json({status: 500, success: false, error: 'Internal Server Error',});
        }
    }
};

module.exports = commonController;