const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) translateX(0)';
        }
    });
}, observerOptions);

// Aplicar animación inicial y observar elementos
document.querySelectorAll('.profile-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) translateX(-20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Animación para la información de la empresa
const companyInfo = document.querySelector('.company-info');
companyInfo.style.opacity = '0';
companyInfo.style.transform = 'translateX(50px)';
companyInfo.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
observer.observe(companyInfo);