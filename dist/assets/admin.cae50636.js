import{I as b}from"./funciones.1d7e1187.js";import{o as m,e as g}from"./API.cb8088a6.js";const s=document.querySelector("#listado-productos");s.addEventListener("click",w);document.addEventListener("DOMContentLoaded",y);async function y(){const r=await m();console.log(r);const t=new b(r);for(;t.hasNext();){const{imagen:e,producto:c,marca:d,color:n,categoria:i,precio:p,genero:l,id:a}=t.next(),o=document.createElement("tr");o.innerHTML+=`
        <td class="whitespace-nowrap border-b border-gray-200">
            <img class="w-16 mx-auto" src="${e}">
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
            <p class="text-gray-700">${c}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
            <p class="text-gray-700">${d}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
            <p class="text-gray-700">${n}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
            <p class="text-gray-700">${i}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
            <p class="text-gray-700 font-bold">$${p}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
            <p class="text-gray-700">${l}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
            <a href="editar-producto.html?id=${a}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
            <a href="#" data-cliente="${a}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
        </td>
        
      `,s.appendChild(o)}}function w(r){if(r.target.classList.contains("eliminar")){const t=r.target.dataset.cliente;confirm("\xBFDeseas eliminar este registro?")&&g(t)}}
