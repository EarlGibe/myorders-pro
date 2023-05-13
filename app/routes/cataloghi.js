const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// Configura il middleware per il parsing del body della richiesta come JSON
app.use(bodyParser.json());

// Definisci l'endpoint per gli utenti
app.post('/cataloghi/read/all', (req, res) => {
  // Effettua l'autenticazione
  /*if (req.headers.authorization !== 'Bearer TOKEN_DI_AUTENTICAZIONE') {
    res.status(401).send('Unauthorized');
  }*/

  // Recupera l'elenco degli utenti dal database
  const cataloghi = getAllCataloghi();

  // Restituisci l'elenco degli utenti come JSON
  res.json(cataloghi);
});

// Definisci l'endpoint per gli utenti
app.post('/cataloghi/read/:id', (req, res) => {
    // Effettua l'autenticazione
    /*if (req.headers.authorization !== 'Bearer TOKEN_DI_AUTENTICAZIONE') {
      res.status(401).send('Unauthorized');
    }*/
  
    // Recupera l'ID dell'utente dal parametro della richiesta
    const id = req.params.id;
  
    // Recupera l'utente corrispondente dall'ID
    const catalogo = getCatalogoById(id);
  
    if (!catalogo) {
      res.status(404).send('Catalogo non trovato');
    }
  
    // Restituisci l'utente come JSON
    res.json(catalogo);
  });
  
  // Definisci l'endpoint per gli utenti
app.post('/cataloghi/read/:id/articoli/all', (req, res) => {
    // Effettua l'autenticazione
    /*if (req.headers.authorization !== 'Bearer TOKEN_DI_AUTENTICAZIONE') {
      res.status(401).send('Unauthorized');
    }*/
  
    // Recupera l'ID dell'utente dal parametro della richiesta
    const id = req.params.id;
  
    // Recupera l'utente corrispondente dall'ID
    const articoli = getArticoliByCatalogoId(id);
  
    if (!articoli) {
      res.status(404).send('Articoli non trovati');
    }
  
    // Restituisci l'utente come JSON
    res.json(articoli);
  });
  
  // Definisci l'endpoint per creare un nuovo utente
  app.post('/cataloghi/create', (req, res) => {
  
    // Recupera i dati dell'utente dal corpo della richiesta
    const newCatalogo = req.body;
  
    // Effettua la validazione dei dati dell'utente
    if (!newCatalogo.name) {
      res.status(400).send('Nome del catalogo obbligatorio');
    }
  
    // Crea il nuovo utente nel database
    const createdCatalogo = createCatalogo(newCatalogo);
  
    // Restituisci il nuovo utente come JSON
    res.json(createdCatalogo);
  });

  // Definisci l'endpoint per creare un nuovo utente
  app.post('/cataloghi/update/:id', (req, res) => {
  
    // Recupera i dati dell'utente dal corpo della richiesta
    const id = req.params.id;
    const updateCatalogo = req.body;
  
    // Effettua la validazione dei dati dell'utente
    if (!updateCatalogo.name) {
      res.status(400).send('Nome del catalogo obbligatorio');
    }

    // Crea il nuovo utente nel database
    const updatedCatalogo = updateCatalogo(id,updateCatalogo);
  
    // Restituisci il nuovo utente come JSON
    res.json(updatedCatalogo);
  });

  // Definisci l'endpoint per creare un nuovo utente
  app.post('/cataloghi/create', (req, res) => {
  
    // Recupera i dati dell'utente dal corpo della richiesta
    const newCatalogo = req.body;
  
    // Effettua la validazione dei dati dell'utente
    if (!newCatalogo.name) {
      res.status(400).send('Nome del catalogo obbligatorio');
    }
  
    // Crea il nuovo utente nel database
    const createdCatalogo = createCatalogo(newCatalogo);
  
    // Restituisci il nuovo utente come JSON
    res.json(createdCatalogo);
  });

  // Definisci l'endpoint per creare un nuovo utente
  app.post('/cataloghi/delete/:id', (req, res) => {
  
    // Recupera i dati dell'utente dal corpo della richiesta
    const id = req.params.id;

    // Crea il nuovo utente nel database
    const deletedCatalogo = deleteCatalogo(id);
  
    // Restituisci il nuovo utente come JSON
    res.json(deletedCatalogo);
  });

  // Funzione di esempio per recuperare un utente dal database
  function getAllCataloghi() {
    const cataloghi = [
      { id: 1, name: 'Mario Rossi' },
      { id: 2, name: 'Luigi Verdi' },
      { id: 3, name: 'Carlo Bianchi' },
    ];
  
    return cataloghi;
  }

  // Funzione di esempio per recuperare un utente dal database
  function getCatalogoById(id) {
    const cataloghi = [
      { id: 1, name: 'Mario Rossi' },
      { id: 2, name: 'Luigi Verdi' },
      { id: 3, name: 'Carlo Bianchi' },
    ];
  
    return cataloghi.find(catalogo => cataloghi.id === parseInt(id));
  }

  // Funzione di esempio per recuperare un utente dal database
  function getArticoliByCatalogoId(id) {
    const articoli = [
      { id: 1, name: 'Mario Rossi' },
      { id: 2, name: 'Luigi Verdi' },
      { id: 3, name: 'Carlo Bianchi' },
    ];
  
    return articoli.find(articolo => articoli.id === parseInt(id));
  }
  
  // Funzione di esempio per creare un nuovo utente nel database
  function createCatalogo(newCatalogo) {
    // Logica per creare un nuovo utente nel database
    return {
      id: 1,
      name: newCatalogo.name,
      articoli: newCatalogo.articoli,
      status: newCatalogo.status
    };
  }

  function updateCatalogo(id,updateCatalogo) {
    // Logica per creare un nuovo utente nel database
    return {
      id: id,
      name: updateCatalogo.name,
      articoli: updateCatalogo.articoli,
      status: updateCatalogo.status
    };
  }

  function deleteCatalogo(id){
    return {
        id: id,
        done: 'yes'
      };
  }

// Avvia l'applicazione sulla porta port
app.listen(port, () => {
  console.log('API avviata sulla porta '+port);
});
