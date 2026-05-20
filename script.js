// MENU ATIVO
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".main-nav a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const top = window.scrollY;
        if (top >= section.offsetTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(a => {
        a.classList.remove("active");
        if (a.getAttribute("href") === `#${current}`) {
            a.classList.add("active");
        }
    });
});

// FOOTER MOBILE
const footerToggle = document.getElementById("footer-toggle");
const footerMenu = document.getElementById("footer-menu");

if (footerToggle && footerMenu) {
    footerToggle.addEventListener("click", () => {
        footerMenu.style.display = footerMenu.style.display === "flex" ? "none" : "flex";
    });
}
