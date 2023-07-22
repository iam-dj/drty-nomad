const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class FutureTrip extends Model {}

FutureTrip.init(
  {
    // ** id will auto generate
    future_destination_name: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isAlpha: true,
      // },
    },
    whyGo_notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    howLong_notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    when_toGo_notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stay_in_hotel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    future_destination_photo_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
  }
);

module.exports = FutureTrip;
