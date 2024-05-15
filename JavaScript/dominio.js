// FORMULARIO PARA PROMOVER DOMINIO
document.getElementById('config-form1').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener valores del formulario
    var domainName = document.getElementById('domain-name1').value;
    var adminPassword = document.getElementById('admin-password1').value;

    // Construir el script de PowerShell con los datos del usuario
    var script = `# Instalación del Rol de Active Directory\n`;
    script += `Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools\n`;
    script += `# Promoción del Servidor a Controlador de Dominio\n`;
    script += `Install-ADDSForest -DomainName "${domainName}" -SafeModeAdministratorPassword (ConvertTo-SecureString "${adminPassword}" -AsPlainText -Force)`;

    // Crear archivo PS1
    var blob = new Blob([script], { type: 'text/plain;charset=utf-8;' });
    var link = document.createElement("a");
    if (link.download !== undefined) { // Verificar si el navegador soporta la descarga
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "configuración_server_AD.ps1");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("¡Lo siento! Tu navegador no soporta la descarga de archivos.");
    }
});

// FORMULARIO PARA UNIR CLIENTE AL DOMINIO
document.getElementById('config-form2').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener el nombre de dominio del formulario
    var domainName = document.getElementById('domain-name2').value;

    // Construir el script de PowerShell para la unión al dominio
    var script = `# Unión al dominio\n`;
    script += `$domainName = "${domainName}"\n`;
    script += `$credential = Get-Credential\n`;
    script += `Add-Computer -DomainName $domainName -Restart`;

    // Crear archivo PS1
    var blob = new Blob([script], { type: 'text/plain;charset=utf-8;' });
    var link = document.createElement("a");
    if (link.download !== undefined) { // Verificar si el navegador soporta la descarga
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "configuracion_cliente_AD.ps1");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("¡Lo siento! Tu navegador no soporta la descarga de archivos.");
    }
});
