let currentLang = "pt";

/* ============================================================
   TRADUÇÕES COMPLETAS (PT, EN, FR)
   ============================================================ */
const translations = {
    pt: { ... },   /* já tens tudo aqui — mantemos igual */
    en: { ... },
    fr: { ... }
};

/* ============================================================
   FUNÇÕES DE TRADUÇÃO
   ============================================================ */
const t = (key) => {
    return translations[currentLang]?.[key] ||
           translations["pt"]?.[key] ||
           key;
};

function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        const value = t(key);
        el.textContent = value;
    });
}

/* ============================================================
   ALTERAR LÍNGUA
   ============================================================ */
function setLanguage(lang) {
    currentLang = translations[lang] ? lang : "pt";
    applyTranslations();

    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    // Atualizar links do footer conforme a língua
    const privacyLink = document.getElementById("footer-privacy");
    const termsLink = document.getElementById("footer-terms");

    if (lang === "pt") {
        privacyLink.href = "politica-privacidade.html";
        termsLink.href = "termos-utilizacao.html";
    }
    else if (lang === "en") {
        privacyLink.href = "privacy-policy.html";
        termsLink.href = "terms-of-use.html";
    }
    else if (lang === "fr") {
        privacyLink.href = "politique-confidentialite.html";
        termsLink.href = "conditions-utilisation.html";
    }
}

/* ============================================================
   SCROLL SUAVE + NAV ACTIVE
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    applyTranslations();

    const OFFSET = 216;

    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (!href.startsWith("#")) return;

            e.preventDefault();
            const target = document.querySelector(href);
            const top = target.offsetTop - OFFSET;
            window.scrollTo({ top, behavior: "smooth" });
        });
    });

    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - OFFSET;
            if (window.scrollY >= sectionTop) current = section.id;
        });

        document.querySelectorAll(".nav-menu a").forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
        });
    });

    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
    });
});
