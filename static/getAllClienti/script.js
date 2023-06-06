const token = localStorage.getItem("token");
var userData = JSON.parse(localStorage.getItem("userData"));
var role = localStorage.getItem("role")

function loadPage() {
  getAllClienti()
}

function getAllClienti() {
  fetch('../clienti', {
    method: 'GET',
    headers: {
      'x-access-token': token
    }
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      console.log(data);
      if(role=="dipendente" || userData.isAgente){
        data.forEach(cliente=>{
            populateClienti(cliente)
        })
      }else if(role=="subagente"){
        data.forEach(cliente=>{
          if (userData.listaClienti.includes(cliente._id)) {
            populateClienti(cliente)
          }
        })
      }
        
    })
    .catch(error => console.error(error)); // If there is any error, you will catch them here
}

function handleSearch() {
  document.getElementById("seachbarForm").addEventListener("click", function (event) {
    event.preventDefault()
  })

  var query = document.getElementsByName("query")[0].value;

  document.getElementById("clientiList").textContent = "";

  if (query == "" || query == "*") {
    getAllClienti()
  } else {
    return fetch('../clienti/filtered/queryNome/' + query, {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then(resp => resp.json())
      .then(function (data) {
        console.log(data);

        if(role=="dipendente" || userData.isAgente){
          data.forEach(cliente=>{
          
              populateClienti(cliente)
         
          })
      }else if(role=="subagente"){
        data.forEach(cliente=>{
          if (userData.listaClienti.includes(cliente._id)) {
            populateClienti(cliente)
          }
        })
      }

        
        
      })
      .catch(error => console.error(error));
  }


}

function populateClienti(cliente) {
    var clientiList = document.getElementById('clientiList');

    const listItem = document.createElement('li');
    const nomeCliente = document.createElement('span');
    const viewButton = document.createElement('button');

    // Imposta il nome del cliente
    nomeCliente.textContent = cliente.nome + " " + cliente.cognome;

    // Imposta l'ID del cliente come attributo del pulsante
    viewButton.setAttribute('data-id', cliente._id);

    // Aggiungi il testo al pulsante
    viewButton.textContent = 'Visualizza';

    // Aggiungi un gestore di eventi al pulsante per reindirizzare alla pagina del cliente
    viewButton.addEventListener('click', function () {
      const clienteId = this.getAttribute('data-id');
      window.location.href = '../profiloCliente/index.html?clienteId=' + clienteId;
    });

    // Aggiungi gli elementi al DOM
    listItem.appendChild(nomeCliente);
    listItem.appendChild(viewButton);
    clientiList.appendChild(listItem);

}

function openModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "block";

  var modalContent = document.getElementById("modal-content");

  // Effettua la chiamata AJAX per caricare il contenuto della pagina
  $.ajax({
    url: "../creaCliente",
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

function registerCliente() {

  const form = document.getElementById('clienteForm');

  form.addEventListener("click", function (event) {
    event.preventDefault()
  });


  // Controllo la completezza dei campi
  //if (form.checkValidity()) {
  // Raccolgo i dati del cliente
  var nome = document.getElementById('nome').value;
  var cognome = document.getElementById('cognome').value;

  const clienteData = {
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
    body: JSON.stringify({ nome: nome, cognome: cognome, anagrafica: clienteData })
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      // Elaboro la risposta del server
      console.log(data.createdCliente.risultato);

      if (role == "subagente") {
        associaClienteASubagente(data.createdCliente.risultato._id);
      }
      // Esegui altre azioni o reindirizzamento alla pagina desiderata
        
        populateClienti(data.createdCliente.risultato)
        closeModal()

    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
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