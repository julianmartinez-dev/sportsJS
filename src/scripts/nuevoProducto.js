import { validar } from './funciones.js';
import { nuevoProducto } from './API.js';
import { mostrarAlerta } from './Interface.js';

(function () {
  const formulario = document.querySelector('#formulario');
  formulario.addEventListener('submit', validarProducto);

  function validarProducto(e) {
    e.preventDefault();

    const producto = document.querySelector('#producto').value;
    const marca = document.querySelector('#marca').value;
    const color = document.querySelector('#color').value;
    const categoria = document.querySelector('#categoria').value;
    const precio = document.querySelector('#precio').value;
    const genero = document.querySelector('#genero').value;
    const imagen = document.querySelector('#imagen').value;

    const productoObj = {
      producto,
      marca,
      color,
      categoria,
      precio,
      genero,
      imagen
    };

    if (validar(productoObj)) {
      nuevoProducto(productoObj);
    } else {
      mostrarAlerta('Todos los campos son obligatorios');
    }
  }
})();
