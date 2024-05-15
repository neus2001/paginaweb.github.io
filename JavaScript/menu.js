let imagenIndex = 0; // Índice de la imagen actual
const imagenes = document.querySelectorAll('.banner-img');

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

// Mostrar la primera imagen al cargar la página
cambiarImagen(0);
