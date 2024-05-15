document.getElementById('config-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener valores del formulario
    var ip = document.getElementById('ip').value;
    var prefix = document.getElementById('prefix').value;
    var gateway = document.getElementById('gateway').value;
    var interface = document.getElementById('interface').value;
    var dns = document.getElementById('dns').value;
    var pcName = document.getElementById('pc-name').value;

    // Construir contenido del script de PowerShell
    var psContent = `# Configurar la dirección IP estática\n`;
    psContent += `New-NetIPAddress -InterfaceAlias "${interface}" -IPAddress "${ip}" -PrefixLength ${prefix} -DefaultGateway "${gateway}"\n`;
    psContent += `# Configurar la dirección de servidor DNS\n`;
    psContent += `Set-DNSClientServerAddress -InterfaceAlias "${interface}" -ServerAddresses "${dns}"\n`;
    psContent += `# Cambiar el nombre del PC\n`;
    psContent += `Rename-Computer -NewName "${pcName}" -Restart`;

    // Crear archivo .txt
    var blob = new Blob([psContent], { type: 'text/plain;charset=utf-8;' }); // Tipo MIME 'text/plain'
    var link = document.createElement("a");
    if (link.download !== undefined) { // Verificar si el navegador soporta la descarga
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "configuracion_red.ps1"); 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("¡Lo siento! Tu navegador no soporta la descarga de archivos.");
    }
});
