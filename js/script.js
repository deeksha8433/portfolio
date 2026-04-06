// Basic JavaScript for portfolio functionality

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

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.backgroundColor = '#fff';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Circular progress animation for skills
function initializeSkillCircles() {
    const skillCircles = document.querySelectorAll('.skill-circle');

    skillCircles.forEach(circle => {
        const progressCircle = circle.querySelector('.progress-ring-circle');
        const percentage = circle.dataset.percent;
        const radius = parseInt(progressCircle.getAttribute('r'));
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;

        // Initially set to empty
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = circumference;
    });

    // Intersection Observer for skills section
    const skillsSection = document.getElementById('skills');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate all skill circles with staggered delay
                skillCircles.forEach((circle, index) => {
                    setTimeout(() => {
                        const progressCircle = circle.querySelector('.progress-ring-circle');
                        const percentage = circle.dataset.percent;
                        const radius = parseInt(progressCircle.getAttribute('r'));
                        const circumference = 2 * Math.PI * radius;
                        const offset = circumference - (percentage / 100) * circumference;

                        progressCircle.style.strokeDashoffset = offset;

                        // Add glow effect
                        circle.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.4)';
                        setTimeout(() => {
                            circle.style.boxShadow = '';
                        }, 2000);
                    }, index * 200); // Staggered animation
                });

                // Stop observing after animation
                skillsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '0px 0px -100px 0px'
    });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
}

// Initialize skill circles on page load
initializeSkillCircles();

// Re-initialize on window resize for responsive design
window.addEventListener('resize', initializeSkillCircles);

// Add pulse animation keyframes (will be added to CSS)
const style = document.createElement('style');
style.textContent = `
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}`;
document.head.appendChild(style);