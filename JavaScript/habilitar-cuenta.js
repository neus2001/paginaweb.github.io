function generarScriptPs1() {
    var nombre1 = document.getElementById('nombre1').value;
    var apellido1_1 = document.getElementById('apellido1_1').value;
    var apellido2_1 = document.getElementById('apellido2_1').value;

    var nombre2 = document.getElementById('nombre2').value;
    var apellido1_2 = document.getElementById('apellido1_2').value;
    var apellido2_2 = document.getElementById('apellido2_2').value;

    var nombre3 = document.getElementById('nombre3').value;
    var apellido1_3 = document.getElementById('apellido1_3').value;
    var apellido2_3 = document.getElementById('apellido2_3').value;

    var nombre4 = document.getElementById('nombre4').value;
    var apellido1_4 = document.getElementById('apellido1_4').value;
    var apellido2_4 = document.getElementById('apellido2_4').value;
    
    var nombre5 = document.getElementById('nombre5').value;
    var apellido1_5 = document.getElementById('apellido1_5').value;
    var apellido2_5 = document.getElementById('apellido2_5').value;

    var nombre6 = document.getElementById('nombre6').value;
    var apellido1_6 = document.getElementById('apellido1_6').value;
    var apellido2_6 = document.getElementById('apellido2_6').value;

    var password = document.getElementById('password').value;

    // Construir el script ps1
    var script = "# Definir las credenciales del administrador del dominio\n";
    script += "$credential = Get-Credential\n\n";
    // Agregar usuarios al script
    script +=  "# Lista de usuarios y sus cuentas SAM\n";
    script += `$usuarios = @{\n`;
    script += `   "${nombre1} ${apellido1_1} ${apellido2_1}" = "` + generarSamAccountName(nombre1, apellido1_1, apellido2_1) + `" \n`;
    script += `   "${nombre2} ${apellido1_2} ${apellido2_2}" = "` + generarSamAccountName(nombre2, apellido1_2, apellido2_2) + `" \n`;
    script += `   "${nombre3} ${apellido1_3} ${apellido2_3}" = "` + generarSamAccountName(nombre3, apellido1_3, apellido2_3) + `" \n`;
    script += `   "${nombre4} ${apellido1_4} ${apellido2_5}" = "` + generarSamAccountName(nombre4, apellido1_4, apellido2_4) + `" \n`;
    script += `   "${nombre5} ${apellido1_5} ${apellido2_5}" = "` + generarSamAccountName(nombre5, apellido1_5, apellido2_5) + `" \n`;
    script += `   "${nombre6} ${apellido1_6} ${apellido2_5}" = "` + generarSamAccountName(nombre6, apellido1_6, apellido2_6) + `" \n`;
    script +=  "# Iterar sobre cada usuario y establecer la contraseña\n";
    script +=  `foreach ($userFullName in $usuarios.Keys){\n`;
    script +=  `   $samAccountName = $usuarios[$userFullName]{\n`;
    script +=  `   $newPassword = ConvertTo-SecureString  "${password}" -AsPlainText -Force\n\n`;
    script +=  `# Establecer la contraseña inicial\n`;
    script +=  `   Set-ADAccountPassword -Identity $samAccountName -NewPassword $newPassword -Reset\n\n`;
    script +=  `# Habilitar la cuenta de usuario\n`;
    script +=  `   Enable-ADAccount -Identity $samAccountName\n\n`;
    script +=  `   Write-Host "Se ha configurado la cuenta de $userFullName ($samAccountName) para iniciar sesión con la contraseña inicial."\n`;
    script +=  `}"\n`;

    
    // Crear un Blob con el contenido del script
    var blob = new Blob([script], { type: 'text/plain;charset=utf-8;' });

    // Crear un enlace para descargar el Blob
    var link = document.createElement("a");
    if (link.download !== undefined) { // Verificar si el navegador soporta la descarga
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "habilitar_cuenta.ps1");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("Lo siento, tu navegador no soporta la descarga de archivos.");
    }
}


// Para hacer el SamAccount
function generarSamAccountName(nombre, apellido1 ,apellido2) {
    // Obtener el primer carácter del nombre y convertir a minúsculas
    var inicialNombre = nombre.charAt(0).toLowerCase();

    // Concatenar el primer carácter del nombre con los apellidos
    var samAccountName = inicialNombre + apellido1.charAt(0).toLowerCase() + apellido2.toLowerCase();

    // Eliminar espacios en blanco
    samAccountName = samAccountName.replace(/\s+/g, '');

    return samAccountName;
}

// Esto solo era para integrar responsible y queria calcular el tamaño de la pantalla
// Obtener el ancho y alto de la ventana del navegador
var anchoVentana = window.innerWidth;
var altoVentana = window.innerHeight;

// Mostrar el tamaño en la consola del navegador
console.log("Ancho de la ventana: " + anchoVentana + "px");
console.log("Alto de la ventana: " + altoVentana + "px");