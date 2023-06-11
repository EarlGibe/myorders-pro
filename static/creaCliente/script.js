var token = localStorage.getItem("token");
var userId = localStorage.getItem("userId");
var userData = JSON.parse(localStorage.getItem("userData"));
var role = localStorage.getItem("role");

function loadPage() {
  var emptyItem = document.createElement("option");
  emptyItem.value = "";
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
  emptyItem.value = "";
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
  emptyItem.value = "";
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

function registerCliente() {

  const form = document.getElementById('clienteForm');

  form.addEventListener("click", function (event) {
    event.preventDefault()
  });

  var nome = document.getElementById('nome').value
  var cognome = document.getElementById('cognome').value
  var paese = document.getElementsByName("paese")[0].value;
  var regione = document.getElementsByName("regione")[0].value;
  var provincia = document.getElementsByName("provincia")[0].value;
  var codiceFiscale = document.getElementById('codiceFiscale').value
  var citta=document.getElementById("citta").value;
  var via=document.getElementById("via").value;
  var capZip=document.getElementById("capZip").value;
  var civico=document.getElementById("civico").value;
  var telefono = document.getElementById('telefono').value
  var email = document.getElementById('email').value
  var ragioneSociale = document.getElementById('ragioneSociale').value
  var pIVA = document.getElementById('pIVA').value
  var sede = document.getElementById('sede').value
  var codSDI = document.getElementById('codSDI').value
  var pec = document.getElementById('pec').value

  if(nome!="" && cognome!="" && codiceFiscale!="" &&  paese!="empty" &&  regione!="empty" &&  provincia!="empty" &&  citta!="" && via!="" &&  capZip!="" && telefono!="" &&  email!="" &&  pIVA!="" &&  sede!=""){

  // Raccolgo i dati del cliente
  const clienteData = {
    codiceFiscale: codiceFiscale,
    citta: citta,
    via: via,
    civico: civico,
    capZip: capZip,
    telefono: telefono,
    email: email,
    ragioneSociale: ragioneSociale,
    pIVA: pIVA,
    sede: sede,
    codSDI: codSDI,
    pec: pec
  };

  // Effettuo la richiesta POST per salvare i dati nel database
  fetch('../clienti', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify({
      nome: nome,
      cognome: cognome,
      paese: paese,
      regione: regione,
      provincia: provincia,
      anagrafica: clienteData
    })
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      // Elaboro la risposta del server
      console.log('Dati salvati:', data);

      if (role == "subagente") {
        associaClienteASubagente(data.createdCliente.risultato._id);
      }

      document.getElementById("warning").textContent="";
      document.getElementById("successo").textContent="Cliente inserito con successo. \nSarai reindirizzato a home"
      // Esegui altre azioni o reindirizzamento alla pagina desiderata
      setTimeout(function(){window.location.href = '../home'},1500);
    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
  }else{
    document.getElementById("warning").textContent="Campi obbligatori mancanti!";
  }


}

function associaClienteASubagente(clienteId) {
  fetch('../subagenti/addCliente/' + userData._id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify({ cliente: clienteId })
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      // Elaboro la risposta del server
      console.log('Dati salvati:', data);
    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
}

function verificaIndirizzo(){
  document.getElementById("verified").textContent="Verifico..."
  document.getElementById("verified").style.color="black"

  const form = document.getElementById('clienteForm');
  form.addEventListener("click", function (event) {
    event.preventDefault()
  });

  var paese=document.getElementById("paeseCreaCliente").value;
  var provincia=document.getElementById("provinciaCreaCliente").value;
  var regione=document.getElementById("regioneCreaCliente").value;
  var citta=document.getElementById("citta").value;
  var via=document.getElementById("via").value;
  var capZip=document.getElementById("capZip").value;
  var civico=document.getElementById("civico").value;

  if(paese!="empty" &&  regione!="empty" &&  provincia!="empty" &&  via!="" &&  capZip!=""){

    var address={
      civico:civico,
      via:via,
      citta:citta,
      provincia:provincia,
      regione:regione,
      capZip:capZip,
      nazione:paese,
    }
  
    fetch('../geolocalization/adv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(address)
    })
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) { // Here you get the data to modify as you please
        // Elaboro la risposta del server
        console.log('Dati salvati:', data);
  
        if(data.field!="empty"){
          document.getElementById("verified").textContent="Verificato"
          document.getElementById("verified").style.color="darkgreen"
        }else{
          document.getElementById("verified").textContent="Non trovato"
          document.getElementById("verified").style.color="darkred"
        }
      })
      .catch(error => {
        console.error('Errore durante la richiesta:', error);
      });
  }else{
    document.getElementById("verified").textContent="Campi obbligatori mancanti"
    document.getElementById("verified").style.color="darkred"
  }
}