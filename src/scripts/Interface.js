import Iterator from "./funciones";
import '../style.css';

let modoDarkActivo = true;
const carrito = document.querySelector('#carrito');
const listadoProductos = document.querySelector('#resultado');

//Funcion para cambiar el modo oscuro
export function cambiarModoDark() {
  //Cada vez que hagamos click en el icono se cambiara el valor de la variable por true o false (el caso contrario)
  modoDarkActivo = !modoDarkActivo;

  const html = document.querySelector('html');
  if (modoDarkActivo) {
    //document.all[0].attributes[1].nodeValue = 'dark';
    html.setAttribute('data-theme', 'dark');
  } else {
    html.setAttribute('data-theme', 'bumblebee');
  }
}


export function crearCard(datos,callback) {
  
  const { id, producto, marca, categoria, imagen, precio, genero, color } =
    datos;

  const card = document.createElement('div');

  //Creacion de cada elemento CARD
  card.className =
    'card max-w-96 bg-base-100 shadow-md hover:shadow-yellow-300 borderer mx-auto';
  card.innerHTML = `
  <figure class="pt-4"><img src=${imagen} alt="imagen ropa" class="max-w-[280px]"></figure>
  <div class="card-body">
    <h2 class="card-title">${marca} ${producto}</h2>
    <div class="badge badge-secondary py-4 text-lg precio">$${precio}</div>
    
    <p class=" font-bold">Color: <span class=" font-semibold">${color}</span> </p>
    <div class="flex">
    <p class="font-bold">Talle: </p>
      <select class="select select-bordered select-xs  max-w-xs">
        <option disabled selected>Talle</option>
        <option value="38">38 ARG</option>
        <option value="39">39 ARG</option>
        <option value="40">40 ARG</option>
        <option value="41">41 ARG</option>
        <option value="42">42 ARG</option>
        <option value="43">43 ARG</option>
        <option value="44">44 ARG</option>
      </select>
    </div>
    
    <div class="card-actions justify-end mt-4">
      <div class="badge badge-outline">${categoria}</div> 
      <div class="badge badge-outline">${genero}</div>
    </div>
    <label for="my-modal" class="btn modal-button btn-warning mt-4 agregar-carrito" data-id="${id}" id="agregar-carrito">Agregar al carrito</label>


    <input type="checkbox" id="my-modal" class="modal-toggle">
    <div class="modal">
      <div class="modal-box flex">
        <h3 class="font-bold text-lg text-center self-center mx-auto">Item agregado al carrito!</h3>
        <div class="modal-action">
          <label for="my-modal" class="btn self-end">OK!</label>
        </div>
      </div>
    </div>

  </div>
  `;
  card.addEventListener('click', callback);

  //Insertamos la card
  listadoProductos.appendChild(card);
}

export function carritoHTML(articulosCarrito) {
  //Limpiamos el contenido del carrito
  limpiarHTML(carrito);

  const iteradorCarrito = new Iterator(articulosCarrito);

  while (iteradorCarrito.hasNext()) {
    const { titulo, precio, cantidad, id } = iteradorCarrito.next();
    
    const row = document.createElement('tr');
    row.classList.add('hover');

    row.innerHTML = `
      <td>${titulo}</td>
      <td>$${precio}</td>
      <td>${cantidad}</td>
      <td>
         
          <a href="#" data-id="${id}" class="borrar-item text-2xl">×</a>
      </td>
      
    `;
    carrito.appendChild(row); //Se agrega cada celda a la tabla
  }

 
}

export function limpiarHTML(elemento) {
  //Por parametro recibimos el elemento que queremos limpiar
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

export function mostrarAlerta(mensaje) {
  const alerta = document.querySelector('.bg-red-100');

  if (!alerta) {
    const alerta = document.createElement('p');
    alerta.classList.add(
      'bg-red-100',
      'border-red-400',
      'text-red-700',
      'px-4',
      'py-3',
      'rounded',
      'max-w-lg',
      'mx-auto',
      'mt-6',
      'text-center'
    );

    alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block lg:inline">${mensaje}</span>
        `;

    const formulario = document.querySelector('#formulario');
    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

export function deshabilitarElementos() {
  const elementos = document.querySelectorAll('nav a');
  elementos.forEach((elemento) => elemento.removeAttribute('href'));
  document.querySelector('table').classList.add('hidden');
  document.querySelector('main h2').textContent =
    'Debes iniciar sesión para ver contenido';
  const confirmar = confirm('Debes iniciar sesion');
  if (confirmar) {
    window.location.href = './login.html';
  } else {
    window.location.href = '../../index.html';
  }
}

export function crearRow(datos){
  const { imagen, producto, marca, color, categoria, precio, genero, id } = datos;

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
            <a href="#" data-producto="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
        </td>
        
      `;

      return row;
}

