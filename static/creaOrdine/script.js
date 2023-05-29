var token = localStorage.getItem("token");
var userId = localStorage.getItem("userId");
var subagente = JSON.parse(localStorage.getItem("subagente"));


function onLoadCreaOrdineIndex() {
    // Code to be executed when the page loads
    getAllClienti();
    // Get all the anchor elements within the 'buttons' div
    var links = document.querySelectorAll('.button-container a');

    // Iterate over each link and modify the href attribute
    /*for (var i = 0; i < links.length; i++) {
    var href = links[i].getAttribute('href');
    var modifiedHref = href + '?token=' + token + '&id=' + userId;
    links[i].setAttribute('href', modifiedHref);
    }*/
};


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
            populateClienti(data);
        })
        .catch(error => console.error(error)); // If there is any error, you will catch them here
}

function populateClienti(clienti) {
    var selectCliente = document.getElementById("clienteSelezionato");

    // Clear existing options
    selectCliente.innerHTML = "";

    // Add options from the retrieved data
    for (var i = 0; i < clienti.length; i++) {
        if (subagente.listaClienti.includes(clienti[i]._id)) {
            var option = document.createElement("option");
            option.value = clienti[i]._id;
            option.text = clienti[i].anagrafica.nome + " " + clienti[i].anagrafica.cognome; // Assuming the "nome" property holds the name of the cliente
            selectCliente.appendChild(option);
        }

    }
}

function creaOrdine() {

    localStorage.setItem("clienteSelezionato", document.getElementById("clienteSelezionato").value);
    console.log("cliente: " + document.getElementById("clienteSelezionato").value);

    document.getElementById("ordineForm").addEventListener("click", function (event) {
        event.preventDefault();
    });


    fetch('../ordini', {
        method: 'POST',
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subagente: subagente._id, cliente: document.getElementById("clienteSelezionato").value }),
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) { // Here you get the data to modify as you please
            console.log(data);

            redirectToGetAllAziende();
        })
        .catch(error => console.error(error)); // If there is any error, you will catch them here*/


}

function redirectToGetAllAziende() {

    window.location.href = './aziendeDisponibili.html';
}

function getAllAziende() {


    fetch('../aziende', {
        method: 'GET',
        headers: {
            'x-access-token': token
        }
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) { // Here you get the data to modify as you please
            console.log(data);
            populateAziende(data);
        })
        .catch(error => console.error(error)); // If there is any error, you will catch them here


}

function populateAziende(aziende) {
    const aziendeList = document.getElementById("aziendeList");
    // Popolamento dell'elenco delle aziende
    aziende.forEach(azienda => {
        if (subagente.listaAziende.includes(azienda._id)) {
            const listItem = document.createElement("li");
            listItem.textContent = azienda.dati.nome;

            const selectButton = document.createElement("button");
            selectButton.textContent = "Seleziona";
            selectButton.addEventListener("click", () => {
                // Logica per gestire la selezione dell'azienda
                console.log("Azienda selezionata:", azienda._id);
                localStorage.setItem("aziendaSelezionata", JSON.stringify(azienda))
                window.location.href = './cataloghiDisponibili.html';

            });

            listItem.appendChild(selectButton);
            aziendeList.appendChild(listItem);
        }

    });
}

function getAllCataloghi() {

    var azienda = JSON.parse(localStorage.getItem("aziendaSelezionata"));

    console.log(azienda);

    azienda.listaCataloghi.forEach(catalogo_id => {
        fetch('../cataloghi/' + catalogo_id, {
            method: 'GET',
            headers: {
                'x-access-token': token
            }
        })
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) { // Here you get the data to modify as you please
                console.log(data);
                populateCataloghi(data);
            })
            .catch(error => console.error(error)); // If there is any error, you will catch them here
    })



}

function populateCataloghi(catalogo) {

    const cataloghiList = document.getElementById("cataloghiList");
    // Popolamento dell'elenco delle cataloghi

    const listItem = document.createElement("li");
    listItem.textContent = catalogo.nome;

    const selectButton = document.createElement("button");
    selectButton.textContent = "Seleziona";
    selectButton.addEventListener("click", () => {
        // Logica per gestire la selezione dell'catalogo
        console.log("Catalogo selezionato:", catalogo._id);
        localStorage.setItem("catalogoSelezionato", JSON.stringify(catalogo))
        window.location.href = './articoliDisponibili.html';

    });

    listItem.appendChild(selectButton);
    cataloghiList.appendChild(listItem);

}

function getAllArticoli() {

    var catalogo = JSON.parse(localStorage.getItem("catalogoSelezionato"));

    console.log(catalogo);

    catalogo.listaArticoli.forEach(articolo_id => {
        fetch('../articoli/' + articolo_id, {
            method: 'GET',
            headers: {
                'x-access-token': token
            }
        })
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) { // Here you get the data to modify as you please
                console.log(data);
                populateArticoli(data);
            })
            .catch(error => console.error(error)); // If there is any error, you will catch them here
    })



}

function populateArticoli(article) {

    console.log("populate");

    const productTable = document.getElementById("productTable");

    //const row = document.createElement("tr");
    /*row.innerHTML = `
            <td rowspan="${article.coloriDisponibili.length}">
                ${article.nome}
            </td>
            <td rowspan="${article.coloriDisponibili.length}">
                ${article.descrizione}
            </td>
            `*/

    // Creazione delle righe per ogni colore e taglia disponibile
    article.coloriDisponibili.forEach(color => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td >
                ${article.nome}
            </td>
            <td >
                ${article.descrizione}
            </td>
            `

        row.innerHTML += ` <td>${color}</td>`

        article.taglieDisponibili.forEach(taglia => {
            row.innerHTML += `
                        <td>${taglia}</td>
                        <td>
                            <select>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <!-- Add more quantity options if needed -->
                            </select>
                        </td>
                       
                `;
            });

            row.innerHTML += 
            `
                <td>
                    ${article.scontoApplicato}
                </td>
                <td>
                    ${article.prezzo}
                </td>
                <td>
                    ${article.barCodes.join(", ")}
                </td>
            `
            productTable.appendChild(row);
    });

   

}