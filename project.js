
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');
mobileMenuBtn.addEventListener('click', () => { mobileMenu.style.opacity = '1'; mobileMenu.style.pointerEvents = 'auto'; });
closeMenu.addEventListener('click', () => { mobileMenu.style.opacity = '0'; mobileMenu.style.pointerEvents = 'none'; });

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');
const filterCount = document.getElementById('filter-count');
const emptyState = document.getElementById('empty-state');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        let visible = 0;
        projectItems.forEach(item => {
            const cats = item.dataset.cat || '';
            const show = filter === 'all' || cats.includes(filter);
            item.classList.toggle('hidden-filter', !show);
            if (show) visible++;
        });
        filterCount.textContent = `Showing ${visible} project${visible !== 1 ? 's' : ''}`;
        emptyState.classList.toggle('hidden', visible > 0);
    });
});

// Spotlight effect
document.querySelectorAll('.project-card-wrap').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
        card.style.setProperty('--y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
    });
});

// Modal
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const modalBackdrop = document.getElementById('modal-backdrop');
const closeModal = document.getElementById('close-modal');

function openModal(data) {
    modal.style.display = 'flex';
    setTimeout(() => { modalContent.style.opacity = '1'; modalContent.style.transform = 'scale(1)'; }, 10);
    document.getElementById('modal-image').src = data.image;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-desc').textContent = data.desc;
    document.getElementById('modal-year').textContent = data.year;
    document.getElementById('modal-visit-btn').href = data.url;
    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = '';
    (data.tags || '').split(',').forEach(t => {
        const span = document.createElement('span');
        span.className = 'px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-slate-300';
        span.textContent = t.trim();
        tagsContainer.appendChild(span);
    });
    document.body.style.overflow = 'hidden';
}

function closeModalFn() {
    modalContent.style.opacity = '0';
    modalContent.style.transform = 'scale(0.95)';
    setTimeout(() => { modal.style.display = 'none'; }, 300);
    document.body.style.overflow = '';
}

document.querySelectorAll('.project-card-wrap').forEach(el => {
    el.addEventListener('click', () => {
        openModal({
            title: el.dataset.title, category: el.dataset.category,
            image: el.dataset.image, desc: el.dataset.desc,
            url: el.dataset.url, tags: el.dataset.tags, year: el.dataset.year,
        });
    });
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Icon sahi set karo based on current class
if (html.classList.contains('dark')) {
    themeToggle.innerHTML = '<i class="fas fa-sun text-sm"></i>';
} else {
    themeToggle.innerHTML = '<i class="fas fa-moon text-sm"></i>';
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    if (html.classList.contains('dark')) {
        localStorage.theme = 'dark';
        themeToggle.innerHTML = '<i class="fas fa-sun text-sm"></i>';
    } else {
        localStorage.theme = 'light';
        themeToggle.innerHTML = '<i class="fas fa-moon text-sm"></i>';
    }
});

closeModal.addEventListener('click', closeModalFn);
modalBackdrop.addEventListener('click', closeModalFn);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModalFn(); });
