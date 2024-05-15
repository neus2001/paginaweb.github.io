$(document).ready(function() {
    $(".imagen-principal1").click(function() {
        console.log("Clic en la imagen principal"); // Verificar si se detecta el clic en la imagen principal
        $(this).hide(); // Oculta la imagen principal
        $(".imagen-secundaria1").show(); // Muestra la imagen secundaria
    });

   $(".imagen-principal2").click(function() {
        console.log("Clic en la imagen principal"); // Verificar si se detecta el clic en la imagen principal
        $(this).hide(); // Oculta la imagen principal
        $(".imagen-secundaria2").show(); // Muestra la imagen secundaria
    });

    $(".imagen-principal3").click(function() {
        console.log("Clic en la imagen principal"); // Verificar si se detecta el clic en la imagen principal
        $(this).hide(); // Oculta la imagen principal
        $(".imagen-secundaria3").show(); // Muestra la imagen secundaria
    });
});
