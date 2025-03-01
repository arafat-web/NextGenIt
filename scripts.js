// Initialize document when loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    once: true,
  });

  // Initialize custom cursor
  initCustomCursor();
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

// Custom cursor functionality
function initCustomCursor() {
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");

  if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", function (e) {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;
      cursorDot.style.opacity = "1";

      cursorOutline.style.left = `${posX - 15}px`;
      cursorOutline.style.top = `${posY - 15}px`;
      cursorOutline.style.opacity = "1";
    });

    window.addEventListener("mouseout", function () {
      cursorDot.style.opacity = "0";
      cursorOutline.style.opacity = "0";
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .nav-link, .feature-card"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseover", () => {
        cursorOutline.style.transform = "scale(1.5)";
      });
      el.addEventListener("mouseout", () => {
        cursorOutline.style.transform = "scale(1)";
      });
    });
  }
}

// Animate statistics numbers
function animateStats() {
  const stats = document.querySelectorAll(".stats-number");
  stats.forEach((stat) => {
    const target = parseInt(stat.getAttribute("data-target"));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        stat.textContent = Math.ceil(current);
        setTimeout(updateCounter, 10);
      } else {
        stat.textContent = target;
      }
    };

    updateCounter();
  });
}

// Intersection Observer for stats section
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateStats();
      observer.unobserve(entry.target);
    }
  });
});

// Observe stats section if it exists
const statsSection = document.querySelector(".stats-card");
if (statsSection) {
  observer.observe(statsSection);
}

// Handle video modal closing
const videoModals = document.querySelectorAll(".modal");
videoModals.forEach((modal) => {
  modal.addEventListener("hidden.bs.modal", function () {
    const iframe = this.querySelector("iframe");
    if (iframe) {
      const videoSrc = iframe.src;
      iframe.src = videoSrc;
    }
  });
});

// Contact Form Handling
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError("Please enter a valid email address");
      return;
    }

    // Simulate form submission
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML =
      '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

    // Simulate API call
    setTimeout(() => {
      // Reset form
      e.target.reset();
      submitButton.disabled = false;
      submitButton.innerHTML = "Send Message";

      // Show success message
      showSuccess();

      // Log form data
      console.log({
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
        user: "arafat-web",
      });
    }, 2000);
  });
}

// Show success message
function showSuccess() {
  const successMessage = document.getElementById("successMessage");
  if (successMessage) {
    successMessage.style.display = "block";
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 5000);
  }
}

// Show error message
function showError(message) {
  const errorMessage = document.getElementById("errorMessage");
  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 5000);
  }
}

