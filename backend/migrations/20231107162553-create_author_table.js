'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('author', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      alternate_names: {
        type: Sequelize.JSON,
        defaultValue: null,
      },
      author_uid: {
        type: Sequelize.STRING(100),
        unique: true,
      },
      birth_year: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      death_year: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      biography: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      slug: {
        type: Sequelize.CHAR(255),
        allowNull: false,
      },
      img_uri: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('author');
  }
};
