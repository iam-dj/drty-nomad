const express = require("express");
const router = express.Router();
const { Stamp, User, Photo, Place } = require("../../models");
const withAuth = require("../../utils/auth");
const StampLike = require("../../models/Like");

router.post("/", async (req, res) => {
  if (!req.session.logged_in) {
    return res.status(403).json({ msg: "Login before adding a stamp!" });
  }
  try {
    const newStamp = await Stamp.create({
      // ...req.body,
      ...req.body,
      //add image url here?
      UserId: req.session.user_id,
      // UserId: req.session.user_id,
    });

    res.status(200).json(newStamp);
  } catch (err) {
    res.status(400).json(err);
  }
});

// test routes for adding like 
router.put("/:id/like", withAuth, async (req,res)=>{
  const user_id = req.session.user_id;
  const stamp_id = req.params.id;

  const likeWhereClause = {
    where: {
      UserId: user_id,
      StampId: stamp_id,
    }
  }

  // Check if user has already liked stamp
  const like = await StampLike.findOne(likeWhereClause);
  console.log(like);

  if (like) {
    // If like exists, we should "destroy" it
    await StampLike.destroy(likeWhereClause);
  } else {
    // If like did not exist, create one
    await StampLike.create({
      UserId: user_id,
      StampId: stamp_id,
    })
  }

  const likes = await StampLike.findAll({
    where:{
      StampId: stamp_id,
    }
  });


  res.status(200).json({
    count: likes.length,
  });
})

router.get("/:id/", (req,res)=>{
  Stamp.findOne({where:{id: req.params.id}}).then(data=>{
    res.json(data);
  })
})

 


router.get("/", async (req, res) => {
  try {
    const dbStampData = await Stamp.findAll({
      where: { UserId: req.session.user_id },
      include: [
        { model: User, attributes: ["first_name", "last_name", "profile_pic"] },
      ],
    });

    const stamps = dbStampData.map((stamp) => stamp.get({ plain: true }));

    res.render("profile", { stamps, loggedIn: true });
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
    return res.status(403).json({ msg: "Login before deleting a stamp!" });
  }
  try {
    const projectData = await Stamp.destroy({
      where: {
        id: req.params.id,
        UserId: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.put("/:id", (req, res) => {
//   Stamp.update({destination_name: req.body.destination_name, destination_notes:req.body.destination_notes},
//     {where: {id: req.params.id}}).then(data=>{
//     res.json(data);
//   }).catch(err=>{
//     console.log(err);
//     res.status(500).json({msg:"invalid syntax hence ,error occurred",err})
//   })
// })




//test route for looking at seeds (we can comment out at any  time)
// router.get("/", (req, res) => {
//   Stamp.findAll({
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

router.get("/", async (req, res) => {
  try {
    const stamps = await Stamp.findAll();
    res.json(stamps);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error occurred", err });
  }
});

module.exports = router;
