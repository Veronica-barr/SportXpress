// Variables globales
const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const comprarCarritoBtn = document.getElementById('comprar-carrito');
const toggleCarritoBtn = document.getElementById('toggle-carrito');
const carritoCount = document.getElementById('carrito-count');
const carritoTotal = document.getElementById('carrito-total');

// Cargar eventos
document.addEventListener('DOMContentLoaded', () => {
    cargarEventListener();
    cargarCarritoGuardado();
    actualizarContadorCarrito();
});

function cargarEventListener() {
    // Evento para agregar productos al carrito
    elementos1.addEventListener('click', comprarElemento);
    
    // Eventos del carrito
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    comprarCarritoBtn.addEventListener('click', comprarCarrito);
    
    // Toggle para mostrar/ocultar carrito
    toggleCarritoBtn.addEventListener('click', toggleCarrito);
    
    // Cerrar carrito al hacer clic fuera
    document.addEventListener('click', cerrarCarritoAlClicExterno);
}

// Toggle para mostrar/ocultar carrito
function toggleCarrito(e) {
    e.stopPropagation();
    const isExpanded = toggleCarritoBtn.getAttribute('aria-expanded') === 'true';
    toggleCarritoBtn.setAttribute('aria-expanded', !isExpanded);
    carrito.style.display = isExpanded ? 'none' : 'block';
}

// Cerrar carrito al hacer clic fuera
function cerrarCarritoAlClicExterno(e) {
    if (!carrito.contains(e.target) && e.target !== toggleCarritoBtn) {
        toggleCarritoBtn.setAttribute('aria-expanded', 'false');
        carrito.style.display = 'none';
    }
}

// Comprar elemento
function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.closest('.product');
        leerDatosElemento(elemento);
        
        // Feedback visual
        const feedback = document.createElement('div');
        feedback.textContent = '¡Producto añadido!';
        feedback.style.position = 'fixed';
        feedback.style.bottom = '20px';
        feedback.style.right = '20px';
        feedback.style.backgroundColor = '#4CAF50';
        feedback.style.color = 'white';
        feedback.style.padding = '15px';
        feedback.style.borderRadius = '5px';
        feedback.style.zIndex = '1000';
        feedback.style.animation = 'fadeInOut 3s ease-in-out';
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    }
}

// Leer datos del elemento
function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        descripcion: elemento.querySelector('p').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('button').getAttribute('data-id')
    };
    insertarCarrito(infoElemento);
}

// Insertar en el carrito
function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" 
                 width="100" 
                 height="100" 
                 alt="${elemento.titulo}" 
                 loading="lazy"
                 class="producto-carrito-img">
        </td>
        <td>${elemento.titulo}</td>
        <td>${elemento.descripcion}</td>
        <td>${elemento.precio}</td>
        <td>
            <button href="#" 
                    class="borrar btn-2" 
                    data-id="${elemento.id}"
                    aria-label="Eliminar ${elemento.titulo} del carrito">
                X
            </button>
        </td>
    `;

    lista.appendChild(row);
    
    // Guardar en localStorage
    guardarCarritoLocalStorage(elemento);
    
    // Actualizar interfaz
    actualizarContadorCarrito();
    actualizarTotalCarrito();
}

// Guardar en localStorage
function guardarCarritoLocalStorage(elemento) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificar si el producto ya está en el carrito
    const existe = carrito.some(item => item.id === elemento.id);
    
    if (!existe) {
        carrito.push(elemento);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    } else {
        alert('Este producto ya está en tu carrito');
    }
}

// Eliminar elemento del carrito
function eliminarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar')) {
        e.target.closest('tr').remove();
        
        // Actualizar localStorage
        const id = e.target.getAttribute('data-id');
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = carrito.filter(item => item.id !== id);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        // Actualizar interfaz
        actualizarContadorCarrito();
        actualizarTotalCarrito();
    }
}

// Vaciar carrito
function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    localStorage.removeItem('carrito');
    
    // Actualizar interfaz
    actualizarContadorCarrito();
    actualizarTotalCarrito();
    
    return false;
}

// Comprar carrito
function comprarCarrito(e) {
    e.preventDefault();
    
    // Verificar si hay productos en el carrito
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        alert('El carrito está vacío. Agrega productos antes de comprar.');
        return;
    }
    
    // Redirigir a la página de compra
    window.location.href = './compra/compra.html';
}

// Cargar carrito guardado
function cargarCarritoGuardado() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.forEach(elemento => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${elemento.imagen}" 
                     width="100" 
                     height="100" 
                     alt="${elemento.titulo}" 
                     loading="lazy"
                     class="producto-carrito-img">
            </td>
            <td>${elemento.titulo}</td>
            <td>${elemento.descripcion}</td>
            <td>${elemento.precio}</td>
            <td>
                <button href="#" 
                        class="borrar btn-2" 
                        data-id="${elemento.id}"
                        aria-label="Eliminar ${elemento.titulo} del carrito">
                    X
                </button>
            </td>
        `;
        lista.appendChild(row);
    });
    
    actualizarTotalCarrito();
}

// Actualizar contador del carrito
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoCount.textContent = carrito.length;
    carritoCount.setAttribute('aria-label', `${carrito.length} productos en el carrito`);
}

// Actualizar total del carrito
function actualizarTotalCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = 0;
    
    carrito.forEach(item => {
        const precio = parseFloat(item.precio.replace('$', ''));
        total += precio;
    });
    
    carritoTotal.textContent = `$${total.toFixed(2)}`;
}