document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // --- MENÚ PC ---
    const menuToggle = document.getElementById('menuToggle');
    const menuDropdown = document.getElementById('menuDropdown');

    function openMenuPC() {
        if (menuToggle) menuToggle.classList.add('active');
        if (menuDropdown) menuDropdown.classList.add('active');
    }

    function closeMenuPC() {
        if (menuToggle) menuToggle.classList.remove('active');
        if (menuDropdown) menuDropdown.classList.remove('active');
    }

    function toggleMenuPC(e) {
        e.preventDefault();
        e.stopPropagation();
        const isActive = menuToggle && menuToggle.classList.contains('active');
        isActive ? closeMenuPC() : openMenuPC();
    }

    if (menuToggle && menuDropdown) {
        // Click en el botón
        menuToggle.addEventListener('click', toggleMenuPC);

        // Tecla Escape
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menuToggle.classList.contains('active')) {
                closeMenuPC();
            }
        });

        // Click en enlaces del menú
        document.querySelectorAll('.menu-pc-link').forEach(link => {
            link.addEventListener('click', closeMenuPC);
        });

        // Click en enlaces dentro del dropdown
        menuDropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenuPC);
        });

        // Clic fuera del menú
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !menuDropdown.contains(e.target)) {
                closeMenuPC();
            }
        });
    } else {
        console.error('Elementos del menú PC no encontrados:', {
            menuToggle: !!menuToggle,
            menuDropdown: !!menuDropdown
        });
    }
});