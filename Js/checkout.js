const tableBody = document.querySelector('tbody')
const sectionProductos = document.querySelector('section')

function mostrarMsgCarritoVacio() {
    return `<div class="card-error">
                <h3>El carrito está vacío</h3>
                <h4>🛒</h4>
            </div>`
}

function armarCarrito() {
    tableBody.innerHTML = ''
    carrito.length > 0 ? carrito.forEach((bicicleta) => tableBody.innerHTML += listarProductosEnCarritoHTML(bicicleta))
        : sectionProductos.innerHTML = mostrarMsgCarritoVacio()
}

function eliminarProducto(codigo) {
    const index = carrito.findIndex((producto) => producto.codigo === codigo);
    if (index !== -1) {
        carrito.splice(index, 1);
        localStorage.setItem('Carrito', JSON.stringify(carrito));
        armarCarrito();
        mostrarPrecioTotal();
    }
}

function listarProductosEnCarritoHTML(bicicleta) {
    return `<tr>
            <td>${bicicleta.codigo}</td>
            <td>${bicicleta.nombre}</td>
            <td>$ ${bicicleta.precio.toLocaleString()}</td>
            <td><button class="btn-quitar" data-codigo="${bicicleta.codigo}">❌</button></td>
        </tr>`;
}


document.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-quitar')) {
        const codigoProducto = parseInt(event.target.dataset.codigo);
        eliminarProducto(codigoProducto);
    }
});

function calcularPrecioTotal() {
    let total = 0;
    carrito.forEach((producto) => {
        total += producto.precio;
    });
    return total;
}

function mostrarPrecioTotal() {
    const precioTotal = calcularPrecioTotal();
    const precioTotalElement = document.getElementById('precioTotal');
    precioTotalElement.textContent = `$ ${precioTotal.toLocaleString()}`;
}

function vaciarCarrito() {
    localStorage.removeItem('Carrito');
    carrito.length = 0;
    armarCarrito();
    mostrarPrecioTotal();
}

const btnComprar = document.getElementById('btnComprar');
btnComprar.addEventListener('click', function () {
    if (carrito.length > 0) {
        Swal.fire({
            title: 'Compra realizada',
            icon: 'success',
            text: 'Gracias por tu compra!',
            timer: 2500
        });
        vaciarCarrito();
    }
});

armarCarrito()
mostrarPrecioTotal();