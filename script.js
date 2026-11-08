
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
   4. CONTACT FORM VALIDATION
========================= */

// Select the contact form
const contactForm = document.querySelector("#contact-form");

if (contactForm) {

    // Select form fields
    const nameInput = document.querySelector("#contact-name");
    const emailInput = document.querySelector("#contact-email");
    const subjectInput = document.querySelector("#contact-subject");
    const messageInput = document.querySelector("#contact-message");

    // Select feedback message
    const formStatus = document.querySelector("#form-status");


    // Listen for form submission

    contactForm.addEventListener("submit", (event) => {

        // Prevent normal form submission
        event.preventDefault();


        // Check HTML form validation
        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();

            return;

        }


        // Retrieve and clean input values

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();


        // Check for empty or whitespace-only fields

        if (!name || !email || !subject || !message) {

            formStatus.textContent =
                "Please complete all fields before submitting.";

            return;

        }


        // Prepare the email subject and message

        const emailSubject = encodeURIComponent(subject);

        const emailBody = encodeURIComponent(
            `Hello Gabriel,

${message}

Name: ${name}
Email: ${email}`
        );


        // Create the email link

        const mailtoLink =
            `mailto:oisamojegabriel@gmail.com?subject=${emailSubject}&body=${emailBody}`;


        // Display feedback

        formStatus.textContent =
            "Your email application should open with your message. Please review and send it there.";


        // Open the visitor's email application

        // Prepare Gmail compose URL
const gmailComposeUrl = new URL(
    "https://mail.google.com/mail/"
);

gmailComposeUrl.search = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: "oisamojegabriel@gmail.com",
    su: subject,
    body: `Hello Gabriel,

${message}

Name: ${name}
Email: ${email}`
}).toString();

// Open Gmail in a new tab
window.open(
    gmailComposeUrl.toString(),
    "_blank"
);

    });

}
