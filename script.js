const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const hoverElements = document.querySelectorAll('.hover-invert, .hover-invert-black, .marquee-container, button, a, .hero-cta-btn, .btn-contact, .benefit-item, .showcase-nav-btn');

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
        if (target && (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('.showcase-nav-btn') || target.closest('.accordion-header') || target.closest('.benefit-item') || target.closest('.hero-cta-btn'))) {
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
// Showcase Slider Logic (Full-Width Editorial Gallery)
// =========================================================================
const showcaseSlides = document.querySelectorAll('.showcase-slide');
const totalShowcaseSlides = showcaseSlides.length;
const showcaseCounter = document.getElementById('showcase-counter');
const showcaseProgressBar = document.getElementById('showcase-progress-bar');
const showcasePrevBtn = document.getElementById('showcase-prev');
const showcaseNextBtn = document.getElementById('showcase-next');
const showcaseSliderWrapper = document.getElementById('showcase-slider');
let currentShowcaseIndex = 0;

function goToShowcaseSlide(index) {
    if (totalShowcaseSlides === 0) return;
    
    if (index < 0) {
        currentShowcaseIndex = totalShowcaseSlides - 1;
    } else if (index >= totalShowcaseSlides) {
        currentShowcaseIndex = 0;
    } else {
        currentShowcaseIndex = index;
    }

    showcaseSlides.forEach((slide, idx) => {
        if (idx === currentShowcaseIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    if (showcaseCounter) {
        const cur = String(currentShowcaseIndex + 1).padStart(2, '0');
        const tot = String(totalShowcaseSlides).padStart(2, '0');
        showcaseCounter.textContent = `${cur} / ${tot}`;
    }

    if (showcaseProgressBar) {
        const pct = ((currentShowcaseIndex + 1) / totalShowcaseSlides) * 100;
        showcaseProgressBar.style.width = `${pct}%`;
    }
}

if (showcasePrevBtn) {
    showcasePrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToShowcaseSlide(currentShowcaseIndex - 1);
    });
}

if (showcaseNextBtn) {
    showcaseNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToShowcaseSlide(currentShowcaseIndex + 1);
    });
}

// Touch Swipe Gestures (Mobile-first UX)
if (showcaseSliderWrapper) {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    showcaseSliderWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
        touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    showcaseSliderWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // Only trigger if horizontal swipe is intentional and exceeds threshold
        if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
            if (deltaX < 0) {
                goToShowcaseSlide(currentShowcaseIndex + 1);
            } else {
                goToShowcaseSlide(currentShowcaseIndex - 1);
            }
        }
    }, { passive: true });
}

// Keyboard Arrow Navigation when section is in view
document.addEventListener('keydown', (e) => {
    if (!showcaseSliderWrapper) return;
    const rect = showcaseSliderWrapper.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isInView) {
        if (e.key === 'ArrowRight') {
            goToShowcaseSlide(currentShowcaseIndex + 1);
        } else if (e.key === 'ArrowLeft') {
            goToShowcaseSlide(currentShowcaseIndex - 1);
        }
    }
});
