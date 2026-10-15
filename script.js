const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const hoverElements = document.querySelectorAll('.hover-invert, .hover-invert-black, .marquee-container, button, a, .hero-cta-btn, .btn-contact, .benefit-item, .carousel-arrow-btn, .carousel-float-btn, .carousel-card');

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
        if (target && (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('.carousel-arrow-btn') || target.closest('.carousel-float-btn') || target.closest('.carousel-card') || target.closest('.accordion-header') || target.closest('.benefit-item') || target.closest('.hero-cta-btn'))) {
            cursor.classList.add('hover-active');
            cursorFollower.style.opacity = '0';
        } else {
            cursor.classList.remove('hover-active');
            if (hasMoved) {
                cursorFollower.style.opacity = '1';
            }
        }
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        if (hasMoved) {
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

// =========================================================================
// Horizontal Carousel Navigation (Zero wheel interception, no scroll lock)
// =========================================================================
const carouselTrack = document.getElementById('carousel-track');
const carouselCards = document.querySelectorAll('.carousel-card');
const totalCarouselCards = carouselCards.length;
const carouselCounter = document.getElementById('carousel-counter');
const carouselProgressThumb = document.getElementById('carousel-progress-thumb');
const carouselPrevBtns = [document.getElementById('carousel-prev'), document.getElementById('carousel-float-prev')];
const carouselNextBtns = [document.getElementById('carousel-next'), document.getElementById('carousel-float-next')];

function updateCarouselProgress() {
    if (!carouselTrack || totalCarouselCards === 0) return;

    const maxScroll = carouselTrack.scrollWidth - carouselTrack.clientWidth;
    const progress = maxScroll > 0 ? (carouselTrack.scrollLeft / maxScroll) : 0;

    if (carouselProgressThumb) {
        // Thumb track width is 240px, thumb is 36px
        const maxTranslate = 240 - 36;
        carouselProgressThumb.style.transform = `translateX(${progress * maxTranslate}px)`;
    }

    if (carouselCards[0]) {
        const cardWidth = carouselCards[0].offsetWidth + 24; // width + gap
        let activeIdx = Math.min(totalCarouselCards, Math.max(1, Math.round(carouselTrack.scrollLeft / cardWidth) + 1));
        if (carouselCounter) {
            const cur = String(activeIdx).padStart(2, '0');
            const tot = String(totalCarouselCards).padStart(2, '0');
            carouselCounter.textContent = `${cur} / ${tot}`;
        }
    }
}

if (carouselTrack) {
    carouselTrack.addEventListener('scroll', updateCarouselProgress, { passive: true });
    updateCarouselProgress();
}

function getCarouselScrollDistance() {
    if (!carouselCards[0]) return 400;
    // On desktop scroll by ~1.5 cards, on mobile by 1 card
    return window.innerWidth > 768 ? carouselCards[0].offsetWidth * 1.5 : carouselCards[0].offsetWidth + 16;
}

carouselPrevBtns.forEach(btn => {
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (carouselTrack) {
                carouselTrack.scrollBy({ left: -getCarouselScrollDistance(), behavior: 'smooth' });
            }
        });
    }
});

carouselNextBtns.forEach(btn => {
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (carouselTrack) {
                carouselTrack.scrollBy({ left: getCarouselScrollDistance(), behavior: 'smooth' });
            }
        });
    }
});

// =========================================================================
// Full-Screen Lightbox Modal Logic (Sem legendas, apenas foto pura em alta resolução)
// =========================================================================
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCounter = document.getElementById('lightbox-counter');
const lightboxCloseBtn = document.getElementById('lightbox-close');
const lightboxPrevBtn = document.getElementById('lightbox-prev');
const lightboxNextBtn = document.getElementById('lightbox-next');
const lightboxWrapper = document.getElementById('lightbox-content-wrapper');

// Collect all 26 image paths from carousel cards
const carouselImages = Array.from(carouselCards).map(card => {
    const img = card.querySelector('.carousel-img');
    return img ? img.getAttribute('src') : '';
});

let currentLightboxIndex = 0;

function updateLightboxView() {
    if (!lightboxImg || carouselImages.length === 0) return;
    
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.97)';
    
    setTimeout(() => {
        lightboxImg.src = carouselImages[currentLightboxIndex];
        if (lightboxCounter) {
            const cur = String(currentLightboxIndex + 1).padStart(2, '0');
            const tot = String(carouselImages.length).padStart(2, '0');
            lightboxCounter.textContent = `${cur} / ${tot}`;
        }
        lightboxImg.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
    }, 100);
}

function openLightbox(index) {
    if (index < 0 || index >= carouselImages.length) return;
    currentLightboxIndex = index;
    updateLightboxView();
    if (lightboxModal) {
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    if (cursor) cursor.style.display = 'none';
    if (cursorFollower) cursorFollower.style.display = 'none';
}

function closeLightbox() {
    if (lightboxModal) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    if (cursor) cursor.style.display = '';
    if (cursorFollower) cursorFollower.style.display = '';
}

function nextLightbox() {
    currentLightboxIndex = (currentLightboxIndex + 1) % carouselImages.length;
    updateLightboxView();
}

function prevLightbox() {
    currentLightboxIndex = (currentLightboxIndex - 1 + carouselImages.length) % carouselImages.length;
    updateLightboxView();
}

// Click on any carousel card opens full-screen lightbox
carouselCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
        openLightbox(idx);
    });
});

if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextLightbox(); });
if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevLightbox(); });

// Close on backdrop click (outside image)
if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal || e.target === lightboxWrapper) {
            closeLightbox();
        }
    });
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextLightbox();
        } else if (e.key === 'ArrowLeft') {
            prevLightbox();
        }
    }
});

// Mobile touch swipe in lightbox
if (lightboxModal) {
    let lbTouchStartX = 0;
    let lbTouchStartY = 0;
    let lbTouchEndX = 0;
    let lbTouchEndY = 0;

    lightboxModal.addEventListener('touchstart', (e) => {
        lbTouchStartX = e.changedTouches[0].clientX;
        lbTouchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
        lbTouchEndX = e.changedTouches[0].clientX;
        lbTouchEndY = e.changedTouches[0].clientY;
        const deltaX = lbTouchEndX - lbTouchStartX;
        const deltaY = lbTouchEndY - lbTouchStartY;

        if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
            if (deltaX < 0) {
                nextLightbox();
            } else {
                prevLightbox();
            }
        }
    }, { passive: true });
}
