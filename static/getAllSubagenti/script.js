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

      data.forEach(subagente => {
        if (role == "dipendente" || userData.isAgente) {
          populateSubagenti(subagente)
        } else if (role == "subagente") {
          if (subagente.status) {
            populateSubagenti(subagente);
          }
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
        data.forEach(subagente => {
          if (role == "dipendente" || userData.isAgente) {
            populateSubagenti(subagente)
          } else if (role == "subagente") {
            if (subagente.status) {
              populateSubagenti(subagente);
            }
          }
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

    var span = document.createElement("span")

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

    span.appendChild(viewButton);

  if ((role == "dipendente" || userData.isAgente)) {
    const toggleStatusButton = document.createElement("button");

    if (subagente.status) {
      toggleStatusButton.textContent = "Disabilita";
      toggleStatusButton.style.background = "#8B0000"
      toggleStatusButton.addEventListener("click", () => {
        // Cambia lo status dell'subagente a false
        toggleStatusSubagente(subagente._id, false)
      });
    } else {
      toggleStatusButton.textContent = "Abilita"
      toggleStatusButton.style.background = "#006400"

      toggleStatusButton.addEventListener("click", () => {
        // Cambia lo status dell'subagente a true
        toggleStatusSubagente(subagente._id, true)
      });
    }

    toggleStatusButton.style.width = "100px"
    toggleStatusButton.style.marginLeft = "10px"

    span.appendChild(toggleStatusButton);
  }

    // Aggiungi gli elementi al DOM
    listItem.appendChild(nomeSubagente);
    listItem.appendChild(span);
    subagentiList.appendChild(listItem);

}



function toggleStatusSubagente(id, bool) {
  fetch('../subagenti/' + id, {
    method: 'PUT',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status: bool }),
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) { // Here you get the data to modify as you please

      fetch('../users/cambiaStatus/' + id, {
        method: 'PUT',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: bool }),
      })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) { // Here you get the data to modify as you please

          window.location.href = "./"
        })
        .catch(function (error) {
          console.error(error);
        }); // If there is any error, you will catch them here*/
    })
    .catch(function (error) {
      console.error(error);
    }); // If there is any error, you will catch them here*/
}
