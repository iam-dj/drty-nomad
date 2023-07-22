const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Place extends Model {}

Place.init(
  //**id will auto generate
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
  }
);

module.exports = Place;
