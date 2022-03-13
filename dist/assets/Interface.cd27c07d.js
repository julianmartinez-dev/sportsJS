import{I as p}from"./funciones.1d7e1187.js";let s=!0;const c=document.querySelector("#carrito"),b=document.querySelector("#resultado");function f(){s=!s;const t=document.querySelector("html");s?t.setAttribute("data-theme","dark"):t.setAttribute("data-theme","bumblebee")}function h(t,a){const{id:e,producto:r,marca:d,categoria:i,imagen:o,precio:n,genero:m,color:u}=t,l=document.createElement("div");l.className="card max-w-96 bg-base-100 shadow-md hover:shadow-yellow-300 borderer mx-auto",l.innerHTML=`
  <figure class="pt-4"><img src=${o} alt="imagen ropa"></figure>
  <div class="card-body">
    <h2 class="card-title">${d} ${r}</h2>
    <div class="badge badge-secondary py-4 text-lg precio">$${n}</div>
    
    <p class=" font-bold">Color: <span class=" font-semibold">${u}</span> </p>
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
      <div class="badge badge-outline">${i}</div> 
      <div class="badge badge-outline">${m}</div>
    </div>
    <label for="my-modal" class="btn modal-button btn-warning mt-4 agregar-carrito" data-id="${e}" id="agregar-carrito">Agregar al carrito</label>


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
  `,l.addEventListener("click",a),b.appendChild(l)}function x(t){g(c);const a=new p(t);for(;a.hasNext();){const{titulo:e,precio:r,cantidad:d,id:i}=a.next(),o=document.createElement("tr");o.classList.add("hover"),o.innerHTML=`
      <td>${e}</td>
      <td>$${r}</td>
      <td>${d}</td>
      <td>
         
          <a href="#" data-id="${i}" class="borrar-item text-2xl">\xD7</a>
      </td>
      
    `,c.appendChild(o)}}function g(t){for(;t.firstChild;)t.removeChild(t.firstChild)}function y(t){if(!document.querySelector(".bg-red-100")){const e=document.createElement("p");e.classList.add("bg-red-100","border-red-400","text-red-700","px-4","py-3","rounded","max-w-lg","mx-auto","mt-6","text-center"),e.innerHTML=`
            <strong class="font-bold">Error!</strong>
            <span class="block lg:inline">${t}</span>
        `,document.querySelector("#formulario").appendChild(e),setTimeout(()=>{e.remove()},3e3)}}export{h as a,x as b,f as c,g as l,y as m};
