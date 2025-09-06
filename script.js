// Video Slider Functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
        const video = slide.querySelector('video');
        if (video) {
            video.pause();
        }
    });
    
    // Remove active class from all dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
        const video = slides[index].querySelector('video');
        if (video) {
            video.play();
        }
    }
    
    // Activate current dot
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Auto-play slider
function autoSlide() {
    changeSlide(1);
}

// Start auto-play
let slideInterval = setInterval(autoSlide, 5000);

// Pause auto-play on hover
const sliderContainer = document.querySelector('.video-slider');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(autoSlide, 5000);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .pricing-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-on-scroll', 'animated');
        }
    });
}

// Header background on scroll
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
}

// Parallax effect for hero section
function handleParallax() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// Add floating animation to feature icons
function addFloatingAnimation() {
    const icons = document.querySelectorAll('.feature-icon');
    icons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
        icon.style.animation = 'float 3s ease-in-out infinite';
    });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize first slide
    showSlide(0);
    
    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        animateOnScroll();
        handleHeaderScroll();
        handleParallax();
    });
    
    // Add floating animation to icons
    addFloatingAnimation();
    
    // Trigger initial scroll animations
    animateOnScroll();
});

// Add click effects to buttons
document.querySelectorAll('.btn, .contact-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .btn, .contact-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate elements in sequence
    const elementsToAnimate = [
        '.hero-title',
        '.hero-subtitle',
        '.hero-buttons',
        '.video-slider'
    ];
    
    elementsToAnimate.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
});

// Add initial loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    .hero-title,
    .hero-subtitle,
    .hero-buttons,
    .video-slider {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
`;
document.head.appendChild(loadingStyle);

