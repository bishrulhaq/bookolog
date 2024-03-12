const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = function (sequelize, DataTypes) {
    const user = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        unique_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        country_code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        date_of_birth: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        provider: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        gender: {
            type: DataTypes.ENUM('male', 'female', 'other', 'prefer_not_to_say'),
            allowNull: true,
            validate: {
                isIn: {
                    args: [['male', 'female', 'prefer_not_to_say']],
                    msg: 'Gender must be one of: male, female, prefer_not_to_say',
                },
            },
        },
        google_sub: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
    }, {
        tableName: 'user',
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
                if (!user.unique_id) {
                    user.unique_id = uuidv4();
                }
            },
            beforeUpdate: async (user) => {
                if (user.changed('password') && user.password) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
            },
        },
    });

    return user;
};