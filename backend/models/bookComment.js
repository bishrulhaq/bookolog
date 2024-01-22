module.exports = function (sequelize, DataTypes) {
    const bookComment = sequelize.define('bookComment', {
        book_id: {
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
        parent_comment_id: {
            type: DataTypes.INTEGER,
        },
    }, {
        tableName: 'bookComment',
    });

    bookComment.associate = function (models) {
        bookComment.belongsTo(models.book, { foreignKey: 'book_id' });
        // bookComment.belongsTo(models.bookComment, { foreignKey: 'parent_comment_id' });
        bookComment.belongsTo(models.user, { foreignKey: 'user_id' });
        bookComment.hasMany(models.bookComment, { foreignKey: 'parent_comment_id', as: 'replies'});
    };

    return bookComment;
};