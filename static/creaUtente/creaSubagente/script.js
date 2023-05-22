var token=localStorage.getItem("token")
var userId=localStorage.getItem("userId")

function getData(){
    getOptionsClienti();
    getOptionsAziende();
}

// Funzione per ottenere le opzioni dei clienti dal server
function getOptionsClienti() {
    // Esegui una richiesta GET al server
    fetch('/clienti', {
      headers: {
        'x-access-token': token
      }
    })
      .then(response => response.json())
      .then(data => {
        // Elabora i dati ottenuti dal server e aggiungi le opzioni dei clienti alla select
        const listaClientiDiv = document.getElementById('listaClienti');
        data.forEach(cliente => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = cliente._id;
            checkbox.name = 'listaClienti';
            checkbox.value = cliente._id;

            const label = document.createElement('label');
            label.htmlFor = cliente._id;
            label.textContent = cliente.anagrafica.nome; // Personalizza il testo dell'opzione come preferisci

            listaClientiDiv.appendChild(checkbox);
            listaClientiDiv.appendChild(label);
            listaClientiDiv.appendChild(document.createElement('br'));
        });
      })
      .catch(error => {
        console.error('Si è verificato un errore:', error);
      });
  }
  
  // Funzione per ottenere le opzioni delle aziende dal server
function getOptionsAziende() {
    // Esegui una richiesta GET al server
    fetch('/aziende', {
      headers: {
        'x-access-token': token
      }
    })
      .then(response => response.json())
      .then(data => {
        // Elabora i dati ottenuti dal server e aggiungi le opzioni delle aziende alla select
        const listaAziendeDiv = document.getElementById('listaAziende');
        data.forEach(azienda => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = azienda._id;
            checkbox.name = 'listaAziende';
            checkbox.value = azienda._id;

            const label = document.createElement('label');
            label.htmlFor = azienda._id;
            label.textContent = azienda.dati.nome; // Personalizza il testo dell'opzione come preferisci

            listaAziendeDiv.appendChild(checkbox);
            listaAziendeDiv.appendChild(label);
            listaAziendeDiv.appendChild(document.createElement('br'));
        });
      })
      .catch(error => {
        console.error('Si è verificato un errore:', error);
      });
  }

  function salvaSubagente() {

    document.getElementById("subagenteForm").addEventListener("click", function(event){
        event.preventDefault()
      });

    // Ottenere i valori dei campi del modulo
    const nome = document.getElementById('nome').value;
    const cognome = document.getElementById('cognome').value;
    const codiceFiscale = document.getElementById('codiceFiscale').value;
    const residenza = document.getElementById('residenza').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const ragioneSociale = document.getElementById('ragioneSociale').value;
    const pIVA = document.getElementById('pIVA').value;
    const sede = document.getElementById('sede').value;
    const codSDI = document.getElementById('codSDI').value;
    const pec = document.getElementById('pec').value;
    
    const listaClienti = [];
    const listaAziende = [];
    
    // Ottenere i valori selezionati per i clienti
    const clientiCheckbox = document.querySelectorAll('input[name="listaClienti"]:checked');
    clientiCheckbox.forEach((checkbox) => {
      listaClienti.push(checkbox.value);
    });
    
    // Ottenere i valori selezionati per le aziende
    const aziendeCheckbox = document.querySelectorAll('input[name="listaAziende"]:checked');
    aziendeCheckbox.forEach((checkbox) => {
      listaAziende.push(checkbox.value);
    });

    // Ottenere i valori selezionati per vedere se è un agente
    const isAgenteCheckbox = document.getElementById('isAgenteCheckbox').checked;
    
    // Creare l'oggetto anagrafica con i valori raccolti
    const anagrafica = {
      nome: nome,
      cognome: cognome,
      codiceFiscale: codiceFiscale,
      residenza: residenza,
      telefono: telefono,
      email: email,
      ragioneSociale: ragioneSociale,
      pIVA: pIVA,
      sede: sede,
      codSDI: codSDI,
      pec: pec
    };
    
    // Creare l'oggetto dati da inviare nella richiesta POST
    const data = {
      anagrafica: anagrafica,
      isAgente:isAgenteCheckbox,
      listaClienti: listaClienti,
      listaAziende: listaAziende
    };
    
    // Effettuare la richiesta POST
    fetch('/subagenti', {
      method: 'POST',
      headers: {
        'x-access-token':token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result); // Gestire la risposta del server

        var subagenteCreated=result.createdsubagente;

        var usernameVar=subagenteCreated.risultato.anagrafica.nome+"_"+subagenteCreated.risultato.anagrafica.cognome;
        var passwordVar=subagenteCreated.risultato.anagrafica.nome+"12345";
        var role_idVar=subagenteCreated.request.id;

        console.log(role_idVar);
        
        console.log(usernameVar);

        // Effettuare la richiesta POST
        fetch('/users', {
          method: 'POST',
          headers: {
            'x-access-token':token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username:usernameVar,
            password:passwordVar,
            role:"subagente",
            role_id:role_idVar,
            status: true,
            isFirstAccess: true
          }
          )
        })
          .then(response => response.json())
          .then(result => {
            console.log(result); // Gestire la risposta del server
            window.location.href="../../home?token="+token+"&id="+userId;
          })
          .catch(error => {
            console.error('Errore durante la richiesta:', error);
          });
        
      })
      .catch(error => {
        console.error('Errore durante la richiesta:', error);
      });
  }
  