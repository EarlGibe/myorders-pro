/**
swagger: '2.0'
info:
  title: Cataloghi API
  version: 1.0.0
  description: API for managing catalogues and their articles.
basePath: /
schemes:
  - http
consumes:
  - application/json
produces:
  - application/json
paths:
  /cataloghi/read/all:
    post:
      summary: Get all catalogues
      description: Returns a list of all catalogues in the database.
      consumes:
        - application/json
      produces:
        - application/json
      responses:
        '200':
          description: OK
          schema:
            type: array
            items:
              type: object
              properties:
                id:
                  type: integer
                name:
                  type: string
    /cataloghi/read/{id}:
    post:
      summary: Get a single catalogue by ID
      description: Returns a single catalogue with the given ID.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the catalogue to retrieve.
          required: true
          type: integer
      responses:
        '200':
          description: OK
          schema:
            type: object
            properties:
              id:
                type: integer
              name:
                type: string
        '404':
          description: Catalogue not found
    /cataloghi/read/{id}/articoli/all:
    post:
      summary: Get all articles for a catalogue
      description: Returns a list of all articles for the catalogue with the given ID.
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the catalogue to retrieve articles for.
          required: true
          type: integer
      responses:
        '200':
          description: OK
          schema:
            type: array
            items:
              type: object
              properties:
                id:
                  type: integer
                name:
                  type: string
        '404':
          description: Articles not found
    /cataloghi/create:
      post:
        summary: Create a new catalogue
        description: Creates a new catalogue in the database.
        consumes:
          - application/json
        produces:
          - application/json
        parameters:
          - in: body
            name: body
            description: Catalogue object to be created.
            required: true
            schema:
              type: object
              properties:
                name:
                  type: string
        responses:
          '200':
            description: OK
            schema:
              type: object
              properties:
                id:
                  type: integer
                name:
                  type: string
          '400':
            description: Invalid input data
    /cataloghi/update/{id}:
    /cataloghi/delete/{id}

    TO FINISH
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// Configura il middleware per il parsing del body della richiesta come JSON
app.use(bodyParser.json());

// Definisci l'endpoint per gli utenti
app.get('', (req, res) => {

  // Recupera l'elenco degli utenti dal database
  const cataloghi = getAllCataloghi();

  // Restituisci l'elenco degli utenti come JSON
  res.json(cataloghi);
});

// Definisci l'endpoint per gli utenti
app.get('/:id', (req, res) => {
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
app.get('/:id/articoli', (req, res) => {
  
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

  // Metodo POST per aggiungere un nuovo libro
app.post('', (req, res) => {
  const newCatalogo=req.body;
  createCatalogo(newCatalogo);
  res.location("" + book.id).status(201).send();
});
  
  // Definisci l'endpoint per creare un nuovo utente
  app.put('', (req, res) => {
  
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
  app.put('/:id', (req, res) => {
  
    // Recupera i dati dell'utente dal corpo della richiesta
    const id = req.params.id;
    const newCatalogo = req.body;
  
    // Effettua la validazione dei dati dell'utente
    if (!newCatalogo.name) {
      res.status(400).send('Nome del catalogo obbligatorio');
    }

    // Crea il nuovo utente nel database
    const updatedCatalogo = updateCatalogo(id,newCatalogo);
  
    // Restituisci il nuovo utente come JSON
    res.json(updatedCatalogo);
  });

  // Definisci l'endpoint per creare un nuovo utente
  app.delete('/:id', (req, res) => {
  
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

  function updateCatalogo(id,newCatalogo) {
    // Logica per creare un nuovo utente nel database
    return {
      id: id,
      name: newCatalogo.name,
      articoli: newCatalogo.articoli,
      status: newCatalogo.status
    };
  }

  function deleteCatalogo(id){
    return {
        id: id,
        done: 'yes'
      };
  }

module.exports = app;