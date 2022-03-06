
import './style.css';

//Variables
let modoDarkActivo = true;
let articulosCarrito = [];
const darkMode = document.querySelector('#dark-mode');
const resultado = document.querySelector('#resultado');
const carrito = document.querySelector('#carrito');
const subtotal = document.querySelector('#subtotal');
const cantidadArticulos = document.querySelectorAll('.cantidad-articulos');
const vaciarCarritoBTN = document.querySelector('#vaciar-carrito');

//Evento principal - Cuando se carga el documento principal
document.addEventListener('DOMContentLoaded', () => {
  registrarEventos();
  consultarBD();
});
//Eventos
function registrarEventos() {
  darkMode.addEventListener('click', cambiarModoDark);
  carrito.addEventListener('click', eliminarProducto);

  vaciarCarritoBTN.addEventListener('click', () => {
    articulosCarrito = [];
    limpiarHTML();
    calcularCantidadArticulos();
    calcularSubtotal();
    
  });
}
//Funcion para cambiar el modo oscuro
function cambiarModoDark() {
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
//Funcion para consultar la base de datos (db.json)
function consultarBD() {
  fetch('./db.json')
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      datos.forEach((dato) => {
        //Por cada elemento obtenido de la base de datos
        //Se llama a la funcion crearCard y enviamos el objeto con los datos;
        crearCard(dato);
      });
    });
}
function crearCard(datos) {
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
  card.addEventListener('click', agregarProducto);
  //Insertamos la card
  resultado.appendChild(card);
}
function eliminarProducto(e) {
  if (e.target.classList.contains('borrar-item')) {
    //Obtenemos el id del articulo a borrar
    const itemID = e.target.getAttribute('data-id');

    //Elimina del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter(
      (producto) => producto.id !== itemID
    );

    carritoHTML();
    calcularSubtotal();
  }
}
//Funcion para agregar articulos al carrito de compras
function agregarProducto(e) {
  if (e.target.classList.contains('agregar-carrito')) {
    const productoSeleccionado = e.target.parentElement;
    leerDatosProducto(productoSeleccionado);
    calcularSubtotal()
  }
}
function leerDatosProducto(producto) {


  const TITULO = producto.querySelector('h2').textContent;
  const PRECIO = parseInt(producto.querySelector('div .precio').textContent.slice(1)); //string: $1500 -> int: 1500
  const ID = producto.querySelector('label').getAttribute('data-id');

  const infoProducto = {
    titulo: TITULO,
    precio: PRECIO,
    id: ID,
    cantidad: 1,
  };

  //Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some(
    (producto) => producto.id === infoProducto.id
  );

  if (existe) {
    //Actualizamos la cantidad
    const productos = articulosCarrito.map((producto) => {
      if (producto.id === infoProducto.id) {
        producto.cantidad++;
        return producto; //Retorna el objeto actualiza
      } else {
        return producto; //Retorna los objetos que no son duplicados
      }
    });
    articulosCarrito = [...productos];
  } else {
    //Agrega elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoProducto];
  }

  //Crear el html con los elementos del arreglo de articulos
  carritoHTML();

}
//Muestra el carrito de compras en el html
function carritoHTML() {
  //Limpiamos el contenido del carrito
  limpiarHTML();

  //Generamos un nuevo carrito con cada articulo
  articulosCarrito.forEach((producto) => {
    const { titulo, precio, cantidad, id } = producto;

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
  });

  //Actualizar la cantidad de articulos en el carrito
  calcularCantidadArticulos();
  
}

function limpiarHTML() {
  while (carrito.firstChild) {
    carrito.removeChild(carrito.firstChild);
  }
}

function calcularCantidadArticulos() {
  //Hay 2 elementos que muestran la cantidad de articulos en el carrito de diferente manera
  cantidadArticulos[0].textContent = articulosCarrito.length
  cantidadArticulos[1].textContent = `Cantidad de articulos: ${articulosCarrito.length}`
}

function calcularSubtotal(){
  //Funcion para calcular el subtotal del carrito
  //Recorre el arreglo de carrito y suma todos los productos que hay
  let resultado = articulosCarrito.reduce(
    (acc, articulo) => acc + articulo.precio * articulo.cantidad,
    0
  );
  console.log(resultado)

  //Imprime en el html el subtotal
  subtotal.innerText = `Subtotal: $${resultado}`
}