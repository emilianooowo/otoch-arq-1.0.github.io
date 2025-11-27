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

document.addEventListener('DOMContentLoaded', function() {
    const fixedTitle = document.querySelector('.page-title-fixed');
    
    const scrollThreshold = 20; 

    function handleScroll() {
        const currentScroll = window.scrollY;

        if (currentScroll > scrollThreshold) {
            fixedTitle.classList.add('scrolled');
        } else {
            fixedTitle.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
});