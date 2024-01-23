module.exports = function (sequelize, DataTypes) {
    const country = sequelize.define('country', {
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        dial_code: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        country_code: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    });

    return country;
};
