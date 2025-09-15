let currentSlide = 0;
const totalSlides = 3;

function initSwipe() {
    const wrapper = document.getElementById('swipe-wrapper');
    const dots = document.querySelectorAll('.dot');
    
    if (!wrapper || !dots.length) return;
    
    // Click on dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Touch/swipe support
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    wrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
    wrapper.addEventListener('touchmove', handleTouchMove, { passive: true });
    wrapper.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Mouse support for desktop
    wrapper.addEventListener('mousedown', handleMouseStart);
    wrapper.addEventListener('mousemove', handleMouseMove);
    wrapper.addEventListener('mouseup', handleMouseEnd);
    wrapper.addEventListener('mouseleave', handleMouseEnd);
    
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
    }
    
    function handleTouchMove(e) {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    }
    
    function handleTouchEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        
        const deltaX = startX - currentX;
        const threshold = 50;
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0 && currentSlide < totalSlides - 1) {
                goToSlide(currentSlide + 1);
            } else if (deltaX < 0 && currentSlide > 0) {
                goToSlide(currentSlide - 1);
            }
        }
    }
    
    function handleMouseStart(e) {
        startX = e.clientX;
        isDragging = true;
        e.preventDefault();
    }
    
    function handleMouseMove(e) {
        if (!isDragging) return;
        currentX = e.clientX;
        e.preventDefault();
    }
    
    function handleMouseEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        
        const deltaX = startX - currentX;
        const threshold = 50;
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0 && currentSlide < totalSlides - 1) {
                goToSlide(currentSlide + 1);
            } else if (deltaX < 0 && currentSlide > 0) {
                goToSlide(currentSlide - 1);
            }
        }
    }
    
    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('content-experiences').style.display !== 'none') {
            if (e.key === 'ArrowLeft' && currentSlide > 0) {
                goToSlide(currentSlide - 1);
            } else if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
                goToSlide(currentSlide + 1);
            }
        }
    });
}

function goToSlide(slideIndex) {
    if (slideIndex < 0 || slideIndex >= totalSlides) return;
    
    currentSlide = slideIndex;
    
    const wrapper = document.getElementById('swipe-wrapper');
    const slides = document.querySelectorAll('.swipe-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (!wrapper || !slides.length || !dots.length) return;
    
    // Update transform
    const translateX = -(slideIndex * 33.33);
    wrapper.style.transform = `translateX(${translateX}%)`;
    
    // Update active states
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === slideIndex);
    });
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initSwipe);