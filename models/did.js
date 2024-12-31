"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Did extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Did.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        // autoIncrement: true,
        defaultValue: () => {
          return uuidv4();
        },
      },
      country: DataTypes.STRING,
      countryCode: DataTypes.STRING,
      localArea: DataTypes.STRING,
      areaCode: DataTypes.STRING,
      alpha2Code :DataTypes.STRING,
      createdAt: { type: DataTypes.DATE, defaultValue: () => new Date() },
      updatedAt: { type: DataTypes.DATE, defaultValue: () => new Date() },
    },
    {
      sequelize,
      modelName: "Did",
    }
  );
  return Did;
};
