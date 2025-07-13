const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const seedTemplates = async () => {
  try {
    console.log('🌱 Seeding templates...');

    // Cosmetics Template
    await prisma.template.upsert({
      where: { id: 'cosmetics-template-1' },
      update: {},
      create: {
        id: 'cosmetics-template-1',
        name: 'Beauty Elegance',
        industry: 'cosmetics',
        description: 'A stunning template perfect for beauty salons, cosmetic brands, and skincare businesses.',
        preview_image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop',
        html_content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{BUSINESS_NAME}} - Premium Beauty & Cosmetics</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-brand">
                <img src="{{LOGO_URL}}" alt="{{BUSINESS_NAME}}" class="logo-img">
                <span class="brand-text">{{BUSINESS_NAME}}</span>
            </div>
            <div class="nav-menu" id="nav-menu">
                <a href="#home" class="nav-link">Home</a>
                <a href="#about" class="nav-link">About</a>
                <a href="#products" class="nav-link">Products</a>
                <a href="#services" class="nav-link">Services</a>
                <a href="#contact" class="nav-link">Contact</a>
            </div>
            <div class="nav-toggle" id="nav-toggle">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-background">
            <img src="{{HERO_IMAGE_URL}}" alt="Beauty" class="hero-bg-image">
            <div class="hero-overlay"></div>
        </div>
        <div class="hero-content">
            <div class="hero-text">
                <h1 class="hero-title">
                    <span class="title-main">{{BUSINESS_NAME}}</span>
                    <span class="title-accent">{{TAGLINE}}</span>
                </h1>
                <p class="hero-description">{{DESCRIPTION}}</p>
                <div class="hero-buttons">
                    <button class="btn btn-primary">
                        <span>Discover Beauty</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                    <button class="btn btn-secondary">
                        <i class="fas fa-play"></i>
                        <span>Watch Story</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="scroll-indicator">
            <div class="scroll-arrow"></div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <div class="section-header">
                <span class="section-subtitle">Our Story</span>
                <h2 class="section-title">Beauty Redefined</h2>
                <div class="section-divider"></div>
            </div>
            <div class="about-content">
                <div class="about-text">
                    <p class="about-description">{{DESCRIPTION}}</p>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <div class="stat-number">10K+</div>
                            <div class="stat-label">Happy Clients</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">5+</div>
                            <div class="stat-label">Years Experience</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">100%</div>
                            <div class="stat-label">Natural Products</div>
                        </div>
                    </div>
                </div>
                <div class="about-image">
                    <div class="image-wrapper">
                        <img src="{{HERO_IMAGE_URL}}" alt="About Us" class="about-img">
                        <div class="image-decoration"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Products Section -->
    <section id="products" class="products">
        <div class="container">
            <div class="section-header">
                <span class="section-subtitle">Our Collection</span>
                <h2 class="section-title">Premium Products</h2>
                <div class="section-divider"></div>
            </div>
            <div class="products-grid">
                {{PRODUCTS}}
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services">
        <div class="container">
            <div class="section-header">
                <span class="section-subtitle">What We Offer</span>
                <h2 class="section-title">Our Services</h2>
                <div class="section-divider"></div>
            </div>
            <div class="services-grid">
                {{SERVICES}}
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <div class="container">
            <div class="contact-content">
                <div class="contact-info">
                    <h2 class="contact-title">Get In Touch</h2>
                    <p class="contact-subtitle">Ready to enhance your beauty journey?</p>
                    <div class="contact-details">
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            <span>{{PHONE}}</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <span>{{EMAIL}}</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>{{ADDRESS}}</span>
                        </div>
                    </div>
                    <div class="social-links">
                        <a href="{{FACEBOOK_URL}}" class="social-link facebook">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="{{INSTAGRAM_URL}}" class="social-link instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="{{TWITTER_URL}}" class="social-link twitter">
                            <i class="fab fa-twitter"></i>
                        </a>
                    </div>
                </div>
                <div class="contact-form">
                    <form class="form">
                        <div class="form-group">
                            <input type="text" placeholder="Your Name" required>
                        </div>
                        <div class="form-group">
                            <input type="email" placeholder="Your Email" required>
                        </div>
                        <div class="form-group">
                            <textarea placeholder="Your Message" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary full-width">
                            <span>Send Message</span>
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <span class="brand-text">{{BUSINESS_NAME}}</span>
                    <p>Enhancing natural beauty with premium products and exceptional service.</p>
                </div>
                <div class="footer-links">
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#products">Products</a>
                    <a href="#services">Services</a>
                    <a href="#contact">Contact</a>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 {{BUSINESS_NAME}}. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`,
        css_content: `/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: {{PRIMARY_COLOR}};
    --secondary-color: {{SECONDARY_COLOR}};
    --accent-color: #f8f4f0;
    --text-dark: #2c2c2c;
    --text-light: #666;
    --white: #ffffff;
    --black: #000000;
    --gradient-primary: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    --gradient-accent: linear-gradient(135deg, #ffecd2, #fcb69f);
    --shadow-light: 0 5px 15px rgba(0,0,0,0.08);
    --shadow-medium: 0 10px 30px rgba(0,0,0,0.12);
    --shadow-heavy: 0 20px 60px rgba(0,0,0,0.15);
    --border-radius: 12px;
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: var(--text-dark);
    overflow-x: hidden;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Navigation */
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    z-index: 1000;
    transition: var(--transition);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
}

.nav-brand {
    display: flex;
    align-items: center;
    gap: 12px;
}

.logo-img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
}

.brand-text {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--primary-color);
}

.nav-menu {
    display: flex;
    gap: 2rem;
}

.nav-link {
    text-decoration: none;
    color: var(--text-dark);
    font-weight: 500;
    position: relative;
    transition: var(--transition);
}

.nav-link:hover {
    color: var(--primary-color);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--gradient-primary);
    transition: var(--transition);
}

.nav-link:hover::after {
    width: 100%;
}

.nav-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
}

.bar {
    width: 25px;
    height: 3px;
    background: var(--primary-color);
    margin: 3px 0;
    transition: var(--transition);
    border-radius: 2px;
}

/* Hero Section */
.hero {
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
}

.hero-bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2));
    z-index: -1;
}

.hero-content {
    text-align: center;
    color: var(--white);
    max-width: 800px;
    padding: 0 20px;
    animation: fadeInUp 1s ease-out;
}

.hero-title {
    margin-bottom: 2rem;
}

.title-main {
    display: block;
    font-family: 'Playfair Display', serif;
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.title-accent {
    display: block;
    font-size: 1.5rem;
    font-weight: 300;
    color: var(--secondary-color);
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.hero-description {
    font-size: 1.2rem;
    margin-bottom: 3rem;
    opacity: 0.9;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.hero-buttons {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
}

.btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 15px 30px;
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
}

.btn-primary {
    background: var(--gradient-primary);
    color: var(--white);
    box-shadow: var(--shadow-medium);
}

.btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-heavy);
}

.btn-secondary {
    background: rgba(255, 255, 255, 0.2);
    color: var(--white);
    border: 2px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
}

.btn-secondary:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-3px);
}

.scroll-indicator {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    animation: bounce 2s infinite;
}

.scroll-arrow {
    width: 2px;
    height: 30px;
    background: var(--white);
    position: relative;
}

.scroll-arrow::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -3px;
    width: 8px;
    height: 8px;
    border-right: 2px solid var(--white);
    border-bottom: 2px solid var(--white);
    transform: rotate(45deg);
}

/* Section Styles */
section {
    padding: 100px 0;
}

.section-header {
    text-align: center;
    margin-bottom: 4rem;
}

.section-subtitle {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--primary-color);
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 1rem;
}

.section-title {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 1rem;
}

.section-divider {
    width: 60px;
    height: 4px;
    background: var(--gradient-primary);
    margin: 0 auto;
    border-radius: 2px;
}

/* About Section */
.about {
    background: var(--accent-color);
}

.about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.about-description {
    font-size: 1.1rem;
    color: var(--text-light);
    margin-bottom: 3rem;
    line-height: 1.8;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
}

.stat-item {
    text-align: center;
}

.stat-number {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary-color);
    display: block;
}

.stat-label {
    font-size: 0.9rem;
    color: var(--text-light);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.about-image {
    position: relative;
}

.image-wrapper {
    position: relative;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow-medium);
}

.about-img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    transition: var(--transition);
}

.image-wrapper:hover .about-img {
    transform: scale(1.05);
}

.image-decoration {
    position: absolute;
    top: -20px;
    right: -20px;
    width: 100px;
    height: 100px;
    background: var(--gradient-primary);
    border-radius: 50%;
    opacity: 0.8;
    z-index: -1;
}

/* Products Section */
.products {
    background: var(--white);
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.product-item {
    background: var(--white);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow-light);
    transition: var(--transition);
    position: relative;
}

.product-item:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-heavy);
}

.product-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
    transition: var(--transition);
}

.product-item:hover .product-image {
    transform: scale(1.1);
}

.product-content {
    padding: 2rem;
}

.product-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 1rem;
}

.product-description {
    color: var(--text-light);
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.product-price {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--primary-color);
}

/* Services Section */
.services {
    background: var(--accent-color);
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}

.service-item {
    background: var(--white);
    padding: 3rem 2rem;
    border-radius: var(--border-radius);
    text-align: center;
    box-shadow: var(--shadow-light);
    transition: var(--transition);
    position: relative;
    overflow: hidden;
}

.service-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--gradient-primary);
}

.service-item:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-medium);
}

.service-icon {
    width: 80px;
    height: 80px;
    background: var(--gradient-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 2rem;
    font-size: 2rem;
    color: var(--white);
}

.service-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 1rem;
}

.service-description {
    color: var(--text-light);
    line-height: 1.6;
}

/* Contact Section */
.contact {
    background: var(--gradient-primary);
    color: var(--white);
}

.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
}

.contact-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.contact-subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    margin-bottom: 3rem;
}

.contact-details {
    margin-bottom: 3rem;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
}

.contact-item i {
    width: 20px;
    text-align: center;
    opacity: 0.8;
}

.social-links {
    display: flex;
    gap: 1rem;
}

.social-link {
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    text-decoration: none;
    transition: var(--transition);
    backdrop-filter: blur(10px);
}

.social-link:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-3px);
}

.contact-form {
    background: rgba(255, 255, 255, 0.1);
    padding: 3rem;
    border-radius: var(--border-radius);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.form-group {
    margin-bottom: 2rem;
}

.form input,
.form textarea {
    width: 100%;
    padding: 15px 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: var(--border-radius);
    background: rgba(255, 255, 255, 0.1);
    color: var(--white);
    font-size: 1rem;
    transition: var(--transition);
    backdrop-filter: blur(10px);
}

.form input::placeholder,
.form textarea::placeholder {
    color: rgba(255, 255, 255, 0.7);
}

.form input:focus,
.form textarea:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.2);
}

.full-width {
    width: 100%;
    justify-content: center;
}

/* Footer */
.footer {
    background: var(--text-dark);
    color: var(--white);
    padding: 3rem 0 1rem;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.footer-brand p {
    opacity: 0.8;
    margin-top: 1rem;
}

.footer-links {
    display: flex;
    gap: 2rem;
}

.footer-links a {
    color: var(--white);
    text-decoration: none;
    opacity: 0.8;
    transition: var(--transition);
}

.footer-links a:hover {
    opacity: 1;
    color: var(--primary-color);
}

.footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    opacity: 0.6;
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateX(-50%) translateY(0);
    }
    40% {
        transform: translateX(-50%) translateY(-10px);
    }
    60% {
        transform: translateX(-50%) translateY(-5px);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 80px;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.95);
        width: 100%;
        text-align: center;
        transition: var(--transition);
        backdrop-filter: blur(20px);
        padding: 2rem 0;
    }

    .nav-menu.active {
        left: 0;
    }

    .nav-toggle {
        display: flex;
    }

    .title-main {
        font-size: 2.5rem;
    }

    .hero-buttons {
        flex-direction: column;
        align-items: center;
    }

    .about-content,
    .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .stats-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .section-title {
        font-size: 2rem;
    }

    .products-grid,
    .services-grid {
        grid-template-columns: 1fr;
    }

    .footer-content {
        flex-direction: column;
        gap: 2rem;
        text-align: center;
    }

    .footer-links {
        flex-wrap: wrap;
        justify-content: center;
    }
}`,
        js_content: `// Smooth scrolling for navigation links
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

// Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
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
document.querySelectorAll('.product-item, .service-item, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
       
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
            }
        };
       
        updateCounter();
    });
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Form submission
document.querySelector('.form')?.addEventListener('submit', function(e) {
    e.preventDefault();
   
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
   
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
   
    // Show success message
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
    button.style.background = '#10b981';
   
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
        this.reset();
    }, 3000);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-bg-image');
    if (heroImage) {
        heroImage.style.transform = \`translateY(\${scrolled * 0.5}px)\`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});`,
        fields: {
          businessName: { type: 'text', label: 'Business Name', required: true },
          tagline: { type: 'text', label: 'Tagline', required: false },
          description: { type: 'textarea', label: 'Business Description', required: true },
          logo: { type: 'image', label: 'Logo', required: false },
          heroImage: { type: 'image', label: 'Hero Background Image', required: false },
          primaryColor: { type: 'color', label: 'Primary Color', default: '#e91e63' },
          secondaryColor: { type: 'color', label: 'Secondary Color', default: '#ff4081' },
          phone: { type: 'text', label: 'Phone Number', required: false },
          email: { type: 'email', label: 'Email Address', required: false },
          address: { type: 'text', label: 'Address', required: false },
          products: { type: 'array', label: 'Products', fields: { name: 'text', description: 'textarea', price: 'text', image: 'image' } },
          services: { type: 'array', label: 'Services', fields: { name: 'text', description: 'textarea' } },
          socialMedia: { type: 'object', label: 'Social Media', fields: { facebook: 'url', instagram: 'url', twitter: 'url' } }
        }
      }
    });

    // Pharmacy Template
    await prisma.template.upsert({
      where: { id: 'pharmacy-template-1' },
      update: {},
      create: {
        id: 'pharmacy-template-1',
        name: 'MediCare Pro',
        industry: 'pharmacy',
        description: 'Professional template designed for pharmacies, clinics, and healthcare providers.',
        preview_image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        html_content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{BUSINESS_NAME}} - Trusted Healthcare</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:wght@300;400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-brand">
                    <img src="{{LOGO_URL}}" alt="{{BUSINESS_NAME}}" class="logo-img">
                    <div class="brand-info">
                        <span class="brand-name">{{BUSINESS_NAME}}</span>
                        <span class="brand-tagline">Trusted Healthcare</span>
                    </div>
                </div>
                <div class="nav-menu" id="nav-menu">
                    <a href="#home" class="nav-link">Home</a>
                    <a href="#about" class="nav-link">About</a>
                    <a href="#services" class="nav-link">Services</a>
                    <a href="#products" class="nav-link">Products</a>
                    <a href="#contact" class="nav-link">Contact</a>
                </div>
                <div class="emergency-contact">
                    <i class="fas fa-phone-alt"></i>
                    <span>Emergency: {{PHONE}}</span>
                </div>
                <div class="nav-toggle" id="nav-toggle">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </div>
        </nav>
    </header>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-content">
            <div class="hero-text">
                <div class="hero-badge">
                    <i class="fas fa-shield-alt"></i>
                    <span>Licensed Healthcare Provider</span>
                </div>
                <h1 class="hero-title">{{BUSINESS_NAME}}</h1>
                <p class="hero-tagline">{{TAGLINE}}</p>
                <p class="hero-description">{{DESCRIPTION}}</p>
                <div class="hero-buttons">
                    <button class="btn btn-primary">
                        <i class="fas fa-calendar-check"></i>
                        <span>Book Appointment</span>
                    </button>
                    <button class="btn btn-secondary">
                        <i class="fas fa-phone"></i>
                        <span>Call Now</span>
                    </button>
                </div>
                <div class="trust-indicators">
                    <div class="trust-item">
                        <i class="fas fa-certificate"></i>
                        <span>Licensed</span>
                    </div>
                    <div class="trust-item">
                        <i class="fas fa-clock"></i>
                        <span>24/7 Service</span>
                    </div>
                    <div class="trust-item">
                        <i class="fas fa-truck"></i>
                        <span>Free Delivery</span>
                    </div>
                </div>
            </div>
            <div class="hero-image">
                <div class="image-container">
                    <img src="{{HERO_IMAGE_URL}}" alt="Healthcare" class="hero-img">
                    <div class="floating-card">
                        <i class="fas fa-heartbeat"></i>
                        <div class="card-content">
                            <span class="card-title">Health First</span>
                            <span class="card-subtitle">Your wellness is our priority</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">About Us</span>
                <h2 class="section-title">Committed to Your Health</h2>
                <p class="section-description">{{DESCRIPTION}}</p>
            </div>
            <div class="about-content">
                <div class="about-stats">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-info">
                            <span class="stat-number">50K+</span>
                            <span class="stat-label">Patients Served</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-award"></i>
                        </div>
                        <div class="stat-info">
                            <span class="stat-number">15+</span>
                            <span class="stat-label">Years Experience</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="stat-info">
                            <span class="stat-number">4.9</span>
                            <span class="stat-label">Rating</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Our Services</span>
                <h2 class="section-title">Comprehensive Healthcare Solutions</h2>
            </div>
            <div class="services-grid">
                {{SERVICES}}
            </div>
        </div>
    </section>

    <!-- Products Section -->
    <section id="products" class="products">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Healthcare Products</span>
                <h2 class="section-title">Quality Medications & Supplies</h2>
            </div>
            <div class="products-grid">
                {{PRODUCTS}}
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Why Choose Us</span>
                <h2 class="section-title">Your Health, Our Priority</h2>
            </div>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-user-md"></i>
                    </div>
                    <h3 class="feature-title">Expert Pharmacists</h3>
                    <p class="feature-description">Licensed professionals with years of experience in healthcare</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <h3 class="feature-title">24/7 Emergency</h3>
                    <p class="feature-description">Round-the-clock emergency services for urgent healthcare needs</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-pills"></i>
                    </div>
                    <h3 class="feature-title">Quality Medicines</h3>
                    <p class="feature-description">Genuine medications from trusted pharmaceutical companies</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-shipping-fast"></i>
                    </div>
                    <h3 class="feature-title">Fast Delivery</h3>
                    <p class="feature-description">Quick and secure delivery to your doorstep</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <div class="container">
            <div class="contact-content">
                <div class="contact-info">
                    <div class="contact-header">
                        <h2 class="contact-title">Get In Touch</h2>
                        <p class="contact-subtitle">We're here to help with all your healthcare needs</p>
                    </div>
                    <div class="contact-details">
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="fas fa-phone"></i>
                            </div>
                            <div class="contact-text">
                                <span class="contact-label">Phone</span>
                                <span class="contact-value">{{PHONE}}</span>
                            </div>
                        </div>
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <div class="contact-text">
                                <span class="contact-label">Email</span>
                                <span class="contact-value">{{EMAIL}}</span>
                            </div>
                        </div>
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div class="contact-text">
                                <span class="contact-label">Address</span>
                                <span class="contact-value">{{ADDRESS}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="hours-card">
                        <h3 class="hours-title">Operating Hours</h3>
                        <div class="hours-list">
                            <div class="hours-item">
                                <span>Monday - Friday</span>
                                <span>8:00 AM - 9:00 PM</span>
                            </div>
                            <div class="hours-item">
                                <span>Saturday</span>
                                <span>9:00 AM - 8:00 PM</span>
                            </div>
                            <div class="hours-item">
                                <span>Sunday</span>
                                <span>10:00 AM - 6:00 PM</span>
                            </div>
                            <div class="hours-item emergency">
                                <span>Emergency</span>
                                <span>24/7 Available</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="contact-form">
                    <form class="form">
                        <h3 class="form-title">Send us a Message</h3>
                        <div class="form-group">
                            <input type="text" placeholder="Your Name" required>
                        </div>
                        <div class="form-group">
                            <input type="email" placeholder="Your Email" required>
                        </div>
                        <div class="form-group">
                            <input type="tel" placeholder="Your Phone" required>
                        </div>
                        <div class="form-group">
                            <select required>
                                <option value="">Select Service</option>
                                <option value="consultation">Consultation</option>
                                <option value="prescription">Prescription</option>
                                <option value="emergency">Emergency</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <textarea placeholder="Your Message" rows="4" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary full-width">
                            <i class="fas fa-paper-plane"></i>
                            <span>Send Message</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <span class="brand-name">{{BUSINESS_NAME}}</span>
                    <p class="footer-description">Committed to providing quality healthcare services and medications to our community.</p>
                    <div class="footer-certifications">
                        <span class="cert-badge">
                            <i class="fas fa-certificate"></i>
                            Licensed Pharmacy
                        </span>
                        <span class="cert-badge">
                            <i class="fas fa-shield-alt"></i>
                            FDA Approved
                        </span>
                    </div>
                </div>
                <div class="footer-links">
                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <a href="#home">Home</a>
                        <a href="#about">About</a>
                        <a href="#services">Services</a>
                        <a href="#contact">Contact</a>
                    </div>
                    <div class="footer-section">
                        <h4>Services</h4>
                        <a href="#">Prescription</a>
                        <a href="#">Consultation</a>
                        <a href="#">Emergency Care</a>
                        <a href="#">Health Checkup</a>
                    </div>
                    <div class="footer-section">
                        <h4>Emergency</h4>
                        <p>For medical emergencies:</p>
                        <a href="tel:911" class="emergency-number">Call 911</a>
                        <p>Pharmacy emergency:</p>
                        <a href="tel:{{PHONE}}" class="emergency-number">{{PHONE}}</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 {{BUSINESS_NAME}}. All rights reserved. | Licensed Healthcare Provider</p>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`,
        css_content: `/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: {{PRIMARY_COLOR}};
    --secondary-color: {{SECONDARY_COLOR}};
    --accent-color: #f0f8ff;
    --text-dark: #1a202c;
    --text-light: #4a5568;
    --white: #ffffff;
    --success: #10b981;
    --warning: #f59e0b;
    --error: #ef4444;
    --gradient-primary: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    --gradient-accent: linear-gradient(135deg, #e0f2fe, #b3e5fc);
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
    --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
    --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
    --shadow-xl: 0 20px 25px rgba(0,0,0,0.1);
    --border-radius: 12px;
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: var(--text-dark);
    overflow-x: hidden;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header */
.header {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    z-index: 1000;
    transition: var(--transition);
}

.navbar {
    padding: 0;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
}

.nav-brand {
    display: flex;
    align-items: center;
    gap: 15px;
}

.logo-img {
    width: 50px;
    height: 50px;
    border-radius: var(--border-radius);
    object-fit: cover;
    border: 2px solid var(--primary-color);
}

.brand-info {
    display: flex;
    flex-direction: column;
}

.brand-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
}

.brand-tagline {
    font-size: 0.8rem;
    color: var(--text-light);
    font-weight: 500;
}

.nav-menu {
    display: flex;
    gap: 2rem;
}

.nav-link {
    text-decoration: none;
    color: var(--text-dark);
    font-weight: 500;
    position: relative;
    transition: var(--transition);
    padding: 0.5rem 0;
}

.nav-link:hover {
    color: var(--primary-color);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary-color);
    transition: var(--transition);
}

.nav-link:hover::after {
    width: 100%;
}

.emergency-contact {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--gradient-primary);
    color: var(--white);
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    font-weight: 600;
    font-size: 0.9rem;
    animation: pulse 2s infinite;
}

.emergency-contact i {
    animation: ring 2s infinite;
}

.nav-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
}

.bar {
    width: 25px;
    height: 3px;
    background: var(--primary-color);
    margin: 3px 0;
    transition: var(--transition);
    border-radius: 2px;
}

/* Hero Section */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, var(--accent-color), #ffffff);
    padding: 120px 0 80px;
}

.hero-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--gradient-primary);
    color: var(--white);
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 2rem;
    width: fit-content;
}

.hero-title {
    font-family: 'Merriweather', serif;
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 1rem;
    line-height: 1.2;
}

.hero-tagline {
    font-size: 1.3rem;
    color: var(--primary-color);
    font-weight: 600;
    margin-bottom: 1rem;
}

.hero-description {
    font-size: 1.1rem;
    color: var(--text-light);
    margin-bottom: 2.5rem;
    line-height: 1.7;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
}

.btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 15px 25px;
    border: none;
    border-radius: var(--border-radius);
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
}

.btn-primary {
    background: var(--gradient-primary);
    color: var(--white);
    box-shadow: var(--shadow-md);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.btn-secondary {
    background: var(--white);
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
}

.btn-secondary:hover {
    background: var(--primary-color);
    color: var(--white);
    transform: translateY(-2px);
}

.trust-indicators {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
}

.trust-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-light);
    font-size: 0.9rem;
    font-weight: 500;
}

.trust-item i {
    color: var(--success);
    font-size: 1.1rem;
}

.hero-image {
    position: relative;
}

.image-container {
    position: relative;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow-xl);
}

.hero-img {
    width: 100%;
    height: 500px;
    object-fit: cover;
}

.floating-card {
    position: absolute;
    bottom: 20px;
    left: 20px;
    background: var(--white);
    padding: 1.5rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    gap: 1rem;
    animation: float 3s ease-in-out infinite;
}

.floating-card i {
    font-size: 2rem;
    color: var(--primary-color);
}

.card-content {
    display: flex;
    flex-direction: column;
}

.card-title {
    font-weight: 700;
    color: var(--text-dark);
}

.card-subtitle {
    font-size: 0.9rem;
    color: var(--text-light);
}

/* Section Styles */
section {
    padding: 80px 0;
}

.section-header {
    text-align: center;
    margin-bottom: 4rem;
}

.section-badge {
    display: inline-block;
    background: var(--gradient-primary);
    color: var(--white);
    padding: 0.5rem 1.5rem;
    border-radius: 25px;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.section-title {
    font-family: 'Merriweather', serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 1rem;
}

.section-description {
    font-size: 1.1rem;
    color: var(--text-light);
    max-width: 600px;
    margin: 0 auto;
}

/* About Section */
.about {
    background: var(--white);
}

.about-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.stat-card {
    background: var(--white);
    padding: 2.5rem 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-md);
    display: flex;
    align-items: center;
    gap: 1.5rem;
    transition: var(--transition);
    border-left: 4px solid var(--primary-color);
}

.stat-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.stat-icon {
    width: 60px;
    height: 60px;
    background: var(--gradient-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: 1.5rem;
}

.stat-number {
    font-family: 'Merriweather', serif;
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-dark);
    display: block;
}

.stat-label {
    font-size: 0.9rem;
    color: var(--text-light);
    font-weight: 500;
}

/* Services Section */
.services {
    background: var(--accent-color);
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.service-item {
    background: var(--white);
    padding: 2.5rem 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-md);
    text-align: center;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
}

.service-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--gradient-primary);
}

.service-item:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);
}

.service-icon {
    width: 80px;
    height: 80px;
    background: var(--gradient-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 2rem;
    font-size: 2rem;
    color: var(--white);
}

.service-name {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 1rem;
}

.service-description {
    color: var(--text-light);
    line-height: 1.6;
}

/* Products Section */
.products {
    background: var(--white);
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}

.product-item {
    background: var(--white);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow-md);
    transition: var(--transition);
}

.product-item:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.product-content {
    padding: 2rem;
}

.product-name {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 1rem;
}

.product-description {
    color: var(--text-light);
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.product-price {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--primary-color);
}

/* Features Section */
.features {
    background: var(--accent-color);
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.feature-card {
    background: var(--white);
    padding: 2.5rem 2rem;
    border-radius: var(--border-radius);
    text-align: center;
    box-shadow: var(--shadow-md);
    transition: var(--transition);
}

.feature-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.feature-icon {
    width: 70px;
    height: 70px;
    background: var(--gradient-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    font-size: 1.8rem;
    color: var(--white);
}

.feature-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 1rem;
}

.feature-description {
    color: var(--text-light);
    line-height: 1.6;
}

/* Contact Section */
.contact {
    background: var(--white);
}

.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
}

.contact-header {
    margin-bottom: 3rem;
}

.contact-title {
    font-family: 'Merriweather', serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 1rem;
}

.contact-subtitle {
    font-size: 1.1rem;
    color: var(--text-light);
}

.contact-details {
    margin-bottom: 3rem;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: var(--accent-color);
    border-radius: var(--border-radius);
    transition: var(--transition);
}

.contact-item:hover {
    transform: translateX(5px);
    box-shadow: var(--shadow-md);
}

.contact-icon {
    width: 50px;
    height: 50px;
    background: var(--gradient-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: 1.2rem;
}

.contact-text {
    display: flex;
    flex-direction: column;
}

.contact-label {
    font-size: 0.9rem;
    color: var(--text-light);
    font-weight: 500;
}

.contact-value {
    font-size: 1.1rem;
    color: var(--text-dark);
    font-weight: 600;
}

.hours-card {
    background: var(--gradient-primary);
    color: var(--white);
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-md);
}

.hours-title {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-align: center;
}

.hours-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.hours-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.hours-item.emergency {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 8px;
    border: none;
    font-weight: 600;
}

.contact-form {
    background: var(--accent-color);
    padding: 3rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-md);
}

.form-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 2rem;
    text-align: center;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form input,
.form select,
.form textarea {
    width: 100%;
    padding: 15px;
    border: 2px solid #e2e8f0;
    border-radius: var(--border-radius);
    font-size: 1rem;
    transition: var(--transition);
    background: var(--white);
}

.form input:focus,
.form select:focus,
.form textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.full-width {
    width: 100%;
    justify-content: center;
}

/* Footer */
.footer {
    background: var(--text-dark);
    color: var(--white);
    padding: 4rem 0 2rem;
}

.footer-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 4rem;
    margin-bottom: 3rem;
}

.footer-brand .brand-name {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 1rem;
    display: block;
}

.footer-description {
    color: #cbd5e0;
    margin-bottom: 2rem;
    line-height: 1.6;
}

.footer-certifications {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.cert-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--primary-color);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
}

.footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
}

.footer-section h4 {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--white);
}

.footer-section a {
    display: block;
    color: #cbd5e0;
    text-decoration: none;
    margin-bottom: 0.75rem;
    transition: var(--transition);
}

.footer-section a:hover {
    color: var(--primary-color);
    transform: translateX(5px);
}

.emergency-number {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--warning) !important;
}

.footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid #4a5568;
    color: #cbd5e0;
}

/* Animations */
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
}

@keyframes ring {
    0%, 100% { transform: rotate(0deg); }
    10%, 30% { transform: rotate(-10deg); }
    20% { transform: rotate(10deg); }
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 80px;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.98);
        width: 100%;
        text-align: center;
        transition: var(--transition);
        backdrop-filter: blur(20px);
        padding: 2rem 0;
        box-shadow: var(--shadow-lg);
    }

    .nav-menu.active {
        left: 0;
    }

    .nav-toggle {
        display: flex;
    }

    .emergency-contact {
        display: none;
    }

    .hero-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
    }

    .hero-title {
        font-size: 2.5rem;
    }

    .hero-buttons {
        justify-content: center;
    }

    .trust-indicators {
        justify-content: center;
    }

    .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .footer-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .footer-links {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .section-title {
        font-size: 2rem;
    }

    .about-stats,
    .services-grid,
    .products-grid,
    .features-grid {
        grid-template-columns: 1fr;
    }
}`,
        js_content: `// Smooth scrolling for navigation links
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

// Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
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
document.querySelectorAll('.stat-card, .service-item, .product-item, .feature-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseFloat(counter.textContent);
        const increment = target / 100;
        let current = 0;
       
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (counter.textContent.includes('.')) {
                    counter.textContent = current.toFixed(1) + (counter.textContent.includes('+') ? '+' : '');
                } else {
                    counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
                }
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
            }
        };
       
        updateCounter();
    });
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Form submission with enhanced feedback
document.querySelector('.form')?.addEventListener('submit', function(e) {
    e.preventDefault();
   
    // Get form data
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const service = this.querySelector('select').value;
    const message = this.querySelector('textarea').value;
   
    // Simple validation
    if (!name || !email || !phone || !service || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
   
    // Show loading state
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
    button.disabled = true;
   
    // Simulate form submission
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
        button.style.background = 'var(--success)';
        showNotification('Thank you! We will contact you soon.', 'success');
       
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            button.disabled = false;
            this.reset();
        }, 3000);
    }, 2000);
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = \`notification notification-\${type}\`;
    notification.innerHTML = \`
        <i class="fas fa-\${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>\${message}</span>
    \`;
   
    // Add styles
    notification.style.cssText = \`
        position: fixed;
        top: 20px;
        right: 20px;
        background: \${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--error)' : 'var(--primary-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    \`;
   
    document.body.appendChild(notification);
   
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
   
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Emergency contact pulse effect
setInterval(() => {
    const emergencyContact = document.querySelector('.emergency-contact');
    if (emergencyContact) {
        emergencyContact.style.transform = 'scale(1.05)';
        setTimeout(() => {
            emergencyContact.style.transform = 'scale(1)';
        }, 200);
    }
}, 10000);

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});`,
        fields: {
          businessName: { type: 'text', label: 'Pharmacy/Clinic Name', required: true },
          tagline: { type: 'text', label: 'Professional Tagline', required: false },
          description: { type: 'textarea', label: 'About Your Healthcare Service', required: true },
          logo: { type: 'image', label: 'Logo', required: false },
          heroImage: { type: 'image', label: 'Hero Image', required: false },
          primaryColor: { type: 'color', label: 'Primary Color', default: '#2c5aa0' },
          secondaryColor: { type: 'color', label: 'Secondary Color', default: '#5dade2' },
          phone: { type: 'text', label: 'Phone Number', required: true },
          email: { type: 'email', label: 'Email Address', required: false },
          address: { type: 'text', label: 'Address', required: true },
          products: { type: 'array', label: 'Healthcare Products', fields: { name: 'text', description: 'textarea', price: 'text', image: 'image' } },
          services: { type: 'array', label: 'Medical Services', fields: { name: 'text', description: 'textarea' } }
        }
      }
    });

    // Education Template
    await prisma.template.upsert({
      where: { id: 'education-template-1' },
      update: {},
      create: {
        id: 'education-template-1',
        name: 'EduTech Modern',
        industry: 'education',
        description: 'Modern template perfect for schools, universities, and online learning platforms.',
        preview_image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
        html_content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{BUSINESS_NAME}} - Excellence in Education</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-brand">
                <img src="{{LOGO_URL}}" alt="{{BUSINESS_NAME}}" class="logo-img">
                <div class="brand-text">
                    <span class="brand-name">{{BUSINESS_NAME}}</span>
                    <span class="brand-subtitle">Excellence in Education</span>
                </div>
            </div>
            <div class="nav-menu" id="nav-menu">
                <a href="#home" class="nav-link">Home</a>
                <a href="#about" class="nav-link">About</a>
                <a href="#courses" class="nav-link">Courses</a>
                <a href="#services" class="nav-link">Services</a>
                <a href="#contact" class="nav-link">Contact</a>
            </div>
            <div class="nav-actions">
                <button class="btn btn-outline">Login</button>
                <button class="btn btn-primary">Enroll Now</button>
            </div>
            <div class="nav-toggle" id="nav-toggle">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-background">
            <img src="{{HERO_IMAGE_URL}}" alt="Education" class="hero-bg-image">
            <div class="hero-overlay"></div>
        </div>
        <div class="hero-content">
            <div class="hero-text">
                <div class="hero-badge">
                    <i class="fas fa-graduation-cap"></i>
                    <span>Transform Your Future</span>
                </div>
                <h1 class="hero-title">
                    <span class="title-main">{{BUSINESS_NAME}}</span>
                    <span class="title-accent">{{TAGLINE}}</span>
                </h1>
                <p class="hero-description">{{DESCRIPTION}}</p>
                <div class="hero-stats">
                    <div class="stat-item">
                        <span class="stat-number">10K+</span>
                        <span class="stat-label">Students</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">500+</span>
                        <span class="stat-label">Courses</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">95%</span>
                        <span class="stat-label">Success Rate</span>
                    </div>
                </div>
                <div class="hero-buttons">
                    <button class="btn btn-primary large">
                        <i class="fas fa-play"></i>
                        <span>Start Learning</span>
                    </button>
                    <button class="btn btn-secondary large">
                        <i class="fas fa-book-open"></i>
                        <span>Browse Courses</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="scroll-indicator">
            <div class="scroll-text">Scroll to explore</div>
            <div class="scroll-arrow"></div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <div class="about-content">
                <div class="about-text">
                    <div class="section-header">
                        <span class="section-badge">About Us</span>
                        <h2 class="section-title">Empowering Minds, Shaping Futures</h2>
                        <p class="section-description">{{DESCRIPTION}}</p>
                    </div>
                    <div class="features-list">
                        <div class="feature-item">
                            <i class="fas fa-check-circle"></i>
                            <span>Expert Faculty with Industry Experience</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-check-circle"></i>
                            <span>Hands-on Learning with Real Projects</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-check-circle"></i>
                            <span>Career Support and Job Placement</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-check-circle"></i>
                            <span>Flexible Learning Options</span>
                        </div>
                    </div>
                    <button class="btn btn-primary">Learn More About Us</button>
                </div>
                <div class="about-visual">
                    <div class="image-grid">
                        <div class="grid-item large">
                            <img src="{{HERO_IMAGE_URL}}" alt="Students Learning" class="grid-image">
                        </div>
                        <div class="grid-item small">
                            <div class="achievement-card">
                                <i class="fas fa-trophy"></i>
                                <span class="achievement-number">50+</span>
                                <span class="achievement-text">Awards Won</span>
                            </div>
                        </div>
                        <div class="grid-item small">
                            <div class="achievement-card">
                                <i class="fas fa-users"></i>
                                <span class="achievement-number">100+</span>
                                <span class="achievement-text">Expert Faculty</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Courses Section -->
    <section id="courses" class="courses">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Our Courses</span>
                <h2 class="section-title">Discover Your Path to Success</h2>
                <p class="section-description">Choose from our wide range of courses designed to help you achieve your goals</p>
            </div>
            <div class="courses-grid">
                {{PRODUCTS}}
            </div>
            <div class="courses-cta">
                <button class="btn btn-outline large">View All Courses</button>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Our Services</span>
                <h2 class="section-title">Comprehensive Educational Solutions</h2>
            </div>
            <div class="services-grid">
                {{SERVICES}}
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features">
        <div class="container">
            <div class="section-header">
                <span class="section-badge">Why Choose Us</span>
                <h2 class="section-title">Your Success is Our Mission</h2>
            </div>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-laptop-code"></i>
                    </div>
                    <h3 class="feature-title">Interactive Learning</h3>
                    <p class="feature-description">Engage with cutting-edge technology and interactive learning platforms</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-users-cog"></i>
                    </div>
                    <h3 class="feature-title">Expert Mentorship</h3>
                    <p class="feature-description">Get guidance from industry experts and experienced professionals</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-certificate"></i>
                    </div>
                    <h3 class="feature-title">Recognized Certification</h3>
                    <p class="feature-description">Earn certificates that are valued by top employers worldwide</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <h3 class="feature-title">Flexible Schedule</h3>
                    <p class="feature-description">Learn at your own pace with flexible timing options</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-briefcase"></i>
                    </div>
                    <h3 class="feature-title">Career Support</h3>
                    <p class="feature-description">Get job placement assistance and career guidance</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-globe"></i>
                    </div>
                    <h3 class="feature-title">Global Community</h3>
                    <p class="feature-description">Join a worldwide network of learners and professionals</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <div class="container">
            <div class="contact-content">
                <div class="contact-info">
                    <div class="contact-header">
                        <h2 class="contact-title">Ready to Start Your Journey?</h2>
                        <p class="contact-subtitle">Get in touch with us and take the first step towards your bright future</p>
                    </div>
                    <div class="contact-details">
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="fas fa-phone"></i>
                            </div>
                            <div class="contact-text">
                                <span class="contact-label">Call Us</span>
                                <span class="contact-value">{{PHONE}}</span>
                            </div>
                        </div>
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <div class="contact-text">
                                <span class="contact-label">Email Us</span>
                                <span class="contact-value">{{EMAIL}}</span>
                            </div>
                        </div>
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div class="contact-text">
                                <span class="contact-label">Visit Us</span>
                                <span class="contact-value">{{ADDRESS}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="social-links">
                        <a href="{{FACEBOOK_URL}}" class="social-link facebook">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="{{INSTAGRAM_URL}}" class="social-link instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="{{TWITTER_URL}}" class="social-link twitter">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="social-link linkedin">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
                <div class="contact-form">
                    <form class="form">
                        <h3 class="form-title">Send us a Message</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <input type="text" placeholder="First Name" required>
                            </div>
                            <div class="form-group">
                                <input type="text" placeholder="Last Name" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <input type="email" placeholder="Email Address" required>
                        </div>
                        <div class="form-group">
                            <input type="tel" placeholder="Phone Number" required>
                        </div>
                        <div class="form-group">
                            <select required>
                                <option value="">Select Course Interest</option>
                                <option value="web-development">Web Development</option>
                                <option value="data-science">Data Science</option>
                                <option value="digital-marketing">Digital Marketing</option>
                                <option value="graphic-design">Graphic Design</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <textarea placeholder="Tell us about your goals and interests" rows="4" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary full-width">
                            <i class="fas fa-paper-plane"></i>
                            <span>Send Message</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <span class="brand-name">{{BUSINESS_NAME}}</span>
                    <p class="footer-description">Empowering learners worldwide with quality education and innovative learning solutions.</p>
                    <div class="footer-stats">
                        <div class="footer-stat">
                            <span class="stat-number">10K+</span>
                            <span class="stat-label">Students</span>
                        </div>
                        <div class="footer-stat">
                            <span class="stat-number">500+</span>
                            <span class="stat-label">Courses</span>
                        </div>
                        <div class="footer-stat">
                            <span class="stat-number">100+</span>
                            <span class="stat-label">Instructors</span>
                        </div>
                    </div>
                </div>
                <div class="footer-links">
                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <a href="#home">Home</a>
                        <a href="#about">About</a>
                        <a href="#courses">Courses</a>
                        <a href="#contact">Contact</a>
                    </div>
                    <div class="footer-section">
                        <h4>Popular Courses</h4>
                        <a href="#">Web Development</a>
                        <a href="#">Data Science</a>
                        <a href="#">Digital Marketing</a>
                        <a href="#">Graphic Design</a>
                    </div>
                    <div class="footer-section">
                        <h4>Support</h4>
                        <a href="#">Help Center</a>
                        <a href="#">Student Portal</a>
                        <a href="#">Career Services</a>
                        <a href="#">Community</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 {{BUSINESS_NAME}}. All rights reserved. | Empowering Future Leaders</p>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`,
        css_content: `/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: {{PRIMARY_COLOR}};
    --secondary-color: {{SECONDARY_COLOR}};
    --accent-color: #f8fafc;
    --text-dark: #1e293b;
    --text-light: #64748b;
    --white: #ffffff;
    --success: #10b981;
    --warning: #f59e0b;
    --error: #ef4444;
    --gradient-primary: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    --gradient-accent: linear-gradient(135deg, #f1f5f9, #e2e8f0);
    --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
    --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
    --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
    --shadow-xl: 0 20px 25px rgba(0,0,0,0.1);
    --border-radius: 16px;
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: var(--text-dark);
    overflow-x: hidden;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Navigation */
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    z-index: 1000;
    transition: var(--transition);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
}

.nav-brand {
    display: flex;
    align-items: center;
    gap: 15px;
}

.logo-img {
    width: 50px;
    height: 50px;
    border-radius: var(--border-radius);
    object-fit: cover;
}

.brand-text {
    display: flex;
    flex-direction: column;
}

.brand-name {
    font-family: 'Poppins', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
}

.brand-subtitle {
    font-size: 0.8rem;
    color: var(--text-light);
    font-weight: 500;
}

.nav-menu {
    display: flex;
    gap: 2rem;
}

.nav-link {
    text-decoration: none;
    color: var(--text-dark);
    font-weight: 500;
    position: relative;
    transition: var(--transition);
    padding: 0.5rem 0;
}

.nav-link:hover {
    color: var(--primary-color);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--gradient-primary);
    transition: var(--transition);
}

.nav-link:hover::after {
    width: 100%;
}

.nav-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.nav-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
}

.bar {
    width: 25px;
    height: 3px;
    background: var(--primary-color);
    margin: 3px 0;
    transition: var(--transition);
    border-radius: 2px;
}

/* Buttons */
.btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 12px 24px;
    border: none;
    border-radius: var(--border-radius);
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
}

.btn.large {
    padding: 16px 32px;
    font-size: 1.1rem;
}

.btn-primary {
    background: var(--gradient-primary);
    color: var(--white);
    box-shadow: var(--shadow-md);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.btn-secondary {
    background: var(--white);
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
}

.btn-secondary:hover {
    background: var(--primary-color);
    color: var(--white);
    transform: translateY(-2px);
}

.btn-outline {
    background: transparent;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
}

.btn-outline:hover {
    background: var(--primary-color);
    color: var(--white);
}

/* Hero Section */
.hero {
    min-height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
}

.hero-bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4));
    z-index: -1;
}

.hero-content {
    text-align: center;
    color: var(--white);
    max-width: 900px;
    padding: 0 20px;
    animation: fadeInUp 1s ease-out;
}

.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.2);
    color: var(--white);
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 2rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.hero-title {
    margin-bottom: 2rem;
}

.title-main {
    display: block;
    font-family: 'Poppins', sans-serif;
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.title-accent {
    display: block;
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--secondary-color);
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.hero-description {
    font-size: 1.2rem;
    margin-bottom: 3rem;
    opacity: 0.9;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.7;
}

.hero-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
}

.stat-item {
    text-align: center;
}

.stat-number {
    display: block;
    font-family: 'Poppins', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--white);
}

.stat-label {
    font-size: 0.9rem;
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.hero-buttons {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
}

.scroll-indicator {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    color: var(--white);
    animation: bounce 2s infinite;
}

.scroll-text {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    opacity: 0.8;
}

.scroll-arrow {
    width: 2px;
    height: 30px;
    background: var(--white);
    margin: 0 auto;
    position: relative;
}

.scroll-arrow::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -3px;
    width: 8px;
    height: 8px;
    border-right: 2px solid var(--white);
    border-bottom: 2px solid var(--white);
    transform: rotate(45deg);
}

/* Section Styles */
section {
    padding: 100px 0;
}

.section-header {
    text-align: center;
    margin-bottom: 4rem;
}

.section-badge {
    display: inline-block;
    background: var(--gradient-primary);
    color: var(--white);
    padding: 0.5rem 1.5rem;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.section-title {
    font-family: 'Poppins', sans-serif;
    font-size: 3rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 1rem;
    line-height: 1.2;
}

.section-description {
    font-size: 1.1rem;
    color: var(--text-light);
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.7;
}

/* About Section */
.about {
    background: var(--accent-color);
}

.about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
}

.features-list {
    margin: 3rem 0;
}

.feature-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    font-weight: 500;
}

.feature-item i {
    color: var(--success);
    font-size: 1.2rem;
}

.about-visual {
    position: relative;
}

.image-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 1rem;
    height: 400px;
}

.grid-item.large {
    grid-row: 1 / 3;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
}

.grid-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
}

.grid-item:hover .grid-image {
    transform: scale(1.05);
}

.achievement-card {
    background: var(--white);
    padding: 2rem 1.5rem;
    border-radius: var(--border-radius);
    text-align: center;
    box-shadow: var(--shadow-md);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: var(--transition);
}

.achievement-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.achievement-card i {
    font-size: 2rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.achievement-number {
    display: block;
    font-family: 'Poppins', sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--text-dark);
}

.achievement-text {
    font-size: 0.9rem;
    color: var(--text-light);
    font-weight: 500;
}

/* Courses Section */
.courses {
    background: var(--white);
}

.courses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.product-item {
    background: var(--white);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow-md);
    transition: var(--transition);
    position: relative;
}

.product-item:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);
}

.product-image {
    width: 100%;
    height: 220px;
    object-fit: cover;
    transition: var(--transition);
}

.product-item:hover .product-image {
    transform: scale(1.1);
}

.product-content {
    padding: 2rem;
}

.product-name {
    font-family: 'Poppins', sans-serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 1rem;
}

.product-description {
    color: var(--text-light);
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.product-price {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--primary-color);
}

.courses-cta {
    text-align: center;
}

/* Services Section */
.services {
    background: var(--accent-color);
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.service-item {
    background: var(--white);
    padding: 3rem 2rem;
    border-radius: var(--border-radius);
    text-align: center;
    box-shadow: var(--shadow-md);
    transition: var(--transition);
    position: relative;
    overflow: hidden;
}

.service-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--gradient-primary);
}

.service-item:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);
}

.service-icon {
    width: 80px;
    height: 80px;
    background: var(--gradient-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 2rem;
    font-size: 2rem;
    color: var(--white);
}

.service-name {
    font-family: 'Poppins', sans-serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 1rem;
}

.service-description {
    color: var(--text-light);
    line-height: 1.6;
}

/* Features Section */
.features {
    background: var(--white);
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.feature-card {
    background: var(--accent-color);
    padding: 2.5rem 2rem;
    border-radius: var(--border-radius);
    text-align: center;
    transition: var(--transition);
    border: 2px solid transparent;
}

.feature-card:hover {
    transform: translateY(-5px);
    border-color: var(--primary-color);
    background: var(--white);
    box-shadow: var(--shadow-lg);
}

.feature-icon {
    width: 70px;
    height: 70px;
    background: var(--gradient-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    font-size: 1.8rem;
    color: var(--white);
}

.feature-title {
    font-family: 'Poppins', sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 1rem;
}

.feature-description {
    color: var(--text-light);
    line-height: 1.6;
}

/* Contact Section */
.contact {
    background: var(--accent-color);
}

.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
}

.contact-header {
    margin-bottom: 3rem;
}

.contact-title {
    font-family: 'Poppins', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 1rem;
}

.contact-subtitle {
    font-size: 1.1rem;
    color: var(--text-light);
    line-height: 1.6;
}

.contact-details {
    margin-bottom: 3rem;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-sm);
    transition: var(--transition);
}

.contact-item:hover {
    transform: translateX(5px);
    box-shadow: var(--shadow-md);
}

.contact-icon {
    width: 50px;
    height: 50px;
    background: var(--gradient-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: 1.2rem;
}

.contact-text {
    display: flex;
    flex-direction: column;
}

.contact-label {
    font-size: 0.9rem;
    color: var(--text-light);
    font-weight: 500;
}

.contact-value {
    font-size: 1.1rem;
    color: var(--text-dark);
    font-weight: 600;
}

.social-links {
    display: flex;
    gap: 1rem;
}

.social-link {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    text-decoration: none;
    transition: var(--transition);
    font-size: 1.2rem;
}

.social-link.facebook { background: #1877f2; }
.social-link.instagram { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
.social-link.twitter { background: #1da1f2; }
.social-link.linkedin { background: #0077b5; }

.social-link:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
}

.contact-form {
    background: var(--white);
    padding: 3rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-md);
}

.form-title {
    font-family: 'Poppins', sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 2rem;
    text-align: center;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form input,
.form select,
.form textarea {
    width: 100%;
    padding: 15px;
    border: 2px solid #e2e8f0;
    border-radius: var(--border-radius);
    font-size: 1rem;
    transition: var(--transition);
    background: var(--white);
}

.form input:focus,
.form select:focus,
.form textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.full-width {
    width: 100%;
    justify-content: center;
}

/* Footer */
.footer {
    background: var(--text-dark);
    color: var(--white);
    padding: 4rem 0 2rem;
}

.footer-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 4rem;
    margin-bottom: 3rem;
}

.footer-brand .brand-name {
    font-family: 'Poppins', sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 1rem;
    display: block;
}

.footer-description {
    color: #cbd5e0;
    margin-bottom: 2rem;
    line-height: 1.6;
}

.footer-stats {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
}

.footer-stat {
    text-align: center;
}

.footer-stat .stat-number {
    display: block;
    font-family: 'Poppins', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
}

.footer-stat .stat-label {
    font-size: 0.8rem;
    color: #cbd5e0;
}

.footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
}

.footer-section h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--white);
}

.footer-section a {
    display: block;
    color: #cbd5e0;
    text-decoration: none;
    margin-bottom: 0.75rem;
    transition: var(--transition);
}

.footer-section a:hover {
    color: var(--primary-color);
    transform: translateX(5px);
}

.footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid #4a5568;
    color: #cbd5e0;
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateX(-50%) translateY(0);
    }
    40% {
        transform: translateX(-50%) translateY(-10px);
    }
    60% {
        transform: translateX(-50%) translateY(-5px);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 80px;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.98);
        width: 100%;
        text-align: center;
        transition: var(--transition);
        backdrop-filter: blur(20px);
        padding: 2rem 0;
        box-shadow: var(--shadow-lg);
    }

    .nav-menu.active {
        left: 0;
    }

    .nav-toggle {
        display: flex;
    }

    .nav-actions {
        display: none;
    }

    .title-main {
        font-size: 2.5rem;
    }

    .hero-stats {
        gap: 2rem;
    }

    .hero-buttons {
        flex-direction: column;
        align-items: center;
    }

    .about-content,
    .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .image-grid {
        grid-template-columns: 1fr;
        grid-template-rows: 250px 100px 100px;
    }

    .grid-item.large {
        grid-row: 1;
    }

    .footer-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .footer-links {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .footer-stats {
        justify-content: center;
    }

    .section-title {
        font-size: 2rem;
    }

    .courses-grid,
    .services-grid,
    .features-grid {
        grid-template-columns: 1fr;
    }

    .form-row {
        grid-template-columns: 1fr;
    }
}`,
        js_content: `// Smooth scrolling for navigation links
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

// Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
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
document.querySelectorAll('.product-item, .service-item, .feature-card, .achievement-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
       
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
            }
        };
       
        updateCounter();
    });
};

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    heroObserver.observe(heroStats);
}

// Form submission with enhanced feedback
document.querySelector('.form')?.addEventListener('submit', function(e) {
    e.preventDefault();
   
    // Get form data
    const firstName = this.querySelector('input[placeholder="First Name"]').value;
    const lastName = this.querySelector('input[placeholder="Last Name"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const course = this.querySelector('select').value;
    const message = this.querySelector('textarea').value;
   
    // Simple validation
    if (!firstName || !lastName || !email || !phone || !course || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
   
    // Show loading state
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
    button.disabled = true;
   
    // Simulate form submission
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
        button.style.background = 'var(--success)';
        showNotification('Thank you for your interest! We will contact you soon to discuss your learning journey.', 'success');
       
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            button.disabled = false;
            this.reset();
        }, 3000);
    }, 2000);
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = \`notification notification-\${type}\`;
    notification.innerHTML = \`
        <i class="fas fa-\${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>\${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    \`;
   
    // Add styles
    notification.style.cssText = \`
        position: fixed;
        top: 20px;
        right: 20px;
        background: \${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--error)' : 'var(--primary-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    \`;
   
    // Style close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = \`
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: auto;
        padding: 0.25rem;
        border-radius: 50%;
        transition: background 0.2s ease;
    \`;
   
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255,255,255,0.2)';
    });
   
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'none';
    });
   
    document.body.appendChild(notification);
   
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
   
    // Remove after 7 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 7000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-bg-image');
    if (heroImage) {
        heroImage.style.transform = \`translateY(\${scrolled * 0.5}px)\`;
    }
});

// Course card hover effects
document.querySelectorAll('.product-item').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
   
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add dynamic typing effect to hero title
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
window.addEventListener('load', () => {
    const titleElement = document.querySelector('.title-main');
    if (titleElement) {
        const originalText = titleElement.textContent;
        setTimeout(() => {
            typeWriter(titleElement, originalText, 80);
        }, 1000);
    }
});`,
        fields: {
          businessName: { type: 'text', label: 'Institution Name', required: true },
          tagline: { type: 'text', label: 'Educational Mission', required: false },
          description: { type: 'textarea', label: 'About Your Institution', required: true },
          logo: { type: 'image', label: 'Logo', required: false },
          heroImage: { type: 'image', label: 'Hero Background Image', required: false },
          primaryColor: { type: 'color', label: 'Primary Color', default: '#3498db' },
          secondaryColor: { type: 'color', label: 'Secondary Color', default: '#2ecc71' },
          phone: { type: 'text', label: 'Phone Number', required: false },
          email: { type: 'email', label: 'Email Address', required: false },
          address: { type: 'text', label: 'Address', required: false },
          products: { type: 'array', label: 'Courses/Programs', fields: { name: 'text', description: 'textarea', price: 'text', image: 'image' } },
          services: { type: 'array', label: 'Educational Services', fields: { name: 'text', description: 'textarea' } },
          socialMedia: { type: 'object', label: 'Social Media', fields: { facebook: 'url', instagram: 'url', twitter: 'url' } }
        }
      }
    });

    console.log('✅ Templates seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding templates:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedTemplates();