'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('bookInteraction', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            book_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'book',
                    key: 'id'
                }
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            negotiable: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            type: {
                type: Sequelize.ENUM('exchange', 'buy', 'sell'),
                allowNull: false
            },
            condition: {
                type: Sequelize.ENUM('new', 'used', 'sell'),
                allowNull: true,
            },
            price: {
                type: Sequelize.FLOAT,
                defaultValue: 0
            },
            search_by_book_id: {
                type: Sequelize.JSON,
                allowNull: true,
                defaultValue: []
            },
            search_by_genre_id: {
                type: Sequelize.JSON,
                allowNull: true,
                defaultValue: []
            },
            country_code: {
                type: Sequelize.STRING(255),
                allowNull: false,
                references: {
                    model: 'country',
                    key: 'code'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('bookInteraction');
    }
};