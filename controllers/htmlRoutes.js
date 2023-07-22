const router = require("express").Router();
const {
  User,
  Stamp,
  Place,
  Photo,
  FutureTrip,
  LogoPhoto,
} = require("../models");
const withAuth = require("../utils/auth");
const StampLike = require("../models/Like");

router.get("/", async (req, res) => {
  try {
    // Pass serialized data and session flag into template
    res.render("logohome", {
      // projects,
      logged_in: req.session.logged_in,
      account_deleted: req.query.account_deleted,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/settings", withAuth, async (req, res) => {
  const user = await User.findByPk(req.session.user_id);
  res.render("settings", {
    logged: true,
    user: user,
  });
});

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["name", "ASC"]],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render("logohome", {
      // projects,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/profile", withAuth, async (req, res) => {
//   try {
//     const dbFutureTripData = await FutureTrip.findByPk(req.session.user_id);
//     console.log(dbFutureTripData);
//     res.render("profile", {
//       future_destination_photo_url: dbFutureTripData.Photos,
//       future_destination_name: dbFutureTripData.future_destination_name,
//       whyGo_notes: dbFutureTripData.whyGo_notes,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// router.get("/", async (req, res) => {
//     try {
//         const userData = await User.findAll({
//       attributes: { exclude: ["password"] },
//       include: [
//         {
//           model: Stamp,
//           include: [Place, Photo],
//         },
//       ],
//       order: [["name", "ASC"]],
//     });

//     const users = userData.map((project) => project.get({ plain: true }));

//     res.render("logohome", {
//       users,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//       res.status(500).json(err);
//     }
//   });

router.get("/login", async (req, res) => {
  try {
    if (!req.session.logged_in) {
      const dbLogoPhotoData = await LogoPhoto.findAll();
      const photos = dbLogoPhotoData.map((photo) => photo.get({ plain: true }));
      console.log(photos);

      const randomIndex = Math.floor(Math.random() * photos.length);

      const photoUrl = photos[randomIndex].logo_photo_url;
      console.log(photoUrl);
      res.render(`login`, {
        photoUrl,
      });
    } else {
      res.redirect("/profile");
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error occurred", err });
  }
});

//get all users for our homepage
// router.get("/home", async (req, res) => {
//   try {
//     const dbUserData = await User.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ["first_name", "last_name", "profile_pic"],
//           include: [Photo],
//         },
//       ],
//     });

//     const users = dbUserData.map((users) => users.get({ plain: true }));

//     res.render("homepage", {
//       users,
//       loggedIn: req.session.loggedIn,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

//get one user
router.get("/profile", withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Stamp,
          // model: FutureTrip,
          // model: Place,
          // model: Photo,
        },
      ],
    });

    const user = dbUserData.get({ plain: true });
    console.log(user);

    const futureTrip = user.FutureTrips;
    console.log(futureTrip);

    const stamp = user.Stamps;

    const logged = true;

    console.log(stamp);
    // add google maps api key
    res.render(`profile`, {
      user,
      // futureTrip,
      stamp,
      logged,
      mapsApiKey: process.env.MAPS_API_KEY,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/plannedtrips", withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.session.user_id, {
      include: [
        {
          // model: Stamp,
          model: FutureTrip,
          // model: Place,
          // model: Photo,
        },
      ],
    });

    const user = dbUserData.get({ plain: true });
    console.log(user);

    const futureTrip = user.FutureTrips;
    console.log(futureTrip);

    const stamp = user.Stamps;

    const logged = true;

    console.log(stamp);
    // add google maps api key
    res.render(`plannedtrips`, {
      user,
      futureTrip,
      // stamp,
      logged,
      mapsApiKey: process.env.MAPS_API_KEY,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get one user
router.get("/profile", withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.session.user_id);
    res.render("profile", {
      firstName: dbUserData.first_name,
      lastName: dbUserData.last_name,
      country: dbUserData.user_home,
      aboutMe: dbUserData.about_me,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.session.user_id);
    res.render("plannedtrips", {
      firstName: dbUserData.first_name,
      lastName: dbUserData.last_name,
      country: dbUserData.user_home,
      aboutMe: dbUserData.about_me,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/users/:id", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Stamp,
          include: [StampLike],
        }
        ],
    });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userData.get({ plain: true });
    const stamps = user.Stamps;

    console.log(stamps);

    const logged = true;

    res.render("user", {
      user,
      stamps,
      logged,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.session.user_id, {
      include: [Stamp],
    });
    const user = dbUserData.get({ plain: true });
    res.render("profile", {
      firstName: dbUserData.first_name,
      lastName: dbUserData.last_name,
      country: dbUserData.user_home,
      aboutMe: dbUserData.about_me,
      photos: dbUserData.Photos,
      destinationName: dbUserData.destination_name,
      destinationNotes: dbUserData.destination_notes,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const dbStampData = await Stamp.findByPk(req.session.user_id);
    console.log(dbStampData);
    res.render("profile", {
      photos: dbStampData.Photos,
      destinationName: dbStampData.destination_name,
      destinationNotes: dbStampData.destination_notes,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/stamps/:id", withAuth, async (req, res) => {
  try {
    const dbStampData = await Stamp.findByPk(req.params.id, {
      include: [Place, User, Photo, StampLike],
    });

    if (!dbStampData) {
      return res.status(404).json({ message: "Stamp not found" });
    }

    const stamp = dbStampData.get({ plain: true });
    const user = stamp.User;

    logged = true;
    // console.log(stamp);

    res.render("stamps", {
      stamp,
      user,
      logged,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/home", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [Stamp],
    });
    const users = userData.map((user) => user.get({ plain: true }));
    console.log(users);
    const logged = true;

    res.render("homepage", { users, logged, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get("/profile/stamps", async (req, res) => {
//   try {
//     const dbUserData = await Stamp.findAll({
//       include: [
//         {
//           model: Stamp,
//           attributes: ["destination_name" , "destination_notes"],

//         },
//       ],
//     });
//     const stamps = dbUserData.map((users)=> users.get({plain:true}))
//     res.render("profile", {
//       stamps,
//       loggedIn: req.session.loggedIn,
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

//get one stamp
// router.get("/stamp/:id", async (req, res) => {
//   try {
//     const dbStampData = await Stamp.findByPk(req.params.id, {
//       include: [Place],
//       include: [Photo],
//     });

//     const stamp = dbStampData.get({ plain: true });
//     res.render("stamps", { stamp, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.put("/stamps/:id", async (req, res) => {
  if (!req.session.logged_in) {
    return res.status(403).json({ msg: "Login!" });
  }
  try {
    // const { notes } = req.body.destination_notes;
    const updatedStamp = await Stamp.update(
      { destination_notes: req.body.notes },
      { where: { id: req.params.id } }
    );
    if (!updatedStamp) {
      return res.status(404).json({ msg: "Stamp not found" });
    }
    return res.status(200).json(updatedStamp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
