document.getElementById("loginButton").addEventListener("click", function(event){
    event.preventDefault()
  });

/**
 * This variable stores the logged in user
 */
var loggedUser = {};

/**
 * This functions is fired when the user clicks the login button.
 * It takes the cretentials, check it on database,
 * generate a token and save it on a global variable.
 * Then call redirect function.
 */
function login() {
    console.log("login()");

    //get the form object
    var username = document.getElementById("loginUsername").value;
    var password = document.getElementById("loginPassword").value;
    // console.log(email);

    fetch('../authentications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { username: username, password: password } ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        //console.log(data);

        if(data.success){
            loggedUser.token = data.token;
            loggedUser.username = data.username;
            loggedUser.id = data.id;
            loggedUser.isActive=data.isActive;
            loggedUser.self = data.self;
            // loggedUser.id = loggedUser.self.substring(loggedUser.self.lastIndexOf('/') + 1);
            redirect();
        
        }else{
            document.getElementById("warningMessage").textContent="Username o password errati";
        }
        
        
        return;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here

};

/**
 * This functions checks the token and redirect the user to:
 * home: if the account is activate yet.
 * activateAccount: if not.
 */
function redirect() {

    fetch('../users/' + loggedUser.id,{
        method: 'GET',
        headers: {'x-access-token': loggedUser.token}
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        
        console.log(data);
        
        if(!data.isFirstAccess){
            window.location.href = "../home?token="+loggedUser.token+"&id="+loggedUser.id;
        }else{
            window.location.href = "../activateAccount/index.html?token="+loggedUser.token+"&id="+loggedUser.id;
        }
        
    })
    .catch( error => console.error(error) );// If there is any error you will catch them here
}

