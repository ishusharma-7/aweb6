/**
 * Micro Seeds & Agritech Solutions
 * Main Interaction Script
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Scroll for Navigation Links
    const handleSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for sticky header
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // 2. Sticky Header Transformation
    const header = document.querySelector('nav');
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-md', 'py-2');
            header.classList.remove('py-4');
        } else {
            header.classList.remove('shadow-md', 'py-2');
            header.classList.add('py-4');
        }
    };

    // 3. Counter Animation for Stats Section
    // (Animates 50,000+, 200+, etc., when they come into view)
    const animateCounters = () => {
        const stats = document.querySelectorAll('.stat-number');
        const speed = 200;

        stats.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/,/g, '').replace('+', '');
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc).toLocaleString() + '+';
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target.toLocaleString() + '+';
                }
            };
            
            // Trigger via Intersection Observer
            const observer = new IntersectionObserver((entries) => {
                if(entries[0].isIntersecting) {
                    updateCount();
                    observer.unobserve(counter);
                }
            });
            observer.observe(counter);
        });
    };

    // 4. Simple Form Validation for "Get Quote"
    const setupFormAlert = () => {
        const quoteButtons = document.querySelectorAll('button:contains("Get Quote")');
        quoteButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                alert("Thank you for your interest! Our agronomists will contact you shortly.");
            });
        });
    };

    // Initialize Functions
    handleSmoothScroll();
    animateCounters();
    window.addEventListener('scroll', handleHeaderScroll);
});