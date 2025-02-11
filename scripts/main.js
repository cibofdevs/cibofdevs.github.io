import anime from './anime.es.js';
import config from './config.js';

// Initialize typed.js
const typed = new Typed('#typewriter-text', {
    strings: [
        'Software Engineer',
        'Backend Developer',
        'Cloud Engineer'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your public key
    emailjs.init(config.EMAILJS_PUBLIC_KEY);

    // Update current year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Initialize container positions
    let containerPositions = {
        'intro': document.getElementById('intro')?.offsetTop || 0,
        'about': document.getElementById('about')?.offsetTop || 0,
        'experience': document.getElementById('experience')?.offsetTop || 0,
        'contact': document.getElementById('contact')?.offsetTop || 0
    };

    // Initialize shown status
    let containerShown = {};

    // Animation function
    function animate(containerId) {
        const animateClass = `animate-${containerId}`;
        const elements = document.getElementsByClassName(animateClass);

        anime({
            targets: elements,
            opacity: [0, 1],
            translateY: [20, 0],
            easing: 'easeOutExpo',
            duration: 800,
            delay: anime.stagger(200)
        });

        containerShown[containerId] = true;
    }

    // Scroll handler
    function handleScroll() {
        const currentPosition = window.pageYOffset + window.innerHeight;

        for (const [key, value] of Object.entries(containerPositions)) {
            if (!containerShown[key] && currentPosition > value) {
                animate(key);
            }
        }
    }

    // Initialize scroll listener
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Navbar toggler animation
    const navbarToggler = document.querySelector('.navbar-toggler');
    navbarToggler.addEventListener('click', function() {
        this.classList.toggle('active');
    });

    // Experience timeline toggle
    const showMoreBtn = document.getElementById('showMore');
    const previousPositions = document.querySelector('.previous-positions');

    if (showMoreBtn && previousPositions) {
        // Set initial state
        previousPositions.style.display = 'none';
        previousPositions.style.opacity = '0';

        showMoreBtn.addEventListener('click', function() {
            console.log('Button clicked');

            if (previousPositions.style.display === 'none' || previousPositions.style.display === '') {
                previousPositions.style.display = 'block';
                setTimeout(() => {
                    previousPositions.style.opacity = '1';
                }, 10);
                showMoreBtn.textContent = 'Hide Previous Positions';
                showMoreBtn.classList.add('active');
            } else {
                previousPositions.style.opacity = '0';
                setTimeout(() => {
                    previousPositions.style.display = 'none';
                }, 300);
                showMoreBtn.textContent = 'Show Previous Positions';
                showMoreBtn.classList.remove('active');
            }
        });
    }

    // Navbar active state
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function setActiveLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);

    // Menutup navbar saat link diklik di mobile
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarToggler.classList.contains('active')) {
                navbarToggler.classList.remove('active');
                // Collapse navbar
                const navbarCollapse = document.querySelector('.navbar-collapse');
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Contact form handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            try {
                const templateParams = {
                    from_name: document.getElementById('name').value,
                    from_email: document.getElementById('email').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value,
                    to_email: 'cibofdev@gmail.com'
                };

                await emailjs.send(
                    config.EMAILJS_SERVICE_ID,
                    config.EMAILJS_TEMPLATE_ID,
                    templateParams
                );

                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } catch (error) {
                console.error('Error sending email:', error);
                alert('Sorry, there was an error sending your message. Please try again later.');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Send Message';
            }
        });
    }
});