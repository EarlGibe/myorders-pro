//SWAGGER

/* 

swagger: "2.0"
info:
  title: API per la gestione degli articoli
  version: 1.0.0
basePath: /api
schemes:
  - http
  - https
consumes:
  - application/json
produces:
  - application/json
paths:
  /articoli:
    get:
      summary: Restituisce tutti gli articoli
      responses:
        200:
          description: Elenco di tutti gli articoli
          schema:
            type: array
            items:
              $ref: '#/definitions/Articolo'
        500:
          description: Si è verificato un errore durante la ricerca degli articoli
    post:
      summary: Crea un nuovo articolo
      parameters:
        - name: Articolo
          in: body
          required: true
          schema:
            $ref: '#/definitions/ArticoloInput'
      responses:
        201:
          description: Articolo creato con successo
          schema:
            type: object
            properties:
              message:
                type: string
              createdArticolo:
                $ref: '#/definitions/Articolo'
        500:
          description: Si è verificato un errore durante la creazione dell'articolo
    put:
      summary: Aggiorna tutti gli articoli
      parameters:
        - name: Articolo
          in: body
          required: true
          schema:
            $ref: '#/definitions/ArticoloInput'
      responses:
        200:
          description: Articoli aggiornati con successo
          schema:
            type: object
            properties:
              n:
                type: number
              nModified:
                type: number
              ok:
                type: number
        400:
          description: Errore durante l'aggiornamento degli articoli
    delete:
      summary: Cancella tutti gli articoli
      responses:
        200:
          description: Articoli cancellati con successo
          schema:
            type: object
            properties:
              n:
                type: number
              ok:
                type: number
        400:
          description: Errore durante la cancellazione degli articoli
  /articoli/{id}:
    get:
      summary: Restituisce l'articolo con l'id specificato
      parameters:
        - name: id
          in: path
          required: true
          type: string
      responses:
        200:
          description: Articolo trovato con successo
          schema:
            $ref: '#/definitions/Articolo'
        404:
          description: L'articolo richiesto non è stato trovato
        500:
          description: Si è verificato un errore durante la ricerca dell'articolo
    put:
      summary: Aggiorna l'articolo con l'id specificato
      parameters:
        - name: id
          in: path
          required: true
          type: string
        - name: Articolo
          in: body
          required: true
          schema:
            $ref: '#/definitions/ArticoloInput'
      responses:
        200:
          description: Articolo aggiornato con successo
          schema:
            $ref: '#/definitions/Articolo'
        400:
          description: Errore durante l'aggiornamento dell'articolo
    delete:
      summary: Elimina un articolo con un ID specifico
      parameters:
        - in: path
          name: id
          description: ID dell'articolo da eliminare
          required: true
          schema:
            type: string
            format: ObjectId
      responses:
        200:
          description: Articolo eliminato con successo
          content:
            application/json:
              schema:
                type: object
                properties:
                  _id:
                    type: string
                    format: ObjectId
                    description: ID dell'articolo eliminato
                  name:
                    type: string
                    description: Nome dell'articolo eliminato
                  descrizione:
                    type: string
                    description: Descrizione dell'articolo eliminato
                  coloriDisponibili:
                    type: array
                    items:
                      type: string
                    description: Colori disponibili per l'articolo eliminato
                  taglieDisponibili:
                    type: array
                    items:
                      type: string
                    description: Taglie disponibili per l'articolo eliminato
                  scontoApplicato:
                    type: number
                    description: Sconto applicato all'articolo eliminato
                  prezzo:
                    type: number
                    description: Prezzo dell'articolo eliminato
                  status:
                    type: string
                    enum: [disponibile, non disponibile]
                    description: Stato dell'articolo eliminato
        400:
          description: Errore durante l'eliminazione dell'articolo
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    description: Descrizione dell'errore
     

 */

const express = require('express');
const router = express.Router();

const Articolo = require('./models/articolo');

router.get('', async(req,res)=>{
    try{
         const arrayArticoliDB= await Articolo.find();
         console.log(arrayArticoliDB);
         if(!arrayArticoliDB){
          res.status(404).send("Error: articoli non trovati");
         }else{
          res.json(arrayArticoliDB);
         }
         
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca degli articoli.' });
    }
})

router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const articolo = await Articolo.findById(id);
      if (articolo) {
        res.json(articolo);
      } else {
        res.status(404).json({ error: 'L\'articolo richiesto non è stato trovato.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dell\'articolo.' });
    }
  });

 // Gestore per la richiesta POST /articoli
router.post('', async (req, res) => {
    const newArticolo = req.body;
  
    try {
      // Crea un nuovo oggetto Articolo con i dati ricevuti dalla richiesta
      const nuovoArticolo = new Articolo({
        newArticolo
      });
  
      // Salva il nuovo articolo nel database
      const risultato = await nuovoArticolo.save();


      // Invia la risposta HTTP con il nuovo documento creato
      res.status(201).json({
        message: "Articolo creato con successo",
        createdArticolo: {
          risultato,
          request: {
            type: 'GET',
            url: '/' + risultato._id
          }
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json("error: "+error);
    }
  });

// PUT generale
router.put('', async (req, res) => {
  try {
    const updatedArticolo = await Articolo.updateMany({}, req.body);
    res.status(200).json(updatedArticolo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT con ID specifico
router.put('/:id', async (req, res) => {
  try {
    const updatedArticolo = await Articolo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedArticolo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE generale
router.delete('', async (req, res) => {
  try {
    const deletedArticolo = await Articolo.deleteMany({});
    res.status(200).json(deletedArticolo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// DELETE con ID specifico
router.delete('/:id', async (req, res) => {
  try {
    const deletedArticolo = await Articolo.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedArticolo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

//APIARY

/*

API Documentation for Articolo:

This API handles CRUD operations for "Articolo" (Italian for "Article") objects. The API is built using Node.js with Express framework and MongoDB for data storage.

Endpoint: GET '/'

Description: Retrieves all the articles.

Request:
- Method: GET
- Endpoint: '/'
- Headers: None
- Body: None

Response:
- Status Code: 200
- Headers: None
- Body: JSON object containing an array of all the articles.

Endpoint: GET '/:id'

Description: Retrieves an article by ID.

Request:
- Method: GET
- Endpoint: '/:id'
- Headers: None
- Body: None
- Parameters: 
  - id: the ID of the article to retrieve.

Response:
- Status Code: 200 if the article is found, 404 if not found.
- Headers: None
- Body: JSON object containing the article data.

Endpoint: POST '/'

Description: Creates a new article.

Request:
- Method: POST
- Endpoint: '/'
- Headers: 
  - Content-Type: application/json
- Body: JSON object containing the new article data.

Response:
- Status Code: 201
- Headers: None
- Body: JSON object containing the created article data, along with a URL to retrieve it.

Endpoint: PUT '/'

Description: Updates all articles.

Request:
- Method: PUT
- Endpoint: '/'
- Headers: 
  - Content-Type: application/json
- Body: JSON object containing the updated article data.

Response:
- Status Code: 200
- Headers: None
- Body: JSON object containing the updated article data.

Endpoint: PUT '/:id'

Description: Updates an article by ID.

Request:
- Method: PUT
- Endpoint: '/:id'
- Headers: 
  - Content-Type: application/json
- Body: JSON object containing the updated article data.
- Parameters: 
  - id: the ID of the article to update.

Response:
- Status Code: 200 if the article is updated, 404 if not found.
- Headers: None
- Body: JSON object containing the updated article data.

Endpoint: DELETE '/'

Description: Deletes all articles.

Request:
- Method: DELETE
- Endpoint: '/'
- Headers: None
- Body: None

Response:
- Status Code: 200
- Headers: None
- Body: JSON object containing the number of deleted articles.

Endpoint: DELETE '/:id'

Description: Deletes an article by ID.

Request:
- Method: DELETE
- Endpoint: '/:id'
- Headers: None
- Body: None
- Parameters: 
  - id: the ID of the article to delete.

Response:
- Status Code: 200 if the article is deleted, 404 if not found.
- Headers: None
- Body: JSON object containing the deleted article data.

*/