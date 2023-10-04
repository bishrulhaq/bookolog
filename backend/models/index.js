const author = require('./author');
const book = require('./book');
const category = require('./category');
const authorBookJoin = require('./authorBookJoin');

// Define associations between models here (if using Sequelize)
book.belongsToMany(author, { through: authorBookJoin });
author.belongsToMany(book, { through: authorBookJoin });

module.exports = {
  author,
  book,
  category,
  authorBookJoin,
};