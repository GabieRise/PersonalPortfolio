
/* =========================
   1. MOBILE NAVIGATION
========================= */

// Select the hamburger button
const menuButton = document.querySelector(".menu-button");

// Select the navigation menu
const navLinks = document.querySelector("#primary-navigation");


// Function to open or close the menu

function setMenuOpen(isOpen) {

    // Add or remove the open class
    navLinks.classList.toggle("is-open", isOpen);

    // Update accessibility information
    menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

}


// Check that both elements exist

if (menuButton && navLinks) {

    // Open or close menu when hamburger is clicked

    menuButton.addEventListener("click", () => {

        const isOpen =
            menuButton.getAttribute("aria-expanded") === "true";

        setMenuOpen(!isOpen);

    });


    // Close menu when a navigation link is selected

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            setMenuOpen(false);

        });

    });


    // Close menu when user clicks outside

    document.addEventListener("click", event => {

        if (
            !menuButton.contains(event.target) &&
            !navLinks.contains(event.target)
        ) {

            setMenuOpen(false);

        }

    });


    // Close menu when Escape is pressed

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            setMenuOpen(false);

            menuButton.focus();

        }

    });

}

/* =========================
   2. DARK AND LIGHT THEME
========================= */

// Select the theme button
const themeToggle = document.querySelector(".theme-toggle");

// Select the theme icon
const themeIcon = document.querySelector(".theme-icon");


// Function to apply the selected theme

function applyTheme(theme) {

    const isDark = theme === "dark";

    // Add or remove dark-theme class
    document.body.classList.toggle("dark-theme", isDark);

    // Update button accessibility information
    themeToggle.setAttribute(
        "aria-pressed",
        String(isDark)
    );

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
    );

    // Change the icon
    themeIcon.textContent = isDark ? "☀️" : "🌙";

}


// Check whether saved theme exists

if (themeToggle && themeIcon) {

    const savedTheme = localStorage.getItem("gabierise-theme");

    // Apply saved preference, or use light theme
    applyTheme(savedTheme === "dark" ? "dark" : "light");


    // Listen for theme button clicks

    themeToggle.addEventListener("click", () => {

        const isDark =
            document.body.classList.contains("dark-theme");

        const newTheme = isDark ? "light" : "dark";

        // Apply the new theme
        applyTheme(newTheme);

        // Remember the visitor's preference
        localStorage.setItem("gabierise-theme", newTheme);

    });

}

/* =========================
   3. PROJECT FILTERS
========================= */

// Select all filter buttons
const filterButtons = document.querySelectorAll(".project-filter");

// Select all project cards
const projectCards = document.querySelectorAll(".project-card");

// Check that the elements exist
if (filterButtons.length > 0 && projectCards.length > 0) {

    // Add a click event to each filter button
    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            // Get the selected filter category
            const selectedFilter = button.dataset.filter;

            // Loop through every project card
            projectCards.forEach(card => {

                // Get the card's category
                const cardCategory = card.dataset.category;

                // Check whether the card should be displayed
                const shouldShow =
                    selectedFilter === "all" ||
                    selectedFilter === cardCategory;

                // Show or hide the card
                card.hidden = !shouldShow;

            });

            // Update the active button
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

}

/* =========================
   4. FORMSPREE CONTACT FORM
========================= */

// Select the contact form
const contactForm = document.querySelector("#contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", () => {

        // Clear previous status styles
        const successMessage =
            document.querySelector("[data-fs-success]");

        const errorMessage =
            document.querySelector("[data-fs-error]");

        if (successMessage) {
            successMessage.classList.remove("is-visible");
        }

        if (errorMessage) {
            errorMessage.classList.remove("is-visible");
        }

    });

}