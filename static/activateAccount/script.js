document.getElementById("changePasswordButton").addEventListener("click", function(event){
    event.preventDefault()
  });

  var queryString = window.location.search;
  var parametri = new URLSearchParams(queryString);
  var token = parametri.get("token");
  var userId = parametri.get("id");

  console.log("userId: "+userId);

function changePassword(){

    var nuova_password = document.getElementById("nuova_password").value;
    var conferma_password = document.getElementById("conferma_password").value;

    console.log(nuova_password);
    if(nuova_password==conferma_password){

        fetch('../users/' + userId,{
            method: 'GET',
            headers: {'x-access-token': token}
        })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data) { // Here you get the data to modify as you please
            
            fetch('../users/'+userId,{
                method: 'PUT',
                headers: {'x-access-token': token},
                body: JSON.stringify( { password: nuova_password } )
            }).then((resp) => resp.json()) // Transform the data into json
            .then(function(data) { // Here you get the data to modify as you please
                
                window.location.href = "../home";
                
            })
            .catch( error => console.error(error) );// If there is any error you will catch them here
            
            
        })
        .catch( error => console.error(error) );// If there is any error you will catch them here
    
        
    }else{
        document.getElementById("warningMessage").value="Le password non coincidono";
    }

    
}