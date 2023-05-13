const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// Configura il middleware per il parsing del body della richiesta come JSON
app.use(bodyParser.json());

// Definisci l'endpoint per gli utenti
app.post('/ordini/read/all', (req, res) => {
  // Effettua l'autenticazione
  /*if (req.headers.authorization !== 'Bearer TOKEN_DI_AUTENTICAZIONE') {
    res.status(401).send('Unauthorized');
  }*/

  // Recupera l'elenco degli utenti dal database
  const ordini = getAllOrdini();

  // Restituisci l'elenco degli utenti come JSON
  res.json(ordini);
});

// Definisci l'endpoint per gli utenti
app.post('/ordini/read/:id', (req, res) => {
    // Effettua l'autenticazione
    /*if (req.headers.authorization !== 'Bearer TOKEN_DI_AUTENTICAZIONE') {
      res.status(401).send('Unauthorized');
    }*/
  
    // Recupera l'ID dell'utente dal parametro della richiesta
    const id = req.params.id;
  
    // Recupera l'utente corrispondente dall'ID
    const ordine = getOrdineById(id);
  
    if (!ordine) {
      res.status(404).send('Ordine non trovato');
    }
  
    // Restituisci l'utente come JSON
    res.json(ordine);
  });
  
  // Definisci l'endpoint per gli utenti
app.post('/ordini/read/:id/articoli/all', (req, res) => {
    // Effettua l'autenticazione
    /*if (req.headers.authorization !== 'Bearer TOKEN_DI_AUTENTICAZIONE') {
      res.status(401).send('Unauthorized');
    }*/
  
    // Recupera l'ID dell'utente dal parametro della richiesta
    const id = req.params.id;
  
    // Recupera l'utente corrispondente dall'ID
    const articoli = getArticoliByOrdineId(id);
  
    if (!articoli) {
      res.status(404).send('Articoli non trovati');
    }
  
    // Restituisci l'utente come JSON
    res.json(articoli);
  });

app.post('/ordini/read/:id/cliente', (req, res) => {
  // Effettua l'autenticazione
  /*if (req.headers.authorization !== 'Bearer TOKEN_DI_AUTENTICAZIONE') {
    res.status(401).send('Unauthorized');
  }*/

  // Recupera l'ID dell'utente dal parametro della richiesta
  const id = req.params.id;

  // Recupera l'utente corrispondente dall'ID
  const cliente = getClienteByOrdineId(id);

  if (!cliente) {
    res.status(404).send('Cliente non trovati');
  }

  // Restituisci l'utente come JSON
  res.json(cliente);
});
  
  // Definisci l'endpoint per creare un nuovo utente
  app.post('/ordini/create', (req, res) => {
  
    // Recupera i dati dell'utente dal corpo della richiesta
    const newOrdine = req.body;
  
    // Effettua la validazione dei dati dell'utente
    if (!newOrdine.id || !newOrdine.cliente || !newOrdine.subagente) {
      res.status(400).send('Nome del Ordine obbligatorio');
    }
  
    // Crea il nuovo utente nel database
    const createdOrdine = createOrdine(newOrdine);
  
    // Restituisci il nuovo utente come JSON
    res.json(createdOrdine);
  });

  // Definisci l'endpoint per creare un nuovo utente
  app.post('/ordini/update/:id', (req, res) => {
  
    // Recupera i dati dell'utente dal corpo della richiesta
    const id = req.params.id;
    const newOrdine = req.body;
  
    // Effettua la validazione dei dati dell'utente
    if (!newOrdine.name) {
      res.status(400).send('Nome del Ordine obbligatorio');
    }

    // Crea il nuovo utente nel database
    const updatedOrdine = updateOrdine(id,newOrdine);
  
    // Restituisci il nuovo utente come JSON
    res.json(updatedOrdine);
  });

  // Definisci l'endpoint per creare un nuovo utente
  app.post('/ordini/create', (req, res) => {
  
    // Recupera i dati dell'utente dal corpo della richiesta
    const newOrdine = req.body;
  
    // Effettua la validazione dei dati dell'utente
    if (!newOrdine.name) {
      res.status(400).send('Nome del Ordine obbligatorio');
    }
  
    // Crea il nuovo utente nel database
    const createdOrdine = createOrdine(newOrdine);
  
    // Restituisci il nuovo utente come JSON
    res.json(createdOrdine);
  });

  // Definisci l'endpoint per creare un nuovo utente
  app.post('/ordini/delete/:id', (req, res) => {
  
    // Recupera i dati dell'utente dal corpo della richiesta
    const id = req.params.id;

    // Crea il nuovo utente nel database
    const deletedOrdine = deleteOrdine(id);
  
    // Restituisci il nuovo utente come JSON
    res.json(deletedOrdine);
  });

  // Funzione di esempio per recuperare un utente dal database
  function getAllOrdini() {
    const Ordini = [
      { id: 1, name: 'Mario Rossi' },
      { id: 2, name: 'Luigi Verdi' },
      { id: 3, name: 'Carlo Bianchi' },
    ];
  
    return Ordini;
  }

  // Funzione di esempio per recuperare un utente dal database
  function getOrdineById(id) {
    const Ordini = [
      { id: 1, name: 'Mario Rossi' },
      { id: 2, name: 'Luigi Verdi' },
      { id: 3, name: 'Carlo Bianchi' },
    ];
  
    return Ordini.find(Ordine => Ordini.id === parseInt(id));
  }

  // Funzione di esempio per recuperare un utente dal database
  function getArticoliByOrdineId(id) {
    const articoli = [
      { id: 1, name: 'Mario Rossi' },
      { id: 2, name: 'Luigi Verdi' },
      { id: 3, name: 'Carlo Bianchi' },
    ];
  
    return articoli.find(articolo => articoli.id === parseInt(id));
  }

  // Funzione di esempio per recuperare un utente dal database
  function getClienteByOrdineId(id) {
    const articoli = [
      { id: 1, name: 'Mario Rossi' },
      { id: 2, name: 'Luigi Verdi' },
      { id: 3, name: 'Carlo Bianchi' },
    ];
  
    return articoli.find(articolo => articoli.id === parseInt(id));
  }
  
  // Funzione di esempio per creare un nuovo utente nel database
  function createOrdine(newOrdine) {
    // Logica per creare un nuovo utente nel database
    return {
      id: 1,
      name: newOrdine.name,
      articoli: newOrdine.articoli,
      status: newOrdine.status
    };
  }

  function updateOrdine(id,newOrdine) {
    // Logica per creare un nuovo utente nel database
    return {
      id: id,
      name: newOrdine.name,
      articoli: newOrdine.articoli,
      status: newOrdine.status
    };
  }

  function deleteOrdine(id){
    return {
        id: id,
        done: 'yes'
      };
  }

// Avvia l'applicazione sulla porta port
app.listen(port, () => {
  console.log('API avviata sulla porta '+port);
});
