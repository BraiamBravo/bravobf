var usuarios = [
    { username: 'usuario1@gmail.com', password: 'Braiam22.22' },
    { username: 'usuario2@gmail.com', password: 'Braiam22.22' },
];

function validarCorreoElectronico(correoElectronico) {
    var regexCorreoElectronico = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreoElectronico.test(correoElectronico);
}

function validarContrasena(contrasena) {
    var regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{2,}).{8,}$/;
    return regexContrasena.test(contrasena);
}

function mostrarMensaje(mensaje, tipo) {
    var mensajeElemento = document.createElement('div');
    mensajeElemento.className = tipo;
    mensajeElemento.textContent = mensaje;

    var contenedorMensajes = document.getElementById('contenedor-mensajes');
    contenedorMensajes.innerHTML = '';
    contenedorMensajes.appendChild(mensajeElemento);
}

function iniciarSesion() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var usuarioValido = false;
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].username === username && usuarios[i].password === password) {
            usuarioValido = true;
            break;
        }
    }

    if (!usuarioValido) {
        mostrarMensaje("Credenciales incorrectas. Inténtalo de nuevo.", "error");
        return;
    }

    mostrarMensaje("Inicio de sesión exitoso: " + username, "exito");
    window.location.href = "inicio.html";
}

function iniciarSesion() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // promesa de 3 segundos
    const delayPromise = new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 3000); 
    });

    delayPromise.then(() => {
        
        mostrarMensaje("Inicio de sesión exitoso: " + username, "exito");
        window.location.href = "minicio.html";
    });
}

const productosPorCategoria = {
    'Comida': [
        { nombre: 'Comida para Gatos', precio: 10, imagen: "147115.jpg", descripcion: 'Deliciosa comida para gatos.' },
        { nombre: 'Alimento seco (croquetas o pienso) para perro', precio: 15, imagen: 'comida de perro.jpg', descripcion: 'Nutritiva comida para perros.' }
    ],
    'Juguetes': [
        { nombre: 'Juguete para Gatos', precio: 5, imagen: 'juguete de gato.jpg', descripcion: 'Divertido juguete para gatos.' },
        { nombre: 'Juguete para Perros', precio: 8, imagen: 'juguete para perro.jpg', descripcion: 'Entretenido juguete para perros.' }
    ],
    'Accesorios': [
        { nombre: 'Collar para Gatos', precio: 12, imagen: 'collar para gato.jpg', descripcion: 'Elegante collar para gatos.' },
        { nombre: 'Correa para Perros', precio: 10, imagen: 'collar para perro.jpg', descripcion: 'Práctica correa para perros.' }
    ]
};

let categoriaSeleccionada = '';

function resaltarCategoriaSeleccionada() {
    const categorias = document.querySelectorAll('.filter-section ul li');
    categorias.forEach(categoria => categoria.classList.remove('selected-category'));

    const categoriaActual = document.querySelector(`.filter-section ul li a[data-categoria="${categoriaSeleccionada}"]`);
    if (categoriaActual) {
        categoriaActual.parentNode.classList.add('selected-category');
    }
}

function mostrarProductos(categoria) {
    categoriaSeleccionada = categoria;
    resaltarCategoriaSeleccionada();

    const productList = document.getElementById('productList');
    const productos = productosPorCategoria[categoria];

    if (productos) {
        const listaProductosHTML = productos.map((producto, index) => `<li onclick="mostrarDetallesProducto(${index})">${producto.nombre} - $${producto.precio}</li>`).join('');
        productList.innerHTML = `<h2>Lista de Productos (${categoria})</h2><ul>${listaProductosHTML}</ul>`;
    }
}

function mostrarDetallesProducto(index) {
    const producto = productosPorCategoria[categoriaSeleccionada][index];
    const productDetails = document.getElementById('productDetails');
    productDetails.innerHTML = `
        <h3>${producto.nombre}</h3>
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <p>${producto.descripcion}</p>
    `;
    productDetails.style.display = 'block';
}

function ocultarDetallesProducto() {
    const productDetails = document.getElementById('productDetails');
    productDetails.style.display = 'none';
}

function buscarProducto() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();

    const productosFiltrados = [];
    for (const producto of productosPorCategoria[categoriaSeleccionada]) {
        if (producto.nombre.toLowerCase().includes(searchInput)) {
            productosFiltrados.push(producto);
        }
    }

    const productList = document.getElementById('productList');
    const listaProductosHTML = productosFiltrados.map((producto, index) => `<li onclick="mostrarDetallesProducto(${index})">${producto.nombre} - $${producto.precio}</li>`).join('');
    productList.innerHTML = `<h2>Resultados de Búsqueda</h2><ul>${listaProductosHTML}</ul>`;
}

function filtrarPorPrecio() {
    const minPrice = document.getElementById('min-price').value;
    const maxPrice = document.getElementById('max-price').value;

    const productosFiltrados = [];
    for (const producto of productosPorCategoria[categoriaSeleccionada]) {
        if (producto.precio >= minPrice && producto.precio <= maxPrice) {
            productosFiltrados.push(producto);
        }
    }

    const productList = document.getElementById('productList');
    const listaProductosHTML = productosFiltrados.map((producto, index) => `<li onclick="mostrarDetallesProducto(${index})">${producto.nombre} - $${producto.precio}</li>`).join('');
    productList.innerHTML = `<h2>Productos Filtrados por Precio</h2><ul>${listaProductosHTML}</ul>`;
}

const serviciosInfo = {

    'Consulta veterinaria': 'Ofrecemos servicios de consulta veterinaria para revisar la salud general de tus mascotas. Nuestros veterinarios altamente calificados están aquí para ayudar.',
    'Vacunación': 'Contamos con programas de vacunación para mantener a tus mascotas saludables y protegidas contra enfermedades comunes.',
    'Cirugía': 'Realizamos procedimientos quirúrgicos con cuidado y profesionalismo para abordar diversas necesidades de salud en tus mascotas.'
    
};

function mostrarInfoServicio(servicio) {
    const infoServicio = document.getElementById('infoServicio');
    infoServicio.textContent = serviciosInfo[servicio];
}

function enviarFormulario() {
   
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const mensaje = document.getElementById('mensaje').value;

    

    // Mostrar un mensaje de eviado exitoso
    const respuestaFormulario = document.getElementById('respuestaFormulario');
    respuestaFormulario.innerHTML = `¡Gracias por tu mensaje, ${nombre}! Nos pondremos en contacto contigo pronto.`;
    respuestaFormulario.style.color = '#4caf50'; 
}
