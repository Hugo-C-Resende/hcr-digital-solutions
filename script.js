/* ===================== TABS ===================== */
function activateTab(tabId) {
  // mostrar/esconder secções
  document.querySelectorAll(".tab-section").forEach((sec) => {
    sec.classList.toggle("active-section", sec.id === tabId);
  });

  // estado visual dos botões da navbar
  document.querySelectorAll(".nav-menu button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });
}

/* ===================== EVENTOS ===================== */
document.addEventListener("DOMContentLoaded", () => {
  // navbar
  document.querySelectorAll(".nav-menu button").forEach((btn) => {
    btn.addEventListener("click", () => activateTab(btn.dataset.tab));
  });

  // botões internos (Explorar Serviços, Contactar)
  document.querySelectorAll("button[data-tab]").forEach((btn) => {
    btn.addEventListener("click", () => activateTab(btn.dataset.tab));
  });

  // garantir que começa em home
  activateTab("home");
});
