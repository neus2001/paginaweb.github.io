// FORMULARIO 1 : CREAR UNIDADES ORGANIZATIVAS
document.getElementById('config-form1').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener valores del formulario
    var domain = document.getElementById('domain').value;
    var ouPrincipal1 = document.getElementById('ou-principal1').value;
    var ouPrincipal2 = document.getElementById('ou-principal2').value;
    var ouSecundaria1 = document.getElementById('ou-secundaria1').value;
    var ouSecundaria2 = document.getElementById('ou-secundaria2').value;

     // Convertir las OU secundarias en un array
     var ouSecundariasArray1 = ouSecundaria1.split(',').map(function(item) {
        return item.trim();
    });
    var ouSecundariasArray2 = ouSecundaria2.split(',').map(function(item) {
        return item.trim();
    });

    // Construir script de PowerShell con los datos del usuario
    var script = `# Crear la OU principal ${ouPrincipal1}\n`;
    script += `New-ADOrganizationalUnit -Name "${ouPrincipal1}" -Path "DC=${domain.split('.')[0]},DC=${domain.split('.')[1]}"\n`;
    script += `# Crear la OU principal ${ouPrincipal2}\n`;
    script += `New-ADOrganizationalUnit -Name "${ouPrincipal2}" -Path "DC=${domain.split('.')[0]},DC=${domain.split('.')[1]}"\n`;

    // Crear OUs secundarias para la OU principal 1
    ouSecundariasArray1.forEach(function(ouSecundaria) {
        script += `# Crear la OU secundaria ${ouSecundaria.trim()} dentro de ${ouPrincipal1}\n`;
        script += `New-ADOrganizationalUnit -Name "${ouSecundaria.trim()}" -Path "OU=${ouPrincipal1},DC=${domain.split('.')[0]},DC=${domain.split('.')[1]}"\n`;
    });

    // Crear OUs secundarias para la OU principal 2
    ouSecundariasArray2.forEach(function(ouSecundaria) {
        script += `# Crear la OU secundaria ${ouSecundaria.trim()} dentro de ${ouPrincipal2}\n`;
        script += `New-ADOrganizationalUnit -Name "${ouSecundaria.trim()}" -Path "OU=${ouPrincipal2},DC=${domain.split('.')[0]},DC=${domain.split('.')[1]}"\n`;
    });

    // Crear archivo PS1 y descargarlo
    var blob = new Blob([script], { type: 'text/plain;charset=utf-8;' });
    var link = document.createElement("a");
    if (link.download !== undefined) { // Verificar si el navegador soporta la descarga
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "creacion_OU.ps1");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("¡Lo siento! Tu navegador no soporta la descarga de archivos.");
    }
});

// FORMULARIO PARA CREAR GRUPOS
document.getElementById('config-form2').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener valores del formulario
    var domain = document.getElementById('domain-name2').value;
    var ouName = document.getElementById('ou-name2').value;
    var groupNames = document.getElementById('grupo-names').value.split(',').map(function(item) {
        return item.trim();
    });

    // Construir script de PowerShell con los datos del usuario
    var script = '';

    // Crear los grupos en la OU especificada
    groupNames.forEach(function(groupName) {
        script += `# Crear el grupo ${groupName} en la OU ${ouName}\n`;
        script += `New-ADGroup -Name "${groupName}" -GroupCategory Security -GroupScope Global -Path "OU=${ouName},DC=${domain.split('.')[0]},DC=${domain.split('.')[1]}"\n\n`;
    });

    // Crear archivo PS1 y descargarlo
    var blob = new Blob([script], { type: 'text/plain;charset=utf-8;' });
    var link = document.createElement("a");
    if (link.download !== undefined) { // Verificar si el navegador soporta la descarga
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "creacion_grupos.ps1");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("¡Lo siento! Tu navegador no soporta la descarga de archivos.");
    }
});

// FORMULARIO PARA CREAR USUARIOS
document.getElementById('config-form3').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener valores del formulario
    var domain = document.getElementById('domain-name3').value;
    var ouName = document.getElementById('ou-name3').value;
    var groupName = document.getElementById('group-name').value;
    var nombre = document.getElementById('nombre').value;
    var apellido1 = document.getElementById('apellido1').value;
    var apellido2 = document.getElementById('apellido2').value;

    // Construir el nombre completo del usuario
    var userName = nombre + ' ' + apellido1 + ' ' + apellido2;

    // Construir el samAccountName
    var samAccountName = (nombre.substring(0, 1) + apellido1.substring(0, 1) + apellido2).toLowerCase().replace(/\s/g, '');

    // Construir script de PowerShell con los datos del usuario
    var script = '';

    // Agregar las líneas para crear el usuario y añadirlo al grupo
    script += `# Crear el usuario ${userName} en la OU ${ouName} y añadirlo al grupo ${groupName}\n`;
    script += `New-ADUser -Name "${userName}" -SamAccountName "${samAccountName}" -Path "OU=${ouName},DC=${domain.split('.')[0]},DC=${domain.split('.')[1]}"\n`;
    script += `Add-ADGroupMember -Identity "${groupName}" -Members "${samAccountName}"\n\n`;

    // Crear archivo PS1 y descargarlo
    var blob = new Blob([script], { type: 'text/plain;charset=utf-8;' });
    var link = document.createElement("a");
    if (link.download !== undefined) { // Verificar si el navegador soporta la descarga
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "creacion_usuarios.ps1");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("¡Lo siento! Tu navegador no soporta la descarga de archivos.");
    }
});
