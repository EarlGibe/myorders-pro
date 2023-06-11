var token = localStorage.getItem("token")
var userData = JSON.parse(localStorage.getItem("userData"));
var userId = localStorage.getItem("userId");

function loadPage() {
  riempiCampi();

  document.getElementById("subagenteForm").addEventListener("click", function (event) {
    event.preventDefault()
  });
}

function riempiCampi() {
  // Effettuare la richiesta POST
  fetch('/subagenti/' + userData._id, {
    method: 'GET',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => {
      if (result.nome) document.getElementById('nome').value = result.nome;
      if (result.cognome) document.getElementById('cognome').value = result.cognome;
      if (result.anagrafica.codiceFiscale) document.getElementById('codiceFiscale').value = result.anagrafica.codiceFiscale;
      if (result.anagrafica.residenza) document.getElementById('residenza').value = result.anagrafica.residenza;
      if (result.anagrafica.telefono) document.getElementById('telefono').value = result.anagrafica.telefono;
      if (result.anagrafica.email) document.getElementById('email').value = result.anagrafica.email;
      if (result.anagrafica.ragioneSociale) document.getElementById('pIVA').value = result.anagrafica.ragioneSociale;
      if (result.anagrafica.pIVA) document.getElementById('pIVA').value = result.anagrafica.pIVA;
      if (result.anagrafica.sede) document.getElementById('pIVA').value = result.anagrafica.sede;
      if (result.anagrafica.codSDI) document.getElementById('pIVA').value = result.anagrafica.codSDI;
      if (result.anagrafica.pec) document.getElementById('pec').value = result.anagrafica.pec;

    });
}

function salvaSubagente() {

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

  if (nome != "" && cognome != "" && residenza != "" && codiceFiscale != "" && telefono != "" && email != "" && pIVA != "") {

    // Creare l'oggetto anagrafica con i valori raccolti
    const anagrafica = {
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
      nome: nome,
      cognome: cognome,
      anagrafica: anagrafica
    };

    // Effettuare la richiesta POST
    fetch('/subagenti/' + userData._id, {
      method: 'PUT',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result); // Gestire la risposta del server       
        window.location.href = "/home/index.html";
      })
      .catch(error => {
        console.error('Errore durante la richiesta:', error);
      });
  } else {
    document.getElementById("warning").textContent = "Campi obbligatori mancanti!"
  }
}

function redirectBack(){
  window.location.href="/home/index.html"
}