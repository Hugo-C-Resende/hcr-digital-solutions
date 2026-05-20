// MENU ATIVO
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

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
document.getElementById("footer-toggle").addEventListener("click", () => {
    const menu = document.getElementById("footer-menu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
});
