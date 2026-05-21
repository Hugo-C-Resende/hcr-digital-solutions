function scrollToSection(sectionId){

    document.getElementById(sectionId).scrollIntoView({
        behavior: "smooth"
    });

}


/* ACTIVE BUTTON */

const buttons = document.querySelectorAll(".nav-btn");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        buttons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

    });

});
