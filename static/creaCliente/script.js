var token = localStorage.getItem("token");
var userId = localStorage.getItem("userId");
var userData = JSON.parse(localStorage.getItem("subagente"));
var role=localStorage.getItem("role");


function registerCliente(){

    const form = document.getElementById('clienteForm');

    form.addEventListener("click", function(event){
        event.preventDefault()
      });
  

      // Controllo la completezza dei campi
      //if (form.checkValidity()) {
        // Raccolgo i dati del cliente
        const clienteData = {
          nome: document.getElementById('nome').value,
          cognome: document.getElementById('cognome').value,
          codiceFiscale: document.getElementById('codiceFiscale').value,
          residenza: document.getElementById('residenza').value,
          telefono: document.getElementById('telefono').value,
          email: document.getElementById('email').value,
          ragioneSociale: document.getElementById('ragioneSociale').value,
          pIVA: document.getElementById('pIVA').value,
          sede: document.getElementById('sede').value,
          codSDI: document.getElementById('codSDI').value,
          pec: document.getElementById('pec').value,
        };

        // Effettuo la richiesta POST per salvare i dati nel database
        fetch('../clienti', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          },
          body: JSON.stringify({anagrafica:clienteData})
        })
          .then((resp) => resp.json()) // Transform the data into json
          .then(function(data) { // Here you get the data to modify as you please
            // Elaboro la risposta del server
            console.log('Dati salvati:', data);

            if(role=="subagente"){
              associaClienteASubagente(data.createdCliente.risultato._id);
            }
            // Esegui altre azioni o reindirizzamento alla pagina desiderata
            window.location.href='../home';
          })
          .catch(error => {
            console.error('Errore durante la richiesta:', error);
          });
    
}

function associaClienteASubagente(clienteId){
  fetch('../subagenti/addCliente/'+userData._id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify({cliente:clienteId})
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
      // Elaboro la risposta del server
      console.log('Dati salvati:', data);
    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
}