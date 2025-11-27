document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburgerBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            hamburgerBtn.classList.remove('is-active'); 
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const slide = document.querySelector(".slide");

    if (window.innerWidth > 992) {
        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY;
            slide.style.transform = `translateY(${scrollY * 0.4}px`;
        });
    }
});

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function animateImages() {
    const leftImg = document.querySelector('.left-image img');
    const topImg = document.querySelector('.top-image img');

    if (isInViewport(leftImg) && !leftImg.classList.contains('animate')) {
        leftImg.classList.add('animate');
    }

    if (isInViewport(topImg) && !topImg.classList.contains('animate')) {
        topImg.classList.add('animate');
    }
}

window.addEventListener('load', animateImages);
window.addEventListener('scroll', animateImages);
window.addEventListener('resize', animateImages);

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = (entry, selector, className = 'animate') => {
    const items = entry.target.querySelectorAll(selector);
    items.forEach(item => item.classList.add(className));
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;

            if (target.matches('#mainCardsScroll')) {
                animateOnScroll(entry, '.service-card, .view-all-card');
            }
            else if (target.matches('#extrasScroll')) {
                animateOnScroll(entry, '.extra-item');
            }

            observer.unobserve(target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const mainCardsScroll = document.getElementById('mainCardsScroll');
    const extrasScroll = document.getElementById('extrasScroll');
    if (mainCardsScroll) sectionObserver.observe(mainCardsScroll);
    if (extrasScroll) sectionObserver.observe(extrasScroll);

    const proyectoCards = document.querySelectorAll('.proyecto-card');
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    proyectoCards.forEach(card => cardObserver.observe(card));

    const extraItems = document.querySelectorAll('.extra-item');
    extraItems.forEach(item => {
        item.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            extraItems.forEach(i => i.classList.remove('active'));
            if (!wasActive) item.classList.add('active');
        });
    });
});