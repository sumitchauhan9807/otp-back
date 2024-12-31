'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Dids', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        // autoIncrement: true,
        defaultValue: () => {
          return uuidv4();
        }
      },
      country: {
        type: Sequelize.STRING
      },
      alpha2Code: {
        type: Sequelize.STRING
      },
      countryCode: {
        type: Sequelize.STRING
      },
      localArea: {
        type: Sequelize.STRING
      },
      areaCode: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Dids');
  }
};