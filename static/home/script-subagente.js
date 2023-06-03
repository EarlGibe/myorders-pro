var token = localStorage.getItem("token");
var userId = localStorage.getItem("userId");
var roleId = localStorage.getItem("roleId");


fetch('../subagenti/'+roleId, {
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
        subagente.isAgente=data.isAgente;
        subagente.listaOrdini=data.listaOrdini;
        subagente.listaClienti=data.listaClienti;
        subagente.listaAziende=data.listaAziende;
    
        localStorage.setItem("subagente",  JSON.stringify(subagente));
    })
    .catch(error => console.error(error)); // If there is any error, you will catch them here
     
function logout(){
  localStorage.clear();
  window.location.href="../"
}