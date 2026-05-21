function scrollToSection(id){

    document.getElementById(id).scrollIntoView({
        behavior:"smooth"
    });

}


/* BOTÃO ATIVO */

const buttons = document.querySelectorAll(".nav-btn");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        buttons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

    });

});
