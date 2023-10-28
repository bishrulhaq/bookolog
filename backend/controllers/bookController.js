const { Sequelize } = require('sequelize');
const { book, author, category } = require('../models');
const axios = require('axios');
const { sanitizedUri } = require('../helpers/utils');

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

      // const books = await book.findAll({
      //   where: {
      //     title: { [Sequelize.Op.like]: `%${title}%` }, // Use Sequelize operators for SQL LIKE
      //   },
      //   limit: 6,
      //   attributes: ['id', 'title', 'subtitle', 'description', 'slug', 'author_ids'],
      // },);
      // res.json(books);

      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}&key=${process.env.GOOGLE_BOOKS_API}&maxResults=4`);
      const returnBooks = [];

      for (const item of response.data.items || []) {
        const isbn = item?.volumeInfo?.industryIdentifiers?.find((identifier) => identifier?.type === 'ISBN_13' || identifier?.type === 'ISBN_10')?.identifier;
        if (isbn) {
          const insertedBook = await addBooks(item)
          if (insertedBook) {
            returnBooks.push(insertedBook);
          }
        }
      }
      res.json(returnBooks);

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
      
      // const books = await book.findAll({
      //   where: {
      //     [Sequelize.Op.or]: [
      //       { isbn_10: { [Sequelize.Op.like]: `%${isbn}%` } },
      //       { isbn_13: { [Sequelize.Op.like]: `%${isbn}%` } },
      //     ],
      //   },
      //   limit: 6,
      //   attributes: ['id', 'title', 'subtitle', 'description', 'slug'],
      // });

      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.GOOGLE_BOOKS_API}&maxResults=4`);
      const returnBooks = [];

      for (const item of response.data.items || []) {
        const isbn = item?.volumeInfo?.industryIdentifiers?.find((identifier) => identifier?.type === 'ISBN_13' || identifier?.type === 'ISBN_10')?.identifier;
        if (isbn) {
          const insertedBook = await addBooks(item)
          if (insertedBook) {
            returnBooks.push(insertedBook);
          }
        }
      }

      res.json(returnBooks);

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


async function addBooks(item) {
  const data = {
    title: item?.volumeInfo?.title || null,
    subtitle: item?.volumeInfo?.subtitle || null,
    book_uid: item?.id || null,
    publisher: item?.volumeInfo?.publisher || null,
    published_date: item?.volumeInfo?.publishedDate || null,
    description: item?.volumeInfo?.description || null,
    maturityRating: item?.volumeInfo?.maturityRating || null,
    contentVersion: item?.volumeInfo?.contentVersion || null,
    language: item.volumeInfo?.language || null,
    search_info: item?.searchInfo || null,
    categories: item?.volumeInfo?.categories || null,
    e_tag: item?.etag || null,
    google_uri: item?.selfLink || null,
    page_count: item?.volumeInfo?.pageCount || null,
    print_type: item?.volumeInfo?.printType || null,
    isbn_10: item?.volumeInfo?.industryIdentifiers?.find((identifier) => identifier?.type === 'ISBN_10')?.identifier || null,
    isbn_13: item?.volumeInfo?.industryIdentifiers?.find((identifier) => identifier?.type === 'ISBN_13')?.identifier || null,
    publish_country: item?.volumeInfo?.country || null,
    book_authors: item?.volumeInfo?.authors || null,
    slug: sanitizedUri(item?.volumeInfo?.title || null),
    author_ids: null,
  };


  if (data.book_uid) {
    try {
      const existingBook = await book.findOne({ where: { book_uid: data.book_uid } });

      if (!existingBook) {
        const createdBook = await book.create(data);
        if (data.categories) {
          const uniqueCategories = [...new Set(data.categories)];
          for (const categoryName of uniqueCategories) {
            await insertCategoryIfNotExists(categoryName);
          }
        }
        return createdBook;
      } else {
        return existingBook;
      }
    } catch (error) {
      return null;
    }
  }
}

async function insertCategoryIfNotExists(categoryTitle) {
  try {
    await category.findOrCreate({
      where: { category_title: categoryTitle },
      defaults: { background_color: Math.floor(Math.random() * 24) }
    });
  } catch (error) {
    console.error('Error inserting category:', error);
  }
}

module.exports = bookController;