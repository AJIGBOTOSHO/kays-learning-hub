
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. WHATSAPP CONFIGURATION
    // =====================================

    const WA_NUMBER = "2348129663415";

    function buildWhatsAppLink(topic = "") {

        const baseMessage =
            "Hello Kay's Learning Hub, I am interested in Mathematics tutoring for my child.";

        const context = topic
            ? ` Specifically, I would like more information about ${topic} and lesson arrangements.`
            : " Please provide more information about your lessons and arrangements.";

        const message = baseMessage + context;

        return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    }

    document.querySelectorAll("a[data-wa-topic]").forEach(function (link) {

        const topic = link.dataset.waTopic;

        link.href = buildWhatsAppLink(topic);

        link.target = "_blank";
        link.rel = "noopener noreferrer";

    });


    // =====================================
    // 2. MOBILE NAVIGATION
    // =====================================

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navbar = document.querySelector(".navbar");

    if (!menuToggle || !navLinks || !navbar) {
        return;
    }

    function toggleMenu(isOpen) {

        navLinks.classList.toggle("active", isOpen);

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "×" : "☰";

    }


    // Ensure the menu starts closed
    toggleMenu(false);


    // Toggle menu button
    menuToggle.addEventListener("click", function () {

        const isOpen = navLinks.classList.contains("active");

        toggleMenu(!isOpen);

    });


    // Close menu after selecting a navigation link
    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            toggleMenu(false);

        });

    });


    // Close menu when clicking outside the navigation
    document.addEventListener("click", function (event) {

        if (
            navLinks.classList.contains("active") &&
            !navbar.contains(event.target)
        ) {

            toggleMenu(false);

        }

    });


    // Close menu with Escape key
    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            navLinks.classList.contains("active")
        ) {

            toggleMenu(false);
            menuToggle.focus();

        }

    });


    // Reset navigation when switching to desktop width
    window.addEventListener("resize", function () {

        if (window.innerWidth > 768) {

            toggleMenu(false);

        }

    });

});
