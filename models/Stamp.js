const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Stamp extends Model {}

Stamp.init(
  {
    // ** id will auto generate
    destination_name: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isAlpha: true,
      // },
    },
    destination_notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photo_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    //**foreign key: dest_id will auto generate
  },
  {
    sequelize,
  }
);

module.exports = Stamp;
