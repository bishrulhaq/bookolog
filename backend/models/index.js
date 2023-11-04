const author = require('./author');
const book = require('./book');
const category = require('./category');
const bookCoverImage = require('./bookCoverImage');
const authorBookJoin = require('./authorBookJoin');

// Define associations between models here (if using Sequelize)
book.belongsToMany(author, { through: authorBookJoin });
author.belongsToMany(book, { through: authorBookJoin });
book.belongsTo(bookCoverImage, { foreignKey: 'cover_id' });

module.exports = {
  author,
  book,
  category,
  bookCoverImage,
  authorBookJoin,
};