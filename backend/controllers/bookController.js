const { Sequelize } = require('sequelize');
const { book, author } = require('../models'); // Import the Book model

const bookController = {
  getAll: async (req, res) => {
    try {
      const books = await book.findAll(); // Use the Book model to retrieve all books
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const singleBook = await book.findByPk(id); // Use the Book model to find a book by ID
      if (!singleBook) {
        res.status(404).json({ error: 'Book not found' });
      } else {
        res.json(singleBook);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  searchByTitle: async (req, res) => {
    const { title } = req.query;
    try {
      const books = await book.findAll({
        where: {
          title: { [Sequelize.Op.like]: `%${title}%` }, // Use Sequelize operators for SQL LIKE
        },
        limit: 6,
        attributes: ['id', 'title', 'subtitle', 'description', 'slug', 'author_ids'],
      },);
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  getCategories: async (req, res) => {
    try {
      const books = await book.getAll();
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  searchByCategory: async (req, res) => {
    const { category } = req.query;
    try {
      const books = await book.findAll({
        where: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('categories')),
          'LIKE',
          `%${category.toLowerCase()}%`
        ),
        limit: 6,
        attributes: ['id', 'title', 'subtitle', 'description', 'slug'],
      });
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  searchByAuthors: async (req, res) => {
    const { author } = req.query;

    try {
      const books = await book.findAll({
        where: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('book_authors')),
          'LIKE',
          `%${author.toLowerCase()}%`
        ),
        limit: 6,
        attributes: ['id', 'title', 'subtitle', 'description', 'slug'],
      });

      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  getPaginatedBooksWithAuthors: async (req, res) => {
    const LIMIT = parseInt(req.query?.limit) ?? 2;
    const PAGE = parseInt(req.query?.page) ?? 1;
    const OFFSET = (PAGE - 1) * LIMIT;

    try {
      // Use Sequelize to fetch books with authors and apply LIMIT and OFFSET
      const booksWithAuthors = await book.findAll({
        include: [
          {
            model: author,
            attributes: ['id', 'name', 'birth_year', 'death_year', 'biography', 'img_uri', 'slug'],
            through: { attributes: [] },
          },
        ],
        limit: LIMIT, // Apply the LIMIT clause
        offset: OFFSET, // Apply the OFFSET clause
      });

      res.json(booksWithAuthors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  searchByISBN: async (req, res) => {
    const { isbn } = req.query;
    try {
      const books = await book.findAll({
        where: {
          [Sequelize.Op.or]: [
            { isbn_10: { [Sequelize.Op.like]: `%${isbn}%` } },
            { isbn_13: { [Sequelize.Op.like]: `%${isbn}%` } },
          ],
        },
        limit: 6,
        attributes: ['id', 'title', 'subtitle', 'description', 'slug'],
      });
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  searchBooks: async (req, res) => {
    const { search } = req.query;
    try {
      const books = await book.findAll({
        where: {
          [Sequelize.Op.or]: [
            { title: { [Sequelize.Op.like]: `%${search}%` } },
            { isbn_10: { [Sequelize.Op.like]: `%${search}%` } },
            { isbn_13: { [Sequelize.Op.like]: `%${search}%` } },
            { categories: { [Sequelize.Op.like]: `%${search}%` } },
            Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('book_authors')),
              'LIKE',
              `%${search.toLowerCase()}%`
            )
          ],
        }
      });
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },
};

module.exports = bookController;