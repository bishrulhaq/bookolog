const { Sequelize } = require('sequelize');
const { author, book } = require('../models'); // Import the Author and Book models

const authorController = {
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const authorData = await author.findByPk(id, {
        include: [
          {
            model: book,
            attributes: ['title', 'published_date', 'slug', 'uuid', 'subtitle', 'book_uid', 'views','description'],
          },
        ],
        limit: 8,
        order: [[{ model: book }, 'views', 'DESC']],
        subQuery: false,
        attributes: { exclude: ['authorBookJoin'] },
      });
      if (!authorData) {
        res.status(404).json({ error: 'Author not found' });
      } else {
        res.json(authorData);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  searchByName: async (req, res) => {
    const { name } = req.query;
    try {
      const authors = await author.findAll({
        where: {
          name: { [Sequelize.Op.like]: `%${name}%` }, // Use Sequelize operators for SQL LIKE
        },
      });
      res.json(authors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  getAuthorWithBooksById: async (req, res) => {
    const { id } = req.params;
    try {
      const authorData = await author.findByPk(id, {
        include: [
          {
            model: book,
            attributes: ['title', 'published_date'], // Include book attributes you want
          },
        ],
      });
      if (!authorData) {
        res.status(404).json({ error: 'Author not found' });
      } else {
        res.json(authorData);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ errosadfr: 'An error occurred' });
    }
  },
  getAuthorByAuthorUid: async (req, res) => {
    const { author_uid } = req.params;
    try {
      const authorData = await author.findOne({
        where: { author_uid },
        include: [
          {
            model: book,
            attributes: ['title', 'published_date'], // Include book attributes you want
          },
        ],
      });

      if (!authorData) {
        res.status(404).json({ error: 'Author not found' });
      } else {
        res.json(authorData);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
};

module.exports = authorController;