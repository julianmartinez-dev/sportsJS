
import { filtrarBD, obtenerProductos } from './src/scripts/API.js';
import Iterator from './src/scripts/funciones.js';
import {
  cambiarModoDark,
  carritoHTML,
  crearCard,
  limpiarHTML,
} from './src/scripts/Interface.js';
import './src/style.css';

//Variables
let articulosCarrito = [];


const darkMode = document.querySelector('#dark-mode');
const carrito = document.querySelector('#carrito');
const subtotal = document.querySelector('#subtotal');
const cantidadArticulos = document.querySelectorAll('.cantidad-articulos');
const vaciarCarritoBTN = document.querySelector('#vaciar-carrito');
const filtrosNav = document.querySelector('#filtros')
const listadoProductos = document.querySelector('#resultado');



const url = 'https://622c19f3087e0e041e0343ba.mockapi.io/productos';


//Evento principal - Cuando se carga el documento principal
document.addEventListener('DOMContentLoaded', () => {
  registrarEventos();
  mostrarProductos();

  //Recuperar localStorage
  articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || []
  carritoHTML(articulosCarrito)
  calcularSubtotal()
  calcularCantidadArticulos()


});

//Eventos
function registrarEventos() {
  darkMode.addEventListener('click', cambiarModoDark);
  carrito.addEventListener('click', eliminarProducto);
  filtrosNav.addEventListener('click',filtrarProductos)
  vaciarCarritoBTN.addEventListener('click', vaciarCarrito);
}


const mostrarProductos = async () => {
  try {

    const datos = await obtenerProductos()
    const iterador = new Iterator(datos);

    while (iterador.hasNext()) {
      const elemento = iterador.next();
      crearCard(elemento, agregarProducto);
    }
  } catch (error) {
    console.log(error);
  }
};

function agregarProducto(e) {
  if (e.target.classList.contains('agregar-carrito')) {
    const productoSeleccionado = e.target.parentElement;
    leerDatosProducto(productoSeleccionado);
    calcularSubtotal();
  }
}

function eliminarProducto(e) {
  if (e.target.classList.contains('borrar-item')) {
    //Obtenemos el id del articulo a borrar
    const itemID = e.target.getAttribute('data-id');

    //Elimina del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter(
      (producto) => producto.id !== itemID
    );

    carritoHTML(articulosCarrito);
    sincronizarStorage();
    //Actualizar la cantidad de articulos en el carrito
    calcularCantidadArticulos();
    calcularSubtotal();
  }
}
//Funcion para agregar articulos al carrito de compras

function leerDatosProducto(producto) {
  const titulo = producto.querySelector('h2').textContent;
  const precio = parseInt(
    producto.querySelector('div .precio').textContent.slice(1)
  ); //string: $1500 -> int: 1500
  const id = producto.querySelector('label').getAttribute('data-id');

  const infoProducto = {
    titulo,
    precio,
    id,
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
  carritoHTML(articulosCarrito);
  sincronizarStorage();
  //Actualizar la cantidad de articulos en el carrito
  calcularCantidadArticulos();

  
}

function calcularCantidadArticulos() {

  let cantidad = articulosCarrito.reduce( (acc, articulo) => acc + articulo.cantidad,0)
  cantidadArticulos[0].textContent = cantidad;
  cantidadArticulos[1].textContent = `Cantidad de articulos: ${cantidad}`;
}

function calcularSubtotal() {
  //Funcion para calcular el subtotal del carrito
  //Recorre el arreglo de carrito y suma todos los productos que hay
  let resultado = articulosCarrito.reduce(
    (acc, articulo) => acc + articulo.precio * articulo.cantidad,
    0
  );

  //Imprime en el html el subtotal
  subtotal.innerText = `Subtotal: $${resultado}`;
}

async function filtrarProductos(e){
  
  if(e.target.getAttribute('data-filtro') !== null){

    const key = e.target.getAttribute('data-filtro');
    const value = e.target.textContent;
    limpiarHTML(listadoProductos)

    if(key === 'all'){ //Click en Ver Todos tiene asignado "all"
      mostrarProductos();
      document.querySelector('#titulo-lista').textContent = '';
      return;
    }
    const productosFiltrados = await filtrarBD(key,value) // Filtramos la base de datos

    document.querySelector('#titulo-lista').textContent = `Filtro: ${value}`;

    const iterador = new Iterator(productosFiltrados);
    while(iterador.hasNext()){
      const elemento = iterador.next();
      crearCard(elemento,agregarProducto);
    }

  } 
}


function sincronizarStorage() {
  localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function vaciarCarrito(){
   articulosCarrito = [];
   limpiarHTML(carrito);
   calcularCantidadArticulos();
   calcularSubtotal();
   sincronizarStorage();
}


