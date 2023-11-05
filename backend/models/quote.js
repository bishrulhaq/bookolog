const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const quote = sequelize.define('quote', {
  quote: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.TEXT,
    defaultValue: null,
  },
  displayed_in: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = quote;