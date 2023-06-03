document.getElementById("loginButton").addEventListener("click", function(event){
    event.preventDefault()
  });

/**
 * This variable stores the logged in user
 */


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
            redirect(data.id,data.token);
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
function redirect(id,token) {

    fetch('../users/' + id,{
        method: 'GET',
        headers: {'x-access-token': token}
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        
        localStorage.setItem('token', token);
        localStorage.setItem('userId', id);
        localStorage.setItem('roleId', data.role_id);
        localStorage.setItem('role', data.role);

        console.log(data);
        
        if(!data.isFirstAccess){
                window.location.href = "../home";
        }else{
            window.location.href = "../activateAccount/index.html";
        }
        
    })
    .catch( error => console.error(error) );    // If there is any error you will catch them here
}

