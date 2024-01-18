function registrarUsuario() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var eMail = document.getElementById('eMail').value;
    var phone = document.getElementById('phone').value;

    var datosUsuario = {
        username: username,
        password: password,
        nombreusr: fname,
        apellidousr: lname,
        correousr: eMail,
        telefonousr: phone
    };

    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);

        if (data.token) {
            sessionStorage.setItem('jwtToken', data.token);
            window.location.href = '/index';
        } else {
            console.error('No se recibió un token en la respuesta del servidor');
        }
    })
    .catch(error => {
        console.error('Error al registrar usuario:', error);
    });

}

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var datosUsuario = {
        username: username,
        password: password,
    };

    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);

        if (data.token) {
            sessionStorage.setItem('jwtToken', data.token);
            window.location.href = '/index';
        } else {
            console.error('No se recibió un token en la respuesta del servidor');
        }
    })
    .catch(error => {
        console.error('Error al iniciar sesión:', error);
    });
}
