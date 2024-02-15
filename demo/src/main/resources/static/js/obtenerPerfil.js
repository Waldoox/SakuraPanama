let baseUrl = "http://localhost:8080";
let perfil = null;

function obtenerPerfil(url, callback) {
    fetch(baseUrl + url)
        .then(res => res.json())
        .then(json => {
            perfil = json;
            callback(); 
        })
        .catch(error => {
            console.error('Error al obtener el perfil:', error);
        });
}

function imprimirPerfil(contenedorId) {
    let contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = "";

    if (Array.isArray(perfil)) {
        perfil.forEach(perfil => {
            contenedor.innerHTML += mapearPerfil(perfil);
        });
    } else {
        contenedor.innerHTML = mapearPerfil(perfil);
    }
}

function mapearPerfil(perfil) {
    return `<div class="profile-info">
        <form id="profile-form">
            <img src="${perfil.perfilimg}" alt="Avatar" id="avatar-img">
            <br>
        </form>
        <div class="personal">
            <h1>${perfil.username}</h1>
            <h2>${perfil.rol}</h2>
            <p>${perfil.correousr}</p>
        </div>
    </div>`;
}

document.addEventListener("DOMContentLoaded", function () {
    const jwtToken = localStorage.getItem("jwtToken");
    const decodedToken = decodeToken(jwtToken);

    const username = decodedToken.sub;
    obtenerPerfil(`/profile-data/${username}`, function () {
        imprimirPerfil('perfil-info');
    });
});

function decodeToken(token) {
    const tokenParts = token.split(".");
    const payload = JSON.parse(atob(tokenParts[1]));
    return payload;
}

function obtenerResenas(username) {
    fetch(`/ResenasPorUsuario/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Respuesta de red incorrecta');
            }
            return response.json();
        })
        .then(resenas => {
            mostrarResenas(resenas);
        })
        .catch(error => {
            console.error('Error al obtener detalles del lugar:', error);
        });
}

function mostrarResenas(resenas) {
    const reviewsContainer = document.getElementById('reviews');
    reviewsContainer.innerHTML = ""; 

    resenas.forEach(resena => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');

        reviewElement.innerHTML = `
        <div class="review-cont">
            <div class="comment">
                <h2 class="text-comment">${resena.username}</h2>
                <h3 class="text-comment fecha-coment">${resena.fecha}</h3>
                <h2 class="text-comment star">${resena.puntuación}&#9733</h2>
                <p class="comentario-text">${resena.comentario}</p>
            </div>
            
            <div class="comment">
                <img src="${resena.imagenurl}" alt="" class="img-comentario">
            </div>
        </div>
        `;

        reviewsContainer.appendChild(reviewElement);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const jwtToken = localStorage.getItem("jwtToken");
    const decodedToken = decodeToken(jwtToken);
    const username = decodedToken.sub;
    obtenerResenas(username);
});

function decodeToken(token) {
    const tokenParts = token.split(".");
    const payload = JSON.parse(atob(tokenParts[1]));
    return payload;
}

