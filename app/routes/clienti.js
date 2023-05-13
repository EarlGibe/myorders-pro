const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// Configura il middleware per il parsing del body della richiesta come JSON
app.use(bodyParser.json());

// Avvia l'applicazione sulla porta port
app.listen(port, () => {
  console.log('API avviata sulla porta ' + port);
});

// Definisci l'endpoint per creare un nuovo utente
app.post('/clienti/create', (req, res) => {

  // Recupera i dati del cliente dal corpo della richiesta
  const newCliente = req.body;

  // Effettua la validazione dei dati del cliente
  if (!newCliente.anagrafica) {
    res.status(400).send('Anagrafica del cliente obbligatoria');
  }

  // Crea il nuovo cliente nel database
  const createdCliente = createCliente(newCliente);

  // Restituisci il nuovo utente come JSON
  res.json(createdCliente);
});

// Definisci l'endpoint per la lettura di tutti i clienti
app.post('/clienti/read/all', (req, res) => {
  // Effettua l'autenticazione
  /*if (req.headers.authorization !== 'Bearer TOKEN_DI_AUTENTICAZIONE') {
    res.status(401).send('Unauthorized');
  }*/

  // Recupera l'elenco dei clienti dal database
  const clienti = getAllClienti();

  // Restituisci l'elenco dei clienti come JSON
  res.json(clienti);
});

// Definisci l'endpoint per i clienti
app.post('/clienti/read/:id', (req, res) => {
    // Effettua l'autenticazione
    /*if (req.headers.authorization !== 'Bearer TOKEN_DI_AUTENTICAZIONE') {
      res.status(401).send('Unauthorized');
    }*/
  
    // Recupera l'ID del cliente dal parametro della richiesta
    const id = req.params.id;
  
    // Recupera l'utente corrispondente dall'ID
    const cliente = getClienteById(id);
  
    if (!cliente) {
      res.status(404).send('Cliente non trovato');
    }
  
    // Restituisci l'utente come JSON
    res.json(cliente);
  });

  // Definisci l'endpoint per creare un nuovo utente
  app.post('/clienti/update/:id', (req, res) => {
  
    // Recupera i dati del cliente dal corpo della richiesta
    const id = req.params.id;
    const newCliente = req.body;
  
    // Effettua la validazione dei dati del cliente
    if (!newCliente.name) {
      res.status(400).send('Nome del cliente obbligatorio');
    }

    // Crea il nuovo utente nel database
    const updatedCliente = updateCliente(id,newCliente);
  
    // Restituisci il nuovo utente come JSON
    res.json(updatedCliente);
  });

  // Definisci l'endpoint per creare un nuovo utente
  app.post('/clienti/delete/:id', (req, res) => {
  
    // Recupera i dati del cliente dal corpo della richiesta
    const id = req.params.id;

    // Crea il nuovo utente nel database
    const deletedCliente = deleteCliente(id);
  
    // Restituisci il nuovo utente come JSON
    res.json(deletedCliente);
  });

  // Funzione di esempio per creare un nuovo utente nel database
  function createCliente(newCliente) {
    // Logica per creare un nuovo utente nel database
    return {
      id: 1,
      name: newCliente.name,
      articoli: newCliente.articoli,
      status: newCliente.status
    };
  }

  // Funzione di esempio per recuperare un utente dal database
  function getAllClienti() {
    const clienti = [
      { id: 1, name: 'Mario Rossi' },
      { id: 2, name: 'Luigi Verdi' },
      { id: 3, name: 'Carlo Bianchi' },
    ];
  
    return clienti;
  }

  // Funzione di esempio per recuperare un utente dal database
  function getClienteById(id) {
    const clienti = [
      { id: 1, name: 'Mario Rossi' },
      { id: 2, name: 'Luigi Verdi' },
      { id: 3, name: 'Carlo Bianchi' },
    ];
  
    return clienti.find(cliente => clienti.id === parseInt(id));
  }

  function updateCliente(id,cliente) {
    // Logica per creare un nuovo utente nel database
    return {
      id: id,
      name: cliente.anagrafica
    };
  }

  function deleteCliente(id){
    return {
        id: id,
        done: 'yes'
      };
  }