// Array para almacenar los platos de comida predefinidos
let platos = [
  { nombre: "Pizza", votos: 0 },
  { nombre: "Hamburguesa", votos: 0 },
  { nombre: "Sushi", votos: 0 }
];

// Array para almacenar los platos de comida personalizados por el usuario
let platosPersonalizados = [];

// Función para mostrar los platos en el menú
function mostrarMenu() {
  const menuDiv = document.getElementById('menu');
  menuDiv.innerHTML = ''; // Limpiamos el contenido anterior

  // Mostramos los platos predefinidos
  platos.forEach(plato => {
    const platoDiv = crearPlatoDiv(plato);
    menuDiv.appendChild(platoDiv);
  });

  // Mostramos los platos personalizados
  platosPersonalizados.forEach(plato => {
    const platoDiv = crearPlatoDiv(plato);
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.onclick = () => {
      eliminarPlatoPersonalizado(plato);
    };
    platoDiv.appendChild(botonEliminar);
    menuDiv.appendChild(platoDiv); // Agregar debajo de los platos predefinidos
  });
}

// Función para crear un div para mostrar un plato
function crearPlatoDiv(plato) {
  const platoDiv = document.createElement('div');
  platoDiv.innerHTML = `${plato.nombre} - Votos: ${plato.votos}`;
  const botonVotar = document.createElement('button');
  botonVotar.textContent = 'Votar';
  botonVotar.onclick = () => {
    votarPorPlato(plato);
  };
  platoDiv.appendChild(botonVotar);
  return platoDiv;
}

// Función para votar por un plato
function votarPorPlato(plato) {
  plato.votos++;
  mostrarMenu(); // Actualizamos el menú después de votar
  guardarPlatosPersonalizados(); // Guardamos los platos personalizados actualizados
}

// Función para agregar un nuevo plato
function agregarPlato() {
  const nuevoPlatoInput = document.getElementById('nuevoPlato');
  const nuevoPlatoNombre = nuevoPlatoInput.value;
  if (nuevoPlatoNombre.trim() !== '') {
    const nuevoPlato = { nombre: nuevoPlatoNombre, votos: 0 };
    platosPersonalizados.push(nuevoPlato);
    mostrarMenu(); // Actualizamos el menú después de agregar un nuevo plato personalizado
    guardarPlatosPersonalizados(); // Guardamos los platos personalizados actualizados
    nuevoPlatoInput.value = ''; // Limpiamos el input
  }
}

// Función para eliminar un plato personalizado
function eliminarPlatoPersonalizado(plato) {
  const index = platosPersonalizados.indexOf(plato);
  if (index !== -1) {
    platosPersonalizados.splice(index, 1);
    mostrarMenu(); // Actualizamos el menú después de eliminar el plato personalizado
    guardarPlatosPersonalizados(); // Guardamos los platos personalizados actualizados
  }
}

// Función para guardar los platos personalizados en el almacenamiento local
function guardarPlatosPersonalizados() {
  localStorage.setItem('platosPersonalizados', JSON.stringify(platosPersonalizados));
}

// Función para cargar los platos personalizados desde el almacenamiento local
function cargarPlatosPersonalizados() {
  const platosPersonalizadosString = localStorage.getItem('platosPersonalizados');
  if (platosPersonalizadosString) {
    platosPersonalizados = JSON.parse(platosPersonalizadosString);
    mostrarMenu(); // Mostramos los platos personalizados al cargar la página
  }
}

// Asignamos la función agregarPlato al evento click del botón
document.getElementById('agregarPlatoBtn').addEventListener('click', agregarPlato);

// Cargamos los platos personalizados al cargar la página
cargarPlatosPersonalizados();