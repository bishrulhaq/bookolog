module.exports = function (sequelize, DataTypes) {
    const country = sequelize.define('country', {
        name: {
            type: DataTypes.STRING(255), allowNull: false,
        }, code: {
            type: DataTypes.STRING(255), allowNull: false, unique: true,
        }, dial_code: {
            type: DataTypes.STRING(255), allowNull: false,
        },
    }, {
        tableName: 'country'
    });

    return country;
};
