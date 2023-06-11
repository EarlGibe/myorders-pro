var token = localStorage.getItem("token");
var userId = localStorage.getItem("userId");
var roleId = localStorage.getItem("roleId");


fetch('../dipendenti/'+roleId, {
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
    
        localStorage.setItem("userData",  JSON.stringify(dipendente));
    })
    .catch(error => console.error(error)); // If there is any error, you will catch them here
  
if(!(localStorage.getItem("isAgente"))){
    document.getElementById("changeMode").style.display="none";
} 
    
function logout(){
  localStorage.clear();
  window.location.href="../"
}