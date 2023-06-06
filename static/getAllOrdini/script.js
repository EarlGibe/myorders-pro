const token = localStorage.getItem("token");
const userData = JSON.parse(localStorage.getItem("userData"));
const role=localStorage.getItem("role");

function getAllOrdini() {
  // Effettua una richiesta GET ai dati dei ordini dal server
  if(role=="dipendente" || userData.isAgente){
    fetch('../ordini', {
      method: 'GET',
      headers: {
        'x-access-token': token
      },
    })
      .then(response => response.json())
      .then(data => {
        var ordiniList = document.getElementById('ordiniList');
  
        if (data!="") {
          // Itera attraverso i dati dei ordini e crea gli elementi della lista
          data.forEach(ordine => {
            populateOrdini(ordine, ordiniList);
          });
        }else{
          document.getElementById("warning").textContent="Non sono presenti ordini";
        }
  
      })
      .catch(error => {
        console.log('Si è verificato un errore:', error);
      });
  }else if(role=="subagente"){
    fetch('../ordini/filteredBySubagente/' + userData._id, {
      method: 'GET',
      headers: {
        'x-access-token': token
      },
    })
      .then(response => response.json())
      .then(data => {
        var ordiniList = document.getElementById('ordiniList');
  
        if (data!="") {
          // Itera attraverso i dati dei ordini e crea gli elementi della lista
          data.forEach(ordine => {
            populateOrdini(ordine, ordiniList);
          });
        }else{
          document.getElementById("warning").textContent="Non sono presenti ordini";
        }
  
      })
      .catch(error => {
        console.log('Si è verificato un errore:', error);
      });
  }
  
}

function populateOrdini(ordine, ordiniList) {
  console.log(ordine)

  const listItem = document.createElement('li');
  const nomeOrdine = document.createElement('span');
  const buttonsOrdine=document.createElement('span');
  const viewButton = document.createElement('button');
  const concludiButton = document.createElement('button');

  fetch('../clienti/' + ordine.cliente, {
    method: 'GET',
    headers: {
      'x-access-token': token
    },
  })
    .then(response => response.json())
    .then(data => {
      nomeCliente = data.nome + "_" + data.cognome;
      // Imposta il nome del ordine
      nomeOrdine.textContent = nomeCliente + "_" + new Date(ordine.dataInserimento).toLocaleString();
    })
    .catch(error => {
      console.log('Si è verificato un errore:', error);
    });


  // Imposta l'ID del ordine come attributo del pulsante
  viewButton.setAttribute('data-id', ordine._id);

  // Aggiungi il testo al pulsante
  viewButton.textContent = 'Visualizza';

  if(!ordine.isEvaso){
    concludiButton.textContent = 'Concludi';
    concludiButton.setAttribute('data-id', ordine._id);
  }

  // Aggiungi un gestore di eventi al pulsante per visualizzare il riepilogo ordine
  viewButton.addEventListener('click', function () {
    const ordineId = this.getAttribute('data-id');

    fetch('../ordini/' + ordineId, {
      method: 'GET',
      headers: {
        'x-access-token': token
      },
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("ordineAttivo", JSON.stringify(data))
        openModal();
      })
      .catch(error => {
        console.log('Si è verificato un errore:', error);
      });
  });

  // Aggiungi un gestore di eventi al pulsante per reindirizzare alla pagina del ordine
  concludiButton.addEventListener('click', function () {
    const ordineId = this.getAttribute('data-id');

    fetch('../ordini/' + ordineId, {
      method: 'GET',
      headers: {
        'x-access-token': token
      },
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("ordineAttivo", JSON.stringify(data))
        window.location.href="../creaOrdine/riepilogoOrdine.html"
      })
      .catch(error => {
        console.log('Si è verificato un errore:', error);
      });
  });


  buttonsOrdine.id="buttonsName";

  // Aggiungi gli elementi al DOM
  buttonsOrdine.appendChild(viewButton);
  if(!ordine.isEvaso){
    buttonsOrdine.appendChild(concludiButton)
  }
  listItem.appendChild(nomeOrdine);
  listItem.appendChild(buttonsOrdine);
  ordiniList.appendChild(listItem);
}


function openModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "block";

  var modalContent = document.getElementById("modal-content");

  // Effettua la chiamata AJAX per caricare il contenuto della pagina
  $.ajax({
    url: "../creaOrdine/riepilogoOrdine.html",
    success: function (data) {
      modalContent.innerHTML = data;
      getArticoliInOrdine()
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

  totaleOrdine = 0
  aziendaMap = new Map();
  catalogoMap = new Map();
  totaleOrdinePerCatalogoMap = new Map();
}

/*riepilogo ordine*/

var totaleOrdine = 0;
function getArticoliInOrdine() {
  var ordine = JSON.parse(localStorage.getItem("ordineAttivo"));

  document.getElementById("numeroOrdine").textContent=ordine._id;

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
        nameAzienda.textContent = azienda.dati.nome;
        nameAzienda.className = "nameAzienda";

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