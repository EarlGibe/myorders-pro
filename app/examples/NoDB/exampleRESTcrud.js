const express = require('express');
const app = express();


let books = [
  { id: 1, title: 'Il signore degli anelli', author: 'Tolkien' },
  { id: 2, title: '1984', author: 'George Orwell' },
  { id: 3, title: 'Cime tempestose', author: 'Emily Bronte' }
];

// READ (get a book by ID)
app.get('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(book => book.id === bookId);
  
    if (!book) {
      res.status(404).send('Book not found');
    } else {
      res.json(book);
    }
  });

// Metodo POST per aggiungere un nuovo libro
app.post('/api/books', (req, res) => {
  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(book);
  res.location("/api/books/" + book.id).status(201).send();
});

// PUT an array of books
app.put('/api/books', (req, res) => {
    const booksToUpdate = req.body.books;

  try {
    // controlla che il body contenga un array di libri
    if (!Array.isArray(booksToUpdate)) {
      return res.status(400).send('Il body deve contenere un array di libri');
    }

    // itera l'array di libri e aggiorna ogni libro nel database
    for (let i = 0; i < booksToUpdate.length; i++) {
      const book = booksToUpdate[i];

      // controlla che ogni libro abbia un id
      if (!book.id) {
        return res.status(400).send('Ogni libro deve avere un ID');
      }

      // cerca il libro nel database
      const existingBook = books.find(b => b.id === parseInt(book.id));

      // se il libro non esiste, passa al libro successivo
      if (!existingBook) {
        continue;
      }

      // aggiorna il libro nel database
      existingBook.title = book.title;
      existingBook.author = book.author;
    }

    return res.status(200).send('Collezione di libri aggiornata correttamente');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Errore durante l\'aggiornamento della collezione di libri\n'+err);
  }
  });

// Metodo PUT per aggiornare un libro esistente
app.put('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    res.status(404).send('Book not found');
    return;
  }
  book.title = req.body.title;
  book.author = req.body.author;
  res.send('Book updated successfully');
});

// PUT an array of books
app.delete('/api/books', (req, res) => {
    const booksToDelete = req.body.books;

  try {
    // controlla che il body contenga un array di libri
    if (!Array.isArray(booksToDelete)) {
      return res.status(400).send('Il body deve contenere un array di libri');
    }

    // itera l'array di libri e aggiorna ogni libro nel database
    for (let i = 0; i < booksToDelete.length; i++) {
      const book = booksToDelete[i];

      // controlla che ogni libro abbia un id
      if (!book.id) {
        return res.status(400).send('Ogni libro deve avere un ID');
      }

      // cerca il libro nel database
      const existingBook = books.findIndex(b => b.id === parseInt(book.id));

      // se il libro non esiste, passa al libro successivo
      if (existingBook===-1) {
        continue;
      }

      // elimina il libro nel database
     books.splice(existingBook,1)
    }

    return res.send('Collezione di libri eliminata correttamente');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Errore durante l\'eliminazione della collezione di libri\n'+err);
  }
  });

// Metodo DELETE per eliminare un libro esistente
app.delete('/api/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    res.status(404).send('Book not found');
    return;
  }
  books.splice(bookIndex, 1);
  res.send('Book deleted successfully');
});

module.exports = app;