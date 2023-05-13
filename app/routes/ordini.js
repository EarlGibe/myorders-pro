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
      res.status(404).send('ordine non trovato');
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
    const articoli = getArticoliByordineId(id);
  
    if (!articoli) {
      res.status(404).send('Articoli non trovati');
    }
  
    // Restituisci l'utente come JSON
    res.json(articoli);
  });
  
  // Definisci l'endpoint per creare un nuovo utente
  app.post('/ordini/create', (req, res) => {
  
    // Recupera i dati dell'utente dal corpo della richiesta
    const newordine = req.body;
  
    // Effettua la validazione dei dati dell'utente
    if (!newordine.name) {
      res.status(400).send('Nome del ordine obbligatorio');
    }
  
    // Crea il nuovo utente nel database
    const createdordine = createOrdine(newordine);
  
    // Restituisci il nuovo utente come JSON
    res.json(createdordine);
  });

  // Definisci l'endpoint per creare un nuovo utente
  app.post('/ordini/update/:id', (req, res) => {
  
    // Recupera i dati dell'utente dal corpo della richiesta
    const id = req.params.id;
    const updateordine = req.body;
  
    // Effettua la validazione dei dati dell'utente
    if (!updateordine.name) {
      res.status(400).send('Nome del ordine obbligatorio');
    }

    // Crea il nuovo utente nel database
    const updatedordine = updateordine(id,updateordine);
  
    // Restituisci il nuovo utente come JSON
    res.json(updatedordine);
  });

  // Definisci l'endpoint per creare un nuovo utente
  app.post('/ordini/create', (req, res) => {
  
    // Recupera i dati dell'utente dal corpo della richiesta
    const newordine = req.body;
  
    // Effettua la validazione dei dati dell'utente
    if (!newordine.name) {
      res.status(400).send('Nome del ordine obbligatorio');
    }
  
    // Crea il nuovo utente nel database
    const createdordine = createOrdine(newordine);
  
    // Restituisci il nuovo utente come JSON
    res.json(createdordine);
  });

  // Definisci l'endpoint per creare un nuovo utente
  app.post('/ordini/delete/:id', (req, res) => {
  
    // Recupera i dati dell'utente dal corpo della richiesta
    const id = req.params.id;

    // Crea il nuovo utente nel database
    const deletedordine = deleteordine(id);
  
    // Restituisci il nuovo utente come JSON
    res.json(deletedordine);
  });

  // Funzione di esempio per recuperare un utente dal database
  function getAllOrdini() {
    const ordini = [
      { id: 1, name: 'Mario Rossi' },
      { id: 2, name: 'Luigi Verdi' },
      { id: 3, name: 'Carlo Bianchi' },
    ];
  
    return ordini;
  }

  // Funzione di esempio per recuperare un utente dal database
  function getOrdineById(id) {
    const ordini = [
      { id: 1, name: 'Mario Rossi' },
      { id: 2, name: 'Luigi Verdi' },
      { id: 3, name: 'Carlo Bianchi' },
    ];
  
    return ordini.find(ordine => ordini.id === parseInt(id));
  }

  // Funzione di esempio per recuperare un utente dal database
  function getArticoliByordineId(id) {
    const articoli = [
      { id: 1, name: 'Mario Rossi' },
      { id: 2, name: 'Luigi Verdi' },
      { id: 3, name: 'Carlo Bianchi' },
    ];
  
    return articoli.find(articolo => articoli.id === parseInt(id));
  }
  
  // Funzione di esempio per creare un nuovo utente nel database
  function createOrdine(newordine) {
    // Logica per creare un nuovo utente nel database
    return {
      id: 1,
      name: newordine.name,
      articoli: newordine.articoli,
      status: newordine.status
    };
  }

  function updateordine(id,newOrdine) {
    // Logica per creare un nuovo utente nel database
    return {
      id: id,
      name: updateordine.name,
      articoli: updateordine.articoli,
      status: updateordine.status
    };
  }

  function deleteordine(id){
    return {
        id: id,
        done: 'yes'
      };
  }

// Avvia l'applicazione sulla porta port
app.listen(port, () => {
  console.log('API avviata sulla porta '+port);
});
