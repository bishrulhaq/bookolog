'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('authorBookJoin', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      book_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'book',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      author_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'author',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

    await queryInterface.addConstraint('authorBookJoin', {
      type: 'FOREIGN KEY',
      name: 'FK_authorBookJoin_book_id',
      fields: ['book_id'],
      references: {
        table: 'book',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })

    await queryInterface.addConstraint('authorBookJoin', {
      type: 'FOREIGN KEY',
      name: 'FK_authorBookJoin_author_id',
      fields: ['author_id'],
      references: {
        table: 'author',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('authorBookJoin');
  }
};
