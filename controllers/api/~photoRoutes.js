const express = require("express");
const router = express.Router();
const { Place, Stamp, Photo, User } = require("../../models");

//test route to get all photos
router.get("/", (req, res) => {
  Photo.findAll({
    include: [Stamp],
  })
    .then((photos) => {
      res.json(photos);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    });
});

module.exports = router;
