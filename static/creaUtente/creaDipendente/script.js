var token=localStorage.getItem("token")
var userId=localStorage.getItem("userId")

  function salvaDipendente() {

    document.getElementById("dipendenteForm").addEventListener("click", function(event){
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
    };
    
    // Effettuare la richiesta POST
    fetch('/dipendenti', {
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

        var dipendenteCreated=result.createdDipendente;

        var usernameVar=dipendenteCreated.risultato.anagrafica.nome+"_"+dipendenteCreated.risultato.anagrafica.cognome;
        var passwordVar=dipendenteCreated.risultato.anagrafica.nome+"12345";
        var role_idVar=dipendenteCreated.request.id;

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
            role:"dipendente",
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
  