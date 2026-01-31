// Navegacion movil
document.addEventListener('DOMContentLoaded', function() {
    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    var navbar = document.querySelector('.navbar');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Cerrar menu al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll reveal for .reveal and .stagger elements
    var revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .stagger').forEach(function(el) {
        revealObserver.observe(el);
    });

    // Gallery & Lightbox
    initGallery();
});

// Gallery photos - add your photos here
// Each entry: { src: 'img/galeria/filename.jpg', alt: 'Description' }
var GALLERY_PHOTOS = [
    // Example:
    // { src: 'img/galeria/foto1.jpg', alt: 'Graduacion 2001' },
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
