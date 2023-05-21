var queryString = window.location.search;
var parametri = new URLSearchParams(queryString);
var token = parametri.get("token");
var userId = parametri.get("id");

document.addEventListener('DOMContentLoaded', function() {
    // Code to be executed when the page loads
    getAllClienti();
    // Get all the anchor elements within the 'buttons' div
    var links = document.querySelectorAll('.button-container a');

    // Iterate over each link and modify the href attribute
    for (var i = 0; i < links.length; i++) {
    var href = links[i].getAttribute('href');
    var modifiedHref = href + '?token=' + token + '&id=' + userId;
    links[i].setAttribute('href', modifiedHref);
    }
});


function getAllClienti() {
    fetch('../clienti', {
        method: 'GET',
        headers: {
            'x-access-token': token
        }
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        console.log(data);
        populateClienti(data);
    })
    .catch(error => console.error(error)); // If there is any error, you will catch them here
}

function populateClienti(clienti) {
    var selectCliente = document.getElementById("cliente");

    // Clear existing options
    selectCliente.innerHTML = "";

    // Add options from the retrieved data
    for (var i = 0; i < clienti.length; i++) {
        var option = document.createElement("option");
        option.value = clienti[i].id;
        option.text = clienti[i].anagrafica.nome+" "+clienti[i].anagrafica.cognome; // Assuming the "nome" property holds the name of the cliente
        selectCliente.appendChild(option);
    }
}
