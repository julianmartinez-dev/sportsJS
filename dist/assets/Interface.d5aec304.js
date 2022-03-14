const b=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}};b();const m=function(t){this.elements=t,this.index=0};m.prototype={hasNext:function(){return this.index<this.elements.length},next:function(){return this.elements[this.index++]},reset:function(){return this.index=0}};function h(t){return Object.values(t).every(o=>o!=="")}let p=!0;const u=document.querySelector("#carrito"),f=document.querySelector("#resultado");function y(){p=!p;const t=document.querySelector("html");p?t.setAttribute("data-theme","dark"):t.setAttribute("data-theme","bumblebee")}function x(t,o){const{id:a,producto:i,marca:e,categoria:r,imagen:s,precio:c,genero:n,color:d}=t,l=document.createElement("div");l.className="card max-w-96 bg-base-100 shadow-md hover:shadow-yellow-300 borderer mx-auto",l.innerHTML=`
  <figure class="pt-4"><img src=${s} alt="imagen ropa"></figure>
  <div class="card-body">
    <h2 class="card-title">${e} ${i}</h2>
    <div class="badge badge-secondary py-4 text-lg precio">$${c}</div>
    
    <p class=" font-bold">Color: <span class=" font-semibold">${d}</span> </p>
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
      <div class="badge badge-outline">${r}</div> 
      <div class="badge badge-outline">${n}</div>
    </div>
    <label for="my-modal" class="btn modal-button btn-warning mt-4 agregar-carrito" data-id="${a}" id="agregar-carrito">Agregar al carrito</label>


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
  `,l.addEventListener("click",o),f.appendChild(l)}function v(t){g(u);const o=new m(t);for(;o.hasNext();){const{titulo:a,precio:i,cantidad:e,id:r}=o.next(),s=document.createElement("tr");s.classList.add("hover"),s.innerHTML=`
      <td>${a}</td>
      <td>$${i}</td>
      <td>${e}</td>
      <td>
         
          <a href="#" data-id="${r}" class="borrar-item text-2xl">\xD7</a>
      </td>
      
    `,u.appendChild(s)}}function g(t){for(;t.firstChild;)t.removeChild(t.firstChild)}function w(t){if(!document.querySelector(".bg-red-100")){const a=document.createElement("p");a.classList.add("bg-red-100","border-red-400","text-red-700","px-4","py-3","rounded","max-w-lg","mx-auto","mt-6","text-center"),a.innerHTML=`
            <strong class="font-bold">Error!</strong>
            <span class="block lg:inline">${t}</span>
        `,document.querySelector("#formulario").appendChild(a),setTimeout(()=>{a.remove()},3e3)}}function $(){document.querySelectorAll("nav a").forEach(a=>a.removeAttribute("href")),document.querySelector("table").classList.add("hidden"),document.querySelector("main h2").textContent="Debes iniciar sesi\xF3n para ver contenido",confirm("Debes iniciar sesion")?window.location.href="./login.html":window.location.href="../../index.html"}function A(t){const{imagen:o,producto:a,marca:i,color:e,categoria:r,precio:s,genero:c,id:n}=t,d=document.createElement("tr");return d.innerHTML+=`
        <td class="whitespace-nowrap border-b border-gray-200">
            <img class="w-16 mx-auto" src="${o}">
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
            <p class="text-gray-700">${a}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
            <p class="text-gray-700">${i}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
            <p class="text-gray-700">${e}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
            <p class="text-gray-700">${r}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
            <p class="text-gray-700 font-bold">$${s}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
            <p class="text-gray-700">${c}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
            <a href="editar-producto.html?id=${n}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
            <a href="#" data-producto="${n}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
        </td>
        
      `,d}export{m as I,x as a,v as b,y as c,$ as d,A as e,g as l,w as m,h as v};
