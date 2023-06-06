const token = localStorage.getItem("token");
var userData = JSON.parse(localStorage.getItem("userData"));
var role = localStorage.getItem("role")

function loadPage() {
  getAllSubagenti()
}

function getAllSubagenti() {
  fetch('../subagenti', {
    method: 'GET',
    headers: {
      'x-access-token': token
    }
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      console.log(data);
      data.forEach(subagente => populateSubagenti(subagente));
    })
    .catch(error => console.error(error)); // If there is any error, you will catch them here
}

function handleSearch() {
  document.getElementById("seachbarForm").addEventListener("click", function (event) {
    event.preventDefault()
  })

  var query = document.getElementsByName("query")[0].value;

  document.getElementById("subagentiList").textContent = "";

  if (query == "" || query == "*") {
    getAllSubagenti()
  } else {
    return fetch('../subagenti/filtered/queryNome/' + query, {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then(resp => resp.json())
      .then(function (data) {
        console.log(data);
        data.forEach(subagente=>{
            populateSubagenti(subagente)
        })
        
      })
      .catch(error => console.error(error));
  }


}

function populateSubagenti(subagente) {
    var subagentiList = document.getElementById('subagentiList');

    const listItem = document.createElement('li');
    const nomeSubagente = document.createElement('span');
    const viewButton = document.createElement('button');

    // Imposta il nome del subagente
    nomeSubagente.textContent = subagente.nome + " " + subagente.cognome;

    // Imposta l'ID del subagente come attributo del pulsante
    viewButton.setAttribute('data-id', subagente._id);

    // Aggiungi il testo al pulsante
    viewButton.textContent = 'Visualizza';

    // Aggiungi un gestore di eventi al pulsante per reindirizzare alla pagina del subagente
    viewButton.addEventListener('click', function () {
      const subagenteId = this.getAttribute('data-id');
      window.location.href = '../profiloSubagente/index.html?subagenteId=' + subagenteId;
    });

    // Aggiungi gli elementi al DOM
    listItem.appendChild(nomeSubagente);
    listItem.appendChild(viewButton);
    subagentiList.appendChild(listItem);

}

function openModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "block";

  var modalContent = document.getElementById("modal-content");

  // Effettua la chiamata AJAX per caricare il contenuto della pagina
  $.ajax({
    url: "../creaSubagente",
    success: function (data) {
      modalContent.innerHTML = data;
    },
    error: function (error) {
      console.error(error);
    }
  });
}

function closeModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "none";

  var modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = "";
}

function registerSubagente() {

  const form = document.getElementById('subagenteForm');

  form.addEventListener("click", function (event) {
    event.preventDefault()
  });


  // Controllo la completezza dei campi
  //if (form.checkValidity()) {
  // Raccolgo i dati del subagente
  var nome = document.getElementById('nome').value;
  var cognome = document.getElementById('cognome').value;

  const subagenteData = {
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
  fetch('../subagenti', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify({ nome: nome, cognome: cognome, anagrafica: subagenteData })
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      // Elaboro la risposta del server
      console.log(data.createdSubagente.risultato);
        
        populateSubagenti(data.createdSubagente.risultato)
        closeModal()

    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
}

