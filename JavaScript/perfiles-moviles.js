// Agregar evento al enviar el formulario
$('#config-form').submit(function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Obtener valores del formulario
    var ip = $('#ip').val();
    var usuariosInput = $('#usuarios').val();
    var usuariosArray = usuariosInput.split(",");

    // Construir el script de PowerShell con los datos del formulario
    var script = `# Definir la ruta base donde se almacenarán los perfiles móviles\n`;
    script += `$ProfilePath = "${ip}"\n\n`;

    // Agregar lista de nombres de usuarios y bucle foreach
    script += `# Lista de nombres de usuarios\n`;
    script += `$usuarios = ` + JSON.stringify(usuariosArray) + `\n`;
    script += `foreach ($usuario in $usuarios) {\n`;
    script += `    # Verificar si el usuario existe en el directorio activo\n`;
    script += `    $User = Get-ADUser -Filter { SamAccountName -eq $usuario }\n\n`;
    script += `    if ($User -ne $null) {\n`;
    script += `        $UserProfilePath = "$ProfilePath\\$usuario"\n\n`;
    script += `        # Configurar el perfil móvil para el usuario\n`;
    script += `        Set-ADUser $User -ProfilePath $UserProfilePath\n`;
    script += `        Write-Host "Se ha creado el perfil móvil para $($User.SamAccountName) en la ruta $UserProfilePath"\n`;
    script += `    } else {\n`;
    script += `        Write-Host "El usuario con el nombre de cuenta $usuario no se encontró en el directorio activo."\n`;
    script += `    }\n`;
    script += `}\n\n`;
    script += `Write-Host "Se han creado perfiles móviles para los usuarios especificados."\n`;

    // Crear un Blob con el contenido del script
    var blob = new Blob([script], { type: 'text/plain;charset=utf-8;' });

    // Crear un enlace para descargar el Blob
    var link = document.createElement("a");
    if (link.download !== undefined) { // Verificar si el navegador soporta la descarga
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "crear_perfiles_moviles.ps1");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("Lo siento, tu navegador no soporta la descarga de archivos.");
    }
});
