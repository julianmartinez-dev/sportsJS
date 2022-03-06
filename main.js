import './style.css';
let modoDarkActivo = true;

//Variables
const darkMode = document.querySelector('#dark-mode');
const resultado = document.querySelector('#resultado');

//Evento principal - Cuando se carga el documento principal
document.addEventListener('DOMContentLoaded', () => {
  registrarEventos();
  consultarBD();
});

//Eventos
function registrarEventos() {
  darkMode.addEventListener('click', cambiarModoDark);
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
  <figure><img src=${imagen} alt="imagen ropa"></figure>
  <div class="card-body">
    <h2 class="card-title">${marca} ${producto}<div class="badge badge-secondary py-4 text-lg">$${precio}</div></h2>
    <p class=" font-bold">Color: <span class=" font-semibold">${color}</span> </p>
    <div class="flex">
    <p class="font-bold">Talle: </p>
      <select class="select select-bordered select-xs  max-w-xs">
        <option disabled selected>Small</option>
        <option>Small Apple</option>
        <option>Small Orange</option>
        <option>Small Tomato</option>
      </select>
    </div>
    
    <div class="card-actions justify-end mt-4">
      <div class="badge badge-outline">${categoria}</div> 
      <div class="badge badge-outline">${genero}</div>
    </div>
    <button class="btn btn-warning mt-4">Agregar al carrito</button>
  </div>
  `;
  
  //Insertamos la card
  resultado.appendChild(card);
}
