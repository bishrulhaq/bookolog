module.exports = function (sequelize, DataTypes) {
  const nudge = sequelize.define('nudge', {
    interaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    offer: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    suggested_books: {
      type: DataTypes.JSON,
      allowNull: true, defaultValue: []
    },
  }, {
    tableName: 'nudge',
  });

  nudge.associate = function (models) {
    nudge.belongsTo(models.bookInteraction, {foreignKey: 'interaction_id'});
    nudge.belongsTo(models.user, {foreignKey: 'user_id'});
  };

  return nudge;
};