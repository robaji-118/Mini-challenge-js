// File: corousel.js

export const setupBannerAutoscroll = () => {
    const carousel = document.querySelector(".corousel");
    if (!carousel) return;

    const banners = carousel.querySelectorAll(".banner-item"); 
    let currentIndex = 0;

    // Atur lebar carousel berdasarkan jumlah banner
    carousel.style.width = `${banners.length * 100}%`;

    const showNextBanner = () => {
        currentIndex = (currentIndex + 1) % banners.length;
        const offset = -currentIndex * (100 / banners.length); 
        carousel.style.transform = `translateX(${offset}%)`;
    };

    setInterval(showNextBanner, 5000); 
};

document.addEventListener("DOMContentLoaded", () => {
    setupBannerAutoscroll();
});