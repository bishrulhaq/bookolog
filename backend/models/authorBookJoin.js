module.exports = function (sequelize, DataTypes) {
  const authorBookJoin = sequelize.define('authorBookJoin', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'authorBookJoin',
  });

  return authorBookJoin;
};