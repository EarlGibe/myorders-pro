document.getElementById("loginButton").addEventListener("click", function(event){
    event.preventDefault()
  });

/**
 * This variable stores the logged in user
 */
var loggedUser = {};

/**
 * This function is called when login button is pressed.
 * Note that this does not perform an actual authentication of the user.
 * A student is loaded given the specified email,
 * if it exists, the studentId is used in future calls.
 */
function login()
{
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
        loggedUser.token = data.token;
        loggedUser.username = data.username;
        loggedUser.id = data.id;
        loggedUser.isActive=data.isActive;
        loggedUser.self = data.self;
        // loggedUser.id = loggedUser.self.substring(loggedUser.self.lastIndexOf('/') + 1);
        document.getElementById("loggedUser").textContent = loggedUser.username+" "+loggedUser.id+" "+loggedUser.token;
        loadInfoUtente();
        return;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here

};

/**
 * This function refresh the list of bookLendings.
 * It only load bookLendings given the logged in student.
 * It is called every time a book is taken of when the user login.
 */
function loadInfoUtente() {

    const sp = document.getElementById('loggedUser'); // Get the list where we will place our lendings

    sp.innerHTML = '';

    fetch('../users/' + loggedUser.id,{
        method: 'GET',
        headers: {'x-access-token': loggedUser.token}
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        
        console.log(data);

        sp.textContent=data.username;

        if(data.isActive){
            window.location.href = "../home.html";
        }else{
            window.location.href = "../activeAccount.html";
        }

        
    })
    .catch( error => console.error(error) );// If there is any error you will catch them here
    
}