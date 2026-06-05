let currentLang = "pt";

/* ===================== TRADUÇÕES ===================== */
const translations = {
  pt: { /* mantém o teu bloco */ },
  en: { /* mantém o teu bloco */ },
  fr: { /* mantém o teu bloco */ }
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

/* ===================== ATIVAR TABS ===================== */
function activateTab(tabId) {
  // remover active-section de todas
  document.querySelectorAll(".tab-section").forEach((sec) => {
    sec.classList.remove("active-section");
  });

  // ativar a secção correta
  const target = document.getElementById(tabId);
  if (target) target.classList.add("active-section");

  // atualizar navbar
  document.querySelectorAll(".nav-menu button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });
}

/* ===================== LÍNGUA ===================== */
function setLanguage(lang) {
  if (!translations[lang]) lang = "pt";
  currentLang = lang;
  applyTranslations();

  document.querySelectorAll(".lang-btn").forEach((btn) => {
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

/* ===================== EVENTOS ===================== */
document.addEventListener("DOMContentLoaded", () => {
  applyTranslations();

  /* Botões da navbar */
  document.querySelectorAll(".nav-menu button").forEach((btn) => {
    btn.addEventListener("click", () => activateTab(btn.dataset.tab));
  });

  /* Botões internos (ex: Explorar Serviços, Contactar) */
  document.querySelectorAll("[data-tab]").forEach((btn) => {
    btn.addEventListener("click", () => activateTab(btn.dataset.tab));
  });

  /* Botões de língua */
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });
});
