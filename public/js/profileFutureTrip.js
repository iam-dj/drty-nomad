const StampsPageBtn = document.querySelector("#profile-page-btn");
const kayakWidgetBtn = document.querySelector("#kayak-btn");

const futureTripUploadPhotoBtn = document.querySelector(
  "#add-future-trip-photo-btn"
);
//function for prompting the create new "future destination/trip" route
const NewFutureDestinationFormHandler = async (event) => {
  event.preventDefault();

  const future_destination_name = document
    .querySelector("#future-trip-name")
    .value.trim();
  const when_toGo_notes = document
    .querySelector("#future-trip-date")
    .value.trim();
  const stay_in_hotel = document
    .querySelector("#future-trip-hotel-check")
    .value.trim();
  const howLong_notes = document
    .querySelector("#future-trip-length")
    .value.trim();
  // let photo = "";
  const whyGo_notes = document.querySelector("#future-trip-desc").value.trim();

  const future_destination_photo_url = futureTripPicUploadUrl;
  // Get the uploaded photo URL

  if (
    future_destination_name &&
    whyGo_notes &&
    future_destination_photo_url &&
    when_toGo_notes &&
    stay_in_hotel &&
    howLong_notes
  ) {
    const response = await fetch(`/api/futuretrips`, {
      method: "POST",
      body: JSON.stringify({
        future_destination_name,
        howLong_notes,
        whyGo_notes,
        when_toGo_notes,
        stay_in_hotel,
        future_destination_photo_url,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/plannedtrips");
    } else {
      console.log("Failed to create future Trip!");
    }
  }
};

let futureTripPicUploadUrl = "";
const myWidgetFutureTrip = cloudinary.createUploadWidget(
  {
    cloudName: "duaznt4wg",
    uploadPreset: "drty_nomads_upload",
    sources: ["unsplash"],
    showAdvancedOptions: true,
    cropping: true,
    multiple: false,
    defaultSource: "local",
    styles: {
      palette: {
        window: "#40216F",
        sourceBg: "#FFFFFF",
        windowBorder: "#8228C1",
        tabIcon: "#E95D12",
        inactiveTabIcon: "#ECECEC",
        menuIcons: "#555a5f",
        link: "#E95D12",
        action: "#339933",
        inProgress: "#0433ff",
        complete: "#339933",
        error: "#cc0000",
        textDark: "#E95D12",
        textLight: "#fcfffd",
      },
      fonts: {
        default: null,
        "sans-serif": {
          url: null,
          active: true,
        },
      },
    },
  },
  (err, result) => {
    if (!err && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      futureTripPicUploadUrl = result.info.url;
      console.log("uploaded-pic-URL", futureTripPicUploadUrl);
      toastMsgFutureTrips();
    }
  }
);

function toastMsgFutureTrips() {
  const toastEl = document.querySelector('#future-trips-toast');
  const toastInstance = new bootstrap.Toast(toastEl);
  toastInstance.show();
}
futureTripUploadPhotoBtn.addEventListener("click", function () {
  myWidgetFutureTrip.open();
});

// Function to show/hide new future trip form
//this will hide the new future trip form unless the button is hit
let p = 0;
const showFutureTripForm = () => {
  if (p == 0) {
    newFutureTripFormContainer.style.display = "block";
    p++;
  } else {
    newFutureTripFormContainer.style.display = "none";
    p--;
  }
};
const newFutureTripFormContainer = document.querySelector(
  "#new-future-trip-form-container"
);
const newFutureTripBtn = document.querySelector("#new-future-trip-btn");
newFutureTripBtn.addEventListener("click", showFutureTripForm);

document
  .querySelector(".new-future-trip-form")
  .addEventListener("submit", NewFutureDestinationFormHandler);

//google maps autocomplete for new stamps from google maps API
async function initMap() {
  const img = document.getElementById("ac-img");
  console.log("maps init!");
  const el = document.getElementById("project-name");
  const element = document.getElementById("future-trip-name");
  const options = {
    types: ["locality", "country", "administrative_area_level_1"],
  };
  const autocomplete = new google.maps.places.Autocomplete(el, options);
  const autocomplete2 = new google.maps.places.Autocomplete(element, options);

  // Adds pictures
  // autocomplete.addListener("place_changed", (c) => {
  //   const place = autocomplete.getPlace();
  //   if (place.photos.length > 0) {
  //     const url = place.photos[0].getUrl({
  //       maxWidth: 800,
  //       maxHeight: 400,
  //     });
  //     img.removeAttribute("hidden");
  //     img.setAttribute("src", url);
  //     console.log(url);
  //   }
  // });
}

StampsPageBtn.addEventListener("click", function () {
  document.location.replace("/profile");
});

// const kayakWrapperContainer = document.querySelector(
//   "#kayak-wrapper-container"
// );
// const kayakWrapperContainerBtn = document.querySelector("#kayak-container");
// kayakWrapperContainerBtn.addEventListener("click", showKayakWidget);
// let j = 0;
// const showKayakWidget = () => {
//   if (j == 0) {
//     kayakWrapperContainer.style.display = "block";
//     j++;
//   } else {
//     kayakWrapperContainer.style.display = "none";
//     j--;
//   }
// };

KAYAK.embed({
  container: document.getElementById("kayakSearchWidgetContainer"),
  hostname: "www.kayak.com",
  autoPosition: true,
  defaultProduct: "hotels",
  enabledProducts: ["hotels", "flights"],
  ssl: true,
  affiliateId: "acme_corp",
  isInternalLoad: false,
  lc: "en",
  cc: "us",
  mc: "EUR",
});

const deletebtn = document.querySelectorAll("[data-id]");
deletebtn.forEach((button) => {
  button.addEventListener("click", async (event) => {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/futuretrips/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/plannedtrips");
    } else {
      console.log(response.status);
      alert("Failed to delete Trip Plan");
    }
  });
});
