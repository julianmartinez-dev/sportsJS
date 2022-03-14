import { eliminarProducto, obtenerProductos } from './API.js';
import Iterator from './funciones.js';
import { crearRow, deshabilitarElementos, limpiarHTML } from './Interface.js';

const listado = document.querySelector('#listado-productos');
listado.addEventListener('click', confirmarEliminar);

document.addEventListener('DOMContentLoaded', ()=>{
    const autenticado = sessionStorage.getItem('usuarioAutenticado') || false;
    console.log(autenticado)
    autenticado ? mostrarProductos() : deshabilitarElementos()
});

async function mostrarProductos() {
  const productos = await obtenerProductos();
  const iterador = new Iterator(productos);


  while (iterador.hasNext()) {
      const producto = iterador.next()
      const row = crearRow(producto)
      listado.appendChild(row)
  }
}

 async function confirmarEliminar(e) {
   //Para identificar donde dimos click y que sean en "Eliminar"
   if (e.target.classList.contains('eliminar')) {
     const productoID = e.target.dataset.producto;

     const confirmar = confirm('¿Deseas eliminar este registro?');

     if (confirmar) {
       await eliminarProducto(productoID);
       limpiarHTML(listado)
       mostrarProductos()
     }
   }
 }


