module.exports = function (sequelize, DataTypes) {
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
    slug: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    img_uri: {
      type: DataTypes.STRING(255),
      defaultValue: null,
    },
  }, {
    tableName: 'author',
  });

  author.associate = function (models) {
    author.belongsToMany(models.book, { through: 'authorBookJoin', foreignKey: 'author_id' });
  };

  return author;
};