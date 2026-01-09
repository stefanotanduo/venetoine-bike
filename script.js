const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');

let index = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;
let interval;

/* ---------- FUNZIONI ---------- */

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  index = (index + 1) % slides.length;
  updateCarousel();
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
}

function startAutoSlide() {
  interval = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
  clearInterval(interval);
}

/* ---------- AUTO ---------- */

startAutoSlide();

/* ---------- TOUCH EVENTS ---------- */

track.addEventListener('touchstart', (e) => {
  stopAutoSlide();
  startX = e.touches[0].clientX;
  isDragging = true;
});

track.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  currentX = e.touches[0].clientX;
});

track.addEventListener('touchend', () => {
  if (!isDragging) return;

  const diff = startX - currentX;

  if (diff > 50) {
    nextSlide();      // swipe left
  } else if (diff < -50) {
    prevSlide();      // swipe right
  }

  isDragging = false;
  startAutoSlide();
});
