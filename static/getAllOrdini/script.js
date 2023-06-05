const token = localStorage.getItem("token");
const userData=JSON.parse(localStorage.getItem("subagente"));

function getAllOrdini() {
    // Effettua una richiesta GET ai dati dei ordini dal server
    fetch('../ordini/filteredBySubagente/' + userData._id, {
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

    fetch('../clienti/' + ordine.cliente, {
        method: 'GET',
        headers: {
            'x-access-token': token
        },
    })
        .then(response => response.json())
        .then(data => {
            nomeCliente=data.anagrafica.nome+"_"+data.anagrafica.cognome;
            // Imposta il nome del ordine
            nomeOrdine.textContent = nomeCliente+"_"+new Date(ordine.dataInserimento).toLocaleString();
        })
        .catch(error => {
            console.log('Si è verificato un errore:', error);
        });

    
    // Imposta l'ID del ordine come attributo del pulsante
    viewButton.setAttribute('data-id', ordine._id);

    // Aggiungi il testo al pulsante
    viewButton.textContent = 'Visualizza';

    // Aggiungi un gestore di eventi al pulsante per reindirizzare alla pagina del ordine
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
                localStorage.setItem("ordineAttivo",JSON.stringify(data))
                window.location.href = '../creaOrdine/riepilogoOrdine.html';
            })
            .catch(error => {
                console.log('Si è verificato un errore:', error);
            });
    });

    // Aggiungi gli elementi al DOM
    listItem.appendChild(nomeOrdine);
    listItem.appendChild(viewButton);
    ordiniList.appendChild(listItem);
}