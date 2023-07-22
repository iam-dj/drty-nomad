const sequelize = require("../config/connection");
const {
  User,
  Stamp,
  Place,
  Photo,
  FutureTrip,
  LogoPhoto,
} = require("../models");
const photoData = require("./photo-seeds.json");
const placeData = require("./place-seeds.json");
const userData = require("./user-seeds.json");
const stampData = require("./stamp-seeds.json");
const futureTripData = require("./futureTrip-seeds.json");
const logoPhotoData = require("./logo-photos.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    await Stamp.bulkCreate(stampData);

    await Photo.bulkCreate(photoData);

    await Place.bulkCreate(placeData);

    await FutureTrip.bulkCreate(futureTripData);

    await LogoPhoto.bulkCreate(logoPhotoData);

    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

seedDatabase();
