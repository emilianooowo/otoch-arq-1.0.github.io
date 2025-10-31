const hamburger = document.querySelector('.hamburger');
const sideMenu = document.querySelector('.side-menu');
const closeBtn = document.querySelector('.side-menu__close');
const overlay = document.querySelector('.side-menu__overlay');
const submenuToggle = document.querySelector('.side-menu__toggle');
const submenu = document.querySelector('.side-menu__submenu');

hamburger.addEventListener('click', () => {
    sideMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
});

const closeMenu = () => {
    sideMenu.classList.remove('active');
    document.body.style.overflow = '';
};

closeBtn.addEventListener('click', closeMenu);

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
});

document.addEventListener("DOMContentLoaded", () => {
    const heroSlider = document.getElementById("heroSlider");
    const slides = document.querySelectorAll(".slide");
    let current = 0;

    function showSlide(index) {
        slides.forEach((s, i) => {
            s.classList.toggle("active", i === index);
        });
        current = index;
    }

    setInterval(() => {
        const next = (current + 1) % slides.length;
        showSlide(next);
    }, 8000);

    function parallaxEffect() {
        if (window.innerWidth < 1024) return;

        const scrolled = window.scrollY;
        const sliderTop = heroSlider.offsetTop;
        const sliderHeight = heroSlider.offsetHeight;

        if (scrolled + window.innerHeight > sliderTop && scrolled < sliderTop + sliderHeight) {
            const offset = (scrolled - sliderTop) * 0.4;
            slides.forEach(slide => {
                if (slide.classList.contains("active")) {
                    slide.style.transform = `translateY(${offset}px)`;
                }
            });
        }
    }

    window.addEventListener("scroll", parallaxEffect);
});