'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Countries', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        // autoIncrement: true,
        defaultValue: () => {
          return uuidv4();
        }
      },
      name: {
        type: Sequelize.STRING
      },
      iso: {
        type: Sequelize.STRING
      },
      countryCode: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Countries');
  }
};