const token = localStorage.getItem("token");
var userData = JSON.parse(localStorage.getItem("userData"));
var role = localStorage.getItem("role")

function loadPage() {
  getAllDipendenti()
}

function getAllDipendenti() {
  fetch('/dipendenti', {
    method: 'GET',
    headers: {
      'x-access-token': token
    }
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      console.log(data);

      data.forEach(dipendente => {

          populateDipendenti(dipendente);
     
      })

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
    return fetch('/dipendenti/filtered/queryNome/' + query, {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then(resp => resp.json())
      .then(function (data) {
        console.log(data);
        data.forEach(dipendente => {

            populateDipendenti(dipendente);
      
        })

      })
      .catch(error => console.error(error));
  }


}

function populateDipendenti(dipendente) {
  var dipendentiList = document.getElementById('dipendentiList');

  const listItem = document.createElement('li');
  const nomeDipendente = document.createElement('span');
  const deleteButton = document.createElement('button');

  var span = document.createElement("span")

  // Imposta il nome del dipendente
  nomeDipendente.textContent = dipendente.nome + " " + dipendente.cognome;

  // Imposta l'ID del dipendente come attributo del pulsante
  deleteButton.setAttribute('data-id', dipendente._id);

  // Aggiungi il testo al pulsante
  deleteButton.textContent = 'Elimina';

  //Applica stile
  deleteButton.style.backgroundColor="darkred";
  deleteButton.style.marginLeft="10px"

  // Aggiungi un gestore di eventi al pulsante per reindirizzare alla pagina del dipendente
  deleteButton.addEventListener('click', function () {
    openModal(dipendente._id)
  });

  span.appendChild(deleteButton);

  // Aggiungi gli elementi al DOM
  listItem.appendChild(nomeDipendente);
  listItem.appendChild(span);
  dipendentiList.appendChild(listItem);

}


function openModal(id) {
  var modal = document.getElementById("modal");
  modal.style.display = "block";

  var modalContent = document.getElementById("modal-content");

  document.querySelector(".modal #confermaButton").setAttribute('data-id', id);
}

function closeModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "none";

  var modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = "";
}

function eliminaDipendente() {
  var id=document.querySelector(".modal #confermaButton").getAttribute('data-id');
  fetch('/dipendenti/' + id, {
    method: 'DELETE',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json'
    }
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      window.location.href="./"
    })
    .catch(function (error) {
      console.error(error);
    }); // If there is any error, you will catch them here*/
}
