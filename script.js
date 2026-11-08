
/* =========================
   1. PROJECT FILTERS
========================== */

// Select all filter buttons
const filterButtons = document.querySelectorAll(".project-filter");

// Select all project cards
const projectCards = document.querySelectorAll(".project-card");


// Add click event to each filter button

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Get the selected category
        const selectedFilter = button.dataset.filter;


        // Loop through all project cards

        projectCards.forEach(card => {

            // Get the category of the current card
            const cardCategory = card.dataset.category;

            // Decide whether the card should be visible
            const shouldShow =
                selectedFilter === "all" ||
                selectedFilter === cardCategory;

            // Show or hide the card
            card.hidden = !shouldShow;

        });


        // Update the active filter button

        filterButtons.forEach(filterButton => {

            const isActive = filterButton === button;

            filterButton.classList.toggle("active", isActive);

            filterButton.setAttribute(
                "aria-pressed",
                String(isActive)
            );

        });

    });

});