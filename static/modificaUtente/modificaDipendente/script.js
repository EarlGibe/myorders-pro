var token=localStorage.getItem("token")
var dipendenteId=JSON.parse(localStorage.getItem("dipendente"))._id;
var userId=localStorage.getItem("userId");

function getData(){
    riempiCampi();

}

  function riempiCampi(){
    // Effettuare la richiesta POST
    fetch('/dipedenti/'+dipendenteId, {
      method: 'GET',
      headers: {
        'x-access-token':token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        document.getElementById('nome').value=result.anagrafica.nome;
        document.getElementById('cognome').value=result.anagrafica.cognome;
        document.getElementById('codiceFiscale').value=result.anagrafica.codiceFiscale;
        document.getElementById('residenza').value=result.anagrafica.residenza;
        document.getElementById('telefono').value=result.anagrafica.telefono;
        document.getElementById('email').value=result.anagrafica.email;
        document.getElementById('ragioneSociale').value=result.anagrafica.ragioneSociale;
        document.getElementById('pIVA').value=result.anagrafica.pIVA;
        document.getElementById('sede').value=result.anagrafica.sede;
        document.getElementById('codSDI').value=result.anagrafica.codSDI;
        document.getElementById('pec').value=result.anagrafica.pec;
      });
  }

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
    fetch('/dipendenti/'+dipendenteId, {
      method: 'PUT',
      headers: {
        'x-access-token':token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result); // Gestire la risposta del server       
        window.location.href="../../home/index.html?token="+token+"&id="+userId; 
      })
      .catch(error => {
        console.error('Errore durante la richiesta:', error);
      });
  }
  