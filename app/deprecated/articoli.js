const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 3000;

// Configura il middleware per il parsing del body della richiesta come JSON
app.use(bodyParser.json());

// Avvia l'applicazione sulla porta http
app.listen(port, () => {
  console.log('API avviata sulla porta ' + port);
});

// Definisci l'endpoint per creare un nuovo articolo
app.post('/articoli/create', (req, res) => {
  // Effettua l'autenticazione
  /*if (req.headers.authorization !== 'Bearer TOKEN_DI_AUTENTICAZIONE') {
    res.status(401).send('Unauthorized');
  }*/

  // Recupera i dati dell'articolo dal corpo della richiesta
  const newArticolo = req.body;

  // Effettua la validazione dei dati dell'utente
  if (!newArticolo.nome || !newArticolo.prezzo) {
    res.status(400).send('Nome e prezzo dell\'articolo sono obbligatori');
  }

  // Crea il nuovo articolo nel database
  const createdArticolo = createArticolo(newArticolo);

  // Restituisci il nuovo utente come JSON
  res.json(createdArticolo);
});

// Definisci l'endpoint per gli articoli
app.post('/articoli/read/all', (req, res) => {
  // Effettua l'autenticazione
  // if (req.headers.authorization !== 'Bearer TOKEN_DI_AUTENTICAZIONE') {
  //  res.status(401).send('Unauthorized');
  // }

  // Recupera l'elenco degli articoli dal database
  const articoli = getAllArticoli();

  // Restituisci l'elenco degli articoli come JSON
  res.json(articoli);
});

// Definisci l'endpoint per gli articoli
app.post('/articoli/read/:id', (req, res) => {
  // Effettua l'autenticazione
  // if (req.headers.authorization !== 'Bearer TOKEN_DI_AUTENTICAZIONE') {
  //  res.status(401).send('Unauthorized');
  // }

  // Recupera l'ID dell'articolo dal parametro della richiesta
  const id = req.params.id;

  // Recupera l'articolo corrispondente dall'ID
  const articolo = getArticoloById(id);

  if (!articolo) {
    res.status(404).send('Articolo non trovato');
  }

  // Restituisci l'articolo come JSON
  res.json(articolo);
});

// Definisci l'endpoint per aggiornare un nuovo articolo
app.post('/articoli/update/:id', (req, res) => {
      // Recupera i dati dell'articolo dal corpo della richiesta
      const id = req.params.id;
      const articolo = req.body;
  
      // aggiorna il subagente nel database
      const updatedArticolo = updateArticolo(id,articolo);
    
      // Restituisci il nuovo subagente come JSON
      res.json(updatedArticolo);
});

// Definisci l'endpoint per cancellare un nuovo articolo
app.post('/articoli/delete/:id', (req, res) => {
    
    // Recupera i dati del subagente dal corpo della richiesta
    const id = req.params.id;

    // Crea il nuovo subagente nel database
    const deletedArticolo = deleteArticolo(id);
  
    // Restituisci il nuovo subagente come JSON
    res.json(deletedArticolo);
});

// Funzione di esempio per creare un nuovo utente nel database
function createArticolo(newArticolo) {
  // Logica per creare un nuovo utente nel database
  return {
    id: 1,
    nome: newArticolo.nome,
    prezzo: newArticolo.prezzo
  };
}

// Funzione di esempio per recuperare tutti gli articoli dal database
function getAllArticoli() {
  const articoli = [
    { id: 1, name: 'Mario Rossi' },
    { id: 2, name: 'Luigi Verdi' },
    { id: 3, name: 'Carlo Bianchi' },
  ];

  return articoli;
}

// Funzione di esempio per recuperare un articolo dal database
function getArticoloById(id) {
  const articoli = [
    { id: 1, name: 'Mario Rossi' },
    { id: 2, name: 'Luigi Verdi' },
    { id: 3, name: 'Carlo Bianchi' },
  ];

  return articoli.find(articolo => articolo.id === parseInt(id));
}

// Funzione di esempio per creare un nuovo utente nel database
function updateArticolo(id) {
    return {
      id: id,
      done: 'yes'
    };
}


// Funzione di esempio per creare un nuovo utente nel database
function deleteArticolo(id) {
  return {
    id: id,
    done: 'yes'
  };
}