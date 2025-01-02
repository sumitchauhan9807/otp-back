("use strict");
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PhoneNumbers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PhoneNumbers.belongsTo(models.Countries, {
        foreignKey: "countryId",
      });
    }
  }
  PhoneNumbers.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        // autoIncrement: true,
        defaultValue: () => {
          return uuidv4();
        },
      },
      countryId: DataTypes.UUID,
      countryName:DataTypes.STRING,
      countryIso:DataTypes.STRING,
      areaName: DataTypes.STRING,
      cityName: DataTypes.STRING,
      numberType: DataTypes.STRING,
      prefix: DataTypes.STRING,
      countryCode:DataTypes.STRING,
      hasA2p: DataTypes.BOOLEAN,
      hasEmergency: DataTypes.BOOLEAN,
      hasP2p: DataTypes.BOOLEAN,
      hasSms: DataTypes.BOOLEAN,
      hasT38: DataTypes.BOOLEAN,
      hasVoice: DataTypes.BOOLEAN,
      hasVoiceOut: DataTypes.BOOLEAN,

      createdAt: { type: DataTypes.DATE, defaultValue: () => new Date() },
      updatedAt: { type: DataTypes.DATE, defaultValue: () => new Date() },
    },
    {
      sequelize,
      modelName: "PhoneNumbers",
    }
  );
  return PhoneNumbers;
};
