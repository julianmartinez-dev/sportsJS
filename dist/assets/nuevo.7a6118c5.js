import{v as s,m as i}from"./Interface.d5aec304.js";import{n as d}from"./API.47651970.js";(function(){document.querySelector("#formulario").addEventListener("submit",e);function e(r){r.preventDefault();const t=document.querySelector("#producto").value,c=document.querySelector("#marca").value,u=document.querySelector("#color").value,a=document.querySelector("#categoria").value,n=document.querySelector("#precio").value,l=document.querySelector("#genero").value,m=document.querySelector("#imagen").value,o={producto:t,marca:c,color:u,categoria:a,precio:n,genero:l,imagen:m};s(o)?d(o):i("Todos los campos son obligatorios")}})();