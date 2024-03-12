module.exports = function (sequelize, DataTypes) {
    const userInteraction = sequelize.define('userInteraction', {
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }, liked: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }, read_status: {
            type: DataTypes.ENUM('reading', 'toRead', 'completed'),
            allowNull: true,
        },

    }, {
        tableName: 'userInteraction',
    });

    userInteraction.associate = function (models) {
        userInteraction.belongsTo(models.user, {foreignKey: 'user_id'});
        userInteraction.belongsTo(models.book, {foreignKey: 'book_id'});
    };

    return userInteraction;
};