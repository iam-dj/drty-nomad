// Get the update form and update button elements
const updateForm = document.querySelector(".update-form");
const updateBtn = document.querySelector("#updateBtn");

const updateButtons = document.querySelectorAll("[data-stamp-id]");
updateButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Set the stamp's id as a data attribute on the "Update" button in the modal
    const stampId = event.target.getAttribute("data-stamp-id");
    const updateBtn = document.querySelector("#updateBtn");
    updateBtn.setAttribute("stamp-id", stampId);
  });
});

//

const updateFormHandler = async (event) => {
  event.preventDefault();

  // Get the id of the stamp to update
  const stampId = document.querySelector("#updateBtn").getAttribute("stamp-id");

  // Get the new notes from the form
  const notes = document.querySelector("#notes-update").value.trim();
  console.log(notes);
  console.log(stampId);
  // Make the PUT request to update the stamp
  const response = await fetch(`/stamps/${stampId}`, {
    method: "PUT",
    body: JSON.stringify({ notes }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    // If successful, redirect the browser to the profile page
    document.location.replace("/profile");
  } else {
    console.log("Failed to update stamp");
  }
};

// Add an event listener to the update form submit button
updateForm.addEventListener("submit", updateFormHandler);


