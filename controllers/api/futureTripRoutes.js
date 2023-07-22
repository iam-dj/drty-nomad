const express = require("express");
const router = express.Router();
const { Stamp, User, Photo, Place, FutureTrip } = require("../../models");

//insomnia test route so it doesnt interfere with working routes (need to comment it out when working with live page)
router.get("/", async (req, res) => {
  try {
    const futureTrips = await FutureTrip.findAll();
    res.json(futureTrips);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error occurred", err });
  }
});

router.post("/", async (req, res) => {
  if (!req.session.logged_in) {
    return res
      .status(403)
      .json({ msg: "Login before adding a future destination!" });
  }
  try {
    const newFutureTrip = await FutureTrip.create({
      // ...req.body,
      ...req.body,
      //add image url here?
      UserId: req.session.user_id,
      // UserId: req.session.user_id,
    });

    res.status(200).json(newFutureTrip);
  } catch (err) {
    res.status(400).json(err);
  }
});

// test routes for adding like
// router.put("/:id/like", (req, res) => {
//   FutureTrip.findOne({ where: { id: req.params.id } }).then((data) => {
//     const FutureTripData = data;
//     FutureTrip.update(
//       { likes: FutureTripData.likes + 1 },
//       { where: { id: req.params.id } }
//     )
//       .then((data) => {
//         res.json({ message: "Likes updated!" });
//       })
//       .catch((err) => {
//         console.log(err);
//         res
//           .status(500)
//           .json({ msg: "invalid syntax hence ,error occurred", err });
//       });
//   });
// });

router.get("/:id/", (req, res) => {
  FutureTrip.findOne({ where: { id: req.params.id } }).then((data) => {
    res.json(data);
  });
});

router.get("/", async (req, res) => {
  try {
    const dbFutureTripData = await FutureTrip.findAll({
      where: { UserId: req.session.user_id },
      include: [
        { model: User, attributes: ["first_name", "last_name", "profile_pic"] },
      ],
    });

    const futureTrips = dbFutureTripData.map((futureTrip) =>
      futureTrip.get({ plain: true })
    );

    res.render("profile", { futureTrips, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//     const stamps = dbStampData.map((stamp) => stamp.get({ plain: true }));

//     res.render("profile", { stamps, loggedIn: true });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.delete("/:id", async (req, res) => {
  if (!req.session.logged_in) {
    return res
      .status(403)
      .json({ msg: "Login before deleting a future trip!" });
  }
  try {
    const projectData = await FutureTrip.destroy({
      where: {
        id: req.params.id,
        UserId: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: "No future trip found with this id!" });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.put("/:id", (req, res) => {
//   FutureTrip.update({destination_name: req.body.destination_name, destination_notes:req.body.destination_notes},
//     {where: {id: req.params.id}}).then(data=>{
//     res.json(data);
//   }).catch(err=>{
//     console.log(err);
//     res.status(500).json({msg:"invalid syntax hence ,error occurred",err})
//   })
// })

//test route for looking at seeds (we can comment out at any  time)
// router.get("/", (req, res) => {
//   FutureTrip.findAll({
//     include: [{model:Place}],
//     include: [{model:User}],
//     include: [{model:Photo}],
//     include: [{model:Stamp}],

//   })
//     .then((stamps) => {
//       res.json(stamps);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ msg: "error occurred", err });
//     });
// });

module.exports = router;
