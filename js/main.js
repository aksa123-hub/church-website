// ===== SHOW ALL CONTENT IMMEDIATELY ON LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    const allAnimatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-up');
    allAnimatedElements.forEach(el => {
        el.classList.add('visible');
    });
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
        const sectionHeight = section.clientHeight;
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

// Close when clicking outside
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

// Observe all animated elements
const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-up');
animatedElements.forEach(el => {
    observer.observe(el);
    const rect = el.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (isInViewport) {
        el.classList.add('visible');
    }
});

// ===== GALLERY LIGHTBOX EFFECT =====
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
                <div class="lightbox-caption">${img.alt}</div>
            </div>
        `;
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        function closeLightbox() {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            }, 300);
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    });
});

// Add lightbox styles dynamically
const style = document.createElement('style');
style.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10000;
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
        max-height: 85vh;
        object-fit: contain;
        border-radius: 10px;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
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
        font-size: 1.2rem;
    }
    
    @keyframes zoomIn {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ===== PARALLAX EFFECT FOR HERO SECTION =====
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    if (hero) {
        hero.style.backgroundPositionY = parallax + 'px';
    }
});

// ===== CARDS HOVER EFFECT =====
const cards = document.querySelectorAll('.info-card, .org-card, .contact-item');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
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
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== GALLERY CATEGORIES WITH SUBGALLERY =====
const galleryData = {
    events: [
        { img: 'assets/Gallery/Events and Activities/event6.jpeg', title: 'Thevalakkara Group Conference 2026', caption: 'The Martha Mariam Samajam Thevalakkara Group Conference was held at our church on Saturday, 24 January 2026.' },
        { img: 'assets/Gallery/Events and Activities/event5.jpeg', title: 'Amrutham', caption: 'The “Amrutham – Mar Anthonios Memorial Food Distribution Programme” of the Thevalakkara Group was organised by the St. Gregorios Youth Movement of St. Mary’s Salem Orthodox Syrian Church, Sooranad North, and held at Karunagappally Puthiyakavu T.B. Hospital on 22 November 2025.' },
        { img: 'assets/Gallery/Events and Activities/event1.jpg.jpeg', title: 'Parumala Padayathra', caption: 'Parumala Padayathra undertaken by the faithful on 31 October 2025.' },
        
        // Add more events...
    ],
    achievements: [
        { img: 'assets/Gallery/Achievements/ach1.jpg.jpeg', title: 'Overall Championship', caption: 'Our Samajam members secured first place with 65 points and won the Ever Rolling Trophy at the 2025 Kalamalsaram  of the Martha Mariam Vanitha Samajam, Thevalakkara Group, held at St. Gregorios Orthodox Church, Idakkulangara, on 05 October 2025.' },
        { img: 'assets/Gallery/Achievements/ach2.jpg.jpeg', title: 'Youth Achievement', caption: 'Our members of the youth movement won the Overall Championship with 72 points at Arangu 2025, the Kollam Diocese Youth Arts Festival.' },
        
        // Add more achievements...
    ],
    churchimages: [
        { img: 'assets/churchmain.jpg', title: 'Our Church', caption: 'Recreated > 2011' },
        { img: 'assets/church4.jpg', title: 'Interior', caption: 'The faithful gathered in prayer during the Holy Qurbana' },
        { img: 'assets/Gallery/Church images/madbaha.jpg', title: 'Madbaha', caption: 'The Holy Madbaha, the most sacred space of the church where the Holy Qurbana is celebrated.' },
        { img: 'assets/Gallery/Church images/chur3.jpeg', title: 'Old Church', caption: 'Constructed > 1968-1969' },
        { img: 'assets/Gallery/Church images/rec.jpeg', title: 'Record of Church Consecration', caption: '' },
        // Add more programmes...
    ],
    Kurishady: [
        { img: 'assets/gallery/Kurisady/kurisady1.png', title: 'Kurishady at Western side', caption:''},
        { img: 'assets/gallery/Kurisady/kurisady2.jpg', title: 'Kurishady within Church premise', caption:'' },
        { img: 'assets/gallery/Kurisady/kurisady3.png', title: 'Kurishady at Wastern side', caption:''},
        
        // Add more meetings...
    ],
    PalliPerunnal: [
        { img: 'assets/gallery/Palli Perunnal/per1.jpeg', title: '', caption: '' },
        { img: 'assets/gallery/Palli Perunnal/per5.jpeg', title: '', caption: '' },
        { img: 'assets/gallery/Palli Perunnal/per2.jpeg', title: '', caption: '' },
        { img: 'assets/gallery/Palli Perunnal/per3.jpeg', title: '', caption: '' },
        { img: 'assets/gallery/Palli Perunnal/per4.jpeg', title: '', caption: '' },
        { img: 'assets/gallery/Palli Perunnal/per6.jpeg', title: '', caption: '' },
        { img: 'assets/gallery/Palli Perunnal/per7.jpeg', title: '', caption: '' },
        { img: 'assets/gallery/Palli Perunnal/per8.jpeg', title: '', caption: '' },
        // Add more trips...
    ],
    services: [
        { img: 'images/gallery/services/1.jpg', title: 'Holy Qurbana', caption: 'Sunday divine liturgy' },
        { img: 'images/gallery/services/2.jpg', title: 'Evening Prayer', caption: 'Saturday evening service' },
        { img: 'images/gallery/services/3.jpg', title: 'Special Service', caption: 'Feast day divine service' },
        // Add more services...
    ]
};

const categoryTitles = {
    events: 'Events',
    achievements: 'Achievements',
    churchimages: 'Church Images',
    Kurishady: 'Kurishady',
    PalliPerunnal: 'Palli Perunnal',
    services: 'Church Services'
};

// Open subgallery
document.querySelectorAll('.gallery-category').forEach(category => {
    category.addEventListener('click', function() {
        const categoryType = this.getAttribute('data-category');
        openSubgallery(categoryType);
    });
});

function openSubgallery(category) {
    const images = galleryData[category];
    const categoryTitle = categoryTitles[category];
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'subgallery-modal';
    
    let imagesHTML = '';
    images.forEach(item => {
        imagesHTML += `
            <div class="subgallery-item" data-img="${item.img}">
                <img src="${item.img}" alt="${item.title}">
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
    
    // Close modal
    modal.querySelector('.subgallery-close').addEventListener('click', closeSubgallery);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeSubgallery();
        }
    });
    
    // Open lightbox for individual images
    modal.querySelectorAll('.subgallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-img');
            const title = this.querySelector('h4').textContent;
            const caption = this.querySelector('.subgallery-caption p').textContent;
            openLightbox(imgSrc, title, caption);
        });
    });
    
    function closeSubgallery() {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSubgallery();
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
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
            }
        }, 300);
    }
}


// ===== MOBILE TOUCH IMPROVEMENTS FOR GALLERY =====
if ('ontouchstart' in window) {
    // Prevent double-tap zoom on gallery items
    document.querySelectorAll('.gallery-category, .subgallery-item').forEach(item => {
        item.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.click();
        }, { passive: false });
    });
}

// Smooth scroll prevention when modal is open
function preventScroll(e) {
    e.preventDefault();
}

// Apply to modals
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


// ===== CONSOLE MESSAGE =====
console.log('%c🙏 St Mary\'s Salem Orthodox Syrian Church', 'color: #8B1538; font-size: 20px; font-weight: bold;');
console.log('%cWebsite developed with love and devotion', 'color: #D4AF37; font-size: 14px;');