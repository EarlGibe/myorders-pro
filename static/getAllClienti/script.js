const token = localStorage.getItem("token");

// Effettua una richiesta GET ai dati dei clienti dal server
fetch('../clienti',{
  method: 'GET',
  headers: {
      'x-access-token': token
  },
})
.then(response => response.json())
.then(data => {
const clientiList = document.getElementById('clientiList');

// Itera attraverso i dati dei clienti e crea gli elementi della lista
data.forEach(cliente => {
  const listItem = document.createElement('li');
  const nomeCliente = document.createElement('span');
  const viewButton = document.createElement('button');

  // Imposta il nome del cliente
  nomeCliente.textContent = cliente.anagrafica.nome;

  // Imposta l'ID del cliente come attributo del pulsante
  viewButton.setAttribute('data-id', cliente._id);

  // Aggiungi il testo al pulsante
  viewButton.textContent = 'Visualizza';

  // Aggiungi un gestore di eventi al pulsante per reindirizzare alla pagina del cliente
  viewButton.addEventListener('click', function() {
  const clienteId = this.getAttribute('data-id');
  window.location.href = '../profiloCliente/index.html?clienteId=' + clienteId;
  });

  // Aggiungi gli elementi al DOM
  listItem.appendChild(nomeCliente);
  listItem.appendChild(viewButton);
  clientiList.appendChild(listItem);
});
})
.catch(error => {
  console.log('Si è verificato un errore:', error);
});