const express = require("express");
const router = express.Router();
const { LogoPhoto } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const logoPhotos = await LogoPhoto.findAll();
    res.json(logoPhotos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error occurred", err });
  }
});

module.exports = router;
