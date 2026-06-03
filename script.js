let currentLang = "pt";

/* ===================== TRADUÇÕES ===================== */
const translations = {
  pt: {
    "nav.home": "Início",
    "nav.about": "Sobre Nós",
    "nav.services": "Serviços",
    "nav.projects": "Projetos",
    "nav.faq": "FAQ",
    "nav.contact": "Contactos",

    "hero.title": "Soluções Digitais Inteligentes para Empresas Modernas",
    "hero.subtitle": "Tecnologia, automação e consultoria com foco em resultados.",
    "hero.text": "Desenhamos e implementamos soluções digitais que ligam processos, dados e equipas — com rigor, simplicidade e foco no utilizador.",
    "hero.btnServices": "Explorar Serviços",
    "hero.btnContact": "Contactar",
    "hero.boxTagline": "Digital · Automação · Qualidade",

    "about.title": "Sobre Nós",
    "about.text": "A HCR Digital Solutions desenvolve soluções digitais modernas, com foco em automação, eficiência e simplicidade. Trabalhamos com empresas que valorizam precisão, clareza e resultados concretos.",

    "services.title": "Serviços",
    "services.lead": "Desenhamos soluções à medida, alinhadas com a realidade operacional e estratégica da tua empresa.",

    "projects.title": "Projetos",
    "projects.text": "Alguns dos projetos desenvolvidos com foco em eficiência, automação e experiência digital.",

    "faq.title": "FAQ",
    "faq.text": "Trabalhamos por projeto ou em regime contínuo, sempre com objetivos claros e comunicação transparente.",

    "contact.title": "Contactos",
    "contact.text": "Envia-nos uma mensagem com o contexto do teu projeto:",

    "footer.privacy": "Política de Privacidade",
    "footer.terms": "Termos de Utilização",
    "footer.copy": "© 2026 HCR Digital Solutions — Todos os direitos reservados"
  },

  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",

    "hero.title": "Smart Digital Solutions for Modern Businesses",
    "hero.subtitle": "Technology, automation and consulting focused on results.",
    "hero.text": "We design and implement digital solutions that connect processes, data and teams — with rigor, simplicity and user focus.",
    "hero.btnServices": "Explore Services",
    "hero.btnContact": "Get in Touch",
    "hero.boxTagline": "Digital · Automation · Quality",

    "about.title": "About Us",
    "about.text": "HCR Digital Solutions develops modern digital solutions focused on automation, efficiency and simplicity.",

    "services.title": "Services",
    "services.lead": "We design tailored solutions aligned with your operational and strategic reality.",

    "projects.title": "Projects",
    "projects.text": "Some of the projects developed with focus on efficiency, automation and digital experience.",

    "faq.title": "FAQ",
    "faq.text": "We work per project or on an ongoing basis, always with clear objectives and transparent communication.",

    "contact.title": "Contact",
    "contact.text": "Send us a message with the context of your project:",

    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Use",
    "footer.copy": "© 2026 HCR Digital Solutions — All rights reserved"
  },

  fr: {
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.services": "Services",
    "nav.projects": "Projets",
    "nav.faq": "FAQ",
    "nav.contact": "Contacts",

    "hero.title": "Solutions numériques intelligentes pour entreprises modernes",
    "hero.subtitle": "Technologie, automatisation et conseil orientés résultats.",
    "hero.text": "Nous concevons et mettons en œuvre des solutions numériques qui relient processus, données et équipes — avec rigueur, simplicité et focus utilisateur.",
    "hero.btnServices": "Découvrir les services",
    "hero.btnContact": "Nous contacter",
    "hero.boxTagline": "Digital · Automatisation · Qualité",

    "about.title": "À propos de nous",
    "about.text": "HCR Digital Solutions développe des solutions numériques modernes axées sur l’automatisation, l’efficacité et la simplicité.",

    "services.title": "Services",
    "services.lead": "Nous concevons des solutions sur mesure, alignées avec la réalité opérationnelle et stratégique de votre entreprise.",

    "projects.title": "Projets",
    "projects.text": "Quelques projets développés avec un focus sur l’efficacité, l’automatisation et l’expérience digitale.",

    "faq.title": "FAQ",
    "faq.text": "Nous travaillons par projet ou en continu, avec des objectifs clairs et une communication transparente.",

    "contact.title": "Contacts",
    "contact.text": "Envoyez-nous un message avec le contexte de votre projet :",


    "footer.privacy": "Politique de Confidentialité",
    "footer.terms": "Conditions d’Utilisation",
    "footer.copy": "© 2026 HCR Digital Solutions — Tous droits réservés"
  }
};

/* ===================== APLICAR TRADUÇÕES ===================== */
function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = translations[currentLang]?.[key] || translations["pt"]?.[key] || key;
    el.textContent = value;
  });
}

/* ===================== LÍNGUA ===================== */
function setLanguage(lang) {
  if (!translations[lang]) lang = "pt";
  currentLang = lang;
  applyTranslations();

  // estado visual dos botões de língua
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  // atualizar links do footer
  const privacy = document.getElementById("footer-privacy");
  const terms = document.getElementById("footer-terms");

  if (privacy && terms) {
    if (lang === "pt") {
      privacy.href = "politica-privacidade.html";
      terms.href = "termos-utilizacao.html";
    } else if (lang === "en") {
      privacy.href = "privacy-policy.html";
      terms.href = "terms-of-use.html";
    } else if (lang === "fr") {
      privacy.href = "politique-confidentialite.html";
      terms.href = "conditions-utilisation.html";
    }
  }
}

/* ===================== SCROLL + NAV ATIVO ===================== */
document.addEventListener("DOMContentLoaded", () => {
  applyTranslations();

  const OFFSET = 216;

  // scroll suave
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;

      const top = target.offsetTop - OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  // nav ativo
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - OFFSET;
      if (window.scrollY >= sectionTop) current = section.id;
    });

    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  });

  // botões de língua
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });
});
