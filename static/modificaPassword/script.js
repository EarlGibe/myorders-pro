const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

function changePassword(){

    document.getElementById("cambiaPasswordForm").addEventListener("click", function(event){
        event.preventDefault()
      });

    var vecchia_password=document.getElementById("vecchia_password").value;
    var nuova_password = document.getElementById("nuova_password").value;
    var conferma_password = document.getElementById("conferma_password").value;

    if(nuova_password && conferma_password && vecchia_password){
        fetch('../users/'+userId,{
            method: 'GET',
            headers: {
                'x-access-token': token
            },
        })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data) { // Here you get the data to modify as you please
            console.log(data.password)
            if(data.password==vecchia_password){
                if(nuova_password!=vecchia_password){
                    if(nuova_password==conferma_password){
                        console.log(nuova_password);
                
                 
                        fetch('../users/'+userId,{
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'x-access-token': token
                            },
                            body: JSON.stringify({ password: nuova_password, isFirstAccess: false })
                        })
                        .then((resp) => resp.json()) // Transform the data into json
                        .then(function(data) { // Here you get the data to modify as you please
                            
                            window.location.href = "../home";
                            
                        })
                        .catch( error => console.error(error) );// If there is any error you will catch them here
                        
                    }else{
                        document.getElementById("warningMessage").textContent="Le password non coincidono";
                    }
                }else{
                    document.getElementById("warningMessage").textContent="La nuova password non può essere uguale a quella vecchia";
                }
                
            }else{
                document.getElementById("warningMessage").textContent="La vecchia password non è corretta";
            }
            
        })
        .catch( error => console.error(error) );// If there is any error you will catch them here

        
    }else{
        document.getElementById("warningMessage").textContent="Non è possibile lasciare campi vuoti";
    }
    
}