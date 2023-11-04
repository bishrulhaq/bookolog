const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const bookCoverImage = sequelize.define('bookCoverImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cover_img: {
    type: DataTypes.JSON, 
    defaultValue: null,
  }
});



module.exports = bookCoverImage;