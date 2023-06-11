var token = localStorage.getItem("token")
var userId = localStorage.getItem("userId")

function getData() {
  //getAllClienti();
  getOptionsAziende();
  selezionaPaese()
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
        label.textContent = azienda.nome; // Personalizza il testo dell'opzione come preferisci

        var spanSliderRound = document.createElement("span");
        spanSliderRound.className = "slider round"

        var labelContainer = document.createElement("label");
        labelContainer.className = "switch"

        labelContainer.appendChild(checkbox);
        labelContainer.appendChild(spanSliderRound)

        var spanContainer=document.createElement("span");
        spanContainer.className="aziendaItem";

        spanContainer.appendChild(label);
        spanContainer.appendChild(labelContainer);

        listaAziendeDiv.appendChild(spanContainer);
        listaAziendeDiv.appendChild(document.createElement('br'));
      });
    })
    .catch(error => {
      console.error('Si è verificato un errore:', error);
    });
}

/**
 * 
 * NOT USED
 */
/*
function getAllClienti() {
  fetch('../../clienti', {
    method: 'GET',
    headers: {
      'x-access-token': token
    }
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      console.log(data);

        Array.from(data).forEach(cliente=>{
            populateClienti(cliente)
        })
      
        
    })
    .catch(error => console.error(error)); // If there is any error, you will catch them here
}
*/

function selezionaPaese() {
  var emptyItem = document.createElement("option");
  emptyItem.value = "empty";
  emptyItem.textContent = "";


  document.getElementById("paeseSearchbar").appendChild(emptyItem);


  fetch('../../regioniPerPaese/paesi', {
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
        document.getElementById("paeseSearchbar").appendChild(paeseItem);
      })
    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
}

function selezionaRegione() {

  var paese = document.getElementById("paeseSearchbar").value;

  document.getElementById("regioneSearchbar").textContent = ""


  var emptyItem = document.createElement("option");
  emptyItem.value = "empty";
  emptyItem.textContent = "";

  document.getElementById("regioneSearchbar").appendChild(emptyItem);


  fetch('../../regioniPerPaese/paesi/' + paese + "/regioni", {
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

        document.getElementById("regioneSearchbar").appendChild(regioneItem);


      })
    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
}

function selezionaProvincia() {

  document.getElementById("provinciaSearchbar").textContent = ""

  var emptyItem = document.createElement("option");
  emptyItem.value = "empty";
  emptyItem.textContent = "";

  document.getElementById("provinciaSearchbar").appendChild(emptyItem);

  var paese = document.getElementById("paeseSearchbar").value
  var regione = document.getElementById("regioneSearchbar").value

  fetch('../../regioniPerPaese/paesi/' + paese + "/regioni/" + regione + "/province", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      // Elaboro la risposta del server
      var province = data.map(obj => obj.province).flat()
      province.forEach(provincia => {
        var provinciaItem = document.createElement("option");
        provinciaItem.value = provincia;
        provinciaItem.textContent = provincia;

        document.getElementById("provinciaSearchbar").appendChild(provinciaItem);

      })
    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
}

function handleSearch() {

  var paese = document.getElementById("paeseSearchbar").value;
  var regione = document.getElementById("regioneSearchbar").value;
  var provincia = document.getElementById("provinciaSearchbar").value;

  var query = "empty"

  document.getElementById("clientiList").textContent = "";

  return fetch('../../clienti/filtered/queryNome/' + query + '/paesi/' + paese + '/regioni/' + regione + '/province/' + provincia, {
    method: 'GET',
    headers: {
      'x-access-token': token
    }
  })
    .then(resp => resp.json())
    .then(function (data) {
      console.log(data);

      var clienti = [];

      data.forEach(cliente => {
        clienti.push(cliente._id)
      })

      return clienti;

    })
    .catch(error => console.error(error));

}

/**
 * 
 * NOT USED
 */
/*
function populateClienti(cliente) {
    var clientiList = document.getElementById('clientiList');
 
    const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = cliente._id;
          checkbox.name = 'listaClienti';
          checkbox.value = cliente._id;

          const label = document.createElement('label');
          label.htmlFor = cliente._id;
          label.textContent = cliente.nome+" "+cliente.cognome; // Personalizza il testo dell'opzione come preferisci

          var span=document.createElement("span");
          span.className="clienteItem"
          span.appendChild(label);
          span.appendChild(checkbox);
          clientiList.appendChild(span);
          clientiList.appendChild(document.createElement('br'));
 
}
*/

async function salvaSubagente() {

  document.getElementById("subagenteForm").addEventListener("click", function (event) {
    event.preventDefault()
  });

  // Ottenere i valori dei campi del modulo
  const nome = document.getElementById('nome').value;
  const cognome = document.getElementById('cognome').value;
  const paese = document.getElementById("paeseSearchbar").value;
  const regione = document.getElementById("regioneSearchbar").value;
  const provincia = document.getElementById("provinciaSearchbar").value;
  const codiceFiscale = document.getElementById('codiceFiscale').value;
  const residenza = document.getElementById('residenza').value;
  const telefono = document.getElementById('telefono').value;
  const email = document.getElementById('email').value;
  const ragioneSociale = document.getElementById('ragioneSociale').value;
  const pIVA = document.getElementById('pIVA').value;
  const sede = document.getElementById('sede').value;
  const codSDI = document.getElementById('codSDI').value;
  const pec = document.getElementById('pec').value;


  if (nome != "" && nome != "" && nome != "" && nome != "" && nome != "" && nome != "" && paese != "empty") {

    var listaClienti = await handleSearch();
    const listaAziende = [];

    // Ottenere i valori selezionati per le aziende
    const aziendeCheckbox = document.querySelectorAll('input[name="listaAziende"]:checked');
    aziendeCheckbox.forEach((checkbox) => {
      listaAziende.push(checkbox.value);
    });

    // Ottenere i valori selezionati per vedere se è un agente
    const isAgenteCheckbox = document.getElementById('isAgenteCheckbox').checked;

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
      anagrafica: anagrafica,
      isAgente: isAgenteCheckbox,
      listaClienti: listaClienti,
      listaAziende: listaAziende
    };

    // Effettuare la richiesta POST
    fetch('/subagenti', {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result); // Gestire la risposta del server

        var subagenteCreated = result.createdsubagente;

        var usernameVar = subagenteCreated.risultato.nome + "_" + subagenteCreated.risultato.cognome;
        var passwordVar = subagenteCreated.risultato.nome + "12345";
        var role_idVar = subagenteCreated.request.id;

        console.log(role_idVar);

        console.log(usernameVar);

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
            role: "subagente",
            role_id: role_idVar,
            status: true,
            isFirstAccess: true
          }
          )
        })
          .then(response => response.json())
          .then(result => {
            console.log(result); // Gestire la risposta del server
            document.getElementById("warning").textContent = ""
            document.getElementById("successo").textContent = "Subagente inserito con successo! \n Sarai reindirizzato alla home a breve..."
            setTimeout(function () { window.location.href = "../../home" }, 1500);
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