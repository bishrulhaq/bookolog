'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('category', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_title: {
        type: Sequelize.STRING(100),
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      background_color: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      status: {
        type: Sequelize.STRING(100),
        defaultValue: null,
      },
      displayed_in: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
      },
      icon: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      img_uri: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      slug: {
        type: Sequelize.STRING(255),
        unique: true,
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('category');
  }
};
