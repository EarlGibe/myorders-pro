const token = localStorage.getItem("token");
var userData = JSON.parse(localStorage.getItem("userData"));
var role = localStorage.getItem("role")

function loadPage() {
  getAllSubagenti()
}

function getAllSubagenti() {
  fetch('/subagenti', {
    method: 'GET',
    headers: {
      'x-access-token': token
    }
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      console.log(data);

      data.forEach(subagente => {
          populateSubagenti(subagente)
      })
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
    return fetch('/subagenti/filtered/queryNome/' + query, {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then(resp => resp.json())
      .then(function (data) {
        console.log(data);
        data.forEach(subagente => {
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
    const deleteButton = document.createElement('button');

  var span = document.createElement("span")

  // Imposta il nome del subagente
  nomeSubagente.textContent = subagente.nome + " " + subagente.cognome;

  // Imposta l'ID del subagente come attributo del pulsante
  deleteButton.setAttribute('data-id', subagente._id);

  // Aggiungi il testo al pulsante
  deleteButton.textContent = 'Elimina';

  //Applica stile
  deleteButton.style.backgroundColor="darkred";
  deleteButton.style.marginLeft="10px"

  // Aggiungi un gestore di eventi al pulsante per reindirizzare alla pagina del subagente
  deleteButton.addEventListener('click', function () {
    openModal(subagente._id)
  });

  span.appendChild(deleteButton);


    // Aggiungi gli elementi al DOM
    listItem.appendChild(nomeSubagente);
    listItem.appendChild(span);
    subagentiList.appendChild(listItem);

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

function eliminaSubagente() {
  var id = document.querySelector(".modal #confermaButton").getAttribute('data-id');
  fetch('/subagenti/' + id, {
    method: 'DELETE',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json'
    }
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      fetch('/users/deleteByRoleId/' + id, {
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
    })
    .catch(function (error) {
      console.error(error);
    }); // If there is any error, you will catch them here*/
}