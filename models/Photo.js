const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Photo extends Model {}

Photo.init(
  {
    // **id will auto generate
    photo_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    //**Foreign Key for stamp_id will automatically generate
  },
  {
    sequelize,
  }
);

module.exports = Photo;
