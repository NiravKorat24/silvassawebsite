let currentIndex = 0;
let autoSlideInterval;
let touchStartX = 0;

/* =========================================
   LOAD PROPERTIES
========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("propertyTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!track) return;

  fetch("sites.json")
    .then(res => res.json())
    .then(data => {
      track.innerHTML = data.map(site => `
        <div class="property-card">
  <div class="property-card-inner">
    <img src="${site.image}" alt="${site.name}">
    <div class="content">
      <h3>${site.name}</h3>
      <p>${site.size}</p>
      <p>${site.location}</p>
      <a href="site.html?id=${site.id}">View</a>
    </div>
  </div>
</div>

      `).join("");

      createDots(data.length);
      startAutoSlide();
    });

  prevBtn.addEventListener("click", slidePrev);
  nextBtn.addEventListener("click", slideNext);
});

/* =========================================
   SLIDER CORE
========================================= */
function updateSlider() {
  const track = document.getElementById("propertyTrack");
  if (!track) return;

  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateDots();
}

function slidePrev() {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
}

function slideNext() {
  const track = document.getElementById("propertyTrack");
  if (!track) return;

  const total = track.children.length;
  if (currentIndex < total - 1) {
    currentIndex++;
    updateSlider();
  }
}

/* =========================================
   AUTO SLIDE
========================================= */
function startAutoSlide() {
  clearInterval(autoSlideInterval);

  autoSlideInterval = setInterval(() => {
    const track = document.getElementById("propertyTrack");
    if (!track) return;

    const total = track.children.length;
    currentIndex = (currentIndex + 1) % total;
    updateSlider();
  }, 4000);
}

/* =========================================
   DOTS
========================================= */
function createDots(count) {
  const dots = document.getElementById("sliderDots");
  dots.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    if (i === 0) span.classList.add("active");
    dots.appendChild(span);
  }
}

function updateDots() {
  const dots = document.querySelectorAll("#sliderDots span");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

/* =========================================
   TOUCH / SWIPE (MOBILE)
========================================= */
document.addEventListener("touchstart", e => {
  const slider = e.target.closest(".slider");
  if (!slider) return;
  touchStartX = e.touches[0].clientX;
  clearInterval(autoSlideInterval);
}, { passive: true });

document.addEventListener("touchend", e => {
  const slider = e.target.closest(".slider");
  if (!slider) return;

  const diff = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(diff) > 50) diff < 0 ? slideNext() : slidePrev();
  startAutoSlide();
}, { passive: true });

/* =========================================
   VALUATION MODAL
========================================= */
function openValuationModal() {
  document.getElementById("valuationModal").style.display = "flex";
}

function closeValuationModal() {
  document.getElementById("valuationModal").style.display = "none";
}

function submitValuation() {
  const msg = encodeURIComponent(
    `Hello Silvassa Group,%0AName: ${valName.value}%0APhone: ${valPhone.value}%0ALocation: ${valLocation.value}%0ADetails: ${valDetails.value}`
  );

  window.open(`https://wa.me/919090129012?text=${msg}`, "_blank");
  closeValuationModal();
}
