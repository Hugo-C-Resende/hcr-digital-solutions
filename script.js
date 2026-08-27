let currentLang = "pt";

/* ===================== TRADUÇÕES ===================== */
const translations = {
pt: {
"nav.home": "Início",
"nav.about": "Sobre Nós",
"nav.services": "Serviços",
"nav.projects": "Projetos",
"nav.apps": "Apps",
"nav.faq": "FAQ",
"nav.contact": "Contactos",

"hero.title": "Soluções Digitais Inteligentes para Empresas Modernas",
"hero.subtitle": "Tecnologia, automação e consultoria com foco em resultados.",
"hero.text": "Desenhamos e implementamos soluções digitais que ligam processos, dados e equipas — com rigor, simplicidade e foco no utilizador.",
"hero.btnServices": "Explorar Serviços",
"hero.btnContact": "Contactar",
"hero.btnApps": "🚀 Pré-Lançamento",
"hero.boxTagline": "Digital · Automação · Qualidade",

"aql.eyebrow": "Produto em Desenvolvimento Real",
"aql.sectionTitle": "AQL — Plataforma de Inspeção de Qualidade",
"aql.lead": "Ao contrário dos conceitos abaixo, a AQL já tem meses de engenharia real: conformidade RGPD, isolamento multi-tenant (RLS), sincronização offline-first e testes automatizados.",

"apps.title": "Apps & Pré-Lançamentos",
"apps.lead": "Estamos também a validar novas ideias de produto. As apps abaixo são conceitos em fase de exploração, ainda sem desenvolvimento iniciado.",
"apps.card1.badge": "Em Breve",
"apps.card1.title": "Canal Horeca",
"apps.card1.text": "Plataforma dedicada ao setor Horeca (hotelaria e restauração), pensada para simplificar encomendas, comunicação e gestão entre fornecedores e estabelecimentos.",
"apps.card1.cta": "Saber Mais",

"apps.card2.badge": "Em Breve",
"apps.card2.title": "Wallet",
"apps.card2.text": "Carteira digital para gerir pagamentos, saldos e transações de forma simples, rápida e segura.",
"apps.card2.cta": "Saber Mais",

"apps.card3.badge": "Em Breve",
"apps.card3.title": "Orçamentos",
"apps.card3.text": "Aplicação para criar, enviar e gerir orçamentos profissionais de forma rápida e organizada.",
"apps.card3.cta": "Saber Mais",

"apps.card4.badge": "Em Breve",
"apps.card4.text": "Plataforma SaaS de inspeções de qualidade baseada na tabela AQL, com apoio à norma ISO 9001 e alertas automáticos sempre que surgem problemas a resolver. Disponível em Windows, Mac, iOS, Android e iPad, com integração com PHC, Primavera e Sage.",
"apps.card4.cta": "Pedir Acesso Antecipado",
"aql.tag.platforms": "Windows · Mac · iOS · Android · iPad",
"aql.tag.erp": "Integração PHC · Primavera · Sage",
"aql.tag.iso": "Alinhado com ISO 9001",

"about.title": "Sobre Nós",
"about.text": "A HCR Digital Solutions é uma empresa especializada no desenvolvimento de aplicações empresariais e soluções de automação. Criamos tecnologia que melhora processos, reduz custos e aumenta a eficiência operacional.",
"about.missionTitle": "Missão",
"about.missionText": "A nossa abordagem combina rigor técnico, simplicidade e foco total no utilizador. Cada aplicação é desenhada à medida, garantindo performance, segurança e escalabilidade.",
"about.visionTitle": "Visão",
"about.visionText": "Trabalhamos com empresas que procuram transformar processos internos em soluções digitais inteligentes.",
"about.valuesTitle": "Valores",
"about.valuesText": "Precisão, transparência, inovação, simplicidade e compromisso absoluto com resultados.",

"services.title": "Serviços",
"services.lead": "Desenhamos soluções à medida, alinhadas com a realidade operacional e estratégica da tua empresa.",
"services.1.title": "Desenvolvimento de Aplicações Empresariais",
"services.1.text": "Criamos apps internas, apps de gestão e apps personalizadas que ligam equipas, processos e dados.",
"services.2.title": "Automação de Processos",
"services.2.text": "Eliminamos tarefas manuais através de fluxos inteligentes e integrações automáticas.",
"services.3.title": "Integração de Sistemas",
"services.3.text": "Ligamos plataformas, bases de dados e serviços externos para garantir operações fluidas.",
"services.4.title": "Dashboards e Gestão de Dados",
"services.4.text": "Criamos interfaces inteligentes para análise, monitorização e tomada de decisão.",
"services.5.title": "Consultoria Digital",
"services.5.text": "Ajudamos empresas a identificar oportunidades de digitalização e a implementar soluções eficientes.",

"projects.title": "Projetos",
"projects.text": "Aplicações empresariais desenvolvidas para melhorar operações, automatizar processos e ligar equipas. Cada projeto é criado com foco em performance, segurança e escalabilidade.",
"projects.1.title": "Portal Interno de Gestão",
"projects.1.text": "Plataforma personalizada para gestão operacional, dashboards e automações internas.",
"projects.2.title": "Sistema de Automação Comercial",
"projects.2.text": "Automação de processos comerciais, integração com CRM e relatórios inteligentes.",
"projects.3.title": "Website Corporativo Premium",
"projects.3.text": "Website institucional com design premium, multilingue e otimização SEO completa.",

"faq.title": "FAQ",
"faq.text": "Trabalhamos por projeto ou em regime contínuo, sempre com objetivos claros e comunicação transparente.",
"faq.1.title": "Que tipo de aplicações desenvolvem?",
"faq.1.text": "Apps internas, apps de gestão, apps de automação e soluções personalizadas.",
"faq.2.title": "Quanto tempo demora um projeto?",
"faq.2.text": "Depende da complexidade, mas garantimos prazos realistas e comunicação contínua.",
"faq.3.title": "As apps são escaláveis?",
"faq.3.text": "Sim. Todas as soluções são desenhadas para crescer com o negócio.",
"faq.4.title": "Fazem manutenção?",
"faq.4.text": "Sim. Acompanhamos o ciclo completo da aplicação.",
"faq.5.title": "Integram com sistemas existentes?",
"faq.5.text": "Sim. Criamos integrações com plataformas, bases de dados e serviços externos.",
"faq.6.title": "Quanto custa?",
"faq.6.text": "Depende do número de utilizadores e módulos ativos — contacta-nos para um orçamento personalizado ao teu caso.",

"contact.title": "Contactos",
"contact.text": "Entre em contacto para desenvolver a sua aplicação empresarial ou automatizar processos internos. Respondemos rapidamente e analisamos cada projeto com rigor técnico.",
"contact.success": "Obrigado! O seu cliente de email vai abrir para enviar a mensagem.",
"contact.hours": "Horário: 09h00 - 18h00 (Seg-Sex)",

"footer.privacy": "Política de Privacidade",
"footer.terms": "Termos de Utilização",
"footer.copy": "© 2026 HCR Digital Solutions — Todos os direitos reservados"
},

en: {
"nav.home": "Home",
"nav.about": "About Us",
"nav.services": "Services",
"nav.projects": "Projects",
"nav.apps": "Apps",
"nav.faq": "FAQ",
"nav.contact": "Contact",

"hero.title": "Smart Digital Solutions for Modern Businesses",
"hero.subtitle": "Technology, automation and consulting focused on results.",
"hero.text": "We design and implement digital solutions that connect processes, data and teams — with rigour, simplicity and a focus on the user.",
"hero.btnServices": "Explore Services",
"hero.btnContact": "Get in Touch",
"hero.btnApps": "🚀 Pre-Launch",
"hero.boxTagline": "Digital · Automation · Quality",

"aql.eyebrow": "Real Product in Development",
"aql.sectionTitle": "AQL — Quality Inspection Platform",
"aql.lead": "Unlike the concepts below, AQL already has months of real engineering behind it: GDPR compliance, multi-tenant isolation (RLS), offline-first sync and automated testing.",

"apps.title": "Apps & Pre-Launches",
"apps.lead": "We're also validating new product ideas. The apps below are concepts still in the exploration phase, with no development started yet.",
"apps.card1.badge": "Coming Soon",
"apps.card1.title": "Canal Horeca",
"apps.card1.text": "A platform dedicated to the Horeca sector (hospitality and food service), designed to simplify ordering, communication and management between suppliers and businesses.",
"apps.card1.cta": "Learn More",

"apps.card2.badge": "Coming Soon",
"apps.card2.title": "Wallet",
"apps.card2.text": "A digital wallet to manage payments, balances and transactions simply, quickly and securely.",
"apps.card2.cta": "Learn More",

"apps.card3.badge": "Coming Soon",
"apps.card3.title": "Orçamentos",
"apps.card3.text": "An app to create, send and manage professional quotes quickly and in an organised way.",
"apps.card3.cta": "Learn More",

"apps.card4.badge": "Coming Soon",
"apps.card4.text": "SaaS platform for quality inspections based on the AQL table, aligned with ISO 9001. It covers the full closed-loop quality cycle — inspection → audit (internal or external) → corrective action → verification → closure — with automatic alerts at every stage whenever an issue needs resolving. Available on Windows, Mac, iOS, Android and iPad, with integration with PHC, Primavera and Sage.",
"apps.card4.cta": "Request Early Access",
"aql.tag.platforms": "Windows · Mac · iOS · Android · iPad",
"aql.tag.erp": "Integration with PHC · Primavera · Sage",
"aql.tag.iso": "Aligned with ISO 9001",

"about.title": "About Us",
"about.text": "HCR Digital Solutions specializes in enterprise application development and automation solutions. We create technology that improves processes, reduces costs and increases operational efficiency.",
"about.missionTitle": "Mission",
"about.missionText": "Our approach combines technical rigor, simplicity and a strong focus on the user. Every application is custom‑built to ensure performance, security and scalability.",
"about.visionTitle": "Vision",
"about.visionText": "We work with companies that want to transform internal processes into intelligent digital solutions.",
"about.valuesTitle": "Values",
"about.valuesText": "Precision, transparency, innovation, simplicity and absolute commitment to results.",

"services.title": "Services",
"services.lead": "We design tailor-made solutions, aligned with your company's operational and strategic reality.",
"services.1.title": "Enterprise Application Development",
"services.1.text": "We build internal apps, management apps and custom applications that connect teams, processes and data.",
"services.2.title": "Process Automation",
"services.2.text": "We eliminate manual tasks through intelligent workflows and automatic integrations.",
"services.3.title": "System Integration",
"services.3.text": "We connect platforms, databases and external services to ensure smooth operations.",
"services.4.title": "Dashboards & Data Management",
"services.4.text": "We create intelligent interfaces for analysis, monitoring and decision‑making.",
"services.5.title": "Digital Consulting",
"services.5.text": "We help companies identify digitalization opportunities and implement efficient solutions.",

"projects.title": "Projects",
"projects.text": "Enterprise applications built to improve operations, automate processes and connect teams. Every project is developed with a strong focus on performance, security and scalability.",
"projects.1.title": "Internal Management Portal",
"projects.1.text": "Custom platform for operational management, dashboards and internal automations.",
"projects.2.title": "Sales Automation System",
"projects.2.text": "Sales process automation, CRM integration and smart reporting.",
"projects.3.title": "Premium Corporate Website",
"projects.3.text": "Institutional website with premium design, multilingual and full SEO optimisation.",

"faq.title": "FAQ",
"faq.text": "We work per project or on an ongoing basis, always with clear goals and transparent communication.",
"faq.1.title": "What types of applications do you develop?",
"faq.1.text": "Internal apps, management apps, automation apps and custom solutions.",
"faq.2.title": "How long does a project take?",
"faq.2.text": "It depends on complexity, but we ensure realistic timelines and continuous communication.",
"faq.3.title": "Are the apps scalable?",
"faq.3.text": "Yes. All solutions are designed to grow with your business.",
"faq.4.title": "Do you provide maintenance?",
"faq.4.text": "Yes. We support the full lifecycle of the application.",
"faq.5.title": "Do you integrate with existing systems?",
"faq.5.text": "Yes. We integrate with platforms, databases and external services.",
"faq.6.title": "How much does it cost?",
"faq.6.text": "It depends on the number of users and active modules — contact us for a quote tailored to your case.",

"contact.title": "Contact",
"contact.text": "Get in touch to develop your enterprise application or automate internal processes. We respond quickly and evaluate each project with technical precision.",
"contact.success": "Thank you! Your email client will open to send the message.",
"contact.hours": "Hours: 9:00 AM - 6:00 PM (Mon-Fri)",

"footer.privacy": "Privacy Policy",
"footer.terms": "Terms of Use",
"footer.copy": "© 2026 HCR Digital Solutions — All rights reserved"
},

fr: {
"nav.home": "Accueil",
"nav.about": "À Propos",
"nav.services": "Services",
"nav.projects": "Projets",
"nav.apps": "Apps",
"nav.faq": "FAQ",
"nav.contact": "Contact",

"hero.title": "Solutions Digitales Intelligentes pour Entreprises Modernes",
"hero.subtitle": "Technologie, automatisation et conseil axés sur les résultats.",
"hero.text": "Nous concevons et mettons en œuvre des solutions digitales qui relient processus, données et équipes — avec rigueur, simplicité et un focus sur l’utilisateur.",
"hero.btnServices": "Découvrir les Services",
"hero.btnContact": "Nous Contacter",
"hero.btnApps": "🚀 Pré-Lancement",
"hero.boxTagline": "Digital · Automatisation · Qualité",

"aql.eyebrow": "Produit en Développement Réel",
"aql.sectionTitle": "AQL — Plateforme d'Inspection Qualité",
"aql.lead": "Contrairement aux concepts ci-dessous, AQL bénéficie déjà de mois d'ingénierie réelle : conformité RGPD, isolation multi-tenant (RLS), synchronisation offline-first et tests automatisés.",

"apps.title": "Apps & Pré-Lancements",
"apps.lead": "Nous validons également de nouvelles idées de produits. Les applications ci-dessous sont des concepts encore en phase d'exploration, sans développement encore entamé.",
"apps.card1.badge": "Bientôt Disponible",
"apps.card1.title": "Canal Horeca",
"apps.card1.text": "Plateforme dédiée au secteur Horeca (hôtellerie et restauration), conçue pour simplifier les commandes, la communication et la gestion entre fournisseurs et établissements.",
"apps.card1.cta": "En Savoir Plus",

"apps.card2.badge": "Bientôt Disponible",
"apps.card2.title": "Wallet",
"apps.card2.text": "Portefeuille numérique pour gérer paiements, soldes et transactions simplement, rapidement et en toute sécurité.",
"apps.card2.cta": "En Savoir Plus",

"apps.card3.badge": "Bientôt Disponible",
"apps.card3.title": "Orçamentos",
"apps.card3.text": "Application pour créer, envoyer et gérer des devis professionnels de façon rapide et organisée.",
"apps.card3.cta": "En Savoir Plus",

"apps.card4.badge": "Bientôt Disponible",
"apps.card4.text": "Plateforme SaaS d'inspections qualité basée sur la table AQL, alignée avec la norme ISO 9001. Elle couvre tout le cycle fermé de la qualité — inspection → audit (interne ou externe) → action corrective → vérification → clôture — avec des alertes automatiques à chaque étape dès qu'un problème survient. Disponible sur Windows, Mac, iOS, Android et iPad, avec intégration à PHC, Primavera et Sage.",
"apps.card4.cta": "Demander un Accès Anticipé",
"aql.tag.platforms": "Windows · Mac · iOS · Android · iPad",
"aql.tag.erp": "Intégration PHC · Primavera · Sage",
"aql.tag.iso": "Aligné avec la norme ISO 9001",

"about.title": "À Propos",
"about.text": "HCR Digital Solutions est spécialisée dans le développement d’applications professionnelles et de solutions d’automatisation. Nous créons des technologies qui améliorent les processus, réduisent les coûts et augmentent l’efficacité opérationnelle.",
"about.missionTitle": "Mission",
"about.missionText": "Notre approche combine rigueur technique, simplicité et un fort focus sur l’utilisateur. Chaque application est conçue sur mesure pour garantir performance, sécurité et évolutivité.",
"about.visionTitle": "Vision",
"about.visionText": "Nous accompagnons les entreprises qui souhaitent transformer leurs processus internes en solutions numériques intelligentes.",
"about.valuesTitle": "Valeurs",
"about.valuesText": "Précision, transparence, innovation, simplicité et engagement absolu envers les résultats.",

"services.title": "Services",
"services.lead": "Nous concevons des solutions sur mesure, alignées avec la réalité opérationnelle et stratégique de votre entreprise.",
"services.1.title": "Développement d’Applications Professionnelles",
"services.1.text": "Nous créons des applications internes, de gestion et sur mesure qui relient équipes, processus et données.",
"services.2.title": "Automatisation des Processus",
"services.2.text": "Nous éliminons les tâches manuelles grâce à des flux intelligents et des intégrations automatiques.",
"services.3.title": "Intégration de Systèmes",
"services.3.text": "Nous connectons plateformes, bases de données et services externes pour garantir des opérations fluides.",
"services.4.title": "Tableaux de Bord & Gestion des Données",
"services.4.text": "Nous créons des interfaces intelligentes pour l’analyse, la surveillance et la prise de décision.",
"services.5.title": "Conseil Digital",
"services.5.text": "Nous aidons les entreprises à identifier des opportunités de digitalisation et à mettre en place des solutions efficaces.",

"projects.title": "Projets",
"projects.text": "Applications professionnelles conçues pour améliorer les opérations, automatiser les processus et relier les équipes. Chaque projet est développé avec un fort focus sur la performance, la sécurité et l’évolutivité.",
"projects.1.title": "Portail Interne de Gestion",
"projects.1.text": "Plateforme personnalisée pour la gestion opérationnelle, tableaux de bord et automatisations internes.",
"projects.2.title": "Système d’Automatisation Commerciale",
"projects.2.text": "Automatisation des processus commerciaux, intégration CRM et rapports intelligents.",
"projects.3.title": "Site Web Corporate Premium",
"projects.3.text": "Site institutionnel avec design premium, multilingue et optimisation SEO complète.",

"faq.title": "FAQ",
"faq.text": "Nous travaillons par projet ou en continu, toujours avec des objectifs clairs et une communication transparente.",
"faq.1.title": "Quels types d’applications développez‑vous?",
"faq.1.text": "Applications internes, de gestion, d’automatisation et solutions sur mesure.",
"faq.2.title": "Combien de temps dure un projet?",
"faq.2.text": "Cela dépend de la complexité, mais nous garantissons des délais réalistes et une communication continue.",
"faq.3.title": "Les applications sont‑elles évolutives?",
"faq.3.text": "Oui. Toutes les solutions sont conçues pour évoluer avec l’entreprise.",
"faq.4.title": "Proposez‑vous de la maintenance?",
"faq.4.text": "Oui. Nous accompagnons tout le cycle de vie de l’application.",
"faq.5.title": "Intégrez‑vous des systèmes existants?",
"faq.5.text": "Oui. Nous réalisons des intégrations avec plateformes, bases de données et services externes.",
"faq.6.title": "Combien ça coûte ?",
"faq.6.text": "Cela dépend du nombre d'utilisateurs et des modules actifs — contactez-nous pour un devis personnalisé à votre cas.",

"contact.title": "Contact",
"contact.text": "Contactez‑nous pour développer votre application professionnelle ou automatiser vos processus internes. Nous répondons rapidement et analysons chaque projet avec rigueur technique.",
"contact.success": "Merci ! Votre client de messagerie va s'ouvrir pour envoyer le message.",
"contact.hours": "Horaires : 9h00 - 18h00 (Lun-Ven)",

"footer.privacy": "Politique de Confidentialité",
"footer.terms": "Conditions d'Utilisation",
"footer.copy": "© 2026 HCR Digital Solutions — Tous droits réservés"
}
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

if (history.replaceState) {
history.replaceState(null, "", "#" + tabId);
}

window.scrollTo({ top: 0, behavior: "instant" });
}

/* ===================== FORMULÁRIO DE CONTACTO ===================== */
function initContactForm() {
const form = document.querySelector(".contact-form");
if (!form) return;

form.addEventListener("submit", function (e) {
e.preventDefault();

const firstName = document.getElementById("contact-firstname").value.trim();
const lastName = document.getElementById("contact-lastname").value.trim();
const email = document.getElementById("contact-email").value.trim();
const countryCode = document.getElementById("phone-country").value;
const phone = document.getElementById("contact-phone").value.trim();
const message = document.getElementById("contact-message").value.trim();

const subject = "Novo contacto de " + firstName + " " + lastName;
const body =
"Nome: " + firstName + " " + lastName + "\n" +
"Email: " + email + "\n" +
"Telefone: " + countryCode + " " + phone + "\n\n" +
"Mensagem:\n" + message;

const mailtoLink =
"mailto:hugocresende@hotmail.com?subject=" +
encodeURIComponent(subject) +
"&body=" +
encodeURIComponent(body);

window.location.href = mailtoLink;

const status = document.getElementById("contact-status");
if (status) {
const msg =
(translations[currentLang] && translations[currentLang]["contact.success"]) ||
translations.pt["contact.success"];
status.textContent = msg;
status.classList.add("visible");
}
});
}

/* ===================== EVENTOS ===================== */
document.addEventListener("DOMContentLoaded", () => {
applyTranslations();
applyContactLanguage(currentLang);
initContactForm();

// navbar
document.querySelectorAll(".nav-menu button").forEach((btn) => {
btn.addEventListener("click", () => activateTab(btn.dataset.tab));
});

// botões internos (mas APENAS os da hero)
document.querySelectorAll(".hero-actions button").forEach((btn) => {
btn.addEventListener("click", () => activateTab(btn.dataset.tab));
});

// apps CTA
document.querySelectorAll(".app-card-cta").forEach((btn) => {
btn.addEventListener("click", () => activateTab(btn.dataset.tab));
});

// línguas
document.querySelectorAll(".lang-btn").forEach((btn) => {
btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

const validTabs = ["home", "about", "services", "projects", "apps", "faq", "contact"];
const hash = window.location.hash.replace("#", "");
activateTab(validTabs.includes(hash) ? hash : "home");
});
