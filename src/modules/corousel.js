// File: corousel.js

const setupBannerAutoscroll = () => {
  const carousel = document.querySelector(".corousel");
  if (!carousel) return;

  const banners = carousel.querySelectorAll(".banner-item"); // Perbaikan di sini
  let currentIndex = 0;

  const showNextBanner = () => {
    currentIndex = (currentIndex + 1) % banners.length;
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
  };

  // Interval 5 detik (5000ms) memberikan jeda antar banner
  setInterval(showNextBanner, 5000); 
};

document.addEventListener("DOMContentLoaded", () => {
  setupBannerAutoscroll();
});