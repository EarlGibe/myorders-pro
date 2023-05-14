const express = require('express');
const app = express();

// Definisci l'endpoint per gli utenti
app.get('/users', (req, res) => {
  // Effettua l'autenticazione
  if (req.headers.authorization !== 'Bearer TOKEN_DI_AUTENTICAZIONE') {
    res.status(401).send('Unauthorized');
  }

  // Recupera l'elenco degli utenti dal database
  const users = [
    { id: 1, name: 'Mario Rossi' },
    { id: 2, name: 'Luigi Verdi' },
    { id: 3, name: 'Carlo Bianchi' },
  ];

  // Restituisci l'elenco degli utenti come JSON
  res.json(users);
});

// Avvia l'applicazione sulla porta 3000
app.listen(3000, () => {
  console.log('API avviata sulla porta 3000');
});
