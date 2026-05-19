const translations = {

  en: {
    heroTitle: "Intelligent Digital Solutions for Modern Companies",
    heroSubtitle: "Human-centered technology, automation and digital consulting.",
    exploreBtn: "Explore Services",
    contactBtn: "Contact",
    aboutTitle: "About the Company",
    servicesTitle: "Services",
    contactTitle: "Contacts"
  },

  fr: {
    heroTitle: "Solutions Numériques Intelligentes pour les Entreprises Modernes",
    heroSubtitle: "Technologie centrée sur l’humain, automatisation et conseil digital.",
    exploreBtn: "Explorer les Services",
    contactBtn: "Contact",
    aboutTitle: "À Propos",
    servicesTitle: "Services",
    contactTitle: "Contacts"
  },

  de: {
    heroTitle: "Intelligente Digitale Lösungen für Moderne Unternehmen",
    heroSubtitle: "Menschenzentrierte Technologie, Automatisierung und digitale Beratung.",
    exploreBtn: "Dienstleistungen",
    contactBtn: "Kontakt",
    aboutTitle: "Über Uns",
    servicesTitle: "Dienstleistungen",
    contactTitle: "Kontakte"
  }

};

document.getElementById("languageSwitcher")
.addEventListener("change", function(){

  const lang = this.value;

  document.querySelectorAll("[data-key]").forEach(el => {

    const key = el.getAttribute("data-key");

    if(translations[lang] && translations[lang][key]){
      el.textContent = translations[lang][key];
    }

  });

});