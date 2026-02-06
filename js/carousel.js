/**
 * 3D Coverflow Carousel
 * Infinite circular carousel with smooth 3D CSS transitions
 */

class Carousel3D {
    constructor(element, options = {}) {
        this.carousel = element;
        this.container = element.querySelector('.carousel-3d__container');
        this.slides = Array.from(element.querySelectorAll('.carousel-3d__slide'));
        this.prevBtn = element.querySelector('.carousel-3d__arrow--prev');
        this.nextBtn = element.querySelector('.carousel-3d__arrow--next');
        this.dotsContainer = element.querySelector('.carousel-3d__indicators');
        this.counterCurrent = element.querySelector('.carousel-3d__counter-current');
        this.counterTotal = element.querySelector('.carousel-3d__counter-total');

        this.options = {
            startIndex: 0,
            autoplay: true,
            autoplayInterval: 5000,
            spacing: 380,
            rotation: 45,
            scale: 0.75,
            opacity: 0.6,
            depthScale: 150,
            visibleSlides: 3,
            animationDuration: 800,
            ...options
        };

        this.currentIndex = this.options.startIndex;
        this.isAnimating = false;
        this.autoplayTimer = null;
        this.totalSlides = this.slides.length;

        this.init();
    }

    init() {
        if (this.slides.length === 0) return;

        this.setupSlides();
        this.bindEvents();

        // Initial position — no transition on first paint
        this.slides.forEach(s => s.classList.add('no-transition'));
        this.positionSlides();
        this.updateIndicators();

        // Enable transitions after the first frame paints
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.slides.forEach(s => s.classList.remove('no-transition'));
            });
        });

        if (this.options.autoplay) {
            this.startAutoplay();
        }

        this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
        this.carousel.addEventListener('mouseleave', () => {
            if (this.options.autoplay) this.startAutoplay();
        });
    }

    setupSlides() {
        this.slides.forEach((slide, index) => {
            slide.dataset.index = index;
            slide.addEventListener('click', () => {
                if (index !== this.currentIndex) {
                    this.goToSlide(index);
                }
            });
        });

        if (this.dotsContainer) {
            this.dotsContainer.innerHTML = '';
            this.slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = 'carousel-3d__dot';
                dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                dot.addEventListener('click', () => this.goToSlide(index));
                this.dotsContainer.appendChild(dot);
            });
        }

        if (this.counterTotal) {
            this.counterTotal.textContent = this.totalSlides;
        }
    }

    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }

        this.carousel.setAttribute('tabindex', '0');
        this.carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') { e.preventDefault(); this.prev(); }
            else if (e.key === 'ArrowRight') { e.preventDefault(); this.next(); }
        });

        let touchStartX = 0;
        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            this.stopAutoplay();
        }, { passive: true });

        this.carousel.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? this.next() : this.prev();
            }
            if (this.options.autoplay) this.startAutoplay();
        }, { passive: true });
    }

    goToSlide(index, animate = true) {
        if (this.isAnimating && animate) return;

        if (index < 0) index = this.totalSlides - 1;
        else if (index >= this.totalSlides) index = 0;

        this.currentIndex = index;

        if (animate) {
            this.isAnimating = true;
            // CSS transitions handle the actual animation
            this.positionSlides();
            this.updateIndicators(true);

            // Unlock after CSS transition finishes
            setTimeout(() => {
                this.isAnimating = false;
            }, this.options.animationDuration + 50);
        } else {
            this.positionSlides();
            this.updateIndicators();
        }
    }

    /**
     * Core: position every slide based on its offset from currentIndex.
     * The CSS transition on .carousel-3d__slide does the smooth animation.
     */
    positionSlides() {
        const { spacing, rotation, scale, opacity, depthScale, visibleSlides } = this.options;

        this.slides.forEach((slide, index) => {
            const offset = this.circularOffset(index, this.currentIndex, this.totalSlides);
            const absOffset = Math.abs(offset);
            const dir = offset < 0 ? -1 : 1;

            // Hide far-away slides
            if (absOffset > visibleSlides) {
                slide.style.transform = `translateX(${dir * 900}px) translateZ(-600px) rotateY(${-dir * 60}deg) scale(0.4)`;
                slide.style.opacity = '0';
                slide.style.zIndex = '0';
                slide.style.filter = 'blur(6px)';
                slide.style.pointerEvents = 'none';
                slide.classList.remove('carousel-3d__slide--active');
                return;
            }

            let tx, tz, ry, sc, op, bl;

            if (offset === 0) {
                // Active / center slide
                tx = 0;
                tz = 0;
                ry = 0;
                sc = 1;
                op = 1;
                bl = 0;
            } else {
                tx = offset * spacing;
                tz = -absOffset * depthScale;
                ry = -offset * rotation;
                sc = 1 - absOffset * (1 - scale);
                op = 1 - absOffset * (1 - opacity);
                bl = Math.min(absOffset * 1.5, 4);
            }

            slide.style.transform = `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${sc})`;
            slide.style.opacity = `${op}`;
            slide.style.zIndex = `${20 - absOffset}`;
            slide.style.filter = `blur(${bl}px)`;
            slide.style.pointerEvents = offset === 0 ? 'auto' : 'auto';

            slide.classList.toggle('carousel-3d__slide--active', offset === 0);
        });
    }

    circularOffset(index, current, total) {
        let offset = index - current;
        if (offset > total / 2) offset -= total;
        else if (offset < -total / 2) offset += total;
        return offset;
    }

    updateIndicators(animate = false) {
        if (this.dotsContainer) {
            const dots = this.dotsContainer.querySelectorAll('.carousel-3d__dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('carousel-3d__dot--active', i === this.currentIndex);
            });
        }

        if (this.counterCurrent) {
            if (animate) {
                this.counterCurrent.classList.add('carousel-counter--animating');
                setTimeout(() => {
                    this.counterCurrent.textContent = this.currentIndex + 1;
                    this.counterCurrent.classList.remove('carousel-counter--animating');
                }, 250);
            } else {
                this.counterCurrent.textContent = this.currentIndex + 1;
            }
        }
    }

    prev() { this.goToSlide(this.currentIndex - 1); }
    next() { this.goToSlide(this.currentIndex + 1); }

    startAutoplay() {
        this.stopAutoplay();
        this.autoplayTimer = setInterval(() => this.next(), this.options.autoplayInterval);
    }

    stopAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    }

    destroy() { this.stopAutoplay(); }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-3d');
    carousels.forEach(carousel => {
        new Carousel3D(carousel, {
            autoplay: true,
            autoplayInterval: 5000,
            spacing: 340,
            rotation: 42,
            scale: 0.78,
            opacity: 0.45,
            depthScale: 160,
            visibleSlides: 3,
            animationDuration: 650
        });
    });
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Carousel3D };
}
