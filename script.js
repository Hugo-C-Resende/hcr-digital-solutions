let currentLang = "pt";

/* ============================================================
   TRADUÇÕES
   ============================================================ */
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
    "hero.text": "Desenhamos e implementamos soluções digitais...",
    "hero.btnServices": "Explorar Serviços",
    "hero.btnContact": "Contactar",
    "hero.boxTagline": "Digital · Automação · Qualidade",

    "about.title": "Sobre Nós",
    "about.text": "A HCR Digital Solutions desenvolve soluções digitais modernas...",

    "services.title": "Serviços",
    "services.lead": "Desenhamos soluções à medida...",

    "projects.title": "Projetos",
    "projects.text": "Alguns dos projetos desenvolvidos...",

    "faq.title": "FAQ",
    "faq.text": "Trabalhamos por projeto...",

    "contact.title": "Contactos",
    "contact.text": "Envia-nos uma mensagem...",

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
    "hero.text": "We design and implement digital solutions...",
    "hero.btnServices": "Explore Services",
    "hero.btnContact": "Get in Touch",
    "hero.boxTagline": "Digital · Automation · Quality",

    "about.title": "About Us",
    "about.text": "HCR Digital Solutions develops modern digital solutions...",

    "services.title": "Services",
    "services.lead": "We design tailored solutions...",

    "projects.title": "Projects",
    "projects.text": "Some of the projects developed...",

    "faq.title": "FAQ",
    "faq.text": "We work per project...",

    "contact.title": "Contact",
    "contact.text": "Send us a message...",

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

    "hero.title": "Solutions numériques intelligentes...",
    "hero.subtitle": "Technologie, automatisation et conseil...",
    "hero.text": "Nous concevons des solutions numériques...",
    "hero.btnServices": "Découvrir les services",
    "hero.btnContact": "Nous contacter",
    "hero.boxTagline": "Digital · Automatisation · Qualité",

    "about.title": "À propos",
    "about.text": "HCR Digital Solutions développe...",

    "services.title": "Services",
    "services.lead": "Nous concevons des solutions...",

    "projects.title": "Projets",
    "projects.text": "Quelques projets développés...",

    "faq.title": "FAQ",
    "faq.text": "Nous travaillons par projet...",

    "contact.title": "Contacts",
    "contact.text": "Envoyez-nous un message...",

    "footer.privacy": "Politique de Confidentialité",
    "footer.terms": "Conditions d’Utilisation",
    "footer.copy": "© 2026 HCR Digital Solutions — Tous droits réservés"
  }
};

/* ============================================================
   TRADUÇÃO
   ============================================================ */
function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[currentLang][key] || key;
  });
}

/* ============================================================
   LÍNGUA
   ============================================================ */
function setLanguage(lang) {
  currentLang = lang;
  applyTranslations();

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  const privacy = document.getElementById("footer-privacy");
  const terms = document.getElementById("footer-terms");

  if (lang === "pt") {
    privacy.href = "politica-privacidade.html";
    terms.href = "termos-utilizacao.html";
  } else if (lang === "en") {
    privacy.href = "privacy-policy.html";
    terms.href = "terms-of-use.html";
  } else {
    privacy.href = "politique-confidentialite.html";
    terms.href = "conditions-utilisation.html";
  }
}

/* ============================================================
   SCROLL + NAV ATIVO
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  applyTranslations();

  const OFFSET = 216;

  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (!href.startsWith("#")) return;

      e.preventDefault();
      const target = document.querySelector(href);
      window.scrollTo({ top: target.offsetTop - OFFSET, behavior: "smooth" });
    });
  });

  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - OFFSET) {
        current = section.id;
      }
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  });

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });
});
