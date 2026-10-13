const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const hoverElements = document.querySelectorAll('.hover-invert, .hover-invert-black, .marquee-container, button, a, .hero-cta-btn, .btn-contact, .client-card, .benefit-item');

// Custom Cursor Logic with robust visibility
if (cursor && cursorFollower && window.matchMedia("(pointer: fine)").matches) {
    let hasMoved = false;

    document.addEventListener('mousemove', (e) => {
        if (!hasMoved) {
            hasMoved = true;
            document.body.classList.add('custom-cursor-enabled');
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '1';
        }

        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover-active');
            cursorFollower.style.opacity = '0';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover-active');
            cursorFollower.style.opacity = '1';
        });
    });

    document.addEventListener('mouseover', (e) => {
        const target = e.target;
        if (target && (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('.client-card') || target.closest('.accordion-header') || target.closest('.benefit-item') || target.closest('.hero-cta-btn'))) {
            cursor.classList.add('hover-active');
            cursorFollower.style.opacity = '0';
        } else {
            cursor.classList.remove('hover-active');
            if (hasMoved && (!modal || !modal.classList.contains('active'))) {
                cursorFollower.style.opacity = '1';
            }
        }
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        if (hasMoved && (!modal || !modal.classList.contains('active'))) {
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '1';
        }
    });
}

// Pilares Click/Accordion Logic (Opens 2-column layout without overlapping text)
const benefitItems = document.querySelectorAll('.benefit-item');

benefitItems.forEach(item => {
    item.addEventListener('click', () => {
        const isCurrentActive = item.classList.contains('active');
        
        // Close others
        benefitItems.forEach(other => {
            if (other !== item) {
                other.classList.remove('active');
            }
        });

        // Toggle current
        if (!isCurrentActive) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});

// Accordion Logic for FAQ
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const body = item.querySelector('.accordion-body');
        
        // Close all other open accordions
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
                const otherBody = otherItem.querySelector('.accordion-body');
                if (otherBody) otherBody.style.maxHeight = null;
            }
        });

        // Toggle current accordion
        item.classList.toggle('active');
        if (item.classList.contains('active')) {
            body.style.maxHeight = body.scrollHeight + "px";
        } else {
            body.style.maxHeight = null;
        }
    });
});

// Full Project Gallery / Lightbox Data
const PROJECTS_DATA = {
    odonto: {
        title: "Consultório Odontológico",
        images: [
            "images/portfolio/clinica-odonto-1.jpg",
            "images/portfolio/clinica-odonto-2.jpg",
            "images/portfolio/clinica-odonto-3.jpg",
            "images/portfolio/clinica-odonto-4.jpg",
            "images/portfolio/clinica-odonto-5.jpg",
            "images/portfolio/clinica-odonto-6.jpg"
        ]
    },
    moverpet: {
        title: "Clínica Veterinária Moverpet",
        images: [
            "images/portfolio/clinica-vet-1.jpg",
            "images/portfolio/clinica-vet-2.jpg",
            "images/portfolio/clinica-vet-3.jpg"
        ]
    },
    salao: {
        title: "Salão de Beleza & Estética",
        images: [
            "images/portfolio/salao-1.jpg",
            "images/portfolio/salao-2.jpg"
        ]
    },
    residencial1: {
        title: "Residencial Contemporâneo (Living)",
        images: [
            "images/portfolio/residencial1-1.jpg",
            "images/portfolio/residencial1-2.jpg",
            "images/portfolio/residencial1-3.jpg",
            "images/portfolio/residencial1-4.jpg",
            "images/portfolio/residencial1-5.jpg",
            "images/portfolio/residencial1-6.jpg",
            "images/portfolio/residencial1-7.jpg",
            "images/portfolio/residencial1-8.jpg"
        ]
    },
    residencial2: {
        title: "Residencial Suíte Master",
        images: [
            "images/portfolio/residencial2-1.jpg",
            "images/portfolio/residencial2-2.jpg",
            "images/portfolio/residencial2-3.jpg",
            "images/portfolio/residencial2-4.jpg",
            "images/portfolio/residencial2-5.jpg",
            "images/portfolio/residencial2-6.jpg",
            "images/portfolio/residencial2-7.jpg",
            "images/portfolio/residencial2-8.jpg"
        ]
    }
};

let currentProjectKey = null;
let currentImageIndex = 0;

const modal = document.getElementById('gallery-modal');
const modalTitle = document.getElementById('modal-title');
const modalMainImage = document.getElementById('modal-main-image');
const modalCounter = document.getElementById('modal-counter');
const modalThumbsContainer = document.getElementById('modal-thumbs');
const modalClose = document.getElementById('modal-close');
const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');

function updateModalView() {
    if (!currentProjectKey || !PROJECTS_DATA[currentProjectKey]) return;
    
    const project = PROJECTS_DATA[currentProjectKey];
    const total = project.images.length;
    
    modalTitle.textContent = project.title;
    modalMainImage.src = project.images[currentImageIndex];
    modalCounter.textContent = `${currentImageIndex + 1} / ${total}`;
    
    // Update active thumb
    const thumbs = modalThumbsContainer.querySelectorAll('.modal-thumb');
    thumbs.forEach((thumb, idx) => {
        if (idx === currentImageIndex) {
            thumb.classList.add('active');
            thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            thumb.classList.remove('active');
        }
    });
}

function openGallery(projectKey) {
    if (!PROJECTS_DATA[projectKey]) return;
    
    currentProjectKey = projectKey;
    currentImageIndex = 0;
    
    // Generate thumbnails
    modalThumbsContainer.innerHTML = '';
    const project = PROJECTS_DATA[projectKey];
    project.images.forEach((imgSrc, idx) => {
        const thumb = document.createElement('img');
        thumb.src = imgSrc;
        thumb.alt = `${project.title} miniatura ${idx + 1}`;
        thumb.classList.add('modal-thumb');
        if (idx === 0) thumb.classList.add('active');
        thumb.addEventListener('click', () => {
            currentImageIndex = idx;
            updateModalView();
        });
        modalThumbsContainer.appendChild(thumb);
    });
    
    updateModalView();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Hide custom cursor elements so native pointer is 100% visible and responsive
    if (cursor) cursor.style.display = 'none';
    if (cursorFollower) cursorFollower.style.display = 'none';
}

function closeGallery() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Restore custom cursor
    if (cursor) cursor.style.display = 'block';
    if (cursorFollower) cursorFollower.style.display = 'block';
}

// Support mouse wheel scrolling across gallery images with smooth throttling
let isWheelThrottled = false;
if (modal) {
    modal.addEventListener('wheel', (e) => {
        if (isWheelThrottled) return;
        
        if (Math.abs(e.deltaY) > 20 || Math.abs(e.deltaX) > 20) {
            isWheelThrottled = true;
            if (e.deltaY > 0 || e.deltaX > 0) {
                nextGalleryImage();
            } else {
                prevGalleryImage();
            }
            setTimeout(() => {
                isWheelThrottled = false;
            }, 300);
        }
    }, { passive: true });
}

function nextGalleryImage() {
    if (!currentProjectKey) return;
    const total = PROJECTS_DATA[currentProjectKey].images.length;
    currentImageIndex = (currentImageIndex + 1) % total;
    updateModalView();
}

function prevGalleryImage() {
    if (!currentProjectKey) return;
    const total = PROJECTS_DATA[currentProjectKey].images.length;
    currentImageIndex = (currentImageIndex - 1 + total) % total;
    updateModalView();
}

// Client cards click listener
const clientCards = document.querySelectorAll('.client-card[data-project]');
clientCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectKey = card.getAttribute('data-project');
        openGallery(projectKey);
    });
});

// Modal event listeners
if (modalClose) modalClose.addEventListener('click', closeGallery);
if (modalNext) modalNext.addEventListener('click', nextGalleryImage);
if (modalPrev) modalPrev.addEventListener('click', prevGalleryImage);

// Close on backdrop click
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeGallery();
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeGallery();
    } else if (e.key === 'ArrowRight') {
        nextGalleryImage();
    } else if (e.key === 'ArrowLeft') {
        prevGalleryImage();
    }
});
