"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PhoneNumbers", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        // autoIncrement: true,
        defaultValue: () => {
          return uuidv4();
        },
      },
      countryId: {
        type: Sequelize.UUID,
      },
      areaName: {
        type: Sequelize.STRING,
      },
      cityName: {
        type: Sequelize.STRING,
      },
      countryIso: {
        type: Sequelize.STRING,
      },
      countryName: {
        type: Sequelize.STRING,
      },
      countryCode: {
        type: Sequelize.STRING,
      },
      
      numberType: {
        type: Sequelize.STRING,
      },
      prefix: {
        type: Sequelize.STRING,
      },

      hasA2p: {
        type: Sequelize.BOOLEAN,
      },

      hasEmergency: {
        type: Sequelize.BOOLEAN,
      },
      hasP2p: {
        type: Sequelize.BOOLEAN,
      },
      hasSms: {
        type: Sequelize.BOOLEAN,
      },
      hasT38: {
        type: Sequelize.BOOLEAN,
      },
      hasVoice: {
        type: Sequelize.BOOLEAN,
      },
      hasVoiceOut: {
        type: Sequelize.BOOLEAN,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PhoneNumbers");
  },
};
