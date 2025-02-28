document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const sectionId = link.getAttribute("href").substring(1);
            document.getElementById(sectionId).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
});
