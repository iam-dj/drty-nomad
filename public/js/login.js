const aboutMeInput = document.querySelector("#about_me-signup");

aboutMeInput.addEventListener("input", () => {
  const maxLength = 80;
  if (aboutMeInput.value.length > maxLength) {
    aboutMeInput.value = aboutMeInput.value.slice(0, maxLength);
  }
});

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/profile");
    } else {
      console.log(await response.text());
    }
  }
};




function toastMsgFail(){
  const toastEl = document.querySelector('#fail-login-toast');
  const toastInstance = new bootstrap.Toast(toastEl);
  toastInstance.show();
}

let profilePicUploadUrl = "";

const signupFormHandler = async (event) => {
  event.preventDefault();

  const first_name = document.querySelector("#first_name-signup").value.trim();
  const last_name = document.querySelector("#last_name-signup").value.trim();
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const user_age = document.querySelector("#user_age-signup").value.trim();
  const user_home = document.querySelector("#user_home-signup").value.trim();
  const about_me = document.querySelector("#about_me-signup").value.trim();
  const profile_pic = profilePicUploadUrl;

  if (
    first_name &&
    username &&
    password &&
    user_age &&
    user_home &&
    about_me &&
    profile_pic
  ) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        first_name,
        last_name,
        username,
        password,
        profile_pic,
        user_age,
        user_home,
        about_me,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
      // document.location.replace('/stamps');
    } else {
      toastMsgPassword();
      console.log(await response.text());
    }
  }
};

function toastMsgPassword() {
  const toastEl = document.querySelector('#fail-password-len-toast');
  const toastInstance = new bootstrap.Toast(toastEl);
  toastInstance.show();
}

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);

// Function to handle photo upload
const profilePicBtn = document.querySelector("#profile-pic-btn");
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
      profilePicUploadUrl = result.info.url;
      console.log("uploaded-pic-URL", profilePicUploadUrl);
      toastMsg();
      document.getElementById("profile-pic-btn");
    }
  }
);

function toastMsg(){
  const toastEl = document.querySelector('#login-toast');
  const toastInstance = new bootstrap.Toast(toastEl);
  toastInstance.show();
}



profilePicBtn.addEventListener("click", function () {
  myWidget.open();
});

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
