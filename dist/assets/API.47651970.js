const a="https://622c19f3087e0e041e0343ba.mockapi.io/productos",c=async o=>{try{await fetch(a,{method:"POST",body:JSON.stringify(o),headers:{"Content-Type":"application/json"}}),window.location.href="./home.html"}catch(t){console.log(t)}},n=async()=>{try{return await(await fetch(a)).json()}catch(o){console.log(o)}},i=async o=>{try{await fetch(`${a}/${o}`,{method:"DELETE"})}catch(t){console.log(t)}},d=async o=>{try{return await(await fetch(`${a}/${o}`)).json()}catch(t){console.log(t)}},l=async o=>{try{await fetch(`${a}/${o.id}`,{method:"PUT",body:JSON.stringify(o),headers:{"Content-type":"application/json"}}),window.location.href="./home.html"}catch(t){console.log(t)}};async function h(o,t){const s=`${a}?${o}=${t}`;return await(await fetch(s)).json()}export{d as a,l as b,i as e,h as f,c as n,n as o};
