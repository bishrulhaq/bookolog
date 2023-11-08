'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('book', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uuid: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      subtitle: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      book_uid: {
        type: Sequelize.STRING(100),
        unique: true,
      },
      publisher: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      published_date: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      description: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      maturityRating: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      contentVersion: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      language: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      search_info: {
        type: Sequelize.JSON,
        defaultValue: null,
      },
      categories: {
        type: Sequelize.JSON,
        defaultValue: null,
      },
      e_tag: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      google_uri: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      page_count: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      print_type: {
        type: Sequelize.JSON,
        defaultValue: null,
      },
      isbn_10: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      isbn_13: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      publish_country: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      book_authors: {
        type: Sequelize.JSON,
        defaultValue: null,
      },
      author_ids: {
        type: Sequelize.JSON,
        defaultValue: null,
      },
      slug: {
        type: Sequelize.CHAR(255),
        allowNull: false,
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
      },
      cover_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      views: {
        type: Sequelize.BIGINT,
        defaultValue: 0,
      },
      is_featured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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

    await queryInterface.addConstraint('book', {
      type: 'FOREIGN KEY',
      name: 'FK_book_cover_id',
      fields: ['cover_id'],
      references: {
        table: 'bookCoverImage',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    })

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('book');
  }
};
