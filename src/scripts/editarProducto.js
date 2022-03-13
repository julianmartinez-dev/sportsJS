import { editarProducto, obtenerProducto } from './API.js';
import { validar } from './funciones.js';
import { mostrarAlerta } from './Interface.js'

(function () {
  //CAMPOS DEL FORMULARIO
  const productoInput = document.querySelector('#producto');
  const marcaInput = document.querySelector('#marca');
  const colorInput = document.querySelector('#color');
  const categoriaInput = document.querySelector('#categoria');
  const precioInput = document.querySelector('#precio');
  const generoInput = document.querySelector('#genero');
  const imagenInput= document.querySelector('#imagen');
  const idInputInput= document.querySelector('#id');
  const imagenEditando = document.querySelector('#imagen-producto-editando')

  document.addEventListener('DOMContentLoaded', async () => {
    const parametrosURL = new URLSearchParams(window.location.search);
    const productoID = parametrosURL.get('id');
    //parseInt(parametrosURL.get('id'));
    const dataProducto = await obtenerProducto(productoID);

    mostrarProducto(dataProducto);

    //submit al formulario
    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validarProducto);
  });

  function mostrarProducto(dataProducto) {
    const { producto, marca, color, categoria, precio, genero, imagen, id } = dataProducto;

    productoInput.value = producto;
    marcaInput.value = marca;
    colorInput.value = color;
    categoriaInput.value = categoria;
    precioInput.value = precio;
    generoInput.value = genero;
    imagenInput.value = imagen;
    idInputInput.value = id;
    imagenEditando.setAttribute('src',imagen)
  }

  function validarProducto(e) {
    e.preventDefault();

    const producto = {
  
      producto: productoInput.value,
      marca: marcaInput.value,
      color: colorInput.value,
      categoria: categoriaInput.value,
      precio: precioInput.value,
      genero: generoInput.value,
      imagen: imagenInput.value,
      id: idInputInput.value,
    };

    console.log(producto);

    if (validar(producto)) {
      //Reescribir el objeto
      editarProducto(producto);
    } else {
      mostrarAlerta('Todos los campos son obligatorios');
    }
  }
})();
