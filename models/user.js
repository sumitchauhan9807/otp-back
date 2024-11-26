'use strict';
const { v4: uuidv4 } = require('uuid');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        // autoIncrement: true,
        defaultValue: () => {
          return uuidv4();
        }
      },
      token: DataTypes.STRING,
      otp: DataTypes.STRING,
      email: DataTypes.STRING,
      phonenumber: DataTypes.STRING,

      createdAt: { type: DataTypes.DATE, defaultValue: () => new Date() },
      updatedAt: { type: DataTypes.DATE, defaultValue: () => new Date() },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
