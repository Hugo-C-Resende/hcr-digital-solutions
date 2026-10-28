/* HCR Digital Solutions — site.js
   PT vem do HTML (indexável); EN e FR em dicionários. Sem dependências. */
(function () {
  "use strict";

  var EN = {
    "skip": "Skip to content",
    "nav.apps": "Products", "nav.services": "Services", "nav.process": "How we work", "nav.about": "About", "nav.faq": "FAQ", "nav.contact": "Contact",
    "cta.quote": "Request a quote",
    "meta.title": "HCR Digital Solutions | Custom software and process automation — Portugal",
    "meta.desc": "Custom software, process automation and dashboards for businesses. Makers of HCR Finance Master (personal and family finance, Windows and web). Santa Maria da Feira, Portugal.",
    "hero.eyebrow": "Custom software · Santa Maria da Feira, Portugal",
    "hero.h1": "Custom software and <em>process automation</em> for modern businesses",
    "hero.lead": "We design and build applications, dashboards and integrations with technical rigour, a user focus and measurable results.",
    "hero.cta2": "See products",
    "hero.note": "We reply quickly. Hours: 9:00–18:00 (Mon–Fri).",
    "mock.aria": "Real HCR Finance Master screens (demo with fictional data): budget on desktop and transactions on mobile",
    "mock.cap": "Demo with fictional data · Windows · Web",
    "t1": "GDPR and EU servers", "t2": "Windows and web", "t3": "Offline-first with sync", "t4": "Exportable and deletable data",
    "apps.eyebrow": "Our own products",
    "apps.title": "Products built with the same standards as client projects",
    "apps.lead": "What we build for ourselves, we build for you: real engineering, privacy by default and automated testing.",
    "fm.badge": "Available · Free beta",
    "fm.text": "Personal and family finance in one place: track transactions and net worth, import CSV statements (the file stays on your device) and export or delete your data whenever you want.",
    "fm.c1": "Try the demo without signing up", "fm.c2": "Works on Windows and in the browser", "fm.c3": "Local CSV import and GDPR export",
    "fm.b1": "See details", "fm.b2": "Try the demo",
    "aql.badge": "In development",
    "aql.name": "AQL — Quality Inspection",
    "aql.text": "SaaS platform for quality inspections based on the AQL table and aligned with ISO 9001: inspection → audit → corrective action → verification → closure, with automatic alerts. Integration planned with PHC, Primavera and Sage.",
    "aql.cta": "Request early access",
    "apps.roadmap": "Being explored: Canal Horeca (ordering and management between suppliers and venues) · Quotes (professional proposals).",
    "svc.eyebrow": "Services",
    "svc.title": "Tailor-made solutions for your company's reality",
    "svc.lead": "We design solutions aligned with your company's operational and strategic reality.",
    "svc.1.t": "Enterprise application development", "svc.1.d": "We build internal apps, management apps and custom applications that connect teams, processes and data.",
    "svc.2.t": "Process automation", "svc.2.d": "We eliminate manual tasks with intelligent workflows and automatic integrations.",
    "svc.3.t": "System integration", "svc.3.d": "We connect platforms, databases and external services for smooth operations.",
    "svc.4.t": "Dashboards and data management", "svc.4.d": "We create intelligent interfaces for analysis, monitoring and decision-making.",
    "svc.5.t": "Digital consulting", "svc.5.d": "We help companies identify digitalisation opportunities and implement efficient solutions.",
    "svc.6.t": "Have a specific challenge?", "svc.6.d": "Tell us what you want to solve and we will propose the shortest path.",
    "proc.eyebrow": "Process", "proc.title": "How we work", "proc.lead": "A simple process, with continuous communication and realistic deadlines.",
    "proc.1.t": "Discovery", "proc.1.d": "We understand processes, data and goals to define what is really worth automating.",
    "proc.2.t": "Prototype", "proc.2.d": "We validate early with a working prototype, before investing in full development.",
    "proc.3.t": "Delivery and evolution", "proc.3.d": "We implement and maintain, with regular updates and direct technical support.",
    "about.eyebrow": "About us",
    "about.title": "Technology that improves processes and cuts costs",
    "about.text": "HCR Digital Solutions specialises in enterprise application development and automation solutions. We create technology that improves processes, reduces costs and increases operational efficiency.",
    "about.m.t": "Mission", "about.m.d": "Technical rigour, simplicity and a strong focus on the user. Every application is custom-built for performance, security and scalability.",
    "about.v.t": "Vision", "about.v.d": "To be a partner for companies that want to turn internal processes into intelligent digital solutions.",
    "about.val.t": "Values", "about.val.d": "Precision, transparency, innovation, simplicity and absolute commitment to results.",
    "faq.title": "Frequently asked questions",
    "faq.1.q": "What types of applications do you develop?", "faq.1.a": "Internal apps, management apps, automation apps and custom solutions.",
    "faq.2.q": "How long does a project take?", "faq.2.a": "It depends on complexity, but we ensure realistic timelines and continuous communication.",
    "faq.3.q": "Are the apps scalable?", "faq.3.a": "Yes. All solutions are designed to grow with your business.",
    "faq.4.q": "Do you provide maintenance?", "faq.4.a": "Yes — full lifecycle: regular updates, direct technical support (email/phone) and priority fixes for critical issues. SLA terms are defined by contract, based on the application's criticality.",
    "faq.5.q": "Do you integrate with existing systems?", "faq.5.a": "Yes. We integrate with platforms, databases and external services.",
    "faq.6.q": "How much does it cost?", "faq.6.a": "It depends on the number of users and active modules — contact us for a quote tailored to your case.",
    "ct.eyebrow": "Contact", "ct.title": "Let's talk about your project",
    "ct.lead": "Tell us the context and we will reply quickly. Hours: 9:00–18:00 (Mon–Fri).",
    "ct.name": "Name", "ct.email": "Email", "ct.msg": "Message", "ct.send": "Send", "ct.mail": "Email", "ct.loc": "Location",
    "ct.ok": "Thank you! Your email app will open to send the message.", "ct.err": "Please fill in name, a valid email and message.",
    "ftr.tag": "Smart digital solutions for modern businesses.", "ftr.priv": "Privacy Policy", "ftr.terms": "Terms of Use", "ftr.rights": "All rights reserved",
    /* product page */
    "fmp.eyebrow": "Free beta · Windows and web",
    "fmp.h1": "HCR Finance Master: <em>personal and family finance</em> in one place",
    "fmp.lead": "Track transactions and net worth, import CSV statements without sending the file over the internet, and keep your data yours: export or delete whenever you want.",
    "fmp.note": "Demo without signing up. The account is free during the beta, no card needed.",
    "k1.b": "Demo, no sign-up", "k1.s": "See the app with sample data",
    "k2.b": "Local CSV", "k2.s": "The file stays on your device",
    "k3.b": "Offline-first", "k3.s": "Syncs when you reconnect",
    "k4.b": "GDPR", "k4.s": "Export and delete your data",
    "fmp.ft": "What you can do",
    "f1.t": "Track transactions and net worth", "f1.d": "Log income and expenses, see the trend and understand where your household's money goes.",
    "f2.t": "Import CSV statements", "f2.d": "The file is read on your device; only the imported transactions enter your account.",
    "f3.t": "Works without a connection", "f3.d": "Keep using the app offline; changes sync when the connection returns.",
    "f4.t": "Family households", "f4.d": "Manage household finances and invite other people to the same household.",
    "f5.t": "Privacy by default", "f5.d": "EU servers, per-user data isolation and CSV export of your transactions.",
    "f6.t": "Delete whenever you want", "f6.d": "In Settings → Privacy you delete the account with your password.",
    "st.title": "Get started in 3 steps",
    "st.1.t": "Try the demo", "st.1.d": "Open the demo in your browser, no sign-up, and explore with sample data.",
    "st.2.t": "Create your account", "st.2.d": "Install from the Microsoft Store or use it in the browser. Free during the beta.",
    "st.3.t": "Import your transactions", "st.3.d": "Pick a CSV file from your bank and review before importing.",
    "beta.badge": "Beta", "beta.title": "We are looking for up to 15 testers for 4 weeks",
    "beta.text": "About 10 minutes a week of real use and two short questionnaires. No cost, no card.",
    "beta.cta": "Apply to the beta", "beta.bug": "Report a problem",
    "p1.q": "Is HCR Finance Master free?", "p1.a": "Yes, during the beta. No card is requested.",
    "p2.q": "Are my CSV files uploaded to the internet?", "p2.a": "No. The file is read on your device and only the imported transactions are synced to your account.",
    "p3.q": "Can I delete my account and data?", "p3.a": "Yes. In Settings → Privacy you can export your transactions as CSV and delete the account with your password.",
    "p4.q": "Which devices does it work on?", "p4.a": "On Windows (Microsoft Store) and in any modern browser, including mobile.",
    "fmp.priv": "Privacy Policy", "fmp.terms": "Terms of Service"
  };

  var FR = {
    "skip": "Aller au contenu",
    "nav.apps": "Produits", "nav.services": "Services", "nav.process": "Notre méthode", "nav.about": "À propos", "nav.faq": "FAQ", "nav.contact": "Contact",
    "cta.quote": "Demander un devis",
    "meta.title": "HCR Digital Solutions | Logiciels sur mesure et automatisation des processus — Portugal",
    "meta.desc": "Logiciels sur mesure, automatisation des processus et tableaux de bord pour les entreprises. Créateurs de HCR Finance Master (finances personnelles et familiales, Windows et web). Santa Maria da Feira, Portugal.",
    "hero.eyebrow": "Logiciels sur mesure · Santa Maria da Feira, Portugal",
    "hero.h1": "Logiciels sur mesure et <em>automatisation des processus</em> pour entreprises modernes",
    "hero.lead": "Nous concevons des applications, tableaux de bord et intégrations avec rigueur technique, focus utilisateur et résultats mesurables.",
    "hero.cta2": "Voir les produits",
    "hero.note": "Nous répondons rapidement. Horaires : 9h00–18h00 (lun–ven).",
    "mock.aria": "Écrans réels de HCR Finance Master (démo avec données fictives) : budget sur ordinateur et transactions sur mobile",
    "mock.cap": "Démo avec données fictives · Windows · Web",
    "t1": "RGPD et serveurs dans l'UE", "t2": "Windows et web", "t3": "Offline-first avec synchronisation", "t4": "Données exportables et supprimables",
    "apps.eyebrow": "Nos produits",
    "apps.title": "Des produits conçus avec la même exigence que les projets clients",
    "apps.lead": "Ce que nous faisons pour nous, nous le faisons pour vous : ingénierie sérieuse, confidentialité par défaut et tests automatisés.",
    "fm.badge": "Disponible · Bêta gratuite",
    "fm.text": "Finances personnelles et familiales au même endroit : suivez vos transactions et votre patrimoine, importez vos relevés CSV (le fichier reste sur votre appareil) et exportez ou supprimez vos données quand vous voulez.",
    "fm.c1": "Essayez la démo sans inscription", "fm.c2": "Fonctionne sous Windows et dans le navigateur", "fm.c3": "Import CSV local et export RGPD",
    "fm.b1": "Voir les détails", "fm.b2": "Essayer la démo",
    "aql.badge": "En développement",
    "aql.name": "AQL — Inspection Qualité",
    "aql.text": "Plateforme SaaS d'inspections qualité basée sur la table AQL et alignée avec l'ISO 9001 : inspection → audit → action corrective → vérification → clôture, avec alertes automatiques. Intégration prévue avec PHC, Primavera et Sage.",
    "aql.cta": "Demander un accès anticipé",
    "apps.roadmap": "En exploration : Canal Horeca (commandes et gestion entre fournisseurs et établissements) · Devis (propositions professionnelles).",
    "svc.eyebrow": "Services",
    "svc.title": "Des solutions sur mesure pour la réalité de votre entreprise",
    "svc.lead": "Nous concevons des solutions alignées avec la réalité opérationnelle et stratégique de votre entreprise.",
    "svc.1.t": "Développement d'applications professionnelles", "svc.1.d": "Nous créons des applications internes, de gestion et sur mesure qui relient équipes, processus et données.",
    "svc.2.t": "Automatisation des processus", "svc.2.d": "Nous éliminons les tâches manuelles grâce à des flux intelligents et des intégrations automatiques.",
    "svc.3.t": "Intégration de systèmes", "svc.3.d": "Nous connectons plateformes, bases de données et services externes pour des opérations fluides.",
    "svc.4.t": "Tableaux de bord et gestion des données", "svc.4.d": "Nous créons des interfaces intelligentes pour l'analyse, la surveillance et la prise de décision.",
    "svc.5.t": "Conseil digital", "svc.5.d": "Nous aidons les entreprises à identifier des opportunités de digitalisation et à mettre en place des solutions efficaces.",
    "svc.6.t": "Un défi concret ?", "svc.6.d": "Dites-nous ce que vous voulez résoudre et nous proposerons le chemin le plus court.",
    "proc.eyebrow": "Méthode", "proc.title": "Notre méthode", "proc.lead": "Un processus simple, avec une communication continue et des délais réalistes.",
    "proc.1.t": "Diagnostic", "proc.1.d": "Nous comprenons processus, données et objectifs pour définir ce qui vaut vraiment la peine d'être automatisé.",
    "proc.2.t": "Prototype", "proc.2.d": "Nous validons tôt avec un prototype fonctionnel, avant d'investir dans le développement complet.",
    "proc.3.t": "Livraison et évolution", "proc.3.d": "Nous déployons et maintenons, avec des mises à jour régulières et un support technique direct.",
    "about.eyebrow": "À propos",
    "about.title": "Une technologie qui améliore les processus et réduit les coûts",
    "about.text": "HCR Digital Solutions est spécialisée dans le développement d'applications professionnelles et de solutions d'automatisation. Nous créons des technologies qui améliorent les processus, réduisent les coûts et augmentent l'efficacité opérationnelle.",
    "about.m.t": "Mission", "about.m.d": "Rigueur technique, simplicité et fort focus sur l'utilisateur. Chaque application est conçue sur mesure pour la performance, la sécurité et l'évolutivité.",
    "about.v.t": "Vision", "about.v.d": "Être le partenaire des entreprises qui veulent transformer leurs processus internes en solutions numériques intelligentes.",
    "about.val.t": "Valeurs", "about.val.d": "Précision, transparence, innovation, simplicité et engagement absolu envers les résultats.",
    "faq.title": "Questions fréquentes",
    "faq.1.q": "Quels types d'applications développez-vous ?", "faq.1.a": "Applications internes, de gestion, d'automatisation et solutions sur mesure.",
    "faq.2.q": "Combien de temps dure un projet ?", "faq.2.a": "Cela dépend de la complexité, mais nous garantissons des délais réalistes et une communication continue.",
    "faq.3.q": "Les applications sont-elles évolutives ?", "faq.3.a": "Oui. Toutes les solutions sont conçues pour évoluer avec l'entreprise.",
    "faq.4.q": "Proposez-vous de la maintenance ?", "faq.4.a": "Oui — cycle complet : mises à jour régulières, support technique direct (email/téléphone) et correction prioritaire des anomalies critiques. Les conditions de SLA sont définies par contrat, selon la criticité de l'application.",
    "faq.5.q": "Intégrez-vous des systèmes existants ?", "faq.5.a": "Oui. Nous réalisons des intégrations avec plateformes, bases de données et services externes.",
    "faq.6.q": "Combien ça coûte ?", "faq.6.a": "Cela dépend du nombre d'utilisateurs et des modules actifs — contactez-nous pour un devis personnalisé.",
    "ct.eyebrow": "Contact", "ct.title": "Parlons de votre projet",
    "ct.lead": "Dites-nous le contexte et nous répondons rapidement. Horaires : 9h00–18h00 (lun–ven).",
    "ct.name": "Nom", "ct.email": "Email", "ct.msg": "Message", "ct.send": "Envoyer", "ct.mail": "Email", "ct.loc": "Localisation",
    "ct.ok": "Merci ! Votre application de messagerie va s'ouvrir pour envoyer le message.", "ct.err": "Veuillez renseigner votre nom, un email valide et un message.",
    "ftr.tag": "Solutions digitales intelligentes pour entreprises modernes.", "ftr.priv": "Politique de Confidentialité", "ftr.terms": "Conditions d'Utilisation", "ftr.rights": "Tous droits réservés",
    "fmp.eyebrow": "Bêta gratuite · Windows et web",
    "fmp.h1": "HCR Finance Master : <em>finances personnelles et familiales</em> au même endroit",
    "fmp.lead": "Suivez vos transactions et votre patrimoine, importez vos relevés CSV sans envoyer le fichier sur Internet et gardez vos données : exportez ou supprimez quand vous voulez.",
    "fmp.note": "Démo sans inscription. Le compte est gratuit pendant la bêta, sans carte bancaire.",
    "k1.b": "Démo sans inscription", "k1.s": "Voyez l'app avec des données d'exemple",
    "k2.b": "CSV local", "k2.s": "Le fichier reste sur votre appareil",
    "k3.b": "Offline-first", "k3.s": "Synchronise à la reconnexion",
    "k4.b": "RGPD", "k4.s": "Exportez et supprimez vos données",
    "fmp.ft": "Ce que vous pouvez faire",
    "f1.t": "Suivre transactions et patrimoine", "f1.d": "Enregistrez revenus et dépenses, voyez l'évolution et comprenez où va l'argent du foyer.",
    "f2.t": "Importer des relevés CSV", "f2.d": "Le fichier est lu sur votre appareil ; seules les transactions importées entrent dans votre compte.",
    "f3.t": "Fonctionne sans connexion", "f3.d": "Continuez à utiliser l'app hors ligne ; les modifications se synchronisent au retour de la connexion.",
    "f4.t": "Foyers familiaux", "f4.d": "Gérez les finances du foyer et invitez d'autres personnes dans le même foyer.",
    "f5.t": "Confidentialité par défaut", "f5.d": "Serveurs dans l'UE, isolation des données par utilisateur et export CSV de vos transactions.",
    "f6.t": "Supprimez quand vous voulez", "f6.d": "Dans Paramètres → Confidentialité, vous supprimez le compte avec votre mot de passe.",
    "st.title": "Démarrer en 3 étapes",
    "st.1.t": "Essayez la démo", "st.1.d": "Ouvrez la démo dans le navigateur, sans inscription, et explorez avec des données d'exemple.",
    "st.2.t": "Créez votre compte", "st.2.d": "Installez depuis le Microsoft Store ou utilisez le navigateur. Gratuit pendant la bêta.",
    "st.3.t": "Importez vos mouvements", "st.3.d": "Choisissez un fichier CSV de votre banque et vérifiez avant d'importer.",
    "beta.badge": "Bêta", "beta.title": "Nous cherchons jusqu'à 15 testeurs pendant 4 semaines",
    "beta.text": "Environ 10 minutes par semaine d'usage réel et deux courts questionnaires. Sans frais, sans carte.",
    "beta.cta": "Candidater à la bêta", "beta.bug": "Signaler un problème",
    "p1.q": "HCR Finance Master est-elle gratuite ?", "p1.a": "Oui, pendant la bêta. Aucune carte n'est demandée.",
    "p2.q": "Mes fichiers CSV sont-ils envoyés sur Internet ?", "p2.a": "Non. Le fichier est lu sur votre appareil et seules les transactions importées sont synchronisées avec votre compte.",
    "p3.q": "Puis-je supprimer mon compte et mes données ?", "p3.a": "Oui. Dans Paramètres → Confidentialité, vous pouvez exporter vos transactions en CSV et supprimer le compte avec votre mot de passe.",
    "p4.q": "Sur quels appareils fonctionne-t-elle ?", "p4.a": "Sous Windows (Microsoft Store) et dans tout navigateur moderne, y compris mobile.",
    "fmp.priv": "Politique de Confidentialité", "fmp.terms": "Conditions de Service"
  };

  var DICT = { en: EN, fr: FR, pt: {} };
  var HTML_LANG = { pt: "pt-PT", en: "en", fr: "fr" };
  var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-i18n]"));
  var phNodes = Array.prototype.slice.call(document.querySelectorAll("[data-i18n-ph]"));
  var ariaNodes = Array.prototype.slice.call(document.querySelectorAll("[data-i18n-aria]"));
  var metaDesc = document.querySelector('meta[name="description"]');

  /* captura o PT original (do HTML) */
  nodes.forEach(function (el) { DICT.pt[el.getAttribute("data-i18n")] = el.innerHTML; });
  ariaNodes.forEach(function (el) { DICT.pt[el.getAttribute("data-i18n-aria")] = el.getAttribute("aria-label"); });
  DICT.pt["meta.title"] = document.title;
  if (metaDesc) DICT.pt["meta.desc"] = metaDesc.getAttribute("content");
  /* títulos EN/FR por página só quando a página não define o seu (ex.: finance-master) */
  var pageOwnMeta = document.documentElement.getAttribute("data-own-meta") === "1";

  function store(get, v) { try { return get ? localStorage.getItem("hcr_lang") : localStorage.setItem("hcr_lang", v); } catch (e) { return null; } }

  function setLang(lang) {
    if (!DICT[lang]) lang = "pt";
    nodes.forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      var v = DICT[lang][k];
      if (v == null) v = DICT.pt[k];
      if (v != null) el.innerHTML = v;
    });
    ariaNodes.forEach(function (el) {
      var k = el.getAttribute("data-i18n-aria");
      var v = DICT[lang][k] || DICT.pt[k];
      if (v) el.setAttribute("aria-label", v);
    });
    phNodes.forEach(function (el) {
      var k = el.getAttribute("data-i18n-ph");
      var v = DICT[lang][k] || DICT.pt[k];
      if (v) el.setAttribute("placeholder", v);
    });
    if (!pageOwnMeta) {
      if (DICT[lang]["meta.title"] || lang === "pt") document.title = DICT[lang]["meta.title"] || DICT.pt["meta.title"];
      if (metaDesc) metaDesc.setAttribute("content", DICT[lang]["meta.desc"] || DICT.pt["meta.desc"]);
    }
    document.documentElement.lang = HTML_LANG[lang];
    Array.prototype.forEach.call(document.querySelectorAll(".lang button"), function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
    current = lang;
    store(false, lang);
  }

  var current = "pt";
  var qs = /[?&]lang=(pt|en|fr)/.exec(location.search);
  var start = (qs && qs[1]) || store(true) || "pt";
  if (start !== "pt") setLang(start);

  Array.prototype.forEach.call(document.querySelectorAll(".lang button"), function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
  });

  /* menu móvel */
  var btn = document.getElementById("menuBtn"), m = document.getElementById("mnav");
  if (btn && m) {
    btn.addEventListener("click", function () {
      var open = m.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    Array.prototype.forEach.call(m.querySelectorAll("a"), function (a) {
      a.addEventListener("click", function () { m.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); });
    });
  }

  /* formulário de contacto (abre o cliente de email) */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var n = document.getElementById("cName").value.trim();
      var em = document.getElementById("cEmail").value.trim();
      var msg = document.getElementById("cMsg").value.trim();
      var st = document.getElementById("cStatus");
      var ok = n && msg && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
      if (!ok) { st.textContent = (DICT[current]["ct.err"]) || "Preenche o nome, um email válido e a mensagem."; return; }
      var subject = "Novo contacto de " + n;
      var body = "Nome: " + n + "\nEmail: " + em + "\n\nMensagem:\n" + msg;
      window.location.href = "mailto:HCRFinanceMaster@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      st.textContent = (DICT[current]["ct.ok"]) || "Obrigado! A tua aplicação de email vai abrir para enviar a mensagem.";
    });
  }
})();
