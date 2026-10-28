
document.addEventListener("DOMContentLoaded", () => {
  const slides = [...document.querySelectorAll(".page-slide")];
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const dots = [...document.querySelectorAll(".slide-dot")];
  const prevButton = document.getElementById("prevSlide");
  const nextButton = document.getElementById("nextSlide");

  let currentSlide = 0;

  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        Number(link.dataset.slide) === currentSlide
      );
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });

    history.replaceState(null, "", "#" + slides[currentSlide].id);
  }

  document.querySelectorAll("[data-slide]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showSlide(Number(link.dataset.slide));
    });
  });

  document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => {
      showSlide(Number(button.dataset.go));
    });
  });

  prevButton.addEventListener("click", () => {
    showSlide(currentSlide - 1);
  });

  nextButton.addEventListener("click", () => {
    showSlide(currentSlide + 1);
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.target.matches("input, textarea, select") ||
      event.altKey || event.ctrlKey || event.metaKey
    ) return;

    if (event.key === "ArrowRight") showSlide(currentSlide + 1);
    if (event.key === "ArrowLeft") showSlide(currentSlide - 1);
  });

  const initialId = location.hash.slice(1);
  const initialIndex = slides.findIndex((slide) => slide.id === initialId);
  showSlide(initialIndex >= 0 ? initialIndex : 0);
});
