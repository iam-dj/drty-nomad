// Function to handle form submission for creating new stamp
const plannedTripsPageBtn = document.querySelector("#plannedtrips-page-btn");
plannedTripsPageBtn.addEventListener("click", function () {
  document.location.replace("/plannedtrips");
});

const newFormHandler = async (event) => {
  event.preventDefault();

  const destination_name = document.querySelector("#project-name").value.trim();
  // let photo = "";
  const destination_notes = document
    .querySelector("#project-desc")
    .value.trim();

  const photo_url = picUploadUrl;
  // Get the uploaded photo URL

  if (destination_name && destination_notes && photo_url) {
    const response = await fetch(`/api/stamps`, {
      method: "POST",
      body: JSON.stringify({ destination_name, photo_url, destination_notes }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      console.log("Failed to create stamp");
    }
  }
};

// Function to handle deletion of stamps
const deleteButtons = document.querySelectorAll("[data-id]");
deleteButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/stamps/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      console.log(response.status);
      console.log("Failed to delete project");
    }
  });
});

let picUploadUrl = "";
// Function to handle photo upload
const uploadPhotoBtn = document.querySelector("#add-photo-btn");
const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "duaznt4wg",
    uploadPreset: "drty_nomads_upload",
    sources: [
      "local",
      "url",
      "camera",
      "image_search",
      "google_drive",
      "facebook",
      "dropbox",
      "instagram",
      "istock",
      "unsplash",
    ],
    googleApiKey: "<image_search_google_api_key>",
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
      picUploadUrl = result.info.url;
      console.log("uploaded-pic-URL", picUploadUrl);
      toastMsg();
    }
  });
function toastMsg(){
  const toastEl = document.querySelector('#share-trip-toast');
  const toastInstance = new bootstrap.Toast(toastEl);
  toastInstance.show();
}

// Show toast for saved settings after the page loads
const params = new URLSearchParams(window.location.search);
const settingsUpdated = params.get('settingsSaved') === 'true';
if (settingsUpdated) {
  document.addEventListener('DOMContentLoaded', () => toastMsgSettings());
}

function toastMsgSettings(){
  const toastEl = document.querySelector('#settings-toast');
  const toastInstance = new bootstrap.Toast(toastEl);
  toastInstance.show();
}


uploadPhotoBtn.addEventListener("click", function () {
  myWidget.open();
});

// Function to show/hide new stamp form
const newStampBtn = document.querySelector("#new-stamp-btn");
const newStampFormContainer = document.querySelector(
  "#new-stamp-form-container"
);
let n = 0;
const showNewStampForm = () => {
  if (n == 0) {
    newStampFormContainer.style.display = "block";
    n++;
  } else {
    newStampFormContainer.style.display = "none";
    n--;
  }
};
newStampBtn.addEventListener("click", showNewStampForm);

// Event listener for form submission
document
  .querySelector(".new-project-form")
  .addEventListener("submit", newFormHandler);

// google maps API
async function initMap() {
  const img = document.getElementById("ac-img");
  console.log("maps init!");
  const el = document.getElementById("project-name");
  const options = {
    types: ["locality", "country", "administrative_area_level_1"],
  };
  const autocomplete = new google.maps.places.Autocomplete(el, options);

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
