//we'll need to connect this file once our connect file structure is in place
require("dotenv").config;
const cloudinary = require("cloudinary");
const { Place, Stamp, Photo, User } = require("../models");
//use the .env file to refrence for security purposes eventually - cloud_name and api_key are public so it doesnt matter too much for those, but api_secret DEFINITELY needs to be protected.
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// this creates the widget
const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "duaznt4wg",
    uploadPreset: "drty_nomads_upload",
    sources: ["local", "url", "facebook", "instagram", "google_drive"],
    multiple: true,
    maxfiles: 5,
    styles: {
      palette: {
        window: "#B55419",
        windowBorder: "#66350F",
        tabIcon: "#7519B5",
        menuIcons: "#7519B5",
        textDark: "#FFFFF",
        textLight: "#00000",
        link: "#0078FF",
        action: "#FF620C",
        inactiveTabIcon: "#0E2F5A",
        error: "#F44235",
        inProgress: "#0078FF",
        complete: "#20B832",
        sourceBg: "#E4EBF1",
      },
      frame: {
        background: "#7519B5",
      },
      fonts: {
        "'Cute Font', cursive":
          "https://fonts.googleapis.com/css?family=Cute+Font",
      },
    },
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      document
        .getElementById("uploadedimage")
        .setAttribute("src", result.info.secure_url);
    }
  }
);
// we only get limited amounts of uploads/month - so try and not upload too many photos in the testing process!

// refer to this page to see who the different JSON info i sapplied: https://cloudinary.com/documentation/upload_widget#look_and_feel_customization

// play around with colors in the "palette" object key to change widget colors in this website https://codesandbox.io/s/vanilla-vanilla i tried to match them to our scheme

//this actually runs/renders the widget on click of a button - we'll attach this too a button I assume on create stamp or something
document.getElementById("upload_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);

//needs to create a new photo
//needs to tie that photo to a stamp
//needs to render the photo on the page in given stamp id
router.post("/", (req, res) => {
  Photo.create({
    photo_url: req.body.photo_url,
  })
    .then((newPhoto) => {
      res.json(newPhoto);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    });
});
