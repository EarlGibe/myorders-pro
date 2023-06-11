var token = localStorage.getItem("token")
var userId = localStorage.getItem("userId")

function salvaDipendente() {

  document.getElementById("dipendenteForm").addEventListener("click", function (event) {
    event.preventDefault()
  });

  // Ottenere i valori dei campi del modulo
  const nome = document.getElementById('nome').value;
  const cognome = document.getElementById('cognome').value;
  const codiceFiscale = document.getElementById('codiceFiscale').value;
  const residenza = document.getElementById('residenza').value;
  const telefono = document.getElementById('telefono').value;
  const email = document.getElementById('email').value;
  const pIVA = document.getElementById('pIVA').value;
  const pec = document.getElementById('pec').value;

  if (nome != "" && cognome != "" && codiceFiscale != "" && telefono != "" && email != "") {
    // Creare l'oggetto anagrafica con i valori raccolti
    const anagrafica = {
      codiceFiscale: codiceFiscale,
      residenza: residenza,
      telefono: telefono,
      email: email,
      pIVA: pIVA,
      pec: pec
    };


    // Effettuare la richiesta POST
    fetch('/dipendenti', {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome: nome, cognome: cognome, anagrafica: anagrafica })
    })
      .then(response => response.json())
      .then(result => {
        console.log(result); // Gestire la risposta del server

        var createdDipendente = result.createdDipendente;

        var usernameVar = createdDipendente.risultato.nome + "_" + createdDipendente.risultato.cognome;
        var passwordVar = createdDipendente.risultato.nome + "12345";
        var role_idVar = createdDipendente.request.id;


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
            role: "dipendente",
            role_id: role_idVar,
          }
          )
        })
          .then(response => response.json())
          .then(result => {
            console.log(result); // Gestire la risposta del server

              document.getElementById("warning").textContent = ""
              document.getElementById("successo").textContent = "Dipendente creato con successo! \n Sarai reindirizzo a home..."

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
