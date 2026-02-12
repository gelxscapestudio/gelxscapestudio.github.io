document.addEventListener('DOMContentLoaded', () => {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    // Mobile Menu Toggle
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active-mobile');
            if (navLinksContainer.classList.contains('active-mobile')) {
                navLinksContainer.style.display = 'flex';
                navLinksContainer.style.flexDirection = 'column';
                navLinksContainer.style.position = 'absolute';
                navLinksContainer.style.top = '70px';
                navLinksContainer.style.left = '0';
                navLinksContainer.style.width = '100%';
                navLinksContainer.style.backgroundColor = 'white';
                navLinksContainer.style.padding = '20px';
                navLinksContainer.style.textAlign = 'center';
                navLinksContainer.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
            } else {
                navLinksContainer.style.display = 'none';
            }
        });
    }

    // Smooth Scrolling for Hash Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinksContainer.classList.contains('active-mobile')) {
                    navLinksContainer.classList.remove('active-mobile');
                    navLinksContainer.style.display = 'none';
                }
            }
        });
    });

    // Active Link Highlighting on Scroll
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Reveal animations on scroll
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section, .hero-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        revealObserver.observe(el);
    });

    // WhatsApp Link Obfuscation
    const whatsappLinks = document.querySelectorAll('.whatsapp-link');
    whatsappLinks.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Assembling the number in parts to hide from simple scrapers
            const p1 = "+91";
            const p2 = "95279";
            const p3 = "52785";
            const msg = encodeURIComponent("Hi! I would like to book an appointment for nail art at gelXscape studio.");
            window.open(`https://wa.me/${p1}${p2}${p3}?text=${msg}`, '_blank');
        });
    });
    // Offer Modal Logic
    const modal = document.getElementById("offerModal");
    const span = document.getElementsByClassName("close-modal")[0];

    if (modal) {
        // Show modal after 1.5 seconds
        setTimeout(() => {
            modal.style.display = "flex";
            // trigger reflow
            void modal.offsetWidth;
            modal.classList.add("show");
        }, 1500);

        // Close when clicking (x)
        if (span) {
            span.onclick = function() {
                modal.classList.remove("show");
                setTimeout(() => {
                    modal.style.display = "none";
                }, 300);
            }
        }

        // Close when clicking outside
        window.onclick = function(event) {
            if (event.target == modal) {
               modal.classList.remove("show");
               setTimeout(() => {
                    modal.style.display = "none";
                }, 300);
            }
        }
    }
});
