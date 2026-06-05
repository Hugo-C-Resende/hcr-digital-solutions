let currentLang = "pt";

/* ===================== TRADUÇÕES ===================== */
const translations = {
  pt: { /* mantém tudo como já tens */ },
  en: { /* mantém tudo como já tens */ },
  fr: { /* mantém tudo como já tens */ }
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

  /* Botões de língua */
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  /* Navtabs normais (anchors) */
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".nav-menu a").forEach((l) =>
        l.classList.remove("active")
      );
      link.classList.add("active");
    });
  });
});
