const express = require("express");
const router = express.Router();
const { Place, Stamp, Photo, User } = require("../../models");

//get all places (future dev)
router.get("/", (req, res) => {
  Place.findAll({
    include: [Stamp],
  })
    .then((places) => {
      res.json(places);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    });
});

//get place by ID
router.get("/:id", (req, res) => {
  Place.findByPk(req.params.id, {
    include: [Photo],
    include: [Stamp],
  })
    .then((placesData) => {
      res.json(placesData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    });
});

//create new place (future dev)
router.post("/", (req, res) => {
  Place.create({
    place_name: req.body.name,
    place_sub_region: req.body.sub_region,
    place_language: req.body.language,
  })
    .then((newPlace) => {
      res.json(newPlace);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    });
});

//delete place - it will cascade to stamp as well
router.delete("/:id", (req, res) => {
  Place.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletePlace) => {
      res.json(deletePlace);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    });
});

module.exports = router;
