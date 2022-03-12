import Iterator from "./funciones";
import './style.css';

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
  <figure class="pt-4"><img src=${imagen} alt="imagen ropa"></figure>
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

