const express = require('express');
const app = express();

// Definisci l'endpoint per gli utenti
app.post('/users/:userId', (req, res) => {
  // Effettua l'autenticazione
  if (req.headers.authorization !== 'Bearer TOKEN_DI_AUTENTICAZIONE') {
    res.status(401).send('Unauthorized');
  }

  // Recupera l'ID dell'utente dal parametro della richiesta
  const userId = req.params.userId;

  // Recupera l'utente corrispondente dall'ID
  const user = getUserById(userId);

  if (!user) {
    res.status(404).send('Utente non trovato');
  }

  // Restituisci l'utente come JSON
  res.json(user);
});

// Funzione di esempio per recuperare un utente dal database
function getUserById(userId) {
  const users = [
    { id: 1, name: 'Mario Rossi' },
    { id: 2, name: 'Luigi Verdi' },
    { id: 3, name: 'Carlo Bianchi' },
  ];

  return users.find(user => user.id === parseInt(userId));
}

// Avvia l'applicazione sulla porta 3000
app.listen(3000, () => {
  console.log('API avviata sulla porta 3000');
});
