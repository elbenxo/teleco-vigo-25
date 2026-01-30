// Navegacion movil
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Cerrar menu al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Cambiar estilo del navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // Animacion suave para los elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.evento-card, .galeria-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Gallery & Lightbox
    initGallery();
});

// Gallery photos - add your photos here
// Each entry: { src: 'img/galeria/filename.jpg', alt: 'Description' }
var GALLERY_PHOTOS = [
    // Example:
    // { src: 'img/galeria/foto1.jpg', alt: 'Graduacion 2001' },
    // { src: 'img/galeria/foto2.jpg', alt: 'Paso del Ecuador' },
];

function initGallery() {
    var grid = document.getElementById('galeria-grid');
    var emptyMsg = document.getElementById('galeria-empty');
    var ctaMsg = document.getElementById('galeria-cta');

    if (!grid) return;

    if (GALLERY_PHOTOS.length === 0) {
        emptyMsg.style.display = '';
        ctaMsg.style.display = 'none';
        return;
    }

    emptyMsg.style.display = 'none';
    ctaMsg.style.display = '';

    GALLERY_PHOTOS.forEach(function(photo, i) {
        var item = document.createElement('div');
        item.className = 'galeria-item';
        item.setAttribute('data-index', i);
        var img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.alt || '';
        img.loading = 'lazy';
        item.appendChild(img);
        grid.appendChild(item);

        item.addEventListener('click', function() {
            openLightbox(i);
        });
    });

    // Re-observe for scroll animation
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    grid.querySelectorAll('.galeria-item').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.cursor = 'pointer';
        observer.observe(el);
    });

    // Lightbox controls
    var lightbox = document.getElementById('lightbox');
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', function() { navigateLightbox(-1); });
    document.getElementById('lightbox-next').addEventListener('click', function() { navigateLightbox(1); });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });
}

var currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    var lightbox = document.getElementById('lightbox');
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(dir) {
    currentIndex = (currentIndex + dir + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    var photo = GALLERY_PHOTOS[currentIndex];
    document.getElementById('lightbox-img').src = photo.src;
    document.getElementById('lightbox-img').alt = photo.alt || '';
    document.getElementById('lightbox-caption').textContent = photo.alt || '';
    document.getElementById('lightbox-counter').textContent = (currentIndex + 1) + ' / ' + GALLERY_PHOTOS.length;
}
