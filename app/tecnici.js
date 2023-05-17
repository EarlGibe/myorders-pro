/*

openapi: 3.0.0
info:
  title: Documentazione API Tecnici
  version: 1.0.0
paths:
  /tecnici:
    get:
      summary: Recupera tutti i tecnici
      responses:
        '200':
          description: Elenco dei tecnici
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Tecnico'
        '404':
          description: Nessun tecnico trovato
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Messaggio di errore
    post:
      summary: Crea un nuovo tecnico
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TecnicoInput'
      responses:
        '200':
          description: Tecnico creato con successo
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    description: Messaggio di successo
                  createdTecnico:
                    $ref: '#/components/schemas/Tecnico'
    put:
      summary: Aggiorna tutti i tecnici
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TecnicoInput'
      responses:
        '200':
          description: Tecnici aggiornati con successo
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    description: Messaggio di successo
    delete:
      summary: Elimina tutti i tecnici
      responses:
        '200':
          description: Tecnici eliminati con successo
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    description: Messaggio di successo
  /tecnici/{id}:
    get:
      summary: Recupera un tecnico specifico
      parameters:
        - in: path
          name: id
          description: ID del tecnico
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Tecnico trovato
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Tecnico'
        '404':
          description: Tecnico non trovato
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Messaggio di errore
    put:
      summary: Aggiorna un tecnico specifico
      parameters:
        - in: path
          name: id
          description: ID del tecnico
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TecnicoInput'
      responses:
        '200':
          description: Tecnico aggiornato con successo
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Tecnico'
        '404':
          description: Tecnico non trovato
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Messaggio di errore
    delete:
      summary: Elimina un tecnico specifico
      parameters:
        - in: path
          name: id
          description: ID del tecnico
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Tecnico eliminato con successo
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Tecnico'
        '404':
          description: Tecnico non trovato
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Messaggio di errore
components:
  schemas:
    Tecnico:
      type: object
      properties:
        _id:
          type: string
          description: ID del tecnico
        username:
          type: string
          description: Nome utente
        password:
          type: string
          description: Password del tecnico
        status:
          type: boolean
          description: Stato del tecnico
        loggedIn:
          type: boolean
          description: Flag di accesso
        isFirstAccess:
          type: boolean
          description: Flag del primo accesso
        codiceFiscale:
          type: string
          description: Codice fiscale del tecnico
        email:
          type: string
          description: Email del tecnico
    TecnicoInput:
      type: object
      properties:
        username:
          type: string
          description: Nome utente
          required: true
        password:
          type: string
          description: Password del tecnico
          required: true
        status:
          type: boolean
          description: Stato del tecnico
        loggedIn:
          type: boolean
          description: Flag di accesso
        isFirstAccess:
          type: boolean
          description: Flag del primo accesso
        codiceFiscale:
          type: string
          description: Codice fiscale del tecnico
          required: true
        email:
          type: string
          description: Email del tecnico
          required: true


*/

const express = require('express');
const router = express.Router();

const Tecnico = require('./models/tecnico');

// GET /tecnici
router.get('', async(req,res)=>{
    try{
      const arrayTecniciDB = await Tecnici.find();
            
      if (arrayTecniciDB) res.json(arrayTecniciDB);
      else res.status(404).json({ error: 'La lista tecnici è vuota.' });           
    } catch(error){
        console.log(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dei tecnici.' });
    }
})

// GET /tecnici/:id
router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const tecnico = await tecnico.findById(id);

      if (tecnico) res.json(tecnico);
      else res.status(404).json({ error: 'Il tecnico richiesto non è stato trovato.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca del tecnico.' });
    }
});

 // POST /tecnici
router.post('', async (req, res) => {
  try {
    const nuovoTecnico = new Tecnico(req.body);
    const risultato = await nuovoTecnico.save();
    res.json({
      message: "Tecnico inserito con successo",
      createdTecnico: {
        risultato,
        request: {
          type: 'GET',
          url: '/' + risultato._id
        }
      }
    });
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

// PUT
router.put('', async (req, res) => {
  try {
    const updatedTecnici = await Tecnico.updateMany({}, req.body);
    res.status(200).json(updatedTecnici);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (id)
router.put('/:id', async (req, res) => {
  try {
    const idTecnico = req.params.id;
    const nuovoTecnico = req.body;
    const risultato = await Tecnico.findByIdAndUpdate(idTecnico, nuovoTecnico, { new: true });
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

// DELETE
router.delete('', async (req, res) => {
  try {
    const deletedTecnici = await Tecnici.deleteMany({});
    res.status(200).json(deletedTecnici);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE (id)
router.delete('/:id', async (req, res) => {
  try {
    const idTecnico = req.params.id;
    const risultato = await Tecnico.findByIdAndDelete(idTecnico);
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

module.exports = router;