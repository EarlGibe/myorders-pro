const token = localStorage.getItem("token");

var queryString = window.location.search;
var parametri = new URLSearchParams(queryString);
// Ottenere l'ID del cliente dalla query string o da altre fonti
const clienteId = parametri.get("clienteId"); 


// Effettua una richiesta GET ai dati dei ordini dal server
fetch('../ordini',{
method: 'GET',
headers: {
    'x-access-token': token
},
})
.then(response => response.json())
.then(data => {
const ordiniList = document.getElementById('ordiniList');

// Itera attraverso i dati dei ordini e crea gli elementi della lista
data.forEach(ordine => {
    console.log(ordine)
    if(ordine.cliente==clienteId || !clienteId){
        const listItem = document.createElement('li');
    const nomeOrdine = document.createElement('span');
    const viewButton = document.createElement('button');

    // Imposta il nome del ordine
    nomeOrdine.textContent = ordine._id;

    // Imposta l'ID del ordine come attributo del pulsante
    viewButton.setAttribute('data-id', ordine._id);

    // Aggiungi il testo al pulsante
    viewButton.textContent = 'Visualizza';

    // Aggiungi un gestore di eventi al pulsante per reindirizzare alla pagina del ordine
    viewButton.addEventListener('click', function() {
    const ordineId = this.getAttribute('data-id');
    window.location.href = '/ordini/id=' + ordineId;
    });

    // Aggiungi gli elementi al DOM
    listItem.appendChild(nomeOrdine);
    listItem.appendChild(viewButton);
    ordiniList.appendChild(listItem);
    }
});
})
.catch(error => {
console.log('Si è verificato un errore:', error);
});