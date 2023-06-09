const token = localStorage.getItem("token");
var userData = JSON.parse(localStorage.getItem("userData"));
var role = localStorage.getItem("role")

function loadPage() {
  getAllTecnici()
}

function getAllTecnici() {
  fetch('/tecnici', {
    method: 'GET',
    headers: {
      'x-access-token': token
    }
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      console.log(data);

      data.forEach(tecnico => {
          if(userData._id!=tecnico._id){
            populateTecnici(tecnico);
          }
      })

    })
    .catch(error => console.error(error)); // If there is any error, you will catch them here
}

function handleSearch() {
  document.getElementById("seachbarForm").addEventListener("click", function (event) {
    event.preventDefault()
  })

  var query = document.getElementsByName("query")[0].value;

  document.getElementById("tecniciList").textContent = "";

  if (query == "" || query == "*") {
    getAllTecnici()
  } else {
    return fetch('/tecnici/filtered/queryNome/' + query, {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then(resp => resp.json())
      .then(function (data) {
        console.log(data);
        data.forEach(tecnico => {

            populateTecnici(tecnico);
      
        })

      })
      .catch(error => console.error(error));
  }


}

function populateTecnici(tecnico) {
  var tecniciList = document.getElementById('tecniciList');

  const listItem = document.createElement('li');
  const nomeTecnico = document.createElement('span');
  const deleteButton = document.createElement('button');

  var span = document.createElement("span")

  // Imposta il nome del tecnico
  nomeTecnico.textContent = tecnico.codiceFiscale;

  // Imposta l'ID del tecnico come attributo del pulsante
  deleteButton.setAttribute('data-id', tecnico._id);

  // Aggiungi il testo al pulsante
  deleteButton.textContent = 'Elimina';

  //Applica stile
  deleteButton.style.backgroundColor="darkred";
  deleteButton.style.marginLeft="10px"

  // Aggiungi un gestore di eventi al pulsante per reindirizzare alla pagina del tecnico
  deleteButton.addEventListener('click', function () {
    openModal(tecnico._id)
  });

  span.appendChild(deleteButton);

  // Aggiungi gli elementi al DOM
  listItem.appendChild(nomeTecnico);
  listItem.appendChild(span);
  tecniciList.appendChild(listItem);

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

function eliminaTecnico() {
  var id=document.querySelector(".modal #confermaButton").getAttribute('data-id');
  fetch('/tecnici/' + id, {
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
