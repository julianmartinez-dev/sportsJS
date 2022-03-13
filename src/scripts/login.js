import { mostrarAlerta } from '../scripts/Interface'

const usuario = 'coder';
const contraseña = 'coder2022'; 

const btnInciarSesion = document.querySelector('#iniciar-sesion')

document.addEventListener('DOMContentLoaded',()=>{
    btnInciarSesion.addEventListener('click', validarSesion)

})

function validarSesion(e){
    e.preventDefault()
    const userInput = document.querySelector('#username').value;
    const passInput = document.querySelector('#password').value;

    
    if(userInput === usuario && passInput === contraseña){
        window.location.href = '../pages/home.html'
    }else{
        mostrarAlerta('Datos incorrectos')
        document.querySelector('#formulario').reset()

    }
}