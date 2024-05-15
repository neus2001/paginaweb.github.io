// Banner y imagenes
let imagenIndex = 0; // Índice de la imagen actual
const imagenes = document.querySelectorAll('.banner img');

function cambiarImagen(n) {
    imagenIndex += n; // Incrementar o decrementar el índice
    if (imagenIndex >= imagenes.length) {
        imagenIndex = 0; // Reiniciar al principio si llega al final
    } else if (imagenIndex < 0) {
        imagenIndex = imagenes.length - 1; // Retroceder al final si está al principio
    }

    // Ocultar todas las imágenes
    imagenes.forEach(img => img.style.display = 'none');
    // Mostrar la imagen actual
    imagenes[imagenIndex].style.display = 'block';
}

// Función para cambiar la imagen automáticamente cada 3 segundos
setInterval(() => {
    cambiarImagen(1); // Cambiar a la siguiente imagen
}, 4000); // 4000 milisegundos = 4 segundos

// Mostrar la primera imagen al cargar la página
cambiarImagen(0);

// Registrarse
function validarRegistro() {
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Expresión regular para validar el formato de correo electrónico
    var validarEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nombre === "" || email === "" || password === "") {
        alert("Por favor, complete todos los campos para registrarse.");
        return false;
    } else if (!validarEmail.test(email)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return false;
    } else {
        alert("¡Te has registrado correctamente!");
        window.location.href = "HTML/menu.html";
        return true;
    }
}

// Iniciar sesión
function iniciarSesion() {
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Expresión regular para validar el formato de correo electrónico
    var validarEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nombre === "" || email === "" || password === "") {
        alert("Por favor, complete todos los campos para iniciar sesión.");
        return false;
    } else if (!validarEmail.test(email)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return false;
    } else {
        alert("Se ha iniciado sesión correctamente");
        window.location.href = "HTML/menu.html";
        return true;
    }
}

