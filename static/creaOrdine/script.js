var token = localStorage.getItem("token");
var userId = localStorage.getItem("userId");
var userData = JSON.parse(localStorage.getItem("userData"));
var userEmail = localStorage.getItem("userEmail");


function onLoadCreaOrdineIndex() {
    // Code to be executed when the page loads
    getAllClienti();
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
        if (userData.listaClienti.includes(clienti[i]._id)) {
            var option = document.createElement("option");
            option.value = clienti[i]._id;
            option.text = clienti[i].nome + " " + clienti[i].cognome; // Assuming the "nome" property holds the name of the cliente
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
        body: JSON.stringify({ subagente: userData._id, cliente: document.getElementById("clienteSelezionato").value }),
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) { // Here you get the data to modify as you please
            console.log(data);

            localStorage.setItem("ordineAttivo", JSON.stringify(data.createdOrdine.risultato));
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
        if (userData.listaAziende.includes(azienda._id)) {
            const listItem = document.createElement("li");
            listItem.textContent = azienda.nome;

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

    fetch('../cataloghi/filtered/' + azienda._id, {
        method: 'GET',
        headers: {
            'x-access-token': token
        }
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) { // Here you get the data to modify as you please
            console.log(data);
            data.forEach(catalogo => {
                populateCataloghi(catalogo);
            })

        })
        .catch(error => console.error(error)); // If there is any error, you will catch them here
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

/*mostra articoli*/

let colSpanTaglie = 6;

function getAllArticoli() {

    var catalogo = JSON.parse(localStorage.getItem("catalogoSelezionato"));

    console.log(catalogo);

    // Create an array of promises for each fetch request
    return fetch('../articoli/filtered/' + catalogo._id, {
        method: 'GET',
        headers: {
            'x-access-token': token
        }
    })
        .then(resp => resp.json())
        .then(function (data) {
            console.log(data);
            // data.forEach(articolo => populateArticoli(articolo));
            autoUpdate();
        })
        .catch(error => console.error(error));
}

function handleSearch(){
    var catalogo = JSON.parse(localStorage.getItem("catalogoSelezionato"));
    
    document.getElementById("seachbarForm").addEventListener("click", function(event){
        event.preventDefault()
      })

    var query=document.getElementsByName("query")[0].value;

    var articoli=document.getElementsByTagName("tr");

        Array.from(articoli).forEach(articolo=>{
            if(articolo.id!="intestazione"){
                articolo.textContent=""
            }
        })

    if(query==""||query=="*"){
        getAllArticoli()
    }else{
    
        var searchTypes = document.getElementsByName("searchType");
          var selectedSearchType;
    
          for (var i = 0; i < searchTypes.length; i++) {
            if (searchTypes[i].checked) {
              selectedSearchType = searchTypes[i].value;
              break;
            }
          }
    
        if( selectedSearchType=="barcode"){
            return fetch('../articoli/filtered/'+catalogo._id+'/queryBarcode/' + query, {
                method: 'GET',
                headers: {
                    'x-access-token': token
                }
            })
                .then(resp => resp.json())
                .then(function (data) {
                    console.log(data);
                    data.forEach(articolo => {
                        if (articolo.status) {
                            populateArticoli(articolo);
                            autoUpdate();
                        }
                    })
                })
                .catch(error => console.error(error));
        }else{
            if(selectedSearchType=="nome"){
                return fetch('../articoli/filtered/'+catalogo._id+'/queryNome/' + query, {
                    method: 'GET',
                    headers: {
                        'x-access-token': token
                    }
                })
                    .then(resp => resp.json())
                    .then(function (data) {
                        console.log(data);
                        data.forEach(articolo => {   
                            if (articolo.status) {
                                populateArticoli(articolo);
                                autoUpdate();
                            }
                        })
                    })
                    .catch(error => console.error(error));
            }
        }
    }

}


function populateArticoli(article) {

    const productTable = document.getElementById("productTable");

    var ordine = JSON.parse(localStorage.getItem("ordineAttivo")).listaArticoli;

    // Creazione delle righe per ogni colore e taglia disponibile
    var isFirst = true;
    article.coloriDisponibili.forEach(color => {

        var scontoApplicato;

        const item = ordine.find(item => item.colore.toLowerCase() === color.toLowerCase() && item.id === article._id);
        if (item) {
            scontoApplicato = item.scontoApplicato
            console.log("vero");
        } else {
            scontoApplicato = 0
        }


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

            <td rowspan="${article.coloriDisponibili.length}"> <input type="number" class="scontoApplicato" id="${article._id}_ScontoApplicato" name="${article._id}_ScontoApplicato" step="1" value=${scontoApplicato} min="0" max="100"></td>
            
            <td rowspan="${article.coloriDisponibili.length}">${article.barCodes.join(", ")} </td>

            <td rowspan="${article.coloriDisponibili.length}" class="qtaTh" id="${article._id}_qtaTotale" ">0</td>
            
            <td rowspan="${article.coloriDisponibili.length}" class="totaleTh" id="${article._id}_Totale" ">0</td>
            `

            isFirst = false;
        }

        row.innerHTML += ` <td>${color}</td>`;

        for (var i = 0; i < colSpanTaglie; i++) {
            if (i < article.taglieDisponibili.length) {

                var qta;

                const item = ordine.find(item => item.colore.toLowerCase() === color.toLowerCase() && item.taglia.toLowerCase() === article.taglieDisponibili[i].toLowerCase() && item.id === article._id)
                if (item) {
                    qta = item.qta
                    console.log("vero");
                } else {
                    qta = 0
                }

                row.innerHTML += `
                    <td>${article.taglieDisponibili[i]}</td>
                    <td>
                        <input type="number" class="numArticoliTaglia" id="Id$${article._id}_Color$${color}_Taglia$${article.taglieDisponibili[i]}" name="${article._id}_Qta" value="${qta}" step="1">
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

/*salva articoli in locale e in database remoto*/

function autoUpdate() {

    document.getElementById("taglieDisponibiliTh").colSpan = colSpanTaglie * 2;

    // Seleziona tutti gli elementi <input> con la classe "numArticoliTaglia"
    const inputList = document.querySelectorAll('.numArticoliTaglia');
    const scontoList = document.querySelectorAll('.scontoApplicato');

    // Aggiungere un listener agli input per l'evento di cambiamento
    for (let i = 0; i < inputList.length; i++) {
        inputList[i].addEventListener("change", calcolaTotale)
        inputList[i].addEventListener("change", aggiornaOrdine)
    }

    for (let i = 0; i < scontoList.length; i++) {
        scontoList[i].addEventListener("change", aggiornaTotale);

        //Genero un evento per aggiornare tutti i totali automaticamente nel caso in cui l'ordine sia già esistente
        scontoList[i].dispatchEvent(new Event('change'))
    }

    function aggiornaTotale() {

        const idPattern = `(.+)_ScontoApplicato`;
        const match = this.name.match(idPattern);

        if (match && match.length > 1) {
            var articleId = match[1];

            if (this.value > 100) this.value = 100
            if (this.value < 0) this.value = 0

            // Seleziona l'elemento di input
            const inputElement = document.getElementsByName(articleId + '_Qta');

            inputElement.forEach(element => {
                console.log("value:" + element.value)
                if (element.value != 0) {

                    console.log(inputElement.value)
                    // Crea un nuovo evento di input
                    const inputEvent = new Event('change');

                    // Genera l'evento sull'elemento di input
                    element.dispatchEvent(inputEvent);
                }
            })

        }
    }

    function calcolaTotale() {
        //console.log(this.name);
        //console.log(this.value);

        articleId = extractIdFromString(this.name);

        var inputsQtaTaglie = document.getElementsByName(this.name);

        var totaleQta = 0;

        for (let i = 0; i < inputsQtaTaglie.length; i++) {
            //console.log(inputs[i].name+":"+inputs[i].value)
            if (inputsQtaTaglie[i].value < 0) {
                inputsQtaTaglie[i].value = 0;
            }
            if (inputsQtaTaglie[i].value) {
                totaleQta += parseInt(inputsQtaTaglie[i].value);
            }
        }

        document.getElementById(articleId + "_qtaTotale").textContent = totaleQta;

        prezzoArticolo = parseFloat(document.getElementById(articleId + "_Prezzo").textContent)

        document.getElementById(articleId + "_Totale").textContent = (Math.round(totaleQta * prezzoArticolo * 100)) / 100 + "€";
        console.log(totaleQta * prezzoArticolo)

        prezzoArticolo = parseFloat(document.getElementById(articleId + "_Prezzo").textContent)
        scontoArticolo = parseFloat(document.getElementById(articleId + "_ScontoApplicato").value)
        scontoArticolo = scontoArticolo * prezzoArticolo / 100;

        document.getElementById(articleId + "_Totale").textContent = (Math.round(totaleQta * (prezzoArticolo - scontoArticolo) * 100)) / 100 + "€";
        console.log(totaleQta * prezzoArticolo)
    }

    //Aggiorna il local storage dell'ordine
    function aggiornaOrdine() {

        var ordineAttivo = JSON.parse(localStorage.getItem("ordineAttivo"));

        var inputString = this.id;

        // Divide la stringa in base al carattere di separazione "_"
        var splitted = inputString.split("_");

        // Mappa gli elementi divisi per ottenere solo i valori dopo "$"
        var result = splitted.map(function (item) {
            return item.split("$")[1];
        });

        // Assegna i valori alle variabili "id", "colore" e "taglia"
        var id = result[0];
        var colore = result[1];
        var taglia = result[2];

        console.log("Id:", id);
        console.log("Colore:", colore);
        console.log("Taglia:", taglia);
        console.log("Qta:", this.value);
        console.log("Sconto applicato:", document.getElementById(id + "_ScontoApplicato").value)

        var scontoApplicato = document.getElementById(id + "_ScontoApplicato").value;
        if (!scontoApplicato) scontoApplicato = 0;

        var newObject = {
            "id": id,
            "colore": colore,
            "taglia": taglia,
            "qta": this.value,
            "scontoApplicato": scontoApplicato
        };

        var index = ordineAttivo.listaArticoli.findIndex(function (item) {
            return (
                item.id === newObject.id &&
                item.colore === newObject.colore &&
                item.taglia === newObject.taglia
            );
        });

        if (index === -1) {
            ordineAttivo.listaArticoli.push(newObject);
        } else {
            if (this.value == 0) {
                ordineAttivo.listaArticoli.splice(index, 1);
            } else {
                ordineAttivo.listaArticoli[index] = newObject;
            }

        }

        localStorage.setItem("ordineAttivo", JSON.stringify(ordineAttivo));

        save();
    }

    /**
     * Inizio ambiente auto save
     */



  

    function save() {
            let ordineAttivo = JSON.parse(localStorage.getItem("ordineAttivo"));

            fetch('../ordini/' + ordineAttivo._id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify(ordineAttivo)
            })
                .then((resp) => resp.json()) // Transform the data into json
                .then(function (data) { // Here you get the data to modify as you please
                    console.log(data);
                })
                .catch(error => console.error(error)); // If there is any error, you will catch them here
       
    }

    /**
     * Fine ambiente auto save
     */

};

/*Riepilogo ordine*/

function loadRiepilogoOrdine() {
    getArticoliInOrdine();
    configureModal()
}

var totaleOrdine = 0;

function getArticoliInOrdine() {
    var ordine = JSON.parse(localStorage.getItem("ordineAttivo"));

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

    openModalButton.addEventListener("click", async function () {
        modal.style.display = "block";
        await riempiCampiSpedizione();
        var check=document.getElementById("checkSameFatturazione").checked;
        if(check){
            document.getElementById("indirizzoFatturazioneSpan").style.display = "none";
        }
    });

    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });
}

function riempiCampiSpedizione(){
    var clienteID = JSON.parse(localStorage.getItem("ordineAttivo")).cliente;
    fetch('../clienti/' + clienteID, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
      })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) { // Here you get the data to modify as you please

          document.getElementById("paeseSpedizione").value = data.paese;
          document.getElementById("provinciaSpedizione").value = data.provincia;
          document.getElementById("regioneSpedizione").value = data.regione;
          document.getElementById("cittaSpedizione").value = data.anagrafica.citta;
          document.getElementById("viaSpedizione").value = data.anagrafica.via;
          document.getElementById("capZipSpedizione").value = data.anagrafica.capZip;
          document.getElementById("civicoSpedizione").value = data.anagrafica.civico;
        })
        .catch(error => {
          console.error('Errore durante la richiesta:', error);
        });
}

function verificaIndirizzoSpedizione(){
    document.getElementById("verifiedSpedizione").textContent="Verifico..."
    document.getElementById("verifiedSpedizione").style.color="black"
  
    var paese=document.getElementById("paeseSpedizione").value;
    var provincia=document.getElementById("provinciaSpedizione").value;
    var regione=document.getElementById("regioneSpedizione").value;
    var citta=document.getElementById("cittaSpedizione").value;
    var via=document.getElementById("viaSpedizione").value;
    var capZip=document.getElementById("capZipSpedizione").value;
    var civico=document.getElementById("civicoSpedizione").value;
  
    if(paese!="" &&  regione!="" &&  provincia!="" &&  via!="" &&  capZip!=""){
  
      var address={
        civico:civico,
        via:via,
        citta:citta,
        provincia:provincia,
        regione:regione,
        capZip:capZip,
        nazione:paese,
      }
    
      fetch('../geolocalization/adv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(address)
      })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) { // Here you get the data to modify as you please
          // Elaboro la risposta del server
          console.log('Dati salvati:', data);
    
          if(data.field!="empty"){
            document.getElementById("verifiedSpedizione").textContent="Verificato"
            document.getElementById("verifiedSpedizione").style.color="darkgreen"
          }else{
            document.getElementById("verifiedSpedizione").textContent="Non trovato"
            document.getElementById("verifiedSpedizione").style.color="darkred"
          }
        })
        .catch(error => {
          console.error('Errore durante la richiesta:', error);
        });
    }else{
      document.getElementById("verifiedSpedizione").textContent="Campi obbligatori mancanti"
      document.getElementById("verifiedSpedizione").style.color="darkred"
    }
  }

function verificaIndirizzoFatturazione(){
    document.getElementById("verifiedFatturazione").textContent="Verifico..."
    document.getElementById("verifiedFatturazione").style.color="black"

  
    var paese=document.getElementById("paeseFatturazione").value;
    var provincia=document.getElementById("provinciaFatturazione").value;
    var regione=document.getElementById("regioneFatturazione").value;
    var citta=document.getElementById("cittaFatturazione").value;
    var via=document.getElementById("viaFatturazione").value;
    var capZip=document.getElementById("capZipFatturazione").value;
    var civico=document.getElementById("civicoFatturazione").value;
  
    if(paese!="" &&  regione!="" &&  provincia!="" &&  via!="" &&  capZip!=""){
  
      var address={
        civico:civico,
        via:via,
        citta:citta,
        provincia:provincia,
        regione:regione,
        capZip:capZip,
        nazione:paese,
      }
    
      fetch('../geolocalization/adv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(address)
      })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) { // Here you get the data to modify as you please
          // Elaboro la risposta del server
          console.log('Dati salvati:', data);
    
          if(data.field!="empty"){
            document.getElementById("verifiedFatturazione").textContent="Verificato"
            document.getElementById("verifiedFatturazione").style.color="darkgreen"
          }else{
            document.getElementById("verifiedFatturazione").textContent="Non trovato"
            document.getElementById("verifiedFatturazione").style.color="darkred"
          }
        })
        .catch(error => {
          console.error('Errore durante la richiesta:', error);
        });
    }else{
      document.getElementById("verifiedFatturazione").textContent="Campi obbligatori mancanti"
      document.getElementById("verifiedFatturazione").style.color="darkred"
    }
  }

function toggleIndirizzoFatturazione(){
    var check=document.getElementById("checkSameFatturazione").checked;
    if(check){
        document.getElementById("indirizzoFatturazioneSpan").style.display = "none";
    }else{
        document.getElementById("indirizzoFatturazioneSpan").style.display = "block";
    }
}

function concludiOrdine() {

    let ordineAttivo = JSON.parse(localStorage.getItem("ordineAttivo"));

    var paeseSpedizione=document.getElementById("paeseSpedizione").value;
    var provinciaSpedizione=document.getElementById("provinciaSpedizione").value;
    var regioneSpedizione=document.getElementById("regioneSpedizione").value;
    var cittaSpedizione=document.getElementById("cittaSpedizione").value;
    var viaSpedizione=document.getElementById("viaSpedizione").value;
    var capZipSpedizione=document.getElementById("capZipSpedizione").value;
    var civicoSpedizione=document.getElementById("civicoSpedizione").value;

    var paeseFatturazione;
    var provinciaFatturazione;
    var regioneFatturazione;
    var cittaFatturazione;
    var viaFatturazione;
    var capZipFatturazione;
    var civicoFatturazione;

    var check=document.getElementById("checkSameFatturazione").checked;
    if(check){
        paeseFatturazione=paeseSpedizione;
        provinciaFatturazione=provinciaSpedizione;
        regioneFatturazione=regioneSpedizione;
        cittaFatturazione=cittaSpedizione;
        viaFatturazione=viaSpedizione;
        capZipFatturazione=capZipSpedizione;
        civicoFatturazione=civicoSpedizione;
    }else{
        paeseFatturazione=document.getElementById("paeseFatturazione").value;
        provinciaFatturazione=document.getElementById("provinciaFatturazione").value;
        regioneFatturazione=document.getElementById("regioneFatturazione").value;
        cittaFatturazione=document.getElementById("cittaFatturazione").value;
        viaFatturazione=document.getElementById("viaFatturazione").value;
        capZipFatturazione=document.getElementById("capZipFatturazione").value;
        civicoFatturazione=document.getElementById("civicoFatturazione").value;
    }

    var dataSpedizione = document.getElementById("dataSpedizione").value;
    var modalitaPagamento = document.getElementById("modalitaPagamento").value;
    var note = document.getElementById("note").value;

    if (paeseFatturazione && provinciaFatturazione && regioneFatturazione && cittaFatturazione && viaFatturazione && capZipFatturazione && 
        paeseSpedizione && provinciaSpedizione && regioneSpedizione && cittaSpedizione && viaSpedizione && capZipSpedizione) {
            var indirizzoSpedizione={
                    paeseSpedizione:paeseSpedizione,
                    provinciaSpedizione:provinciaSpedizione,
                    regioneSpedizione:regioneSpedizione,
                    cittaSpedizione:cittaSpedizione,
                    viaSpedizione:viaSpedizione,
                    capZipSpedizione:capZipSpedizione,
                    civicoSpedizione:civicoSpedizione
            }

            var indirizzoFatturazione={
                paeseFatturazione:paeseFatturazione,
                provinciaFatturazione:provinciaFatturazione,
                regioneFatturazione:regioneFatturazione,
                cittaFatturazione:cittaFatturazione,
                viaFatturazione:viaFatturazione,
                capZipFatturazione:capZipFatturazione,
                civicoFatturazione:civicoFatturazione
            }
        
            fetch('../ordini/' + ordineAttivo._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({ isEvaso: true, 
                indirizzoSpedizione: indirizzoSpedizione, 
                indirizzoFatturazione: indirizzoFatturazione,
                dataSpedizione: dataSpedizione,
                modalitaPagamento: modalitaPagamento,
                note: note })
        })
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) { // Here you get the data to modify as you please

                createPDFFromJSON(indirizzoSpedizione, indirizzoFatturazione, dataSpedizione, modalitaPagamento, note)

            })
            .catch(error => console.error(error)); // If there is any error, you will catch them here

        //createPDFFromJSON();
    } else {
        document.getElementById("errore").textContent = "I campi sono obbligatori"
    }


}

function createPDFFromJSON(indirizzoSpedizione, indirizzoFatturazione, dataSpedizione, modalitaPagamento, note) {
    document.getElementById("successo").textContent = "Attendi..."
    document.getElementById("successo").color = "black"

    var ordineAttivo = JSON.parse(localStorage.getItem("ordineAttivo"));

    const aziende = document.getElementsByClassName("aziendaTable");

    fetch('../clienti/' + ordineAttivo.cliente, {
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

                        html = "<h1> Ordine " + ordineAttivo._id + "</h1>";

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

                        html += "<span><strong>Indirizzo spedizione: </strong>" + jsonToHTML(indirizzoSpedizione) + "<span>"

                        html += "<br>"

                        html += "<span><strong>Indirizzo fatturazione: </strong>" + jsonToHTML(indirizzoFatturazione) + "<span>"

                        html += "<br>"

                        html += "<span><strong>Data spedizione: </strong>" + dataSpedizione + "<span>"

                        html += "<br>"

                        html += "<span><strong>Modalità pagamento: </strong>" + modalitaPagamento + "<span>"

                        html += "<br>"

                        html += "<span><strong>Note: </strong>" + note + "<span>"

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
                            body: JSON.stringify({ email:email, html: html, outputFilePath: nomeAzienda + "_" + ordineAttivo._id + '.pdf' })
                        })
                            .then(resp => resp.json())
                            .then(function (data) {
                                document.getElementById("errore").textContent = ""
                                document.getElementById("successo").textContent = "Ordine salvato e inviato."

                                localStorage.removeItem("ordineAttivo");
                                
                                setTimeout(()=>window.location.href="../home/easterEgg.html",500);
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

