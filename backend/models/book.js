const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const book = sequelize.define('book', {
  title: {
    type: DataTypes.TEXT,
  },
  subtitle: {
    type: DataTypes.TEXT,
    defaultValue: null,
  },
  book_uid: {
    type: DataTypes.STRING(100),
    unique: true,
  },
  publisher: {
    type: DataTypes.TEXT,
    defaultValue: null,
  },
  published_date: {
    type: DataTypes.TEXT, 
    defaultValue: null,
  },
  description: {
    type: DataTypes.TEXT, 
    defaultValue: null,
  },
  maturityRating: {
    type: DataTypes.STRING(255),
    defaultValue: null,
  },
  contentVersion: {
    type: DataTypes.STRING(255),
    defaultValue: null,
  },
  language: {
    type: DataTypes.TEXT,
    defaultValue: null,
  },
  search_info: {
    type: DataTypes.JSON,
    defaultValue: null,
  },
  categories: {
    type: DataTypes.JSON, 
    defaultValue: null,
  },
  e_tag: {
    type: DataTypes.TEXT,
    defaultValue: null,
  },
  google_uri: {
    type: DataTypes.STRING(255), 
    defaultValue: null,
  },
  page_count: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  print_type: {
    type: DataTypes.JSON, 
    defaultValue: null,
  },
  isbn_10: {
    type: DataTypes.STRING(255), 
    defaultValue: null,
  },
  isbn_13: {
    type: DataTypes.STRING(255), 
    defaultValue: null,
  },
  publish_country: {
    type: DataTypes.TEXT,
    defaultValue: null,
  },
  book_authors:{
    type: DataTypes.JSON, 
    defaultValue: null,
  },
  author_ids:{
    type: DataTypes.JSON, 
    defaultValue: null,
  },
  slug:{
    type: DataTypes.CHAR(255),
    allowNull: false,
  },
  status:{
    type: DataTypes.TINYINT, 
    defaultValue: 0,
  },
  cover_id:{
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  views:{
    type: DataTypes.BIGINT,
    defaultValue: 0,
  }
});

module.exports = book;