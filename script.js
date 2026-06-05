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
    "about.missionTitle": "Missão",
    "about.missionText": "Criar soluções digitais que simplificam processos, reduzem tarefas repetitivas e aumentam a eficiência operacional.",
    "about.visionTitle": "Visão",
    "about.visionText": "Ser parceiro estratégico de empresas que procuram evoluir com tecnologia, automação e experiência digital premium.",
    "about.valuesTitle": "Valores",
    "about.valuesText": "Precisão, transparência, inovação, simplicidade e compromisso absoluto com resultados.",

    "services.title": "Serviços",
    "services.lead": "Desenhamos soluções à medida, alinhadas com a realidade operacional e estratégica da tua empresa.",
    "services.1.title": "Consultoria Digital",
    "services.1.text": "Análise de processos, diagnóstico digital e roadmap de transformação.",
    "services.2.title": "Automação & Ferramentas",
    "services.2.text": "Dashboards, automações, integrações e ferramentas internas.",
    "services.3.title": "Web & Experiência Digital",
    "services.3.text": "Websites, portais internos e experiências digitais profissionais.",

    "projects.title": "Projetos",
    "projects.text": "Alguns dos projetos desenvolvidos com foco em eficiência, automação e experiência digital.",
    "projects.1.title": "Portal Interno de Gestão",
    "projects.1.text": "Plataforma personalizada para gestão operacional, dashboards e automações internas.",
    "projects.2.title": "Sistema de Automação Comercial",
    "projects.2.text": "Automação de processos comerciais, integração com CRM e relatórios inteligentes.",
    "projects.3.title": "Website Corporativo Premium",
    "projects.3.text": "Website institucional com design premium, multilingue e otimização SEO completa.",

    "faq.title": "FAQ",
    "faq.text": "Trabalhamos por projeto ou em regime contínuo, sempre com objetivos claros e comunicação transparente.",

    "contact.title": "Contactos",
    "contact.text": "Envia-nos uma mensagem com o contexto do teu projeto:",

    "footer.privacy": "Política de Privacidade",
    "footer.terms": "Termos de Utilização",
    "footer.copy": "© 2026 HCR Digital Solutions — Todos os direitos reservados"
  },

  /* EN + FR mantêm-se iguais ao teu ficheiro */
  en: translations.en,
  fr: translations.fr
};

/* ===================== APLICAR TRADUÇÕES ===================== */
function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value =
      translations[currentLang]?.[key] ||
      translations["pt"]?.[key] ||
      key;
    el.textContent = value;
  });
}

/* ===================== PLACEHOLDERS & TELEFONE ===================== */
function applyContactLanguage(lang) {
  const first = document.getElementById("contact-firstname");
  const last = document.getElementById("contact-lastname");
  const email = document.getElementById("contact-email");
  const phone = document.getElementById("contact-phone");
  const message = document.getElementById("contact-message");
  const submit = document.getElementById("contact-submit");
  const countrySelect = document.getElementById("phone-country");

  if (!first) return;

  if (lang === "pt") {
    first.placeholder = "Nome *";
    last.placeholder = "Sobrenome *";
    email.placeholder = "Email *";
    phone.placeholder = "Telefone *";
    message.placeholder = "Escreva a sua mensagem";
    submit.textContent = "Submeter";
    if (countrySelect) countrySelect.value = "+351";
  } else if (lang === "en") {
    first.placeholder = "First name *";
    last.placeholder = "Last name *";
    email.placeholder = "Email *";
    phone.placeholder = "Phone *";
    message.placeholder = "Write your message";
    submit.textContent = "Submit";
    if (countrySelect) countrySelect.value = "+44";
  } else {
    first.placeholder = "Prénom *";
    last.placeholder = "Nom *";
    email.placeholder = "Email *";
    phone.placeholder = "Téléphone *";
    message.placeholder = "Écrivez votre message";
    submit.textContent = "Envoyer";
    if (countrySelect) countrySelect.value = "+33";
  }
}

/* ===================== LÍNGUA ===================== */
function setLanguage(lang) {
  if (!translations[lang]) lang = "pt";
  currentLang = lang;

  applyTranslations();
  applyContactLanguage(lang);

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

/* ===================== TABS ===================== */
function activateTab(tabId) {
  document.querySelectorAll(".tab-section").forEach((sec) => {
    sec.classList.toggle("active-section", sec.id === tabId);
  });

  document.querySelectorAll(".nav-menu button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });

  window.scrollTo({ top: 0, behavior: "instant" });
}

/* ===================== EVENTOS ===================== */
document.addEventListener("DOMContentLoaded", () => {
  applyTranslations();
  applyContactLanguage(currentLang);

  // navbar
  document.querySelectorAll(".nav-menu button").forEach((btn) => {
    btn.addEventListener("click", () => activateTab(btn.dataset.tab));
  });

  // botões internos (mas APENAS os da hero)
  document.querySelectorAll(".hero-actions button").forEach((btn) => {
    btn.addEventListener("click", () => activateTab(btn.dataset.tab));
  });

  // línguas
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  activateTab("home");
});
