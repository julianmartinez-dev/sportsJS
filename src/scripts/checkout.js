import '../style.css';
import { limpiarHTML, mostrarAlerta, cambiarModoDark } from './Interface';

const listadoProductos = document.querySelector('#lista-productos');
const darkModeToggle = document.querySelector('#dark-mode')
const formulario = document.querySelector('#formulario');
const dialog = document.querySelector('dialog');
const cerrarDialog = document.querySelector('#cerrar-dialog');
let articulosCarrito;

document.addEventListener('DOMContentLoaded', () => {
  articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
  listarProductosCarrito(articulosCarrito);
  calcularSubtotal(articulosCarrito);
  mostrarTotales();
  registrarEventos();
});

function registrarEventos() {
  listadoProductos.addEventListener('click', eliminarProducto);
  darkModeToggle.addEventListener('click', cambiarModoDark);
  formulario.addEventListener('submit', validarFormulario);
  cerrarDialog.addEventListener('click', () => dialog.close());
}

const listarProductosCarrito = (articulos) => {
  if (articulos.length) {
    articulos.forEach((articulo) => {
      const { titulo, precio, cantidad, id, imagen } = articulo;

      const card = document.createElement('div');
      card.classList =
        'card card-side bg-base-100 border rounded mt-4 flex justify-center relative ';
      card.innerHTML = `
            <figure>
              <img
                src=${imagen}
                alt="Movie"
                class=" w-28"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title text-warning">${titulo}</h2>
              <p class="font-bold">Precio: <span class="font-normal">$${precio}</span></p>
              <p class="font-bold">Cantidad: <span class="font-normal">${cantidad}</span></p>
              <p class="font-bold">Subtotal: <span class="font-normal">$${
                cantidad * precio
              }</span></p>

              <div class="card-actions absolute right-3 top-0 bg-warning px-3 font-bold text-black rounded-sm hover:cursor-pointer borrar-item" data-id=${id}>Eliminar</div>
            </div>
         `;
      listadoProductos.appendChild(card);
    });
  }
};

function eliminarProducto(e) {
  if (e.target.classList.contains('borrar-item')) {
    //Obtenemos el id del articulo a borrar
    const itemID = e.target.getAttribute('data-id');

    //Elimina del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter(
      (producto) => producto.id !== itemID
    );

    //Quita el articulo eliminado del html y vuelve a generarlo
    limpiarHTML(listadoProductos);
    listarProductosCarrito(articulosCarrito);
    calcularSubtotal(articulosCarrito);
    mostrarTotales();
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
  }
}

function calcularSubtotal(carrito) {
  let resultado = carrito.reduce(
    (acc, articulo) => acc + articulo.precio * articulo.cantidad,
    0
  );
  return resultado;
}

function mostrarTotales() {
  const subtotal = document.querySelector('#subtotal');
  subtotal.innerHTML = `$${calcularSubtotal(articulosCarrito)}`;

  const impuestos = document.querySelector('#impuestos');
  impuestos.innerHTML = `$${calcularSubtotal(articulosCarrito) * 0.21}`;

  const total = document.querySelector('#total');
  total.innerHTML = `$${calcularSubtotal(articulosCarrito) * 1.21}`;
}

function validarFormulario(e) {
  e.preventDefault();
  const nombre = document.querySelector('#nombre').value;
  const email = document.querySelector('#email').value;
  const direccion = document.querySelector('#direccion').value;
  const codigoPostal = document.querySelector('#cp').value;
  const ciudad = document.querySelector('#ciudad').value;
  const provincia = document.querySelector('#provincia').value;

  const inputs = [nombre, email, direccion, codigoPostal, ciudad, provincia];

  if (inputs.includes('')) {
    mostrarAlerta('Todos los campos son necesarios');
    return;
  }
  dialog.showModal();
  formulario.reset();
}