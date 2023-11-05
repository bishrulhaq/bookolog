const { Sequelize, Op } = require('sequelize');
const sequelize = require('../config/db');
const { book, author, category } = require('../models');
const axios = require('axios');
const { logger, sanitizedUri, encrypt, decrypt } = require('../helpers/utils');


const bookController = {
  getAll: async (req, res) => {
    try {
      const books = await book.findAll({
        order: [['updatedAt', 'DESC']],
        limit: 24,
      });
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  featuredBooks: async (req, res) => {
    try {
      const featured = await book.findAll({
        where: { is_featured: true },
        order: [['updatedAt', 'DESC']],
        limit: 8,
      });

      res.json(featured);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  trendingBooks: async (req, res) => {
    try {
      const trending = await book.findAll({
        order: [['views', 'DESC']],
        limit: 8,
      });

      res.json(trending);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },


  incrementView: async (req, res) => {
    try {

      const { id } = req.body;
      const bookInstance = await book.findOne({ where: { id: parseInt(id) } });

      if (!bookInstance) {
        return res.status(404).json({ error: 'Book not found' });
      }

      await bookInstance.increment('views');

      res.json({ message: 'View count incremented' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;

    try {

      let response = await book.findOne({ where: { uuid: id } });
      const decryptedId = decrypt(id);
      if (!response) {
        const getBook = await axios.get(`https://www.googleapis.com/books/v1/volumes/${decryptedId}?key=${process.env.GOOGLE_BOOKS_API}`);

        const isbn = getBook.data?.volumeInfo?.industryIdentifiers?.find(
          (identifier) => identifier?.type === 'ISBN_13' ||
            identifier?.type === 'ISBN_10')?.identifier;

        if (isbn) {
          await addBook(getBook.data)
          let response = await book.findOne({ where: { book_uid: decryptedId } });
          await response.increment('views');
          res.json(response);
        } else {
          res.json([]);
        }

      } else {
        await response.increment('views');
        res.json(response);
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


      const returnBooks = await searchBooksOnGoogleAPI(title);
      res.json(returnBooks);
    } catch (error) {
      handleError(res, error);
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
        limit: 16,
        attributes: ['id', 'title', 'subtitle', 'description', 'slug', 'uuid', 'book_uid', 'author_ids'],
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

      const returnBooks = await searchBooksOnGoogleAPI(`isbn:${isbn}`);
      res.json(returnBooks);
    } catch (error) {
      handleError(res, error);
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


async function addBook(item) {
  if (!item || !item.id) {
    return [];
  }

  const data = {
    title: item.volumeInfo?.title || null,
    subtitle: item.volumeInfo?.subtitle || null,
    book_uid: item.id,
    uuid: encrypt(item.id),
    slug: sanitizedUri(item.volumeInfo?.title || null),
    publisher: item.volumeInfo?.publisher || null,
    published_date: item.volumeInfo?.publishedDate || null,
    description: item.volumeInfo?.description || null,
    maturityRating: item.volumeInfo?.maturityRating || null,
    contentVersion: item.volumeInfo?.contentVersion || null,
    language: item.volumeInfo?.language || null,
    search_info: item.searchInfo || null,
    categories: item.volumeInfo?.categories || null,
    e_tag: item.etag || null,
    google_uri: item.selfLink || null,
    page_count: item.volumeInfo?.pageCount || null,
    print_type: item.volumeInfo?.printType || null,
    isbn_10: (item.volumeInfo?.industryIdentifiers || []).find(identifier => identifier.type === 'ISBN_10')?.identifier || null,
    isbn_13: (item.volumeInfo?.industryIdentifiers || []).find(identifier => identifier.type === 'ISBN_13')?.identifier || null,
    publish_country: item.volumeInfo?.country || null,
    book_authors: item.volumeInfo?.authors || null,
    author_ids: null,
  };

  try {

    const createdBook = await book.create(data);
    await createdBook.increment('views');

    if (data.categories) {
      const uniqueCategories = [...new Set(data.categories)];
      const allCategories = [];

      uniqueCategories.forEach(categoryName => {
        const splitCategories = categoryName.split(' / ');
        if (splitCategories.length === 1) {
          allCategories.push(categoryName);
        } else {
          allCategories.push(...splitCategories);
        }
      });

      allCategories.forEach(categoryName => insertCategoryIfNotExists(categoryName));
    }

    const book_isbn = createdBook?.isbn_13 || createdBook?.isbn_10;
    const authorInfo = await fetchAuthorInfoByISBN(book_isbn, createdBook.book_authors, createdBook);

    if (authorInfo) {
      console.log(`Author information saved for book with ISBN ${book_isbn}`);
    } else {
      console.log(`No author information found for book with ISBN ${book_isbn}`);
    }

    return createdBook;

  } catch (error) {
    return [];
  }
}


async function insertCategoryIfNotExists(categoryTitle) {
  const t = await sequelize.transaction();

  try {
    const existingCategory = await category.findOne({ where: { category_title: categoryTitle }, transaction: t });

    if (!existingCategory) {
      await category.create({
        category_title: categoryTitle,
        background_color: Math.floor(Math.random() * 24),
      }, { transaction: t });
    }

    await t.commit();
  } catch (error) {
    console.error('Error inserting category:', error);
    await t.rollback();
  }
}


async function fetchAuthorInfoByISBN(isbnCode, bookAuthorsArray, book) {
  try {
    const bookInfo = await getBookInfoFromOpenLibrary(isbnCode);
    if (!bookInfo) {
      return null;
    }

    const authorData = createAuthorData(bookAuthorsArray, bookInfo.authors);

    book.author_ids = authorData;
    await book.save();

    if (book.book_uid && book.author_ids) {
      const alteredAuthors = await updateAuthors(book.author_ids, book);
      await book.update({ author_ids: alteredAuthors });
      await book.update({ status: 1 });
    }

    return authorData;
  } catch (error) {
    console.error('Error fetching author information:', error);
    return null;
  }
}

async function getBookInfoFromOpenLibrary(isbnCode) {
  try {
    const response = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbnCode}&jscmd=data&format=json`);
    return response.data[`ISBN:${isbnCode}`];
  } catch (error) {
    return null;
  }
}

function createAuthorData(bookAuthorsArray, authors) {
  const authorData = [];

  for (const author of authors) {
    const authorKey = author.url.split('/')[author.url.split('/').length - 2];
    const authorName = bookAuthorsArray.includes(author.name) ? author.name : null;

    if (authorName) {
      authorData.push({
        name: authorName,
        key: authorKey || null,
        k_id: null,
      });
    }
  }

  bookAuthorsArray.forEach((authorName) => {
    if (!authorData.some((author) => author.name === authorName)) {
      authorData.push({
        name: authorName,
        key: null,
        k_id: null,
      });
    }
  });

  return authorData;
}

async function updateAuthors(author_ids, book) {
  const alteredAuthors = [];

  for (const author of author_ids) {
    if (author.key !== null) {
      const authorDetails = await getAuthorDetailsFromOpenLibrary(author.key);

      if (authorDetails?.data && authorDetails?.data?.name) {
        const addedAuthor = await insertAuthorIfNotExists(authorDetails.data, author.key, book);
        alteredAuthors.push({
          name: addedAuthor?.name,
          key: addedAuthor?.author_uid,
          k_id: addedAuthor?.id,
        });
      } else {
        alteredAuthors.push({
          name: author.name,
          key: null,
          k_id: null,
        });
      }
    } else {
      alteredAuthors.push({
        name: author.name,
        key: null,
        k_id: null,
      });
    }
  }

  return alteredAuthors;
}

async function getAuthorDetailsFromOpenLibrary(authorKey) {
  try {
    return await axios.get(`https://openlibrary.org/author/${authorKey}.json`);
  } catch (error) {
    return null;
  }
}

async function insertAuthorIfNotExists(authorInfo, authorKey, currentBook) {
  try {
    const [authorRecord, created] = await author.findOrCreate({
      where: { author_uid: authorKey },
      defaults: {
        name: authorInfo?.name,
        alternate_names: authorInfo?.alternate_names ? JSON.stringify(authorInfo?.alternate_names) : null, // You can fetch alternate names from the API if available
        birth_year: authorInfo?.birth_date ?? null,
        death_year: authorInfo?.death_date ?? null,
        biography: authorInfo?.bio?.value ?? null,
        slug: sanitizedUri(authorInfo?.name)
      },
    });

    if (created) {
      logger.info(`Author "${authorInfo?.name}" inserted.`);
      await currentBook.addAuthor(authorRecord);

    } else {
      logger.info(`Author "${authorInfo.name}" already exists.`);
      await currentBook.addAuthor(authorRecord);
    }

    return authorRecord;
  } catch (error) {
    logger.error('Error inserting author:', error);
  }
}

async function searchBooksOnGoogleAPI(query) {
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GOOGLE_BOOKS_API}&maxResults=10`);
    const returnBooks = [];

    for (const item of response.data.items || []) {
      const isbn = item?.volumeInfo?.industryIdentifiers?.find(identifier => identifier?.type === 'ISBN_13' || identifier?.type === 'ISBN_10')?.identifier;
      if (isbn) {
        returnBooks.push({
          title: item?.volumeInfo?.title || null,
          subtitle: item?.volumeInfo?.subtitle || null,
          id: encrypt(item?.id),
          slug: sanitizedUri(item?.volumeInfo?.title || null),
        });
      }
    }

    return returnBooks;
  } catch (error) {
    return [];
  }
}

module.exports = bookController;