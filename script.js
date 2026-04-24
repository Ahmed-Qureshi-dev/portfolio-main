/* ══════════════════════════════════════════════════════
   AHMED QURESHI DEV — SCRIPT.JS
   Fully fixed: theme toggle, typewriter, modal, forms
══════════════════════════════════════════════════════ */

// ─── PRELOADER ───────────────────────────────────
function startApp() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hide');
        setTimeout(() => { preloader.style.display = 'none'; }, 700);
    }

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    updateTime();
    setInterval(updateTime, 1000);

    const typewriterEl = document.getElementById('typewriter');
    if (typewriterEl) initTypewriter();

    initScrollReveal();
    initSpotlight();
    initMagneticBtns();
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    startApp();
} else {
    window.addEventListener('load', startApp);
}

// ─── LOCAL TIME ───────────────────────────────────
function updateTime() {
    const el = document.getElementById('local-time');
    if (!el) return;
    el.textContent = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: false,
        timeZone: 'Asia/Karachi'
    });
}

// ─── THEME TOGGLE ─────────────────────────────────
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('aq-theme') || 'dark';
applyTheme(savedTheme);

function applyTheme(theme) {
    if (theme === 'light') {
        htmlEl.classList.remove('dark');
    } else {
        htmlEl.classList.add('dark');
    }
    localStorage.setItem('aq-theme', theme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = htmlEl.classList.contains('dark');
        applyTheme(isDark ? 'light' : 'dark');
    });
}

// ─── MOBILE MENU ──────────────────────────────────
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMobileMenu = document.getElementById('close-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.style.opacity = '1';
    mobileMenu.style.pointerEvents = 'auto';
    document.body.style.overflow = 'hidden';
}

function closeMobileMenuFn() {
    if (!mobileMenu) return;
    mobileMenu.style.opacity = '0';
    mobileMenu.style.pointerEvents = 'none';
    document.body.style.overflow = '';
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
if (closeMobileMenu) closeMobileMenu.addEventListener('click', closeMobileMenuFn);
mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenuFn));

// ─── SCROLL SPY + SCROLL TO TOP ───────────────────
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const sections = document.querySelectorAll('.section-spy');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // Scroll to top button
    if (scrollToTopBtn) {
        if (window.scrollY > 400) {
            scrollToTopBtn.classList.remove('translate-y-20', 'opacity-0');
        } else {
            scrollToTopBtn.classList.add('translate-y-20', 'opacity-0');
        }
    }

    // Nav active state
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (current && link.getAttribute('href') && link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ─── SCROLL REVEAL ────────────────────────────────
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        // Immediately reveal if already in viewport
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('is-visible');
        } else {
            observer.observe(el);
        }
    });
}

// ─── TYPEWRITER ───────────────────────────────────
function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const words = [
        'MERN Stack Developer',
        'SEO Specialist',
        'Shopify Developer',
        'Social Media Manager',
        'UI/UX Designer'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            el.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 35;
        } else {
            el.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2200;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 350;
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1200);
}

// ─── SPOTLIGHT EFFECT ─────────────────────────────
function initSpotlight() {
    document.querySelectorAll('.bento-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// ─── MAGNETIC BUTTONS ─────────────────────────────
function initMagneticBtns() {
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    document.querySelectorAll('.cta-primary, .cta-secondary, .hire-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ─── PROJECT FILTER ───────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');
        projectItems.forEach(project => {
            const catAttr = project.getAttribute('data-filter-category') || project.getAttribute('data-cat') || '';
            const categories = catAttr.split(/\s+/);
            if (filterValue === 'all' || categories.includes(filterValue)) {
                project.style.display = 'block';
                project.classList.add('is-visible');
            } else {
                project.style.display = 'none';
            }
        });

        const filterCount = document.getElementById('filter-count');
        if (filterCount) {
            const visible = document.querySelectorAll('.project-item[style="display: block;"], .project-item:not([style])').length;
            filterCount.textContent = `Showing ${visible} project${visible !== 1 ? 's' : ''}`;
        }
    });
});

// ─── 3D TILT (Project Cards) ──────────────────────
if (window.matchMedia("(min-width: 768px)").matches) {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
            card.style.transform = `perspective(1000px) rotateX(${y * -4}deg) rotateY(${x * 4}deg) scale3d(1.01, 1.01, 1.01)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ─── PROJECT MODAL ────────────────────────────────
const modal = document.getElementById('project-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalContent = document.getElementById('modal-content');
const closeModalBtn = document.getElementById('close-modal');

function openModal(data) {
    if (!modal) return;

    const mTitle = document.getElementById('modal-title');
    const mCategory = document.getElementById('modal-category');
    const mImage = document.getElementById('modal-image');
    const mDesc = document.getElementById('modal-desc');
    const mYear = document.getElementById('modal-year');
    const mTags = document.getElementById('modal-tags');
    const visitBtn = document.getElementById('modal-visit-btn');

    if (mTitle) mTitle.textContent = data.title || '';
    if (mCategory) mCategory.textContent = data.category || '';
    if (mImage) mImage.src = data.image || '';
    if (mDesc) mDesc.textContent = data.desc || '';
    if (mYear) mYear.textContent = data.year || '2026';

    if (mTags && data.tags) {
        mTags.innerHTML = '';
        data.tags.split(',').forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tag-item';
            span.textContent = tag.trim();
            mTags.appendChild(span);
        });
    }

    if (visitBtn) {
        visitBtn.href = (data.url && data.url.trim()) ? data.url : '#';
        visitBtn.style.display = (data.url && data.url.trim()) ? 'inline-flex' : 'none';
    }

    modal.classList.remove('hidden');
    modal.style.display = 'flex';

    requestAnimationFrame(() => {
        if (modalBackdrop) modalBackdrop.classList.remove('opacity-0');
        if (modalContent) {
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }
    });

    document.body.style.overflow = 'hidden';
}

function hideModal() {
    if (!modal) return;
    if (modalBackdrop) modalBackdrop.classList.add('opacity-0');
    if (modalContent) {
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');
    }
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.style.display = '';
        document.body.style.overflow = '';
    }, 300);
}

document.querySelectorAll('.project-trigger, .project-card-wrap').forEach(trigger => {
    trigger.addEventListener('click', () => {
        openModal({
            title: trigger.dataset.title,
            category: trigger.dataset.category,
            image: trigger.dataset.image,
            desc: trigger.dataset.desc,
            url: trigger.dataset.url,
            tags: trigger.dataset.tags,
            year: trigger.dataset.year
        });
    });
});

if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', hideModal);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideModal(); });

// ─── TOAST ────────────────────────────────────────
const toastContainer = document.getElementById('toast-container');

function showToast(message, type = 'success') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    const bgClass = type === 'success'
        ? 'background:var(--accent);color:#fff;'
        : 'background:#ef4444;color:#fff;';

    toast.className = 'flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl font-medium text-sm toast-enter toast-enter-active';
    toast.style.cssText = bgClass + 'pointer-events:auto;';
    toast.innerHTML = type === 'success'
        ? `<i class="fas fa-check-circle"></i><span>${message}</span>`
        : `<i class="fas fa-exclamation-circle"></i><span>${message}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('toast-enter-active');
        toast.classList.add('toast-exit-active');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ─── CONTACT FORM ─────────────────────────────────
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-circle-notch animate-spin"></i> Sending...';
        submitBtn.disabled = true;

        const formData = {
            name: e.target.user_name.value.trim(),
            email: e.target.user_email.value.trim(),
            message: e.target.message.value.trim(),
            timestamp: window.firestoreTimestamp ? window.firestoreTimestamp() : new Date()
        };

        let firebaseSaved = false;
        let emailSent = false;

        // Firebase
        if (window.firestoreAddDoc && window.firebaseDB && window.firestoreCollection) {
            try {
                await window.firestoreAddDoc(
                    window.firestoreCollection(window.firebaseDB, 'contacts'),
                    formData
                );
                firebaseSaved = true;
                console.log('✅ Saved to Firestore');
            } catch (err) {
                console.error('❌ Firebase:', err);
            }
        }

        // EmailJS
        if (typeof emailjs !== 'undefined') {
            try {
                await emailjs.send('service_6dwiitt', 'template_xcak9lp', {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                    to_name: 'Ahmed Qureshi'
                });
                emailSent = true;
                console.log('✅ Email sent via EmailJS');
            } catch (err) {
                console.error('❌ EmailJS:', err);
            }
        }

        if (firebaseSaved || emailSent) {
            showToast('Message sent! I\'ll get back to you soon.', 'success');
            e.target.reset();
        } else {
            showToast('Failed to send. Please contact via WhatsApp.', 'error');
        }

        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
    });
}

// ─── NAV SCROLL EFFECT ────────────────────────────
const mainNav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
    if (!mainNav) return;
    if (window.scrollY > 50) {
        mainNav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.2)';
    } else {
        mainNav.style.boxShadow = 'none';
    }
});