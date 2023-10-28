const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const author = sequelize.define('bookCoverImage', {
  book_uid: {
    type: DataTypes.STRING(100),
    unique: true,
  },
  cover_uri_primary: {
    type: DataTypes.STRING(255),
    defaultValue: null,
  },
  cover_uri_alternative: {
    type: DataTypes.STRING(255),
    defaultValue: null,
  },
});

module.exports = author;