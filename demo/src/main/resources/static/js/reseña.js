document.getElementById('avatar-input').addEventListener('change', function(event) {
  mostrarImagenSeleccionada(event);
});

function mostrarImagenSeleccionada(event) {
  const input = event.target;
  const reader = new FileReader();
  reader.onload = function () {
      const img = document.getElementById('preview-img');
      img.src = reader.result;
      document.querySelector('.image-preview').style.backgroundImage = 'none';
  };
  reader.readAsDataURL(input.files[0]);
}

window.onload = function() {
  const input = document.getElementById('avatar-input');
  if (input.files.length > 0) {
      mostrarImagenSeleccionada({ target: input });
  }
};

function addReview() {

    var rating = document.querySelector('input[name="rating"]:checked');
    if (!rating) {
        alert("Por favor, selecciona una calificación.");
        return;
    }

    var comentario = document.getElementById('commentInput').value;
    var imagenurl = document.getElementById('preview-img').src;
    const tokenJWT = localStorage.getItem('jwtToken');
    const decodedToken = decodeToken(tokenJWT);
    const username = decodedToken.sub;
    var fecha = new Date().toISOString().slice(0, 10); 
    const urlParams = new URLSearchParams(window.location.search);
    const idLugar = parseInt(urlParams.get('id'));

    var reseña = {
        puntuación: parseInt(rating.value), 
        comentario: encodeURIComponent(comentario),
        imagenurl: imagenurl,
        username: username,
        fecha: fecha,
        id_lugar: idLugar 
    };

    fetch('/addReview', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reseña)
    })
    .then(response => {
        if (response.ok) {
            alert('Hemos guardado tu reseña con exito!');
        } else {
            alert('Ha ocurrido un error al agregar el lugar. Por favor, inténtelo de nuevo más tarde.');
        }
    })
    .catch(error => {
        console.error('Error al agregar el reseña:', error);
        alert('Ha ocurrido un error al agregar el Reseña. Por favor, inténtelo de nuevo más tarde.');
    });
}

function decodeToken(token) {
    if (!token) {
        return null;
    }
    const tokenParts = token.split('.');
    const payload = JSON.parse(atob(tokenParts[1]));
    return payload;
}


function obtenerDetalleLugar(idLugar) {
    fetch(`/lugar/${idLugar}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Respuesta de red incorrecta');
            }
            return response.json();
        })
        .then(lugar => {
            mostrarDetalleLugar(lugar);
        })
        .catch(error => {
            console.error('Error al obtener detalles del lugar:', error);
        });
}

function mostrarDetalleLugar(lugar) {
    const detalleLocalContainer = document.getElementById('local-details');

    const provincias = {
        1: "Bocas del Toro",
        2: "Coclé",
        3: "Colón",
        4: "Chiriquí",
        5: "Darién",
        6: "Herrera",
        7: "Los Santos",
        8: "Panamá",
        9: "Veraguas",
        13: "Panamá Oeste",
        10: "Guna Yala, Madugandí y Wargandí",
        11: "Emberá-Wounaan",
        12: "Ngäbe-Buglé"
    };
    
    const nombreProvincia = provincias[lugar.id_provincia];
    const provincia = nombreProvincia ? nombreProvincia : '';
    detalleLocalContainer.innerHTML = `
        <div class="col-img">
            <img src="${lugar.lugar_img}" alt="Imagen del local" id="local-img-detail">
        </div>
        <div class="col-info">
            <h1>${lugar.nombre_lugar}</h1>
            <h2 class="subtitle">Tipo de local</h2>
            <h3 class="local-info">Dirección: ${lugar.direccion_lugar}</h3>
            <h3 class="local-info">Provincia: ${provincia}</h3>
            <h3 class="local-info">Descripción: ${lugar.descripcion}</h3>
        </div>
    `;

    obtenerResenas(lugar.id_lugar);
}


function obtenerResenas(idLugar) {
    console.log(idLugar)
    fetch(`/obtenerResenas/${idLugar}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Respuesta de red incorrecta');
            }
            return response.json();
        })
        .then(resena => {
            mostrarResenas(resena);
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

// Obtener el id_lugar de la URL
const urlParams = new URLSearchParams(window.location.search);
const idLugar = parseInt(urlParams.get('id'));

window.onload = function() {
    obtenerDetalleLugar(idLugar);
};




