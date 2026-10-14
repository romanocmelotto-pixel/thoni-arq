const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const hoverElements = document.querySelectorAll('.hover-invert, .hover-invert-black, .marquee-container, button, a, .hero-cta-btn, .btn-contact, .benefit-item, .showcase-nav-btn, .carousel-arrow-btn, .carousel-float-btn');

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
        if (target && (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('.carousel-arrow-btn') || target.closest('.carousel-float-btn') || target.closest('.accordion-header') || target.closest('.benefit-item') || target.closest('.hero-cta-btn'))) {
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
// Horizontal Continuous Showcase Carousel Logic (26 Fotos Verticais)
// =========================================================================
const carouselTrack = document.getElementById('carousel-track');
const carouselContainer = document.getElementById('carousel-container');
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

// Mouse Wheel: Scroll Horizontal suave ao passar o mouse sobre o carrossel
if (carouselContainer && carouselTrack) {
    carouselContainer.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            const maxScroll = carouselTrack.scrollWidth - carouselTrack.clientWidth;
            const atStart = carouselTrack.scrollLeft <= 5 && e.deltaY < 0;
            const atEnd = carouselTrack.scrollLeft >= maxScroll - 5 && e.deltaY > 0;

            // Se puder rolar horizontalmente no carrossel, converte a rolagem vertical em horizontal
            if (!atStart && !atEnd && maxScroll > 0) {
                e.preventDefault();
                carouselTrack.scrollLeft += e.deltaY * 1.3;
            }
        }
    }, { passive: false });
}

// Drag com Mouse (arrasto livre no desktop)
if (carouselTrack) {
    let isDown = false;
    let startX = 0;
    let scrollStartLeft = 0;

    carouselTrack.addEventListener('mousedown', (e) => {
        isDown = true;
        carouselTrack.classList.add('is-dragging');
        startX = e.pageX - carouselTrack.offsetLeft;
        scrollStartLeft = carouselTrack.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
        if (isDown) {
            isDown = false;
            carouselTrack.classList.remove('is-dragging');
        }
    });

    carouselTrack.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carouselTrack.offsetLeft;
        const walk = (x - startX) * 1.6;
        carouselTrack.scrollLeft = scrollStartLeft - walk;
    });
}

// Keyboard Arrow Navigation when carousel is in view
document.addEventListener('keydown', (e) => {
    if (!carouselContainer || !carouselTrack) return;
    const rect = carouselContainer.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInView) {
        if (e.key === 'ArrowRight') {
            carouselTrack.scrollBy({ left: getCarouselScrollDistance(), behavior: 'smooth' });
        } else if (e.key === 'ArrowLeft') {
            carouselTrack.scrollBy({ left: -getCarouselScrollDistance(), behavior: 'smooth' });
        }
    }
});
