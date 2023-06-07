var token = localStorage.getItem("token");
var userEmail=localStorage.getItem("userEmail")
var ordine;

function loadRiepilogoOrdine() {
    const urlParams = new URLSearchParams(window.location.search);
    // Get the value of the "id" parameter
    const ordineId = urlParams.get('ordineId');

    fetch('../ordini/' + ordineId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) { // Here you get the data to modify as you please
            ordine=data;
            getArticoliInOrdine();
            configureModal()
        })
        .catch(error => console.error(error)); // If there is any error, you will catch them here

}

function redirectBack(){
    const urlParams = new URLSearchParams(window.location.search);
    // Get the value of the "id" parameter
    var clienteId;
    var subagenteId;

    if(urlParams.has("clienteId")){
        clienteId = urlParams.get('clienteId');
    } 

    if(urlParams.has("subagenteId")){
        subagenteId = urlParams.get('subagenteId');
    } 

    console.log(clienteId);
    console.log(subagenteId);

    if(clienteId!=undefined ^ subagenteId!=undefined){
        if(clienteId!=undefined){
            window.location.href="../profiloCliente?clienteId="+clienteId;
        }else{
            window.location.href="../profiloSubagente?subagenteId="+subagenteId;
        }
    }

    
}

var totaleOrdine = 0;

function getArticoliInOrdine() {
    

    document.getElementById("numeroOrdine").textContent = ordine._id;

    // Loop through the articles and populate them in the summary
    const promises = ordine.listaArticoli.map(articolo =>
        populateArticoliInRiepilogo(articolo)
    );

    Promise.all(promises).then(() => {
        document.getElementById("totaleOrdine").textContent += Math.round(totaleOrdine * 100) / 100 + "€";
    });
}

var aziendaMap = new Map();
var catalogoMap = new Map();
var totaleOrdinePerCatalogoMap = new Map();
function populateArticoliInRiepilogo(article) {
    const productTable = document.getElementById("tables");

    // Effettua una richiesta per ottenere i dettagli dell'articolo
    return fetch('../articoli/' + article.id, {
        method: 'GET',
        headers: {
            'x-access-token': token
        }
    })
        .then(resp => resp.json())
        .then(async function (data) {
            // Effettua una richiesta per ottenere i dettagli del catalogo
            const catalogoResponse = await fetch('../cataloghi/' + data.catalogo, {
                method: 'GET',
                headers: {
                    'x-access-token': token
                }
            });
            const catalogo = await catalogoResponse.json();

            // Effettua una richiesta per ottenere i dettagli dell'azienda associata
            const aziendaResponse = await fetch('../aziende/' + catalogo.azienda, {
                method: 'GET',
                headers: {
                    'x-access-token': token
                }
            });

            const azienda = await aziendaResponse.json();

            // Controlla se il catalogo è già presente nella mappa dei cataloghi
            if (!aziendaMap.has(catalogo.azienda)) {
                // Se il catalogo non è presente, crea una nuova tabella per il catalogo
                const aziendaSpan = document.createElement("span");
                aziendaSpan.className = "aziendaTable";

                var nameAzienda = document.createElement("h3");
                nameAzienda.textContent = azienda.nome;
                nameAzienda.className = "nameAzienda";
                nameAzienda.id = azienda._id;

                aziendaSpan.appendChild(nameAzienda);

                // Aggiungi la nuova tabella del catalogo alla mappa dei cataloghi
                aziendaMap.set(catalogo.azienda, aziendaSpan);

                // Aggiungi la nuova tabella al riepilogo dei prodotti
                productTable.appendChild(aziendaSpan);
            }



            const nomeCatalogo = catalogo.nome;

            // Controlla se il catalogo è già presente nella mappa dei cataloghi
            if (!catalogoMap.has(data.catalogo)) {
                // Se il catalogo non è presente, crea una nuova tabella per il catalogo
                const catalogoTable = document.createElement("table");
                catalogoTable.innerHTML = `
            <td class="nameCatalogo" colspan="9" style="background-color: #f2f2f2; color: #333;">
              ${nomeCatalogo}
            </td>
            <tr>
              <th>Nome</th>
              <th>Descrizione</th>
              <th>Prezzo(€)</th>
              <th>Sconto (%)</th>
              <th>EAN code</th>
              <th>Totale(€)</th>
              <th>Colore</th>
              <th>Taglia</th>
              <th>Qta</th>
            </tr>
          `;

                var spanTotale = document.createElement("span");
                spanTotale.textContent = "Totale per catalogo: ";

                var totaleCatalogo = document.createElement("span");
                totaleCatalogo.className = "totalePerCatalogo";
                totaleCatalogo.textContent = 0;

                // Aggiungi la nuova tabella del catalogo alla mappa dei cataloghi
                catalogoMap.set(data.catalogo, catalogoTable);

                totaleOrdinePerCatalogoMap.set(data.catalogo, totaleCatalogo)

                // Aggiungi la nuova tabella al riepilogo dei prodotti


                var catalogoSection = document.createElement("section");
                catalogoSection.className = "catalogoSection";

                catalogoSection.appendChild(spanTotale);
                catalogoSection.appendChild(totaleCatalogo);


                aziendaMap.get(catalogo.azienda).appendChild(catalogoSection);

                aziendaMap.get(catalogo.azienda).appendChild(catalogoTable);
            }

            // Recupera la tabella del catalogo dalla mappa dei cataloghi
            const catalogoTable = catalogoMap.get(data.catalogo);

            // Crea una nuova riga per l'articolo
            const row = document.createElement("tr");

            const totale = Math.round(article.qta * (data.prezzo * (1 - article.scontoApplicato / 100)) * 100) / 100;

            totaleOrdinePerCatalogoMap.get(data.catalogo).textContent = Math.round((parseFloat(totaleOrdinePerCatalogoMap.get(data.catalogo).textContent) + totale) * 100) / 100;

            totaleOrdine += totale;

            // Popola i dettagli dell'articolo nella riga
            row.innerHTML = `
          <td>${data.nome}</td>
          <td>${data.descrizione}</td>
          <td>${data.prezzo}</td>
          <td>${article.scontoApplicato}</td>
          <td>${data.barCodes}</td>
          <td>${totale}</td>
          <td>${article.colore}</td>
          <td>${article.taglia}</td>
          <td>${article.qta}</td>
        `;

            // Aggiungi la riga dell'articolo alla tabella del catalogo corrispondente
            catalogoTable.appendChild(row);
        })
        .catch(error => console.error(error));
}

/*Concludi ordine*/

function configureModal() {
    var modal = document.getElementById("modal");
    var openModalButton = document.getElementById("openModalButton");
    var closeButton = document.getElementsByClassName("close")[0];

    openModalButton.addEventListener("click", function () {
        modal.style.display = "block";
    });

    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });
}

function concludiOrdine() {

    var indirizzoSpedizione = ordine.indirizzoSpedizione;
    var indirizzoFatturazione = ordine.indirizzoFatturazione;

    if (indirizzoSpedizione && indirizzoSpedizione) {

        document.getElementById("warning").textContent = "In elaborazione..."
        
        createPDFFromJSON(indirizzoSpedizione, indirizzoFatturazione)

    } else {
        document.getElementById("errore").textContent = "I campi sono obbligatori"
    }


}

function createPDFFromJSON(indirizzoSpedizione, indirizzoFatturazione) {

    const aziende = document.getElementsByClassName("aziendaTable");

    fetch('../clienti/' + ordine.cliente, {
        method: 'GET',
        headers: {
            'x-access-token': token
        }
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) { // Here you get the data to modify as you please
            var anagraficaCliente = data.anagrafica;

            Array.from(aziende).forEach(azienda => {

                fetch('../aziende/' + azienda.getElementsByClassName("nameAzienda")[0].id, {
                    method: 'GET',
                    headers: {
                        'x-access-token': token,
                        'Content-Type': 'application/json'
                    },
                })
                    .then(resp => resp.json())
                    .then(async function (data) {

                        var nomeAzienda = azienda.getElementsByClassName("nameAzienda")[0].textContent

                        html = "<h1> Ordine " + ordine._id + "</h1>";

                        html += "<div id='dati'>"

                        html += "<section id='datiClienteSection'>"

                        html += "<h4> Dati cliente: </h4>";

                        html += jsonToHTML(anagraficaCliente);

                        html += "</section>"

                        html += "<br>"

                        html += "<section id='datiAziendaSection'>"

                        html += "<h4> Dati azienda: </h4>";

                        html +=`<div><strong>Azienda:</strong> ${nomeAzienda}</div>`

                        html += jsonToHTML(data.dati);

                        html += "</section>"

                        html += "</div>"

                        html += "<br>"

                        html += "<span><strong>Indirizzo spedizione: </strong>" + indirizzoSpedizione + "<span>"

                        html += "<br>"

                        html += "<span><strong>Indirizzo fatturazione: </strong>" + indirizzoFatturazione + "<span>"

                        html += "<br><hr><br><br>"

                        var totaleCatalogo = azienda.getElementsByClassName("totalePerCatalogo");
                        var totaleOrdineAzienda = 0;

                        Array.from(totaleCatalogo).forEach(totaleSingle => {
                            totaleOrdineAzienda += parseFloat(totaleSingle.textContent);
                        })

                        var totaleAziendaSpan = document.createElement("h3");
                        totaleAziendaSpan.textContent = "Totale: " + Math.round(totaleOrdineAzienda*100)/100 + "€";

                        html += azienda.innerHTML;
                        html += totaleAziendaSpan.innerHTML;

                        email={
                            azienda:data.dati.email,
                            ufficio:"email@ufficio.it",
                            cliente:anagraficaCliente.email,
                            subagente:userEmail
                        }
                        
                        html+="<br><br><p> Questo documento è stato inoltrato a: <p>"
                        html+=jsonToHTML(email)

                        await fetch('../exportPDF', {
                            method: 'POST',
                            headers: {
                                'x-access-token': token,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ email:email, html: html, outputFilePath: nomeAzienda + "_" + ordine._id + '.pdf' })
                        })
                            .then(resp => resp.json())
                            .then(function (data) {
                                document.getElementById("warning").textContent = ""
                                document.getElementById("errore").textContent = ""
                                document.getElementById("successo").textContent = "Ordine inviato. \n "
                                setTimeout(function(){
                                    document.getElementById("modal").style.display="none";
                                },1500)
                            })
                            .catch(error => console.error(error));

                    })
                   


            })
        })

        .catch(error => console.error(error)); // If there is any error, you will catch them here
}

// Function to recursively convert JSON to HTML
function jsonToHTML(json) {
    let html = '';

    // Iterate over each property in the JSON object
    for (let key in json) {
        if (json.hasOwnProperty(key)) {
            const value = json[key];

            // Check if the value is an object (nested JSON)
            if (typeof value === 'object' && value !== null) {
                // Recursively convert nested JSON to HTML
                const nestedHTML = jsonToHTML(value);
                html += `<div><strong>${key}:</strong>${nestedHTML}</div>`;
            } else {
                // Convert simple key-value pair to HTML
                html += `<div><strong>${key}:</strong> ${value}</div>`;
            }
        }
    }
    return html;
}