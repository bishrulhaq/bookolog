'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      unique_id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      country_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date_of_birth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'prefer_not_to_say'),
        allowNull: true,
        validate: {
          isIn: {
            args: [['male', 'female', 'prefer_not_to_say']],
            msg: 'Gender must be one of: male, female, prefer_not_to_say',
          },
        },
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      provider: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      google_sub: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
