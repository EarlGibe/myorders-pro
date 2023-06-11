const token = localStorage.getItem("token");

var queryString = window.location.search;
  var parametri = new URLSearchParams(queryString);
  // Ottenere l'ID del cliente dalla query string o da altre fonti
  const clienteId = parametri.get("clienteId"); 

// Funzione per ottenere i dati del cliente dal server
function getClientData() {
    fetch(`/clienti/${clienteId}`,{
      method: 'GET',
      headers: {'x-access-token': token}
    })
      .then(response => response.json())
      .then(data => {
        anagrafica=data.anagrafica;
        // Popolare i campi del profilo con i dati ottenuti
        document.getElementById("nome").textContent = data.nome;
        document.getElementById("cognome").textContent = data.cognome;
        document.getElementById("codiceFiscale").textContent = anagrafica.codiceFiscale;
        document.getElementById("paese").textContent = data.paese; 
        document.getElementById("regione").textContent = data.regione;
        document.getElementById("provincia").textContent = data.provincia;
        document.getElementById("citta").textContent=anagrafica.citta;
        document.getElementById("via").textContent=anagrafica.via;
        document.getElementById("capZip").textContent=anagrafica.capZip;
        document.getElementById("civico").textContent=anagrafica.civico;
        document.getElementById("telefono").textContent = anagrafica.telefono;
        document.getElementById("email").textContent = anagrafica.email;
        document.getElementById("ragioneSociale").textContent = anagrafica.ragioneSociale;
        document.getElementById("pIVA").textContent = anagrafica.pIVA;
        document.getElementById("sede").textContent = anagrafica.sede;
        document.getElementById("codSDI").textContent = anagrafica.codSDI;
        document.getElementById("pec").textContent = anagrafica.pec;
      })
      .catch(error => {
        console.error("Si è verificato un errore:", error);
      });
  }
  
  function openModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
  
    var modalContent = document.getElementById("modal-content");
  
    // Effettua la chiamata AJAX per caricare il contenuto della pagina
    $.ajax({
      url: "../getAllOrdini/index.html?clienteId="+clienteId,
      success: function (data) {
        modalContent.innerHTML = data;
        getAllOrdini()
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
  }

  function getAllOrdini() {
    // Effettua una richiesta GET ai dati dei ordini dal server
    fetch('../ordini/filteredByCliente/' + clienteId, {
        method: 'GET',
        headers: {
            'x-access-token': token
        },
    })
        .then(response => response.json())
        .then(data => {
            var ordiniList = document.getElementById('ordiniList');
            
            // Itera attraverso i dati dei ordini e crea gli elementi della lista
            data.forEach(ordine => {
                populateOrdini(ordine, ordiniList);
            });
        })
        .catch(error => {
            console.log('Si è verificato un errore:', error);
        });
}

function populateOrdini(ordine, ordiniList) {
    console.log(ordine)

    const listItem = document.createElement('li');
    const nomeOrdine = document.createElement('span');
    const viewButton = document.createElement('button');

    // Imposta il nome del ordine
    nomeOrdine.textContent = new Date(ordine.dataInserimento).toLocaleString();

    // Imposta l'ID del ordine come attributo del pulsante
    viewButton.setAttribute('data-id', ordine._id);

    // Aggiungi il testo al pulsante
    viewButton.textContent = 'Visualizza';

    // Aggiungi un gestore di eventi al pulsante per reindirizzare alla pagina del ordine
    viewButton.addEventListener('click', function () {
        const ordineId = this.getAttribute('data-id');
        window.location.href = '../visualizzaOrdine?ordineId=' + ordineId+'&clienteId='+clienteId;
    });

    // Aggiungi gli elementi al DOM
    listItem.appendChild(nomeOrdine);
    listItem.appendChild(viewButton);
    ordiniList.appendChild(listItem);
}