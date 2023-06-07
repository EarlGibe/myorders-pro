const token = localStorage.getItem("token");
var modalActive = false;

function loadPage() {
  getAllAziende()
}

function getAllAziende() {
  var subagente = JSON.parse(localStorage.getItem("subagente"));

  fetch('../aziende', {
    method: 'GET',
    headers: {
      'x-access-token': token
    }
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      console.log(data);

      data.forEach(azienda => {
        if (modalActive) {
          if (!subagente.listaAziende.includes(azienda._id)) {
            populateAziende(azienda)
          }
        } else {
          if (subagente.listaAziende.includes(azienda._id) && azienda.status) {
            populateAziende(azienda)
          }
        }

      })

    })
    .catch(error => console.error(error)); // If there is any error, you will catch them here
}

function handleSearch() {
  var subagente = JSON.parse(localStorage.getItem("subagente"));

  var query

  if (modalActive) {
    document.querySelector("#modal-content #seachbarForm").addEventListener("click", function (event) {
      event.preventDefault()
    })
    query = document.querySelector('#modal-content input[name="query"]').value;
    document.querySelector("#modal-content #aziendeList").textContent = "";
  } else {
    document.getElementById("seachbarForm").addEventListener("click", function (event) {
      event.preventDefault()
    })
    query = document.getElementsByName("query")[0].value;
    document.getElementById("aziendeList").textContent = "";
  }




  

  if (query == "" || query == "*") {
    getAllAziende()
  } else {
    return fetch('../aziende/filtered/queryNome/' + query, {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then(resp => resp.json())
      .then(function (data) {
        console.log(data);
        
        data.forEach(azienda=>{
          if (modalActive) {
            if (!subagente.listaAziende.includes(azienda._id)) {
              populateAziende(azienda)
            }
          } else {
            if (subagente.listaAziende.includes(azienda._id) && azienda.status) {
              populateAziende(azienda)
            }
          }
        })


      })
      .catch(error => console.error(error));
  }


}

function populateAziende(azienda) {

  var aziendeList;

  if (modalActive) {
    aziendeList = document.querySelector("#modal-content #aziendeList")
  } else {
    aziendeList = document.getElementById("aziendeList")
  }

  const listItem = document.createElement("li");
  listItem.textContent = azienda.nome;

  var span = document.createElement("span")

  var selectButton = document.createElement("button");
  selectButton.setAttribute('data-id', azienda._id);

  if (modalActive) {

    selectButton.textContent = "Associa";
    selectButton.addEventListener("click", () => {
      // Logica per gestire la selezione dell'azienda
      associaAziendaASubagente(azienda._id)

    });
  } else {

    selectButton.textContent = "Dissocia";
    selectButton.addEventListener("click", () => {
      // Logica per gestire la selezione dell'azienda
      dissociaAziendaASubagente(azienda._id)

    });
  }


  span.appendChild(selectButton);

  listItem.appendChild(span);
  aziendeList.appendChild(listItem);

}

function openModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "block";

  var modalContent = document.getElementById("modal-content");

  // Effettua la chiamata AJAX per caricare il contenuto della pagina
  $.ajax({
    url: "../getAllAziende",
    success: function (data) {
      modalContent.innerHTML = data;
      modalActive = true;
      getAllAziende()
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

  modalActive = false;

}

function associaAziendaASubagente(aziendaId) {
  var subagente = JSON.parse(localStorage.getItem("subagente"));
  fetch('../subagenti/addAzienda/' + subagente._id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify({ azienda: aziendaId })
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      // Elaboro la risposta del server

      var buttonSelected = document.querySelector('button[data-id="' + aziendaId + '"]');

      buttonSelected.textContent = "Associato";
      buttonSelected.style.backgroundColor = "green"

    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
}

function dissociaAziendaASubagente(aziendaId) {
  var subagente = JSON.parse(localStorage.getItem("subagente"));
  fetch('../subagenti/rimuoviAzienda/' + subagente._id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify({ azienda: aziendaId })
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      // Elaboro la risposta del server
      console.log('Dati salvati:', data);
      var buttonSelected = document.querySelector('button[data-id="' + aziendaId + '"]');

      buttonSelected.textContent = "Dissociato";
      buttonSelected.style.backgroundColor = "red"
    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
}

function aggiornaPagina() {
  var subagente = JSON.parse(localStorage.getItem("subagente"));

  fetch('../subagenti/' + subagente._id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please
      // Elaboro la risposta del server
      console.log(data)
      localStorage.setItem("subagente", JSON.stringify(data));
      window.location.href = "./"
    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
}