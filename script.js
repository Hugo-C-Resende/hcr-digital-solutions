// Scroll suave para as secções
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        const id = link.getAttribute('href').substring(1);
        const target = document.getElementById(id);
        if (!target) return;

        const headerHeight = document.querySelector('.header-fixed').offsetHeight;
        const navbarHeight = document.querySelector('.navbar-fixed').offsetHeight;
        const offset = headerHeight + navbarHeight;

        const top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });

        // Atualiza estado ativo
        document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
    });
});

// Atualiza o link ativo conforme o scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').substring(1) === current) {
            a.classList.add('active');
        }
    });
});
