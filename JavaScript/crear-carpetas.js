$(document).ready(function() {
    // Agregar evento al enviar el formulario
    $('#config-form').submit(function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente

        // Obtener valores del formulario
        var ip = $('#ip').val();
        var prefix = $('#prefix').val();

        // Construir el script de PowerShell con los datos del formulario
        var script = `# Definir la ruta base para los perfiles móviles\n`;
        script += `$BasePath = "${ip}"\n`;
        script += `\n`;
        script += `# Nombre de la carpeta compartida\n`;
        script += `$ShareName = "${prefix}"\n`;
        script += `\n`;
        script += `# Verificar y crear la carpeta base para los perfiles móviles si no existe\n`;
        script += `if (-not (Test-Path -Path $BasePath -PathType Container)) {\n`;
        script += `    New-Item -Path $BasePath -ItemType Directory\n`;
        script += `    Write-Host "Se ha creado la carpeta base para perfiles móviles en '$BasePath'."\n`;
        script += `} else {\n`;
        script += `    Write-Host "La carpeta base para perfiles móviles en '$BasePath' ya existe."\n`;
        script += `}\n`;
        script += `\n`;
        script += `# Compartir la carpeta base para los perfiles móviles si no está compartida\n`;
        script += `if (-not (Get-SmbShare -Name $ShareName -ErrorAction SilentlyContinue)) {\n`;
        script += `    New-SmbShare -Name $ShareName -Path $BasePath -FullAccess Everyone\n`;
        script += `    Write-Host "Se ha compartido la carpeta '$ShareName' como '$BasePath'."\n`;
        script += `} else {\n`;
        script += `    Write-Host "La carpeta '$ShareName' ya está compartida."\n`;
        script += `}\n`;
        script += `\n`;
        script += `# Obtener todos los usuarios del dominio para los cuales se crearán perfiles móviles\n`;
        script += `$Usuarios = Get-ADUser -Filter * | Select-Object -ExpandProperty SamAccountName\n`;
        script += `\n`;
        script += `# Iterar sobre la lista de usuarios y crear perfiles móviles\n`;
        script += `foreach ($Usuario in $Usuarios) {\n`;
        script += `    $ProfilePath = Join-Path -Path $BasePath -ChildPath $Usuario\n`;
        script += `\n`;
        script += `    # Verificar y crear la carpeta para el perfil móvil del usuario si no existe\n`;
        script += `    if (-not (Test-Path -Path $ProfilePath -PathType Container)) {\n`;
        script += `        New-Item -Path $ProfilePath -ItemType Directory\n`;
        script += `        Write-Host "Se ha creado la carpeta para el perfil móvil de $Usuario en '$ProfilePath'."\n`;
        script += `    } else {\n`;
        script += `        Write-Host "La carpeta para el perfil móvil de $Usuario ya existe en '$ProfilePath'."\n`;
        script += `    }\n`;
        script += `}\n`;
        script += `Write-Host "Se han creado las carpetas para los perfiles móviles de los usuarios del dominio."\n`;

        // Crear archivo PS1
        var blob = new Blob([script], { type: 'text/plain;charset=utf-8;' });
        var link = document.createElement("a");
        if (link.download !== undefined) { // Verificar si el navegador soporta la descarga
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "crear_carpetas.ps1");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert("Lo siento, tu navegador no soporta la descarga de archivos.");
        }
    });

    // Obtener referencia al botón de descarga
const btnDescargarScript = document.getElementById('btnDescargarScript');

// Manejar el evento de clic en el botón
btnDescargarScript.addEventListener('click', () => {
    // Crear un enlace temporal
    const enlace = document.createElement('a');
    enlace.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(scriptSMB);
    enlace.download = 'installSMB.ps1';
    
    // Simular clic en el enlace para descargar el archivo
    enlace.click();
});
// Contenido del script SMB
const scriptSMB = `# Instalar SMB para poder utilizar New-SmbShare y compartir la carpeta de PerfilesMoviles si todavía no está compartida.
Install-WindowsFeature FS-SMB1`;

});
