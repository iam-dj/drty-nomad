const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class LogoPhoto extends Model {}

LogoPhoto.init(
  {
    // **id will auto generate
    logo_photo_url: {
      type: DataTypes.STRING,
    },
    //**Foreign Key for stamp_id will automatically generate
  },
  {
    sequelize,
  }
);

module.exports = LogoPhoto;
