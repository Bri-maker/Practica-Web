document.addEventListener("DOMContentLoaded", () => {
    console.log("Sitio web cargado correctamente");

    // ===============================
    // BOTONES SCROLL
    // ===============================
    const btnTop = document.getElementById("btnTop");
    const btnAbajo = document.getElementById("btnAbajo");
    const btnInicio = document.getElementById("btnInicio");

    window.addEventListener("scroll", () => {

        const scroll = window.scrollY;

        if (btnTop) {
            btnTop.classList.toggle("show", scroll > 200);
        }

        if (btnAbajo) {
            btnAbajo.classList.toggle("show", scroll < 200);
        }

        if (btnInicio) {
            btnInicio.classList.toggle("show", scroll > 300);
        }
    });

    // CLICK BOTÓN ARRIBA
    if (btnTop) {
        btnTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // CLICK BOTÓN ABAJO
    if (btnAbajo) {
        btnAbajo.addEventListener("click", () => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });
        });
    }

    // CLICK BOTÓN INICIO (HERO)
    if (btnInicio) {
        btnInicio.addEventListener("click", () => {
            const hero = document.querySelector(".hero");

            if (hero) {
                hero.scrollIntoView({ behavior: "smooth" });
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    }

    // ===============================
    // FORMULARIO
    // ===============================
    const formulario = document.querySelector(".formulario");

    if (!formulario) return;

    const inputs = formulario.querySelectorAll(".input-text");

    // crear mensajes debajo automáticamente
    inputs.forEach(input => {
        if (!input.nextElementSibling || input.nextElementSibling.tagName !== "SMALL") {
            const small = document.createElement("small");
            input.parentNode.appendChild(small);
        }
    });

    // VALIDACIÓN EN TIEMPO REAL
    inputs.forEach(input => {
        input.addEventListener("input", () => {
            validarCampo(input);

            if (input.type === "tel") {
                formatearTelefono(input);
            }
        });
    });

    // VALIDACIÓN AL ENVIAR
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        let valido = true;

        inputs.forEach(input => {
            if (!validarCampo(input)) {
                valido = false;
            }
        });

        if (valido) {
            mostrarAlerta("Formulario enviado correctamente ✅", true);
            formulario.reset();

            inputs.forEach(i => i.classList.remove("correcto"));
        } else {
            mostrarAlerta("Corrige los errores ❌", false);
        }
    });

    // ===============================
    // INICIAR FUNCIONES
    // ===============================
    animarScroll();
    efectoParallax();
    botonFlotante();
});


// ===============================
// VALIDAR CAMPO
// ===============================
function validarCampo(input) {

    const valor = input.value.trim();
    const tipo = input.type;
    const mensaje = input.nextElementSibling;

    if (valor === "") {
        marcarError(input, mensaje, "Campo obligatorio");
        return false;
    }

    if (tipo === "email") {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(valor)) {
            marcarError(input, mensaje, "Correo inválido");
            return false;
        }
    }

    if (tipo === "tel") {
        const limpio = valor.replace(/\s/g, "");

        if (limpio.length !== 9) {
            marcarError(input, mensaje, "Debe tener 9 dígitos");
            return false;
        }

        if (!limpio.startsWith("9")) {
            marcarError(input, mensaje, "Debe empezar con 9");
            return false;
        }
    }

    if (input.tagName === "TEXTAREA" && valor.length < 10) {
        marcarError(input, mensaje, "Mínimo 10 caracteres");
        return false;
    }

    marcarCorrecto(input, mensaje);
    return true;
}


// ===============================
// FORMATEAR TELÉFONO
// ===============================
function formatearTelefono(input) {

    let valor = input.value.replace(/[^0-9]/g, "");

    if (valor.length > 9) {
        valor = valor.slice(0, 9);
    }

    if (valor.length > 6) {
        valor = valor.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1 $2 $3");
    } else if (valor.length > 3) {
        valor = valor.replace(/(\d{3})(\d{0,3})/, "$1 $2");
    }

    input.value = valor;
}


// ===============================
function marcarError(input, mensaje, texto) {
    input.classList.add("error");
    input.classList.remove("correcto");
    mensaje.textContent = texto;
}

function marcarCorrecto(input, mensaje) {
    input.classList.remove("error");
    input.classList.add("correcto");
    mensaje.textContent = "";
}


// ===============================
// ANIMACIÓN SCROLL
// ===============================
function animarScroll() {

    const elementos = document.querySelectorAll(".animar");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    elementos.forEach(el => observer.observe(el));
}


// ===============================
// ALERTA
// ===============================
function mostrarAlerta(texto, exito) {

    const alerta = document.createElement("div");

    alerta.textContent = texto;
    alerta.style.position = "fixed";
    alerta.style.bottom = "20px";
    alerta.style.right = "20px";
    alerta.style.padding = "12px 18px";
    alerta.style.borderRadius = "8px";
    alerta.style.color = "#fff";
    alerta.style.background = exito ? "#22c55e" : "#ef4444";
    alerta.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
    alerta.style.opacity = "0";
    alerta.style.transition = "0.4s";

    document.body.appendChild(alerta);

    setTimeout(() => alerta.style.opacity = "1", 10);
    setTimeout(() => {
        alerta.style.opacity = "0";
        setTimeout(() => alerta.remove(), 400);
    }, 3000);
}


// ===============================
// BOTÓN FLOTANTE (WHATSAPP)
// ===============================
function botonFlotante() {

    const btn = document.getElementById("btnFlotante");

    if (!btn) return;

    btn.addEventListener("click", (e) => {
        e.preventDefault();

        mostrarToast("¡Escríbeme! 👋");

        window.open("https://wa.me/51918307874", "_blank");
    });
}


// ===============================
// TOAST
// ===============================
function mostrarToast(texto) {

    const toast = document.createElement("div");

    toast.textContent = texto;
    toast.classList.add("toast");

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("visible"), 50);

    setTimeout(() => {
        toast.classList.remove("visible");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}


// ===============================
// PARALLAX
// ===============================
function efectoParallax() {

    const hero = document.querySelector(".hero");
    const contenido = document.querySelector(".contenido-hero");

    if (!hero || !contenido) return;

    let ticking = false;

    window.addEventListener("scroll", () => {

        const scroll = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(() => {

                hero.style.backgroundPosition = `center ${scroll * 0.4}px`;
                contenido.style.transform = `translateY(-${scroll * 0.2}px)`;

                ticking = false;
            });

            ticking = true;
        }
    });
}