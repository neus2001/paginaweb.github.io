// Agregar evento al enviar el formulario
$('#config-form').submit(function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Obtener valores del formulario
    var ip = $('#ip').val();
    var usuariosInput = $('#usuarios').val();
    var dominio = $('#dominio').val();
    var usuariosArray = usuariosInput.split(",");

    // Construir el script de PowerShell con los datos del formulario
    var script = `# Definir la ruta base para los perfiles móviles\n`;
    script += `$BasePath = "${ip}"\n\n`;

    // Modificar la lista de usuarios para que coincida con el formato del script
    var usuariosFormatted = usuariosArray.map(usuario => `"${usuario.trim()}"`).join(', ');

    script += `# Lista de usuarios que tendrán control total en la carpeta principal\n`;
    script += `$UsuariosConPermisosTotales = ${usuariosFormatted}\n\n`;

    // Agregar permisos a la carpeta principal compartida
    script += `$Acl = Get-Acl -Path $BasePath\n`;
    script += `$Permission = "Everyone", "FullControl", "Allow"\n`;
    script += `$Rule = New-Object -TypeName System.Security.AccessControl.FileSystemAccessRule -ArgumentList $Permission\n`;
    script += `$Acl.SetAccessRule($Rule)\n`;
    script += `Set-Acl -Path $BasePath -AclObject $Acl\n\n`;

    // Iterar sobre la lista de usuarios y asignar permisos
    script += `foreach ($Usuario in $UsuariosConPermisosTotales) {\n`;
    script += `    $ProfilePath = Join-Path -Path $BasePath -ChildPath $Usuario\n\n`;
    script += `    # Verificar si la carpeta del usuario existe\n`;
    script += `    if (Test-Path -Path $ProfilePath -PathType Container) {\n`;
    script += `        # Agregar permisos totales al usuario\n`;
    script += `        $AclUser = Get-Acl -Path $ProfilePath\n`;
    script += `        $PermissionUser = "${dominio}\\$Usuario", "FullControl", "Allow"\n`;
    script += `        $RuleUser = New-Object -TypeName System.Security.AccessControl.FileSystemAccessRule -ArgumentList $PermissionUser\n`;
    script += `        $AclUser.SetAccessRule($RuleUser)\n\n`;
    script += `        # Deshabilitar la herencia de permisos\n`;
    script += `        $AclUser.SetAccessRuleProtection($true, $false)\n\n`;
    script += `        Set-Acl -Path $ProfilePath -AclObject $AclUser\n`;
    script += `        Write-Host "Se han configurado los permisos para la carpeta del usuario $Usuario."\n`;
    script += `    } else {\n`;
    script += `        Write-Host "La carpeta del usuario $Usuario no existe en '$ProfilePath'."\n`;
    script += `    }\n`;
    script += `}\n\n`;

    script += `Write-Host "Se han configurado los permisos para las carpetas personales de los usuarios del dominio en la carpeta principal compartida."\n`;

    // Generar archivo PS1
    var blob = new Blob([script], { type: 'text/plain;charset=utf-8;' });
    var link = document.createElement("a");
    if (link.download !== undefined) { // Verificar si el navegador soporta la descarga
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "configurar_permisos.ps1");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("Lo siento, tu navegador no soporta la descarga de archivos.");
    }
});
