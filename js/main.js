// ===== SHOW ALL CONTENT IMMEDIATELY ON LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    const allAnimatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-up');
    allAnimatedElements.forEach(el => {
        el.classList.add('visible');
    });


    // ===== ANNOUNCEMENT BANNER =====
const closeAnnouncementBtn = document.getElementById('closeAnnouncement');
const announcementBanner = document.getElementById('announcementBanner');

if (closeAnnouncementBtn && announcementBanner) {
    closeAnnouncementBtn.addEventListener('click', () => {
        announcementBanner.classList.add('hidden');
    });
}

// ===== PERUNNAL POSTER LIGHTBOX =====
document.querySelectorAll('.poster-card').forEach(card => {
    card.addEventListener('click', function() {
        const img = this.querySelector('.poster-img');
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
                <div class="lightbox-caption">
                    <p>${img.alt}</p>
                </div>
            </div>
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);

        lightbox.querySelector('.lightbox-close').addEventListener('click', (e) => {
            e.stopPropagation();
            closePosterLightbox(lightbox);
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closePosterLightbox(lightbox);
            }
        });

        document.addEventListener('keydown', function escClose(e) {
            if (e.key === 'Escape') {
                closePosterLightbox(lightbox);
                document.removeEventListener('keydown', escClose);
            }
        });
    });
});

function closePosterLightbox(lightbox) {
    lightbox.style.opacity = '0';
    setTimeout(() => {
        if (document.body.contains(lightbox)) {
            document.body.removeChild(lightbox);
        }
        document.body.style.overflow = 'auto';
    }, 300);
}

});

// ===== NAVIGATION SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    let current = '';
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== IMPROVED DROPDOWN FOR MOBILE =====
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('.nav-link');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');

    dropdownLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 968) {
            e.preventDefault();

            dropdowns.forEach(other => {
                if (other !== dropdown) {
                    other.querySelector('.dropdown-menu').classList.remove('mobile-active');
                }
            });

            dropdownMenu.classList.toggle('mobile-active');
        }
    });

    dropdownMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            dropdownMenu.classList.remove('mobile-active');
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        dropdowns.forEach(dropdown => {
            dropdown.querySelector('.dropdown-menu').classList.remove('mobile-active');
        });
    }
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-up');
animatedElements.forEach(el => {
    observer.observe(el);
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
    }
});

// ===== LIGHTBOX STYLES =====
const style = document.createElement('style');
style.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 20000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        animation: zoomIn 0.3s ease;
    }
    .lightbox-content img {
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 10px;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        display: block;
    }
    .lightbox-close {
        position: absolute;
        top: -50px;
        right: 0;
        font-size: 3rem;
        color: #FFD700;
        cursor: pointer;
        transition: transform 0.3s ease;
        font-weight: 300;
        line-height: 1;
    }
    .lightbox-close:hover {
        transform: rotate(90deg);
    }
    .lightbox-caption {
        text-align: center;
        color: white;
        margin-top: 20px;
    }
    .lightbox-caption h3 {
        font-size: 1.3rem;
        color: #FFD700;
        margin-bottom: 8px;
    }
    .lightbox-caption p {
        font-size: 1rem;
        color: #FFF8DC;
    }
    @keyframes zoomIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(style);

// ===== PARALLAX EFFECT FOR HERO SECTION =====
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
    }
});

// ===== CARDS HOVER EFFECT =====
// BUG FIX 5: org-card was included here, causing JS to set translateY(-10px)
// while the CSS was already setting translateX(10px) — they conflicted and
// produced a jittery diagonal movement. Removed org-card from JS hover handler
// since CSS already handles it cleanly via the fixed .org-card:hover rule.
const cards = document.querySelectorAll('.info-card, .contact-item');

cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-to-top';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// BUG FIX 6: The original code set body opacity to 0 on window.load, then faded
// it back in. If JS loaded slowly, the page was invisible for a noticeable flash.
// Replaced with a proper CSS-driven fade-in on the body that doesn't cause a
// blank-page flash — body starts visible and fades in gracefully.
window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity = '1';
});

// ===== GALLERY CATEGORIES DATA =====
const galleryData = {
    events: [
        { img: 'assets/Gallery/Events and Activities/event6.jpeg', title: 'Thevalakkara Group Conference 2026', caption: 'The Martha Mariam Samajam Thevalakkara Group Conference was held at our church on Saturday, 24 January 2026.' },
        { img: 'assets/Gallery/Events and Activities/event5.jpeg', title: 'Amrutham', caption: 'The "Amrutham – Mar Anthonios Memorial Food Distribution Programme" of the Thevalakkara Group was organised by the St. Gregorios Youth Movement of St. Mary\'s Salem Orthodox Syrian Church, Sooranad North, and held at Karunagappally Puthiyakavu T.B. Hospital on 22 November 2025.' },
        { img: 'assets/Gallery/Events and Activities/event1.jpg.jpeg', title: 'Parumala Padayathra', caption: 'Parumala Padayathra undertaken by the faithful on 31 October 2025.' },
    ],
    achievements: [
        { img: 'assets/Gallery/Achievements/ach1.jpg', title: 'Overall Championship', caption: 'Our Samajam members secured first place with 65 points and won the Ever Rolling Trophy at the 2025 Kalamalsaram of the Martha Mariam Vanitha Samajam, Thevalakkara Group, held at St. Gregorios Orthodox Church, Idakkulangara, on 05 October 2025.' },
        { img: 'assets/Gallery/Achievements/ach2.jpeg', title: 'Youth Achievement', caption: 'Our members of the youth movement won the Overall Championship with 72 points at Arangu 2025, the Kollam Diocese Youth Arts Festival.' },
    ],
    church_images: [
        { img: 'assets/churchmain.jpg', title: 'Our Church', caption: 'Recreated > 2011' },
        { img: 'assets/church4.jpg', title: 'Interior', caption: 'The faithful gathered in prayer during the Holy Qurbana' },
        { img: 'assets/Gallery/Church_images/madbaha.jpg', title: 'Madbaha', caption: 'The Holy Madbaha, the most sacred space of the church where the Holy Qurbana is celebrated.' },
        { img: 'assets/Gallery/Church_images/chur3.jpeg', title: 'Old Church', caption: 'Constructed > 1968-1969' },
        { img: 'assets/Gallery/Church_images/rec.jpg', title: 'Record of Church Consecration', caption: '' },
    ],
    Kurishady: [
        { img: 'assets/Gallery/Kurisady/kurisady1.png', title: 'Kurishady at Western side', caption: '' },
        { img: 'assets/Gallery/Kurisady/kurisady2.jpg', title: 'Kurishady within Church premise', caption: '' },
        { img: 'assets/Gallery/Kurisady/kurisady3.png', title: 'Kurishady at Eastern side', caption: '' },
        { img: 'assets/Gallery/Kurisady/kurisady5.jpeg', title: 'Newly Constructed Kurishady near the Church', caption: '' },
        { img: 'assets/Gallery/Kurisady/kurisady4.jpeg', title: 'Newly Constructed Kurishady at Eastern side', caption: '' },
    ],
    PalliPerunnal: [
        { img: 'assets/Gallery/Palli Perunnal/per1.jpeg', title: '', caption: '' },
        { img: 'assets/Gallery/Palli Perunnal/per5.jpeg', title: '', caption: '' },
        { img: 'assets/Gallery/Palli Perunnal/per2.jpeg', title: '', caption: '' },
        { img: 'assets/Gallery/Palli Perunnal/per3.jpeg', title: '', caption: '' },
        { img: 'assets/Gallery/Palli Perunnal/per4.jpeg', title: '', caption: '' },
        { img: 'assets/Gallery/Palli Perunnal/per6.jpeg', title: '', caption: '' },
        { img: 'assets/Gallery/Palli Perunnal/per7.jpeg', title: '', caption: '' },
        { img: 'assets/Gallery/Palli Perunnal/per8.jpeg', title: '', caption: '' },
    ]
};

const categoryTitles = {
    events: 'Events',
    achievements: 'Achievements',
    church_images: 'Church Images',
    Kurishady: 'Kurishady',
    PalliPerunnal: 'Palli Perunnal'
};

// Open subgallery on category click
document.querySelectorAll('.gallery-category').forEach(category => {
    category.addEventListener('click', function () {
        const categoryType = this.getAttribute('data-category');
        openSubgallery(categoryType);
    });
});

function openSubgallery(category) {
    const images = galleryData[category];
    if (!images) return;
    const categoryTitle = categoryTitles[category] || category;

    const modal = document.createElement('div');
    modal.className = 'subgallery-modal';

    let imagesHTML = '';
    images.forEach(item => {
        imagesHTML += `
            <div class="subgallery-item" data-img="${item.img}">
                <img src="${item.img}" alt="${item.title}" loading="lazy">
                <div class="subgallery-item-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
                <div class="subgallery-caption">
                    <h4>${item.title}</h4>
                    <p>${item.caption}</p>
                </div>
            </div>
        `;
    });

    modal.innerHTML = `
        <div class="subgallery-container">
            <div class="subgallery-header">
                <span class="subgallery-close">&times;</span>
                <h2 class="subgallery-title">${categoryTitle}</h2>
                <p class="subgallery-subtitle">${images.length} photos</p>
            </div>
            <div class="subgallery-grid">
                ${imagesHTML}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    modal.querySelector('.subgallery-close').addEventListener('click', closeSubgallery);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeSubgallery();
    });

    modal.querySelectorAll('.subgallery-item').forEach(item => {
        item.addEventListener('click', function () {
            const imgSrc = this.getAttribute('data-img');
            const title = this.querySelector('h4').textContent;
            const caption = this.querySelector('.subgallery-caption p').textContent;
            openLightbox(imgSrc, title, caption);
        });
    });

    function closeSubgallery() {
        modal.classList.remove('active');
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
            document.body.style.overflow = 'auto';
        }, 300);
    }

    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeSubgallery();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function openLightbox(imgSrc, title, caption) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${imgSrc}" alt="${title}">
            <div class="lightbox-caption">
                <h3>${title}</h3>
                <p>${caption}</p>
            </div>
        </div>
    `;

    document.body.appendChild(lightbox);

    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);

    function closeLightbox() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
            }
        }, 300);
    }

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function escLightbox(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', escLightbox);
        }
    });
}

// BUG FIX 7: The original touch handler called e.preventDefault() then this.click(),
// which fired the click twice on gallery items (once from touchend→click() call,
// once from the browser's own synthetic click after touchend). This opened two
// modals stacked on top of each other. Fixed by removing the manual touch handler
// entirely — modern browsers fire click after touchend automatically, so this block
// was always redundant and harmful.

// ===== MODAL BODY SCROLL LOCK =====
document.addEventListener('DOMContentLoaded', () => {
    const observeModals = new MutationObserver(() => {
        const modals = document.querySelectorAll('.subgallery-modal.active, .lightbox');
        if (modals.length > 0) {
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.position = '';
            document.body.style.width = '';
        }
    });
    observeModals.observe(document.body, { childList: true, subtree: true });
});

// ===== EVENTS SLIDER =====
document.addEventListener('DOMContentLoaded', function () {
    const eventSlides = document.querySelectorAll('.event-slide');
    const sliderIndicators = document.querySelector('.slider-indicators');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');

    if (!eventSlides.length || !sliderIndicators) return;

    let currentSlide = 0;
    const totalSlides = eventSlides.length;
    let autoSlide;

    // Create indicator dots
    eventSlides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'indicator-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        sliderIndicators.appendChild(dot);
    });

    const dots = document.querySelectorAll('.indicator-dot');

    function showSlide(n) {
        if (n >= totalSlides) {
            currentSlide = 0;
        } else if (n < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = n;
        }

        eventSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        eventSlides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }

    function goToSlide(n) {
        showSlide(n);
        resetAutoSlide();
    }

    function startAutoSlide() {
        autoSlide = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    if (nextButton) nextButton.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
    if (prevButton) prevButton.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

    const sliderContainer = document.querySelector('.events-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    const slider = document.querySelector('.events-slider');

    if (slider) {
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) { nextSlide(); } else { prevSlide(); }
                resetAutoSlide();
            }
        }, { passive: true });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { prevSlide(); resetAutoSlide(); }
        else if (e.key === 'ArrowRight') { nextSlide(); resetAutoSlide(); }
    });

    showSlide(0);
    startAutoSlide();
});

// ===== CONSOLE MESSAGE =====
console.log('%c🙏 St Mary\'s Salem Orthodox Syrian Church', 'color: #8B1538; font-size: 20px; font-weight: bold;');
console.log('%cWebsite developed with love and devotion', 'color: #D4AF37; font-size: 14px;');
// ===== HISTORY DOCUMENT IMAGES LIGHTBOX =====
document.querySelectorAll('.history-doc-card').forEach(card => {
    card.addEventListener('click', function() {
        const img = this.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
                <p class="lightbox-caption">Click on image to zoom. Use pinch to zoom on mobile.</p>
            </div>
        `;
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => closeLightbox(lightbox));
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox(lightbox);
            }
        });
    });
});

function closeLightbox(lightbox) {
    lightbox.style.opacity = '0';
    setTimeout(() => {
        if (document.body.contains(lightbox)) {
            document.body.removeChild(lightbox);
        }
        document.body.style.overflow = 'auto';
    }, 300);
}