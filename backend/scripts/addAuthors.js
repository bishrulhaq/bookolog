const { Sequelize } = require('sequelize');
const axios = require('axios');
const { book } = require('../models');

// Function to fetch author information from Open Library by ISBN
async function fetchAuthorInfoByISBN(isbnCode, bookAuthorsArray) {
  try {
    const bookAuthors = JSON.parse(bookAuthorsArray);
    const response = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbnCode}&jscmd=data&format=json`);
    const bookInfo = response.data[`ISBN:${isbnCode}`];
    const authorData = [];

    if (bookInfo?.authors) {
      for (const author of bookInfo.authors) {
        const authorKeyParts = author.url.split('/');
        const authorKey = authorKeyParts[authorKeyParts.length - 2];
        const authorName = bookAuthors.includes(author.name) ? author.name : null;
        if (authorName) {
          authorData.push({
            name: authorName,
            key: authorKey || null, // Set key to null if it's empty
            k_id: null // Set k_id to null for matched authors
          });
        }

      }
    }

    // Ensure that all authors from bookAuthors are correctly matched
    for (const authorName of bookAuthors) {
      const authorExists = authorData.some(author => author.name === authorName);
      if (!authorExists) {
        authorData.push({
          name: authorName,
          key: null, // Set key to null for unmatched authors
          k_id: null // Set k_id to null for unmatched authors
        });
      }
    }

    return authorData;
  } catch (error) {
    console.error('Error fetching author information:', error);
    return null;
  }
}


async function addAuthors() {
  try {
    // Fetch all books from the Book table
    const books = await book.findAll({
      where: {
        author_ids: null,
        book_authors: {
          [Sequelize.Op.not]: null,
        },
      },
    });

    // Loop over the fetched books
    for (const bookInfo of books) {

      const book_isbn = bookInfo?.isbn_13 || bookInfo?.isbn_10;
      if (book_isbn) {
        console.log('Book Title:', bookInfo.title);
        const authorInfo = await fetchAuthorInfoByISBN(book_isbn, bookInfo.book_authors);

        if (authorInfo) {
          bookInfo.author_ids = authorInfo;
          await bookInfo.save();
          console.log(`Author information saved for book with ISBN ${book_isbn}`);
        } else {
          console.log(`No author information found for book with ISBN ${book_isbn}`);
        }
      }
    }
    console.log('All books processed.');
  } catch (error) {
    console.error('Error fetching books:', error);
    return null;
  }
}


addAuthors();