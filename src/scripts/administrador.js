import { eliminarProducto, obtenerProductos } from './API.js';
import Iterator from './funciones.js';

const listado = document.querySelector('#listado-productos');
listado.addEventListener('click', confirmarEliminar);

document.addEventListener('DOMContentLoaded', mostrarProductos);

async function mostrarProductos() {
  const productos = await obtenerProductos();
  console.log(productos)
  const iterador = new Iterator(productos);


  while (iterador.hasNext()) {
    const { imagen, producto, marca, color, categoria, precio, genero, id } =
      iterador.next();

      const row = document.createElement('tr');
      row.innerHTML += `
        <td class="whitespace-nowrap border-b border-gray-200">
            <img class="w-16 mx-auto" src="${imagen}">
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
            <p class="text-gray-700">${producto}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
            <p class="text-gray-700">${marca}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
            <p class="text-gray-700">${color}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
            <p class="text-gray-700">${categoria}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
            <p class="text-gray-700 font-bold">$${precio}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
            <p class="text-gray-700">${genero}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
            <a href="editar-producto.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
            <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
        </td>
        
      `;
      listado.appendChild(row)
  }
}

 function confirmarEliminar(e) {
   //Para identificar donde dimos click y que sean en "Eliminar"
   if (e.target.classList.contains('eliminar')) {
     const clienteID = e.target.dataset.cliente;

     const confirmar = confirm('¿Deseas eliminar este registro?');

     if (confirmar) {
       eliminarProducto(clienteID);
     }
   }
 }
