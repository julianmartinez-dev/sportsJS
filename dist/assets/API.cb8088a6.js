const a="https://622c19f3087e0e041e0343ba.mockapi.io/productos",c=async o=>{try{await fetch(a,{method:"POST",body:JSON.stringify(o),headers:{"Content-Type":"application/json"}}),window.location.href="./home.html"}catch(t){console.log(t)}},r=async()=>{try{return await(await fetch(a)).json()}catch(o){console.log(o)}},s=async o=>{try{await fetch(`${a}/${o}`,{method:"DELETE"})}catch(t){console.log(t)}},n=async o=>{try{return await(await fetch(`${a}/${o}`)).json()}catch(t){console.log(t)}},i=async o=>{try{await fetch(`${a}/${o.id}`,{method:"PUT",body:JSON.stringify(o),headers:{"Content-type":"application/json"}}),window.location.href="./home.html"}catch(t){console.log(t)}};export{n as a,i as b,s as e,c as n,r as o};
