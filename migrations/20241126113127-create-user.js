'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: () => {
          return uuidv4();
        }
      },
      token: {
        type: Sequelize.STRING
      },
      otp: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phonenumber: {
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
    await queryInterface.dropTable('Users');
  }
};