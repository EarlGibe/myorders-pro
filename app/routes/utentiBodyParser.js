const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configura il middleware per il parsing del body della richiesta come JSON
app.use(bodyParser.json());

// Definisci l'endpoint per creare un nuovo utente
app.post('/users', (req, res) => {
  // Effettua l'autenticazione
  /*if (req.headers.authorization !== 'Bearer TOKEN_DI_AUTENTICAZIONE') {
    res.status(401).send('Unauthorized');
  }*/

  // Recupera i dati dell'utente dal corpo della richiesta
  const newUser = req.body;

  // Effettua la validazione dei dati dell'utente
  if (!newUser.name || !newUser.email) {
    res.status(400).send('Nome ed email dell\'utente sono obbligatori');
  }

  // Crea il nuovo utente nel database
  const createdUser = createUser(newUser);

  // Restituisci il nuovo utente come JSON
  res.json(createdUser);
});

// Funzione di esempio per creare un nuovo utente nel database
function createUser(newUser) {
  // Logica per creare un nuovo utente nel database
  return {
    id: 1,
    name: newUser.name,
    email: newUser.email
  };
}

// Avvia l'applicazione sulla porta 3000
app.listen(3000, () => {
  console.log('API avviata sulla porta 3000');
});
