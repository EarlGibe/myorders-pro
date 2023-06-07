var token = localStorage.getItem("token")
const urlParams = new URLSearchParams(window.location.search);
const clienteId = urlParams.get('clienteId');

function loadPage() {

  riempiCampi();
  

  document.getElementById("clienteForm").addEventListener("click", function (event) {
    event.preventDefault()
  });
}

function abilitaModifica(){
  selezionaPaese();
  document.getElementById("regioneCreaCliente").textContent = ""
  document.getElementById("provinciaCreaCliente").textContent = ""
}

function selezionaPaese(){
  document.getElementById("paeseCreaCliente").textContent = ""

  var emptyItem = document.createElement("option");
  emptyItem.value = "empty";
  emptyItem.textContent = "";
  document.getElementById("paeseCreaCliente").appendChild(emptyItem);

  fetch('../regioniPerPaese/paesi', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      // Elaboro la risposta del server
      Array.from(data).forEach(paese => {
        var paeseItem = document.createElement("option");
        paeseItem.value = paese;
        paeseItem.textContent = paese;
        document.getElementById("paeseCreaCliente").appendChild(paeseItem);
      })
    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
}

function selezionaRegione() {

  var paese = document.getElementById("paeseCreaCliente").value

  document.getElementById("regioneCreaCliente").textContent = ""

  var emptyItem = document.createElement("option");
  emptyItem.value = "empty";
  emptyItem.textContent = "";
  document.getElementById("regioneCreaCliente").appendChild(emptyItem);

  fetch('../regioniPerPaese/paesi/' + paese + "/regioni", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      // Elaboro la risposta del server
      Array.from(data).forEach(regione => {
        var regioneItem = document.createElement("option");
        regioneItem.value = regione;
        regioneItem.textContent = regione;
        document.getElementById("regioneCreaCliente").appendChild(regioneItem);
      })
    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
}

function selezionaProvincia() {
  document.getElementById("provinciaCreaCliente").textContent = ""

  var emptyItem = document.createElement("option");
  emptyItem.value = "empty";
  emptyItem.textContent = "";
  document.getElementById("provinciaCreaCliente").appendChild(emptyItem);

  var paese = document.getElementById("paeseCreaCliente").value
  var regione = document.getElementById("regioneCreaCliente").value

  fetch('../regioniPerPaese/paesi/' + paese + "/regioni/"+regione+"/province", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      // Elaboro la risposta del server
      var province=data.map(obj=>obj.province).flat()
      province.forEach(provincia => {
        var provinciaItem = document.createElement("option");
        provinciaItem.value = provincia;
        provinciaItem.textContent = provincia;
        document.getElementById("provinciaCreaCliente").appendChild(provinciaItem);
      })
    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
}

function riempiCampi() {
  // Effettuare la richiesta POST
  fetch('/clienti/' + clienteId, {
    method: 'GET',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => {
      console.log(result)
      if (result.nome) document.getElementById('nome').value = result.nome;
      if (result.cognome) document.getElementById('cognome').value = result.cognome;
      if (result.anagrafica.codiceFiscale) document.getElementById('codiceFiscale').value = result.anagrafica.codiceFiscale;
      if (result.paese){
        var emptyItem = document.createElement("option");
        emptyItem.value = result.paese;
        emptyItem.textContent = result.paese;
        document.getElementById("paeseCreaCliente").appendChild(emptyItem);
      } 
      if (result.regione) {
        var emptyItem = document.createElement("option");
        emptyItem.value = result.regione;
        emptyItem.textContent = result.regione;
        document.getElementById("regioneCreaCliente").appendChild(emptyItem);
      } 
      if (result.provincia){
        var emptyItem = document.createElement("option");
        emptyItem.value = result.provincia;
        emptyItem.textContent = result.provincia;
        document.getElementById("provinciaCreaCliente").appendChild(emptyItem);
      } 
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

function salvaCliente() {

  // Ottenere i valori dei campi del modulo
    var nome = document.getElementById('nome').value ;
    var cognome = document.getElementById('cognome').value ;
    var codiceFiscale = document.getElementById('codiceFiscale').value ;
    var paese = document.getElementById('paeseCreaCliente').value ;
    var regione = document.getElementById('regioneCreaCliente').value ;
    var provincia = document.getElementById('provinciaCreaCliente').value;
    var residenza = document.getElementById('residenza').valuea;
    var telefono = document.getElementById('telefono').value;
    var email = document.getElementById('email').value ;
    var ragioneSociale = document.getElementById('pIVA').value;
    var pIVA = document.getElementById('pIVA').value;
    var sede = document.getElementById('pIVA').value;
    var cosSDI = document.getElementById('pIVA').value;
    var pec = document.getElementById('pec').value;

  if (nome != "" && cognome != "" && paese != "empty" && regione != "empty" && provincia != "empty" && residenza != "" && codiceFiscale != "" && telefono != "" && email != "" && pIVA != "") {

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
      paese: paese,
      regione: regione,
      provincia: provincia,
      anagrafica: anagrafica
    };

    // Effettuare la richiesta POST
    fetch('/clienti/' + clienteId, {
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