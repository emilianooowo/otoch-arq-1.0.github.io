const proyectos = [
    {
        titulo: "Casa Moderna Chiapaneca",
        descripcion: "Diseño contemporáneo con elementos tradicionales",
        imagen: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=400&h=300&fit=crop",
        alt: "Casa Moderna"
    },
    {
        titulo: "Edificio Corporativo",
        descripcion: "Arquitectura sustentable y funcional",
        imagen: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
        alt: "Edificio Corporativo"
    },
    {
        titulo: "Complejo Residencial",
        descripcion: "Espacios diseñados para la comunidad",
        imagen: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
        alt: "Complejo Residencial"
    },
    {
        titulo: "Centro Cultural",
        descripcion: "Preservando la identidad local",
        imagen: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop",
        alt: "Centro Cultural"
    },
    {
        titulo: "Torre de Oficinas",
        descripcion: "Vanguardia en espacios de trabajo",
        imagen: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
        alt: "Torre de Oficinas"
    },
    {
        titulo: "Casa Ecológica",
        descripcion: "Construcción sustentable y eficiente",
        imagen: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
        alt: "Casa Ecológica"
    },
    {
        titulo: "Proyecto Mixto",
        descripcion: "Comercial y residencial integrado",
        imagen: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
        alt: "Proyecto Mixto"
    }
];

class CarruselProyectos {
    constructor(proyectos) {
        this.wrapper = document.getElementById("carruselWrapper");
        this.btnAnterior = document.getElementById("btnAnterior");
        this.btnSiguiente = document.getElementById("btnSiguiente");
        this.currentIndex = 0;

        this.renderProyectos(proyectos);
        this.proyectos = [...this.wrapper.children];

        this.setMeasurements();
        this.init();
    }

    renderProyectos(proyectos) {
        this.wrapper.innerHTML = proyectos.map(p => `
      <div class="proyecto-item">
        <img src="${p.imagen}" alt="${p.alt}" class="proyecto-imagen">
        <div class="proyecto-overlay">
          <h4>${p.titulo}</h4>
          <p>${p.descripcion}</p>
        </div>
      </div>
    `).join('');
    }

    setMeasurements() {
        const item = this.proyectos[0];
        this.itemWidth = item.offsetWidth + 20; // gap
        const containerWidth = this.wrapper.parentElement.offsetWidth;
        this.itemsPerView = Math.max(1, Math.floor(containerWidth / this.itemWidth));
        this.maxIndex = Math.max(0, this.proyectos.length - this.itemsPerView);
    }

    init() {
        this.updateUI();
        this.btnAnterior.addEventListener("click", () => this.mover(-1));
        this.btnSiguiente.addEventListener("click", () => this.mover(1));
        this.addDragEvents();
        this.observeResize();
        this.wrapper.style.cursor = "grab";
    }

    mover(dir) {
        const nextIndex = this.currentIndex + dir;
        if (nextIndex < 0 || nextIndex > this.maxIndex) return;
        this.currentIndex = nextIndex;
        this.updateUI();
    }

    updateUI() {
        this.wrapper.style.transform = `translateX(${-this.currentIndex * this.itemWidth}px)`;
        this.btnAnterior.disabled = this.currentIndex === 0;
        this.btnSiguiente.disabled = this.currentIndex === this.maxIndex;
    }

    addDragEvents() {
        let startX = 0, dragging = false;

        const start = (x) => { startX = x; dragging = true; this.wrapper.style.cursor = "grabbing"; };
        const end = (x) => {
            if (!dragging) return;
            if (Math.abs(startX - x) > 50) this.mover(startX - x > 0 ? 1 : -1);
            dragging = false;
            this.wrapper.style.cursor = "grab";
        };

        this.wrapper.addEventListener("touchstart", e => start(e.touches[0].clientX), { passive: true });
        this.wrapper.addEventListener("touchend", e => end(e.changedTouches[0].clientX), { passive: true });
    }

    observeResize() {
        const ro = new ResizeObserver(() => {
            this.setMeasurements();
            this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
            this.updateUI();
        });
        ro.observe(this.wrapper.parentElement);
    }
}

document.addEventListener("DOMContentLoaded", () => new CarruselProyectos(proyectos));

const slides = document.querySelectorAll('.imagen-slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 4000);

const progressBars = document.querySelectorAll('.progreso-fill');

function animateProgressBars() {
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 300);
        }
    });
}