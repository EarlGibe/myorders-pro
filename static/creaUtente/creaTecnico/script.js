var token = localStorage.getItem("token")
var userId = localStorage.getItem("userId")

function salvaTecnico() {

  document.getElementById("tecnicoForm").addEventListener("click", function (event) {
    event.preventDefault()
  });

  // Ottenere i valori dei campi del modulo
  var codiceFiscale = document.getElementById('codiceFiscale').value;
  var email = document.getElementById('email').value;

  if (codiceFiscale != "" && email != "") {
    // Creare l'oggetto anagrafica con i valori raccolti

    // Effettuare la richiesta POST
    fetch('/tecnici', {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ codiceFiscale: codiceFiscale })
    })
      .then(response => response.json())
      .then(result => {
        console.log(result); // Gestire la risposta del server

        var createdTecnico = result.createdTecnico;

        var usernameVar = email;
        var passwordVar = createdTecnico.risultato.codiceFiscale + "12345";
        var role_idVar = createdTecnico.risultato._id;


        // Effettuare la richiesta POST
        fetch('/users', {
          method: 'POST',
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: usernameVar,
            password: passwordVar,
            email: email,
            role: "tecnico",
            role_id: role_idVar,
          }
          )
        })
          .then(response => response.json())
          .then(result => {
            console.log(result); // Gestire la risposta del server

              document.getElementById("warning").textContent = ""
              document.getElementById("successo").textContent = "Tecnico creato con successo! \n Sarai reindirizzo a home..."

             setTimeout(function(){window.location.href = "../../home"}, 1500);
          })
          .catch(error => {
            console.error('Errore durante la richiesta:', error);
          });

      })
      .catch(error => {
        console.error('Errore durante la richiesta:', error);
      });
  } else {
    document.getElementById("warning").textContent = "Campi obbligatori mancanti!"
  }

}
