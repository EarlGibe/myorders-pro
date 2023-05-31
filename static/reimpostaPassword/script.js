//const token = localStorage.getItem("token");
//const userId = localStorage.getItem("userId");

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

    const OTPResolution = 1000000;
    var randomOTP = Math.floor( Math.random() * OTPResolution );

    localStorage.setItem('OTP', randomOTP);
    localStorage.setItem('username', username);

    fetch('../authentications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { username: username, email: email } ),
    })
    .then((resp) => resp.json())
    .then(function(data) { 
        localStorage.setItem('token', data.token);
    });

    var token = localStorage.getItem('token');

    fetch('../reimpostaPassword',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-access-token': token },
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
    var username = localStorage.getItem('username');
    var otpGenerato = localStorage.getItem('OTP');
    var otpInserito = document.getElementById("OTP").value;
    var nuovaPassword = document.getElementById("nuovaPassword").value;
    var confermaPassword = document.getElementById("confermaPassword").value;

    let token = localStorage.getItem('token');

    if(nuovaPassword && confermaPassword){
        fetch('../users/username/' + username ,{
            method: 'GET',
            headers: {
                'x-access-token': token
            },
        })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data) { // Here you get the data to modify as you please
            console.log("Username: ", username);
            
            if(otpInserito == otpGenerato){
                console.log("OTP corretto");

                if(nuovaPassword == confermaPassword){

                    fetch('../users/' + data._id,{
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-access-token': token
                        },
                        body: JSON.stringify({ password: nuovaPassword, isFirstAccess: false })
                    })
                    .then((resp) => resp.json()) // Transform the data into json
                    .then(function(data) { // Here you get the data to modify as you please

                        document.getElementById("warningMessage").textContent="";

                        document.getElementById("returnToLogin").textContent="Password reimpostata correttamente! Tra 3 secondi tornerai alla pagina di login";
                        setTimeout(() => {
                            window.location.href = "../login";
                        }, 3000);
                        
                    })
                    .catch( error => console.error(error) );// If there is any error you will catch them here
                    
                }else{
                    document.getElementById("warningMessage").textContent="Le password non coincidono";
                }
            }else{
                document.getElementById("warningMessage").textContent="OTP non corretto";
            }
            
        })
        .catch( error => console.error(error) );// If there is any error you will catch them here

        
    }else{
        document.getElementById("warningMessage").textContent="Non è possibile lasciare campi vuoti";
    }
    
}