'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nudge', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      interaction_id: {
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
      content: {
        type: Sequelize.TEXT
      },
      offer: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      suggested_books: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: []
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
    await queryInterface.dropTable('nudge');
  }
};