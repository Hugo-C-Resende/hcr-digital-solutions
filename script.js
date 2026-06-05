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

document.addEventListener("DOMContentLoaded", () => {
  // listeners nos botões da navbar
  document.querySelectorAll(".nav-menu button").forEach((btn) => {
    btn.addEventListener("click", () => activateTab(btn.dataset.tab));
  });

  // garantir que começamos em home
  activateTab("home");
});
