// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navButtons = document.querySelector('.nav-buttons');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navButtons.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navButtons.classList.remove('active');
    });
});

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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.step, .feature-card, .company-card, .testimonial-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Phone mockup card animations
const cards = document.querySelectorAll('.card');
const swipeButtons = document.querySelectorAll('.swipe-left, .swipe-right');

swipeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = document.querySelector('.card-1');
        if (button.classList.contains('swipe-left')) {
            card.style.transform = 'translateX(-100px) rotate(-10deg)';
            card.style.opacity = '0';
        } else {
            card.style.transform = 'translateX(100px) rotate(10deg)';
            card.style.opacity = '0';
        }
        
        setTimeout(() => {
            card.style.transform = 'translateX(0) rotate(0deg)';
            card.style.opacity = '1';
        }, 1000);
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name') || contactForm.querySelector('input[type="text"]').value;
        const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
        const subject = formData.get('subject') || contactForm.querySelector('input[placeholder="Subject"]').value;
        const message = formData.get('message') || contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Download buttons functionality
document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent.includes('Download')) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Simulate app store redirect
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            const isAndroid = /Android/.test(navigator.userAgent);
            
            if (isIOS) {
                alert('Redirecting to App Store...');
            } else if (isAndroid) {
                alert('Redirecting to Google Play Store...');
            } else {
                alert('Please visit your device\'s app store to download Fliptern!');
            }
        });
    }
});

// Stats counter animation
const stats = document.querySelectorAll('.stat h3');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = target.textContent;
            const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
            
            let currentValue = 0;
            const increment = numericValue / 50;
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    target.textContent = finalValue;
                    clearInterval(counter);
                } else {
                    target.textContent = Math.floor(currentValue) + finalValue.replace(/[\d]/g, '');
                }
            }, 30);
            
            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    statsObserver.observe(stat);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero && heroContent && heroVisual) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
        heroVisual.style.transform = `translateY(${rate * 0.3}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add hover effects for interactive elements
document.querySelectorAll('.feature-card, .company-card, .testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Set the static parts first
        heroTitle.innerHTML = `
            <em>Internships.</em> <em>Reimagined.</em> 
            <span class="gradient-text" style="color: #2979FF !important; font-weight: 700; font-style: normal;"></span>
        `;
        
        const gradientSpan = heroTitle.querySelector('.gradient-text');
        const targetText = "Swipe your way to your dream role.";
        let i = 0;
        
        function typeGradientText() {
            if (i < targetText.length) {
                gradientSpan.textContent = targetText.slice(0, i + 1);
                i++;
                setTimeout(typeGradientText, 50);
            }
        }
        
        // Start typing the gradient text after a short delay
        setTimeout(typeGradientText, 500);
    }
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(135deg, #2979FF 0%, #5C9EFF 100%);
    z-index: 1001;
    transition: width 0.3s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Add floating action button for quick navigation
const fab = document.createElement('div');
fab.innerHTML = '<i class="fas fa-arrow-up"></i>';
fab.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #2979FF 0%, #5C9EFF 100%);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 5px 20px rgba(41, 121, 255, 0.3);
    transition: all 0.3s ease;
    z-index: 1000;
    opacity: 0;
    transform: translateY(100px);
`;

document.body.appendChild(fab);

// Show/hide FAB based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        fab.style.opacity = '1';
        fab.style.transform = 'translateY(0)';
    } else {
        fab.style.opacity = '0';
        fab.style.transform = 'translateY(100px)';
    }
});

// FAB click to scroll to top
fab.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to FAB
fab.addEventListener('mouseenter', () => {
    fab.style.transform = 'translateY(-5px) scale(1.1)';
});

fab.addEventListener('mouseleave', () => {
    fab.style.transform = 'translateY(0) scale(1)';
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navButtons.classList.remove('active');
    }
});

// Add touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - could be used for navigation
            console.log('Swiped left');
        } else {
            // Swipe right - could be used for navigation
            console.log('Swiped right');
        }
    }
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations and effects
}, 16)); // ~60fps

// Slideshow functionality
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const slideshowContainer = document.querySelector('.slideshow-container');
    let currentSlide = 0;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Event listeners for navigation
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Auto-play slideshow (optional)
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Start auto-play when slideshow is in view
    const slideshowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAutoPlay();
                // Show navigation when slideshow is in view
                if (prevBtn) prevBtn.classList.add('visible');
                if (nextBtn) nextBtn.classList.add('visible');
                const dotsContainer = document.querySelector('.slideshow-dots');
                if (dotsContainer) dotsContainer.classList.add('visible');
            } else {
                stopAutoPlay();
                // Hide navigation when slideshow is out of view
                if (prevBtn) prevBtn.classList.remove('visible');
                if (nextBtn) nextBtn.classList.remove('visible');
                const dotsContainer = document.querySelector('.slideshow-dots');
                if (dotsContainer) dotsContainer.classList.remove('visible');
            }
        });
    }, { threshold: 0.5 });

    if (slideshowContainer) {
        slideshowObserver.observe(slideshowContainer);
    }

    // Pause auto-play on hover
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', stopAutoPlay);
        slideshowContainer.addEventListener('mouseleave', startAutoPlay);
    }
});

// Video Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const videoModal = document.getElementById('videoModal');
    const demoBtn = document.getElementById('demoBtn');
    const closeModal = document.getElementById('closeModal');
    const demoVideo = document.getElementById('demoVideo');

    // Open video modal
    if (demoBtn) {
        demoBtn.addEventListener('click', () => {
            videoModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            // Autoplay video when modal opens
            if (demoVideo) {
                demoVideo.muted = false; // Turn on volume
                demoVideo.play().catch(e => console.log('Autoplay prevented:', e));
            }
        });
    }

    // Close video modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            videoModal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
            if (demoVideo) demoVideo.pause(); // Pause video when closing
        });
    }

    // Close modal when clicking outside
    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.classList.remove('show');
                document.body.style.overflow = '';
                if (demoVideo) demoVideo.pause();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal && videoModal.classList.contains('show')) {
            videoModal.classList.remove('show');
            document.body.style.overflow = '';
            if (demoVideo) demoVideo.pause();
        }
    });
});

// Image Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const imageModal = document.getElementById('imageModal');
    const closeImageModal = document.getElementById('closeImageModal');
    const modalImage = document.getElementById('modalImage');
    const imageModalTitle = document.getElementById('imageModalTitle');

    // Open image modal
    window.openImageModal = function(imageSrc, imageTitle) {
        modalImage.src = imageSrc;
        imageModalTitle.textContent = imageTitle;
        imageModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Close image modal
    if (closeImageModal) {
        closeImageModal.addEventListener('click', () => {
            imageModal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }

    // Close modal when clicking outside
    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                imageModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageModal && imageModal.classList.contains('show')) {
            imageModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
}); 