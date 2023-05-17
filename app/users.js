/*

openapi: 3.0.0
info:
  title: Documentazione API User
  version: 1.0.0
paths:
  /users:
    get:
      summary: Ottieni tutti gli utenti
      responses:
        '200':
          description: Elenco degli utenti
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
        '500':
          description: Si è verificato un errore durante la ricerca degli utenti
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Messaggio di errore
    post:
      summary: Crea un nuovo utente
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/User'
      responses:
        '201':
          description: Utente creato con successo
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    description: Messaggio di successo
                  createdUser:
                    type: object
                    properties:
                      risultato:
                        $ref: '#/components/schemas/User'
                      request:
                        type: object
                        properties:
                          type:
                            type: string
                            enum: ['GET']
                            description: Tipo di richiesta
                          url:
                            type: string
                            description: URL per ottenere il nuovo utente
        '500':
          description: Si è verificato un errore durante la creazione dell'utente
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Messaggio di errore
  /users/{id}:
    get:
      summary: Ottieni un utente per ID
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: string
            description: ID dell'utente
      responses:
        '200':
          description: Dati dell'utente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          description: L'utente richiesto non è stato trovato
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Messaggio di errore
        '500':
          description: Si è verificato un errore durante la ricerca dell'utente
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Messaggio di errore
    put:
      summary: Aggiorna un utente per ID
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: string
            description: ID dell'utente
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/User'
      responses:
        '200':
          description: Utente aggiornato con successo
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '400':
          description: Errore durante l'aggiornamento dell'utente
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    description: Messaggio di errore
    delete:
      summary: Elimina un utente per ID
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: string
            description: ID dell'utente
      responses:
        '200':
          description: Utente eliminato con successo
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '400':
          description: Errore durante l'eliminazione dell'utente
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    description: Messaggio di errore
components:
  schemas:
    User:
      type: object
      properties:
        username:
          type: string
          description: Username dell'utente
          required: true
        password:
          type: string
          description: Password dell'utente
          required: true
        role:
          type: string
          description: Ruolo dell'utente
          required: true
        isActive:
          type: boolean
          description: Stato di attivazione dell'utente
          default: false


*/

const express = require('express');
const router = express.Router();

const User = require('./models/user');

router.get('', async(req,res)=>{
    try{
         const arrayUsersDB= await User.find();
         console.log(arrayUsersDB)
         res.status(200).json(arrayUsersDB);
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dell\'utente.' });
    }
})

router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'L\'user richiesto non è stato trovato.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dell\'user.' });
    }
  });

 // Gestore per la richiesta POST /articoli
router.post('', async (req, res) => {
    const newUser = req.body;
  
    try {
      // Crea un nuovo oggetto User con i dati ricevuti dalla richiesta
      const nuovoUser = new User({
        newUser
      });
  
      // Salva il nuovo user nel database
      const risultato = await nuovoUser.save();


      // Invia la risposta HTTP con il nuovo documento creato
      res.status(201).json({
        message: "User creato con successo",
        createdUser: {
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
    const updatedUser = await User.updateMany({}, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT con ID specifico
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE generale
router.delete('', async (req, res) => {
  try {
    const deletedUser = await User.deleteMany({});
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// DELETE con ID specifico
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;