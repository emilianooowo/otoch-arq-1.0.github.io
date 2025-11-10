document.addEventListener("DOMContentLoaded", () => {
    const slide = document.querySelector(".slide");

    if (window.innerWidth > 992) {
        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY;
            slide.style.transform = `translateY(${scrollY * 0.4}px`;
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const img = document.getElementById("aboutImage");
    const buttons = document.querySelectorAll(".image-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const src = btn.getAttribute("data-src");
            img.src = src;

            buttons.forEach(b => {
                b.classList.remove("active");
                b.setAttribute("aria-pressed", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-pressed", "true");
        });
    });
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

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Deja de observar una vez animado
        }
    });
}, observerOptions);

// Observar todas las tarjetas de proyecto
document.addEventListener('DOMContentLoaded', () => {
    const proyectoCards = document.querySelectorAll('.proyecto-card');
    proyectoCards.forEach(card => {
        observer.observe(card);
    });
});