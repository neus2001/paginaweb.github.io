$(document).ready(function() {
    $(".imagen-principal").click(function() {
        $(".imagen-secundaria").show();
    });
    $(".imagen-principal").click(function() {
        $(this).hide();
    });
});