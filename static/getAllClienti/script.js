const token = localStorage.getItem("token");
var userData = JSON.parse(localStorage.getItem("subagente"));
var role = JSON.parse(localStorage.getItem("role"));

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
      data.forEach(cliente => populateClienti(cliente));
    })
    .catch(error => console.error(error)); // If there is any error, you will catch them here
}


function populateClienti(cliente) {
  console.log(userData.listaClienti.includes(cliente._id));


  if (userData.listaClienti.includes(cliente._id)) {

    var clientiList = document.getElementById('clientiList');

    const listItem = document.createElement('li');
    const nomeCliente = document.createElement('span');
    const viewButton = document.createElement('button');

    // Imposta il nome del cliente
    nomeCliente.textContent = cliente.anagrafica.nome;

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
