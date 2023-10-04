const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const author = sequelize.define('author', {
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  alternate_names: {
    type: DataTypes.JSON, 
    defaultValue: null,
  },
  author_uid: {
    type: DataTypes.STRING(100),
    unique: true,
  },
  birth_year: {
    type: DataTypes.STRING(255),
    defaultValue: null,
  },
  death_year: {
    type: DataTypes.STRING(255),
    defaultValue: null,
  },
  biography: {
    type: DataTypes.TEXT,
    defaultValue: null,
  },
  slug:{
    type: DataTypes.CHAR(255),
    allowNull: false,
  },
  img_uri: {
    type: DataTypes.STRING(255),
    defaultValue: null,
  },
});

module.exports = author;