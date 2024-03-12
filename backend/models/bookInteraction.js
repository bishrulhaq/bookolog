module.exports = function (sequelize, DataTypes) {
    const bookInteraction = sequelize.define('bookInteraction', {
        book_id: {
            type: DataTypes.INTEGER, allowNull: false,
        }, description: {
            type: DataTypes.TEXT, allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER, allowNull: false,
        }, negotiable: {
            type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false,
        }, type: {
            type: DataTypes.ENUM('exchange', 'buy', 'sell'), allowNull: false,
        }, price: {
            type: DataTypes.FLOAT, defaultValue: 0,
        }, search_by_book_id: {
            type: DataTypes.JSON,
            allowNull: true, defaultValue: []
        }, search_by_genre_id: {
            type: DataTypes.JSON,
            allowNull: true, defaultValue: []
        }, condition: {
            type: DataTypes.ENUM('new', 'used', 'sell'), allowNull: true,
        }, country_code: {
            type: DataTypes.STRING(255), allowNull: false,
        }
    }, {
        tableName: 'bookInteraction',
    });

    bookInteraction.associate = function (models) {
        bookInteraction.belongsTo(models.book, {foreignKey: 'book_id'});
        bookInteraction.belongsTo(models.user, {foreignKey: 'user_id'});
        bookInteraction.belongsTo(models.book, {foreignKey: 'search_by_book_id', as: 'SearchedBook'});
        bookInteraction.belongsTo(models.category, {foreignKey: 'search_by_genre_id', as: 'SearchedGenre'});
        bookInteraction.belongsTo(models.country, {foreignKey: 'country_code', targetKey: 'code'});
    };


    return bookInteraction;
};