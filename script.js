// SCROLL SUAVE
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

        document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
    });
});

// ATUALIZAR LINK ATIVO NO SCROLL
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 220;
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

// I18N
const translations = {
    pt: {
        'nav.home': 'Início',
        'nav.about': 'Sobre Nós',
        'nav.services': 'Serviços',
        'nav.testimonials': 'Testemunhos',
        'nav.faq': 'FAQ',
        'nav.contact': 'Contactos',

        'hero.title': 'Soluções Digitais Inteligentes para Empresas Modernas',
        'hero.subtitle': 'Tecnologia, automação e consultoria com foco em resultados.',
        'hero.text': 'Desenhamos e implementamos soluções digitais que ligam processos, dados e equipas — com rigor, simplicidade e foco no utilizador.',
        'hero.btnServices': 'Explorar Serviços',
        'hero.btnContact': 'Contactar',
        'hero.boxTagline': 'Digital · Automação · Qualidade',

        'about.title': 'Sobre Nós',
        'about.text': 'A HCR Digital Solutions é especializada em consultoria digital, automação e desenvolvimento de soluções tecnológicas centradas no utilizador.',
        'about.missionTitle': 'Missão',
        'about.missionText': 'Criar soluções digitais modernas que simplificam processos e aumentam a eficiência empresarial.',
        'about.visionTitle': 'Visão',
        'about.visionText': 'Ser parceiro estratégico de empresas que querem crescer com tecnologia e automação inteligente.',
        'about.valuesTitle': 'Valores',
        'about.valuesText': 'Precisão, transparência, simplicidade, inovação e compromisso com resultados concretos.',

        'services.title': 'Serviços',
        'services.lead': 'Desenhamos soluções à medida, alinhadas com a realidade operacional e estratégica da tua empresa.',
        'services.1.title': 'Consultoria Digital',
        'services.1.text': 'Análise de processos, diagnóstico digital e roadmap de transformação.',
        'services.2.title': 'Automação & Ferramentas',
        'services.2.text': 'Dashboards, automações, integrações e ferramentas internas.',
        'services.3.title': 'Web & Experiência Digital',
        'services.3.text': 'Websites, portais internos e experiências digitais profissionais.',

        'testimonials.title': 'Testemunhos',
        'testimonials.text': 'Empresas que já trabalham com a HCR destacam a clareza, o rigor e a capacidade de transformar necessidades complexas em soluções simples.',

        'faq.title': 'FAQ',
        'faq.text': 'Trabalhamos por projeto ou em regime contínuo, sempre com objetivos claros e comunicação transparente.',

        'contact.title': 'Contactos',
        'contact.text': 'Envia-nos um email com o contexto do teu projeto:',
        'contact.emailLabel': 'contacto@hcrdigitalsolutions.com',
        'contact.hours': 'Horário: 09h00 – 18h00 (Seg–Sex)',

        'footer.privacy': 'Política de Privacidade',
        'footer.terms': 'Termos de Utilização',
        'footer.copyright':
            '© 2026 HCR Digital Solutions — Todos os direitos reservados',
        'footer.copyrightLabel':
            'Copyright'
    },

    en: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.services': 'Services',
        'nav.testimonials': 'Testimonials',
        'nav.faq': 'FAQ',
        'nav.contact': 'Contact',

        'hero.title': 'Intelligent Digital Solutions for Modern Businesses',
        'hero.subtitle': 'Technology, automation and consulting focused on results.',
        'hero.text': 'We design and implement digital solutions that connect processes, data and teams — with rigour, simplicity and user focus.',
        'hero.btnServices': 'Explore Services',
        'hero.btnContact': 'Get in Touch',
        'hero.boxTagline': 'Digital · Automation · Quality',

        'about.title': 'About Us',
        'about.text': 'HCR Digital Solutions specialises in digital consulting, automation and user‑centric technology solutions.',
        'about.missionTitle': 'Mission',
        'about.missionText': 'Create modern digital solutions that simplify processes and increase business efficiency.',
        'about.visionTitle': 'Vision',
        'about.visionText': 'Be a strategic partner for companies that want to grow with technology and intelligent automation.',
        'about.valuesTitle': 'Values',
        'about.valuesText': 'Precision, transparency, simplicity, innovation and commitment to tangible results.',

        'services.title': 'Services',
        'services.lead': 'We design tailored solutions aligned with your operational and strategic reality.',
        'services.1.title': 'Digital Consulting',
        'services.1.text': 'Process analysis, digital diagnosis and transformation roadmap.',
        'services.2.title': 'Automation & Tools',
        'services.2.text': 'Dashboards, automations, integrations and internal tools.',
        'services.3.title': 'Web & Digital Experience',
        'services.3.text': 'Websites, internal portals and professional digital experiences.',

        'testimonials.title': 'Testimonials',
        'testimonials.text': 'Companies working with HCR highlight clarity, rigour and the ability to turn complex needs into simple solutions.',

        'faq.title': 'FAQ',
        'faq.text': 'We work on a project basis or ongoing, always with clear objectives and transparent communication.',

        'contact.title': 'Contact',
        'contact.text': 'Send us an email with the context of your project:',
        'contact.emailLabel': 'contact@hcrdigitalsolutions.com',
        'contact.hours': 'Opening hours: 09:00 – 18:00 (Mon–Fri)',

        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Use',
        'footer.copyright':
            '© 2026 HCR Digital Solutions — All rights reserved',
        'footer.copyrightLabel':
            'Copyright'
    },

    fr: {
        'nav.home': 'Accueil',
        'nav.about': 'À propos',
        'nav.services': 'Services',
        'nav.testimonials': 'Témoignages',
        'nav.faq': 'FAQ',
        'nav.contact': 'Contacts',

        'hero.title': 'Solutions numériques intelligentes pour entreprises modernes',
        'hero.subtitle': 'Technologie, automatisation et conseil orientés résultats.',
        'hero.text': 'Nous concevons et mettons en œuvre des solutions numériques qui relient processus, données et équipes — avec rigueur, simplicité et focus utilisateur.',
        'hero.btnServices': 'Découvrir les services',
        'hero.btnContact': 'Nous contacter',
        'hero.boxTagline': 'Digital · Automatisation · Qualité',

        'about.title': 'À propos de nous',
        'about.text': 'HCR Digital Solutions est spécialisée dans le conseil digital, l’automatisation et les solutions technologiques centrées sur l’utilisateur.',
        'about.missionTitle': 'Mission',
        'about.missionText': 'Créer des solutions numériques modernes qui simplifient les processus et augmentent l’efficacité des entreprises.',
        'about.visionTitle': 'Vision',
        'about.visionText': 'Être un partenaire stratégique pour les entreprises qui souhaitent croître grâce à la technologie et à l’automatisation intelligente.',
        'about.valuesTitle': 'Valeurs',
        'about.valuesText': 'Précision, transparence, simplicité, innovation et engagement envers des résultats concrets.',

        'services.title': 'Services',
        'services.lead': 'Nous concevons des solutions sur mesure, alignées sur la réalité opérationnelle et stratégique de votre entreprise.',
        'services.1.title': 'Conseil digital',
        'services.1.text': 'Analyse des processus, diagnostic digital et feuille de route de transformation.',
        'services.2.title': 'Automatisation & Outils',
        'services.2.text': 'Tableaux de bord, automatisations, intégrations et outils internes.',
        'services.3.title': 'Web & Expérience digitale',
        'services.3.text': 'Sites web, portails internes et expériences digitales professionnelles.',

        'testimonials.title': 'Témoignages',
        'testimonials.text': 'Les entreprises qui travaillent avec HCR soulignent la clarté, la rigueur et la capacité à transformer des besoins complexes en solutions simples.',

        'faq.title': 'FAQ',
        'faq.text': 'Nous travaillons au projet ou en continu, toujours avec des objectifs clairs et une communication transparente.',

        'contact.title': 'Contacts',
        'contact.text': 'Envoyez‑nous un email avec le contexte de votre projet :',
        'contact.emailLabel': 'contact@hcrdigitalsolutions.com',
        'contact.hours': 'Horaires : 09h00 – 18h00 (Lun–Ven)',

        'footer.privacy': 'Politique de confidentialité',
        'footer.terms': "Conditions d'utilisation",
        'footer.copyright':
            '© 2026 HCR Digital Solutions — Tous droits réservés',
        'footer.copyrightLabel':
            'Copyright'
    }
};

let currentLang = 'pt';

function applyTranslations(lang) {
    const dict = translations[lang];
    if (!dict) return;

    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });
}

// LANG SWITCHER
const langButtons = document.querySelectorAll('.lang-btn');

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        if (lang === currentLang) return;

        currentLang = lang;
        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyTranslations(lang);
    });
});

// Aplicar PT por defeito
applyTranslations('pt');
