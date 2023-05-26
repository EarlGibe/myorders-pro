const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

function onLoadIndex(){
    document.getElementById("richiediOTPButton").addEventListener("click", function(event){
        event.preventDefault()
    });
}

function onLoadReimpostaPassword(){
    document.getElementById("resetPasswordButton").addEventListener("click", function(event){
        event.preventDefault()
    });
}

function richiediOTP(){

    // check if the username and email are correct

    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;

    const OTPResolution = 10000000;
    var randomOTP = Math.floor( Math.random() * OTPResolution );

    localStorage.setItem('OTP',randomOTP);

    fetch('../reimpostaPassword',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { username: username, email: email, OTP: randomOTP} ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please

        console.log(data);

        if (!data.error) {
            window.location.href = './reimpostaPassword.html';
        } else {
            document.getElementById("warningMessage").textContent=data.error;
        }
        
    })

   
}

function resetPassword(){

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