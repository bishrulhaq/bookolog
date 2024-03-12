module.exports = function (sequelize, DataTypes) {
    const token = sequelize.define('token', {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        revoked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    }, {
        tableName: 'token'
    });


    token.associate = function (model) {
        token.belongsTo(model.user, {foreignKey: 'user_id'});
    };

    return token;
};