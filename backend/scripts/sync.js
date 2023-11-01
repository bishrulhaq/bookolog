const { author, book, category, authorBookJoin, bookCoverImage } = require('../models'); // Import your models

async function syncDatabase() {
  try {

     // Check if the 'bookCoverImage' table exists and create it if it doesn't
     const bookCoverImageExists = await bookCoverImage.sync({ alter: false });
     if (!bookCoverImageExists) {
       await bookCoverImage.sync({ force: false });
     }

    // Check if the 'book' table exists and create it if it doesn't
    const bookExists = await book.sync({ alter: false });
    if (!bookExists) {
      await book.sync({ force: false });
    }

    // Check if the 'author' table exists and create it if it doesn't
    const authorExists = await author.sync({ alter: false });
    if (!authorExists) {
      await author.sync({ force: false });
    }

    // Check if the 'edition' table exists and create it if it doesn't
    const categoryExists = await category.sync({ alter: false });
    if (!categoryExists) {
      await category.sync({ force: false });
    }

    // Check if the 'authorBookJoin' table exists and create it if it doesn't
    const authorBookJoinExists = await authorBookJoin.sync({ alter: false });
    if (!authorBookJoinExists) {
      await authorBookJoin.sync({ force: false });
    }

    console.log('Tables are created or already exist.\n Database synchronization complete');

  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

// Call the synchronization function
module.exports = syncDatabase;