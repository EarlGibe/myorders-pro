const token = localStorage.getItem("token");
var userData = JSON.parse(localStorage.getItem("userData"));
var role = localStorage.getItem("role")

function loadPage() {
  getAllDipendenti()
}

function getAllDipendenti() {
  fetch('../dipendenti', {
    method: 'GET',
    headers: {
      'x-access-token': token
    }
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      console.log(data);
      data.forEach(dipendente => populateDipendenti(dipendente));
    })
    .catch(error => console.error(error)); // If there is any error, you will catch them here
}

function handleSearch() {
  document.getElementById("seachbarForm").addEventListener("click", function (event) {
    event.preventDefault()
  })

  var query = document.getElementsByName("query")[0].value;

  document.getElementById("dipendentiList").textContent = "";

  if (query == "" || query == "*") {
    getAllDipendenti()
  } else {
    return fetch('../dipendenti/filtered/queryNome/' + query, {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then(resp => resp.json())
      .then(function (data) {
        console.log(data);
        data.forEach(dipendente=>{
            populateDipendenti(dipendente)
        })
        
      })
      .catch(error => console.error(error));
  }


}

function populateDipendenti(dipendente) {
    var dipendentiList = document.getElementById('dipendentiList');

    const listItem = document.createElement('li');
    const nomeDipendente = document.createElement('span');
    const viewButton = document.createElement('button');

    // Imposta il nome del dipendente
    nomeDipendente.textContent = dipendente.nome + " " + dipendente.cognome;

    // Imposta l'ID del dipendente come attributo del pulsante
    viewButton.setAttribute('data-id', dipendente._id);

    // Aggiungi il testo al pulsante
    viewButton.textContent = 'Visualizza';

    // Aggiungi un gestore di eventi al pulsante per reindirizzare alla pagina del dipendente
    viewButton.addEventListener('click', function () {
      const dipendenteId = this.getAttribute('data-id');
      window.location.href = '../profiloDipendente/index.html?dipendenteId=' + dipendenteId;
    });

    // Aggiungi gli elementi al DOM
    listItem.appendChild(nomeDipendente);
    listItem.appendChild(viewButton);
    dipendentiList.appendChild(listItem);

}

function openModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "block";

  var modalContent = document.getElementById("modal-content");

  // Effettua la chiamata AJAX per caricare il contenuto della pagina
  $.ajax({
    url: "../creaDipendente",
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

function registerDipendente() {

  const form = document.getElementById('dipendenteForm');

  form.addEventListener("click", function (event) {
    event.preventDefault()
  });


  // Controllo la completezza dei campi
  //if (form.checkValidity()) {
  // Raccolgo i dati del dipendente
  var nome = document.getElementById('nome').value;
  var cognome = document.getElementById('cognome').value;

  const dipendenteData = {
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
  fetch('../dipendenti', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify({ nome: nome, cognome: cognome, anagrafica: dipendenteData })
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      // Elaboro la risposta del server
      console.log(data.createdDipendente.risultato);
        
        populateDipendenti(data.createdDipendente.risultato)
        closeModal()

    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
}

