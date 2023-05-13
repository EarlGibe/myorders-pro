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

// Definisci l'endpoint per creare un nuovo subagente
app.post('/subagenti/create', (req, res) => {

  // Recupera i dati del subagente dal corpo della richiesta
  const newSubagente = req.body;

  // Effettua la validazione dei dati del subagente
  if (!newSubagente.anagrafica) {
    res.status(400).send('Anagrafica del subagente obbligatoria');
  }

  // Crea il nuovo subagente nel database
  const createdSubagente = createSubagente(newSubagente);

  // Restituisci il nuovo subagente come JSON
  res.json(createdSubagente);
});

// Definisci l'endpoint per i subagenti
app.post('/subagenti/read/all', (req, res) => {
  // Effettua l'autenticazione
  /*if (req.headers.authorization !== 'Bearer TOKEN_DI_AUTENTICAZIONE') {
    res.status(401).send('Unauthorized');
  }*/

  // Recupera l'elenco dei subagenti dal database
  const subagenti = getAllSubagenti();

  // Restituisci l'elenco dei subagenti come JSON
  res.json(subagenti);
});
  
  // Definisci l'endpoint per i subagenti
app.post('/subagenti/read/:id/', (req, res) => {
    // Effettua l'autenticazione
    /*if (req.headers.authorization !== 'Bearer TOKEN_DI_AUTENTICAZIONE') {
      res.status(401).send('Unauthorized');
    }*/
  
    // Recupera l'ID del subagente dal parametro della richiesta
    const id = req.params.id;
  
    // Recupera l'subagente corrispondente dall'ID
    const articoli = getSubagenteById(id);
  
    if (!articoli) {
      res.status(404).send('Subagente non trovato');
    }
  
    // Restituisci l'subagente come JSON
    res.json(articoli);
  });

  // Definisci l'endpoint per creare un nuovo subagente
  app.post('/subagenti/update/:id', (req, res) => {

    // Recupera i dati del subagente dal corpo della richiesta
    const id = req.params.id;
    const subagente = req.body;

    // aggiorna il subagente nel database
    const updatedSubagente = updateSubagente(id,subagente);
  
    // Restituisci il nuovo subagente come JSON
    res.json(updatedSubagente);
  });

  // Definisci l'endpoint per creare un nuovo subagente
  app.post('/subagenti/delete/:id', (req, res) => {
  
    // Recupera i dati del subagente dal corpo della richiesta
    const id = req.params.id;

    // Crea il nuovo subagente nel database
    const deletedSubagente = deleteSubagente(id);
  
    // Restituisci il nuovo subagente come JSON
    res.json(deletedSubagente);
  });

  // Funzione di esempio per creare un nuovo subagente nel database
  function createSubagente(newSubagente) {
    // Logica per creare un nuovo subagente nel database
    return {
      id: 1,
      name: newSubagente.name,
      articoli: newSubagente.articoli,
      status: newSubagente.status
    };
  }

  // Funzione di esempio per recuperare tutti i subagenti dal database
  function getAllSubagenti() {
    const subagenti = [
      { id: 1, name: 'Mario Rossi' },
      { id: 2, name: 'Luigi Verdi' },
      { id: 3, name: 'Carlo Bianchi' },
    ];
  
    return subagenti;
  }

  // Funzione di esempio per recuperare un subagente dal database
  function getSubagenteById(id) {
    const subagenti = [
      { id: 1, name: 'Mario Rossi' },
      { id: 2, name: 'Luigi Verdi' },
      { id: 3, name: 'Carlo Bianchi' },
    ];
  
    return subagenti.find(subagente => subagenti.id === parseInt(id));
  }

  function updateSubagente(id,newSubagente) {
    // Logica per aggiornare un subagente nel database
    return {
      id: id,
      name: newSubagente.name,
      articoli: newSubagente.articoli,
      status: newSubagente.status
    };
  }

  function deleteSubagente(id){
        // Logica per eliminare un subagente nel database
    return {
        id: id,
        done: 'yes'
      };
  }