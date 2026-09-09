document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active'); // Animate hamburger into X
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    // Sticky Navbar on Scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Simple Add to Cart Interaction with Animation
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    const cartIconElement = document.querySelector('.cart-icon');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Increment cart count
            cartCount++;
            cartCountElement.textContent = cartCount;

            // Bump animation for the cart icon
            cartIconElement.classList.remove('bump');
            void cartIconElement.offsetWidth; // Trigger reflow to restart animation
            cartIconElement.classList.add('bump');

            // Visual feedback on the button
            const originalText = button.textContent;
            button.textContent = 'Added to Cart!';
            button.style.backgroundColor = 'var(--primary-color)';
            button.style.color = 'white';
            button.style.transform = 'scale(0.95)';

            // Reset button after 1.5 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = 'transparent';
                button.style.color = 'var(--primary-color)';
                button.style.transform = 'scale(1)';
            }, 1500);
        });
    });

    // =========================================
    // Intersection Observer for Scroll Animations
    // =========================================
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    // Observer options: Trigger when 15% of the element is visible
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'show' class to trigger CSS transition
                entry.target.classList.add('show');
                
                // Optional: Stop observing once animated to prevent re-animating
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe each element
    animateElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // Animate hero elements immediately on load since they might already be in viewport
    setTimeout(() => {
        const heroElements = document.querySelectorAll('#hero .animate-on-scroll');
        heroElements.forEach(el => el.classList.add('show'));
    }, 100);
});
