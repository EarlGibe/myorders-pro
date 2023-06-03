var token = localStorage.getItem("token");
var userId = localStorage.getItem("userId");
var role = localStorage.getItem("role");

function redirect(){
  if(role=="subagente"){
    window.location.href = "../home/index-subagente.html";
  }else{
    window.location.href = "../home/index.html";
  } 
}

fetch('../users/'+userId, {
  method: 'GET',
  headers: {
      'x-access-token': token
  }
})
.then((resp) => resp.json()) // Transform the data into json
.then(function(data) { // Here you get the data to modify as you please
  console.log(data);

  switch(data.role) {
    case "subagente":
        fetch('../subagenti/'+data.role_id, {
          method: 'GET',
          headers: {
              'x-access-token': token
          }
      })
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) { // Here you get the data to modify as you please
          console.log(data);
          var subagente={};
          subagente._id=data._id;
          subagente.anagrafica=data.anagrafica;
          subagente.anagrafica=data.isAgente;
          subagente.listaOrdini=data.listaOrdini;
          subagente.listaClienti=data.listaClienti;
          subagente.listaAziende=data.listaAziende;
        
          localStorage.setItem("subagente",  JSON.stringify(subagente));

      })
      .catch(error => console.error(error)); // If there is any error, you will catch them here
      break;
    case "dipendente":
      fetch('../dipendente/'+data.role_id, {
        method: 'GET',
        headers: {
            'x-access-token': token
        }
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        console.log(data);
        var dipendente={};
        dipendente._id=data._id;
        dipendente.anagrafica=data.anagrafica;
      
        localStorage.setItem("dipendente",  JSON.stringify(dipendente));

    })
    .catch(error => console.error(error)); // If there is any error, you will catch them here
      break;
    case "tecnico":
        // code block
        break;
    default:
      // code block
  }
})
.catch(error => console.error(error)); // If there is any error, you will catch them here

function logout(){
  localStorage.clear();
  window.location.href="../"
}