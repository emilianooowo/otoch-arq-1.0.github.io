// Configuración de imágenes por proyecto
const proyectosImagenes = {
    polanco: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=500&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=500&fit=crop",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=500&fit=crop",
        "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&h=500&fit=crop",
        "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200&h=500&fit=crop",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=500&fit=crop",
    ],
    lomas: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=500&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=500&fit=crop",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=500&fit=crop",
        "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&h=500&fit=crop",
        "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200&h=500&fit=crop",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=500&fit=crop",
    ],
    condesa: [
        "https://images.unsplash.com/photo-1600573472816-e4c3db8b3545?w=1200&h=500&fit=crop",
        "https://images.unsplash.com/photo-1600585156891-b15c6c62b155?w=1200&h=500&fit=crop",
        "https://images.unsplash.com/photo-1600573834966-9485db1d7a8b?w=1200&h=500&fit=crop",
        "https://images.unsplash.com/photo-1600587040393-c2a2528d7159?w=1200&h=500&fit=crop",
    ],
}

// Variables globales para el lightbox
let proyectoActual = ""
let indiceActual = 0
let imagenesActuales = []

// Clase para manejar la galería de proyectos
class GaleriaProyectos {
    constructor() {
        this.inicializar()
    }

    inicializar() {
        this.configurarThumbnails()
        this.configurarEventosLightbox()
        this.configurarEventosTeclado()
    }

    configurarThumbnails() {
        document.querySelectorAll(".proyecto").forEach((proyecto) => {
            const imagenPrincipal = proyecto.querySelector(".imagen-principal img")
            const thumbnails = proyecto.querySelectorAll(".thumbnail:not(.ver-mas)")

            thumbnails.forEach((thumb, index) => {
                thumb.addEventListener("click", () => {
                    this.cambiarImagenPrincipal(imagenPrincipal, thumb, thumbnails)
                })
            })
        })
    }

    cambiarImagenPrincipal(imagenPrincipal, thumbSeleccionado, todosThumbnails) {
        const nuevaImagen = thumbSeleccionado.getAttribute("data-image")

        // Efecto de transición suave
        imagenPrincipal.style.opacity = "0.7"

        setTimeout(() => {
            imagenPrincipal.src = nuevaImagen
            imagenPrincipal.style.opacity = "1"
        }, 150)

        // Actualizar estado activo
        todosThumbnails.forEach((t) => t.classList.remove("active"))
        thumbSeleccionado.classList.add("active")
    }

    configurarEventosLightbox() {
        // Click fuera del lightbox para cerrarlo
        document.getElementById("lightbox").addEventListener("click", (e) => {
            if (e.target === e.currentTarget) {
                this.cerrarLightbox()
            }
        })
    }

    configurarEventosTeclado() {
        document.addEventListener("keydown", (e) => {
            if (!document.getElementById("lightbox").classList.contains("active")) return

            switch (e.key) {
                case "Escape":
                    this.cerrarLightbox()
                    break
                case "ArrowRight":
                    this.imagenSiguiente()
                    break
                case "ArrowLeft":
                    this.imagenAnterior()
                    break
            }
        })
    }

    abrirLightbox(proyecto) {
        proyectoActual = proyecto
        imagenesActuales = proyectosImagenes[proyecto] || []

        if (imagenesActuales.length === 0) {
            console.warn(`No se encontraron imágenes para el proyecto: ${proyecto}`)
            return
        }

        indiceActual = 0
        this.actualizarImagenLightbox()

        const lightbox = document.getElementById("lightbox")
        lightbox.classList.add("active")
        document.body.style.overflow = "hidden"
    }

    cerrarLightbox() {
        const lightbox = document.getElementById("lightbox")
        lightbox.classList.remove("active")
        document.body.style.overflow = "auto"

        // Reset variables
        proyectoActual = ""
        imagenesActuales = []
        indiceActual = 0
    }

    imagenSiguiente() {
        if (imagenesActuales.length === 0) return

        indiceActual = (indiceActual + 1) % imagenesActuales.length
        this.actualizarImagenLightbox()
    }

    imagenAnterior() {
        if (imagenesActuales.length === 0) return

        indiceActual = (indiceActual - 1 + imagenesActuales.length) % imagenesActuales.length
        this.actualizarImagenLightbox()
    }

    actualizarImagenLightbox() {
        const lightboxImg = document.getElementById("lightboxImg")
        const counter = document.getElementById("lightboxCounter")

        if (imagenesActuales.length > 0) {
            // Efecto de transición
            lightboxImg.style.opacity = "0.5"

            setTimeout(() => {
                lightboxImg.src = imagenesActuales[indiceActual]
                lightboxImg.style.opacity = "1"
            }, 150)

            counter.textContent = `${indiceActual + 1} / ${imagenesActuales.length}`
        }
    }

    // Método para agregar nuevas imágenes dinámicamente
    agregarImagenesProyecto(proyecto, nuevasImagenes) {
        if (!proyectosImagenes[proyecto]) {
            proyectosImagenes[proyecto] = []
        }
        proyectosImagenes[proyecto] = [...proyectosImagenes[proyecto], ...nuevasImagenes]
    }

    // Método para obtener imágenes de un proyecto
    obtenerImagenesProyecto(proyecto) {
        return proyectosImagenes[proyecto] || []
    }
}

// Inicializar la galería cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    window.galeria = new GaleriaProyectos()
})

// Funciones globales para mantener compatibilidad con el HTML
function abrirLightbox(proyecto) {
    if (window.galeria) {
        window.galeria.abrirLightbox(proyecto)
    }
}

function cerrarLightbox() {
    if (window.galeria) {
        window.galeria.cerrarLightbox()
    }
}

function imagenSiguiente() {
    if (window.galeria) {
        window.galeria.imagenSiguiente()
    }
}

function imagenAnterior() {
    if (window.galeria) {
        window.galeria.imagenAnterior()
    }
}

// Utilidades adicionales
const Utils = {
    // Precargar imágenes para mejor rendimiento
    precargarImagenes(urls) {
        urls.forEach((url) => {
            const img = new Image()
            img.src = url
        })
    },

    // Lazy loading para imágenes
    configurarLazyLoading() {
        const imagenes = document.querySelectorAll("img[data-src]")

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target
                    img.src = img.dataset.src
                    img.classList.remove("lazy")
                    observer.unobserve(img)
                }
            })
        })

        imagenes.forEach((img) => imageObserver.observe(img))
    },

    // Detectar si es dispositivo móvil
    esMobile() {
        return window.innerWidth <= 768
    },

    // Optimizar rendimiento en móviles
    optimizarParaMobile() {
        if (this.esMobile()) {
            // Reducir calidad de imágenes en móviles
            document.querySelectorAll("img").forEach((img) => {
                if (img.src.includes("w=1200")) {
                    img.src = img.src.replace("w=1200", "w=800")
                }
            })
        }
    },
}

// Inicializar utilidades
document.addEventListener("DOMContentLoaded", () => {
    // Precargar todas las imágenes
    Object.values(proyectosImagenes)
        .flat()
        .forEach((url) => {
            Utils.precargarImagenes([url])
        })

    // Optimizar para móviles
    Utils.optimizarParaMobile()
})