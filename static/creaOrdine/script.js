var token = localStorage.getItem("token");
var userId = localStorage.getItem("userId");
var subagente = JSON.parse(localStorage.getItem("subagente"));


function onLoadCreaOrdineIndex() {
    // Code to be executed when the page loads
    getAllClienti();
    // Get all the anchor elements within the 'buttons' div
    var links = document.querySelectorAll('.button-container a');
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

let colSpanTaglie = 6;

function getAllArticoli() {

    var catalogo = JSON.parse(localStorage.getItem("catalogoSelezionato"));

    console.log(catalogo);
    console.log("ho iniziato");

    // Create an array of promises for each fetch request
    var fetchPromises = catalogo.listaArticoli.map(articolo_id => {
        return fetch('../articoli/' + articolo_id, {
            method: 'GET',
            headers: {
                'x-access-token': token
            }
        })
            .then(resp => resp.json())
            .then(function (data) {
                console.log(data);
                populateArticoli(data);
            })
            .catch(error => console.error(error));
    });

    // Wait for all promises to resolve
    Promise.all(fetchPromises)
        .then(function () {

            document.getElementById("taglieDisponibiliTh").colSpan = colSpanTaglie * 2;

            // Seleziona tutti gli elementi <input> con la classe "numArticoliTaglia"
            const inputList = document.querySelectorAll('.numArticoliTaglia');
            const scontoList= document.querySelectorAll('.scontoApplicato');

            // Aggiungere un listener agli input per l'evento di cambiamento
            for (let i = 0; i < inputList.length; i++) {
                inputList[i].addEventListener("change",calcolaTotale)
            }

            for (let i = 0; i < scontoList.length; i++) {
                //scontoList[i].addEventListener("change",calcolaTotale)
            }

            function calcolaTotale() {
                //console.log(this.name);
                //console.log(this.value);
                
                articleId=extractIdFromString(this.name);

                var inputsQtaTaglie=document.getElementsByName(this.name);

                var totaleQta=0;

                for(let i=0;i<inputsQtaTaglie.length;i++){
                    //console.log(inputs[i].name+":"+inputs[i].value)
                    if(inputsQtaTaglie[i].value<0){
                        inputsQtaTaglie[i].value=0;
                    }
                    if(inputsQtaTaglie[i].value){
                        totaleQta+=parseInt(inputsQtaTaglie[i].value);
                    }
                }

                prezzoArticolo=parseFloat(document.getElementById(articleId+"_Prezzo").textContent)
                scontoArticolo=parseFloat(document.getElementById(articleId+"_ScontoApplicato").value)
                scontoArticolo=scontoArticolo*prezzoArticolo/100;

                document.getElementById(articleId+"_Totale").textContent=(Math.round(totaleQta*(prezzoArticolo-scontoArticolo)*100))/100+"€";
                console.log(totaleQta*prezzoArticolo)

                
            }
        });


}

function populateArticoli(article) {

    console.log("populate");

    const productTable = document.getElementById("productTable");

    // Creazione delle righe per ogni colore e taglia disponibile
    var isFirst = true;
    article.coloriDisponibili.forEach(color => {

        const row = document.createElement("tr");

        if (isFirst) {
            row.innerHTML = `
            <td rowspan="${article.coloriDisponibili.length}">
                ${article.nome}
            </td>

            <td rowspan="${article.coloriDisponibili.length}">
                ${article.descrizione}
            </td>     

            <td rowspan="${article.coloriDisponibili.length}" id="${article._id}_Prezzo">${article.prezzo}</td>

            <td rowspan="${article.coloriDisponibili.length}"> <input type="number" class="scontoApplicato" id="${article._id}_ScontoApplicato" name="${article._id}_ScontoApplicatonto" step="1" value="0" min="0" max="100"> </td>
            
            <td rowspan="${article.coloriDisponibili.length}">${article.barCodes.join(", ")} </td>
            
            <td rowspan="${article.coloriDisponibili.length}" class="totaleTh" id="${article._id}_Totale" ">0</td>

            `

            isFirst = false;
        }

        row.innerHTML += ` <td>${color}</td>`;

        for (var i = 0; i < colSpanTaglie; i++) {
            if (i < article.taglieDisponibili.length) {
                row.innerHTML += `
                    <td>${article.taglieDisponibili[i]}</td>
                    <td>
                        <input type="number" class="numArticoliTaglia" id="${article._id}_Color${color}_Qta" name="${article._id}_Qta" step="1">
                    </td>
                
                `;

            } else {
                row.innerHTML += `
                    <td></td>
                    <td
                    </td>
                
                `;
            }
        };

        
        productTable.appendChild(row);
    });

}

function extractIdFromString(string) {
    const idPattern = `(.+)_Qta`;
    const match = string.match(idPattern);
  
    if (match && match.length > 1) {
        return match[1];
    }
  
    return null; // Return null if no valid ID is found
}
