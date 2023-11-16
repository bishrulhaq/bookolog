module.exports = function (sequelize, DataTypes) {
  const authorBookJoin = sequelize.define('authorBookJoin', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'book',
        key: 'id',
      },
    },
    author_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'author',
        key: 'id',
      },
    },
  }, {
    tableName: 'authorBookJoin',
  });

  return authorBookJoin;
};