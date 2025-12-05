// core.js - handles all new restaurant entries and modal interactions on index.html

/* --- DOM ELEMENTS --- */
// MODAL ELEMENTS
const addEntryModal = document.getElementById("add-entry-modal");
const addEntryButton = document.getElementById("add-entry-btn");
const addModalClose = document.getElementById("add-modal-close");

// RATING DISPLAY
const ratingInput = document.getElementById("entry-rating");
const ratingValue = document.getElementById("rating-value");

// DATE DEFAULT
const dateInput = document.getElementById("entry-date");
const today = new Date().toISOString().split("T")[0];
dateInput.value = today;

// FORM
const restaurantForm = document.getElementById("restaurant-form");

// EVENT LISTENER FOR OPENING ADD REVIEW MODAL WITH AUTHORIZATION CHECK
addEntryButton.addEventListener("click", () => {
  const verification = prompt("Enter access code to add a review");
  if (verification === "jakob" || verification === "Jakob") {
    addEntryModal.classList.remove("hidden");
  } else {
    alert("Incorrect code");
  }
});

// CLOSE MODAL
addModalClose.addEventListener("click", () => {
  addEntryModal.classList.add("hidden");
});

// UPDATE RATING DISPLAY ON INPUT
ratingInput.addEventListener("input", () => {
  ratingValue.textContent = ratingInput.value;
});
ratingValue.textContent = ratingValue.value || "3";

// FORM SUBMISSION HANDLER
restaurantForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newEntry = {
    name: document.getElementById("entry-name").value,
    category: document.getElementById("entry-category").value,
    date: document.getElementById("entry-date").value || today,
    notes: document.getElementById("entry-notes").value,
    price: document.getElementById("entry-price").value,
    rating: document.getElementById("entry-rating").value,
  };

  // LOAD, ADD & SAVE ENTRIES (IN LOCAL STORAGE)
  const entries = JSON.parse(localStorage.getItem("restaurantEntries")) || [];
  entries.push(newEntry);
  localStorage.setItem("restaurantEntries", JSON.stringify(entries));

  // HIDE MODAL AND RESET FORM AFTER SAVING
  addEntryModal.classList.add("hidden");
  restaurantForm.reset();
  dateInput.value = today;
  ratingValue.textContent = "3";

  console.log("Entry saved", newEntry); // Debug log in console
});
