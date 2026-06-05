document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".nav-menu button");
  const sections = document.querySelectorAll(".tab-section");

  function activateTab(tabId) {
    sections.forEach((sec) => {
      sec.classList.remove("active-section");
      if (sec.id === tabId) sec.classList.add("active-section");
    });

    buttons.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.dataset.tab === tabId) btn.classList.add("active");
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => activateTab(btn.dataset.tab));
  });

  activateTab("home");
});
