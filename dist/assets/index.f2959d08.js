const A=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerpolicy&&(a.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?a.credentials="include":e.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(e){if(e.ep)return;e.ep=!0;const a=r(e);fetch(e.href,a)}};A();const d=function(t){this.elements=t,this.index=0};d.prototype={hasNext:function(){return this.index<this.elements.length},next:function(){return this.elements[this.index++]},reset:function(){return this.index=0}};let u=!0;const g=document.querySelector("#carrito"),L=document.querySelector("#resultado");function S(){u=!u;const t=document.querySelector("html");u?t.setAttribute("data-theme","dark"):t.setAttribute("data-theme","bumblebee")}function v(t,o){const{id:r,producto:n,marca:e,categoria:a,imagen:i,precio:s,genero:w,color:C}=t,l=document.createElement("div");l.className="card max-w-96 bg-base-100 shadow-md hover:shadow-yellow-300 borderer mx-auto",l.innerHTML=`
  <figure class="pt-4"><img src=${i} alt="imagen ropa"></figure>
  <div class="card-body">
    <h2 class="card-title">${e} ${n}</h2>
    <div class="badge badge-secondary py-4 text-lg precio">$${s}</div>
    
    <p class=" font-bold">Color: <span class=" font-semibold">${C}</span> </p>
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
      <div class="badge badge-outline">${a}</div> 
      <div class="badge badge-outline">${w}</div>
    </div>
    <label for="my-modal" class="btn modal-button btn-warning mt-4 agregar-carrito" data-id="${r}" id="agregar-carrito">Agregar al carrito</label>


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
  `,l.addEventListener("click",o),L.appendChild(l)}function y(t){m(g);const o=new d(t);for(;o.hasNext();){const{titulo:r,precio:n,cantidad:e,id:a}=o.next(),i=document.createElement("tr");i.classList.add("hover"),i.innerHTML=`
      <td>${r}</td>
      <td>$${n}</td>
      <td>${e}</td>
      <td>
         
          <a href="#" data-id="${a}" class="borrar-item text-2xl">\xD7</a>
      </td>
      
    `,g.appendChild(i)}}function m(t){for(;t.firstChild;)t.removeChild(t.firstChild)}let c=[];const q=document.querySelector("#dark-mode"),b=document.querySelector("#carrito"),k=document.querySelector("#subtotal"),h=document.querySelectorAll(".cantidad-articulos"),E=document.querySelector("#vaciar-carrito"),N=document.querySelector("#filtros"),P=document.querySelector("#resultado"),M="https://622c19f3087e0e041e0343ba.mockapi.io/productos";document.addEventListener("DOMContentLoaded",()=>{T(),x()});function T(){q.addEventListener("click",S),b.addEventListener("click",D),N.addEventListener("click",R),E.addEventListener("click",()=>{c=[],m(b),f(),p()})}const x=async()=>{try{const o=await(await fetch(M)).json(),r=new d(o);for(;r.hasNext();){const n=r.next();v(n,$)}}catch(t){console.log(t)}};function $(t){if(t.target.classList.contains("agregar-carrito")){const o=t.target.parentElement;G(o),p()}}function D(t){if(t.target.classList.contains("borrar-item")){const o=t.target.getAttribute("data-id");c=c.filter(r=>r.id!==o),y(c),f(),p()}}function G(t){const o=t.querySelector("h2").textContent,r=parseInt(t.querySelector("div .precio").textContent.slice(1)),n=t.querySelector("label").getAttribute("data-id"),e={titulo:o,precio:r,id:n,cantidad:1};c.some(i=>i.id===e.id)?c=[...c.map(s=>(s.id===e.id&&s.cantidad++,s))]:c=[...c,e],y(c),f()}function f(){let t=c.reduce((o,r)=>o+r.cantidad,0);h[0].textContent=t,h[1].textContent=`Cantidad de articulos: ${t}`}function p(){let t=c.reduce((o,r)=>o+r.precio*r.cantidad,0);k.innerText=`Subtotal: $${t}`}async function R(t){if(t.target.getAttribute("data-filtro")!==null){const o=t.target.getAttribute("data-filtro"),r=t.target.textContent;if(m(P),o==="all"){x(),document.querySelector("#titulo-lista").textContent="";return}const n=await O(o,r);document.querySelector("#titulo-lista").textContent=`Filtro: ${r}`;const e=new d(n);for(;e.hasNext();){const a=e.next();v(a,$)}}}async function O(t,o){const r=`https://622c19f3087e0e041e0343ba.mockapi.io/productos?${t}=${o}`;return await(await fetch(r)).json()}
