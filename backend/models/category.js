const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const category = sequelize.define('category', {
  category_title: {
    type: DataTypes.TEXT,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: null,
  },
  background_color: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  status: {
    type: DataTypes.STRING(100),
    defaultValue: null,
  },
  displayed_in: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
  },
  icon: {
    type: DataTypes.STRING(255),
    defaultValue: null,
  },
  img_uri: {
    type: DataTypes.STRING(255),
    defaultValue: null,
  },
});

module.exports = category;