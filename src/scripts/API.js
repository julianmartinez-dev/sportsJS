const url = 'https://622c19f3087e0e041e0343ba.mockapi.io/productos';

//Cuando se crea un nuevo producto
export const nuevoProducto = async (producto) => {
  try {
    await fetch(url, {
      method: 'POST', //Para insertar registro siempre se usa POST
      body: JSON.stringify(producto),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    window.location.href = './home.html';
  } catch (error) {
    console.log(error);
  }
};

//Obtiene todos los productos
export const obtenerProductos = async () => {
  try {
    const resultado = await fetch(url);
    const datos = await resultado.json();
    return datos;
  } catch (error) {
    console.log(error);
  }
};

//Elimina un producto
export const eliminarProducto = async (id) => {
  try {
    await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.log(error);
  }
};

//Obtiene un producto por su id
export const obtenerProducto = async (id) => {
  try {
    const resultado = await fetch(`${url}/${id}`);
    const datos = await resultado.json();
    return datos;
  } catch (error) {
    console.log(error);
  }
};

//Actualiza un registro
export const editarProducto = async (producto) => {
  try {
    await fetch(`${url}/${producto.id}`, {
      method: 'PUT',
      body: JSON.stringify(producto),
      headers: {
        'Content-type': 'application/json',
      },
    });
    window.location.href = './home.html';
  } catch (error) {
    console.log(error);
  }
};

export async function filtrarBD(key, value) {
  const urlFiltrar = `${url}?${key}=${value}`
  
  const respuesta = await fetch(urlFiltrar);
  const datos = await respuesta.json();
  return datos;
}