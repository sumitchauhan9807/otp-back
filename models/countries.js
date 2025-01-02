("use strict");
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Countries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Countries.hasMany(models.PhoneNumbers,{
        foreignKey: 'countryId',
        onDelete: 'CASCADE',
      })
    }
  }
  Countries.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        // autoIncrement: true,
        defaultValue: () => {
          return uuidv4();
        },
      },
      name: DataTypes.STRING,
      iso: DataTypes.STRING,
      description: DataTypes.STRING,
      countryCode:DataTypes.STRING,
      createdAt: { type: DataTypes.DATE, defaultValue: () => new Date() },
      updatedAt: { type: DataTypes.DATE, defaultValue: () => new Date() },
    },
    {
      sequelize,
      modelName: "Countries",
    }
  );
  return Countries;
};
