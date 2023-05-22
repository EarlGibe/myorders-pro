const token = localStorage.getItem("token");

// Effettua una richiesta GET ai dati dei aziende dal server
fetch('../aziende',{
method: 'GET',
headers: {
    'x-access-token': token
},
})
.then(response => response.json())
.then(data => {
const aziendeList = document.getElementById('aziendeList');

// Itera attraverso i dati dei aziende e crea gli elementi della lista
data.forEach(azienda => {
    const listItem = document.createElement('li');
    const nomeAzienda = document.createElement('span');
    const viewButton = document.createElement('button');

    // Imposta il nome del azienda
    nomeAzienda.textContent = azienda.dati.nome;

    // Imposta l'ID del azienda come attributo del pulsante
    viewButton.setAttribute('data-id', azienda._id);

    // Aggiungi il testo al pulsante
    viewButton.textContent = 'Visualizza';

    // Aggiungi un gestore di eventi al pulsante per reindirizzare alla pagina del azienda
    viewButton.addEventListener('click', function() {
    const aziendaId = this.getAttribute('data-id');
    window.location.href = '/aziende/' + aziendaId;
    });

    // Aggiungi gli elementi al DOM
    listItem.appendChild(nomeAzienda);
    listItem.appendChild(viewButton);
    aziendeList.appendChild(listItem);
});
})
.catch(error => {
console.log('Si è verificato un errore:', error);
});