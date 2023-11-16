module.exports = function (sequelize, DataTypes) {
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
  }, {
    tableName: 'quote',
  });

  return quote;
};