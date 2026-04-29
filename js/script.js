document.addEventListener("DOMContentLoaded", () =>  {
    console.log("Sitio web cargado correctamente");

    const btn = document.getElementById("btnTop");
    if (btnTop) {
        window.addEventListener("scroll", () => {
            btnTop.style.display = window.scrollY > 200 ? "block" : "none";
        });
        btnTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

    }
});
