var token = localStorage.getItem("token");
var userId = localStorage.getItem("userId");
var roleId = localStorage.getItem("roleId");


fetch('../tecnici/'+roleId, {
        method: 'GET',
        headers: {
            'x-access-token': token
        }
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        console.log(data);

        var tecnico={};
        tecnico._id=data._id;
        tecnico.codiceFiscale=data.codiceFiscale;
    
        localStorage.setItem("userData",  JSON.stringify(tecnico));
    })
    .catch(error => console.error(error)); // If there is any error, you will catch them here
     
function logout(){
  localStorage.clear();
  window.location.href="../"
}