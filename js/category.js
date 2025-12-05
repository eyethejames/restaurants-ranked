// category.js - Handles category page: loading, sorting, rendering review-cards and modals

// GET CATEGORY FROM URL PARAMETERS
const params = new URLSearchParams(window.location.search);
const category = params.get("type");

// UPDATE HEADER TITLE
const categoryTitle = document.getElementById("category-title");
categoryTitle.textContent =
  category.charAt(0).toUpperCase() + category.slice(1);

// GET ELEMENTS SORTED BY RATING
const sortRating = document.getElementById("sort-rating");

// LOAD AND FILTER ENTRIES (FROM LOCAL STORAGE)
const allEntries = JSON.parse(
  localStorage.getItem("restaurantEntries") || "[]"
);
const filteredEntries = allEntries.filter(
  (entry) => entry.category === category
);

// FUNCTION TO GET SORTED LIST
function sortedEntries() {
  let entries = [...filteredEntries]; // Copy array for safety

  const ratingOrder = sortRating.value;
  if (ratingOrder === "") {
    return entries;
  } else if (ratingOrder !== "") {
    entries.sort((a, b) => {
      const ratingA = parseFloat(a.rating);
      const ratingB = parseFloat(b.rating);
      return ratingOrder === "highest" ? ratingB - ratingA : ratingA - ratingB;
    });
  }
  return entries;
}

// FUNCTION TO RENDER ENTRIES
function renderEntries(entriesToRender) {
  const container = document.getElementById("category-entries");
  container.innerHTML = "";

  if (entriesToRender.length === 0) {
    container.innerHTML = "<p>No entries yet</p>";
    return;
  }

  entriesToRender.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("entry-card");
    card.textContent = element.name + " [" + element.rating + "]";

    // OPEN MODAL
    card.addEventListener("click", () => {
      document.getElementById("modal-name").textContent = element.name;
      document.getElementById("modal-rating").textContent =
        element.rating + " ✯";
      document.getElementById("modal-date").textContent =
        element.date || "No date";
      document.getElementById("modal-notes").textContent =
        element.notes || "No notes";
      document.getElementById("modal-price").textContent = element.price
        ? `€${element.price}`
        : "No price";
      document.getElementById("entry-modal").classList.remove("hidden");
    });

    container.appendChild(card);
  });
}

// INITIAL RENDER (SORTED BY ENTRY DATE AS DEFAULT)
renderEntries(sortedEntries());

// SORT CHANGE LISTENER
sortRating.addEventListener("change", () => renderEntries(sortedEntries()));

// CLOSE MODAL
const modalClose = document.getElementById("modal-close");
const modal = document.getElementById("entry-modal");
modalClose.addEventListener("click", () => {
  modal.classList.add("hidden");
});
