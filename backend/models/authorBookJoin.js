const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const authorBookJoin = sequelize.define('authorBookJoin',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = authorBookJoin;
