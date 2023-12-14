
function hamburguer_nav(){
	const sidebar = document.getElementById('sidebar')
	if(sidebar.style.display === 'block'){
		sidebar.style.display = 'none'
	}
	else{
		sidebar.style.display = 'block'
	}
}

// Función para manejar el cambio en el tamaño de la pantalla
function handleScreenSizeChange(mq) {
    const sidebar = document.querySelector('.sidebar');

    // Verifica si la pantalla es lo suficientemente grande y el sidebar está cerrado
    if (mq.matches && getComputedStyle(sidebar).display === 'none') {
        sidebar.style.display = 'block'; // Abre el sidebar
    } else {
        sidebar.style.display = ''; // Restablece el estilo, permitiendo que el CSS tome el control
    }
}

// Crea un media query para pantallas pequeñas
const mq = window.matchMedia('(max-width: 768px)');

// Llama a la función al cargar la página
handleScreenSizeChange(mq);

// Agrega un listener para manejar cambios en el tamaño de la pantalla
mq.addListener(handleScreenSizeChange);
