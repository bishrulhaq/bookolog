module.exports = function (sequelize, DataTypes) {
  const bookCoverImage = sequelize.define('bookCoverImage', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cover_img: {
      type: DataTypes.JSON, 
      defaultValue: null,
    }
  },{
    tableName: 'bookCoverImage',
  });

  return bookCoverImage;
};