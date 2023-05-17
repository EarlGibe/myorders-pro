/*

openapi: 3.0.0
info:
  title: Documentazione API Dipendenti
  version: 1.0.0
paths:
  /dipendenti:
    get:
      summary: Restituisce tutti i dipendenti
      responses:
        '200':
          description: Elenco dei dipendenti
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Dipendente'
        '404':
          description: Lista dipendenti vuota
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
    post:
      summary: Inserisce un nuovo dipendente
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Dipendente'
      responses:
        '200':
          description: Dipendente inserito con successo
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                  createdDipendente:
                    type: object
                    properties:
                      risultato:
                        $ref: '#/components/schemas/Dipendente'
                      request:
                        type: object
                        properties:
                          type:
                            type: string
                            example: GET
                          url:
                            type: string
                            example: /dipendenti/1
    put:
      summary: Aggiorna tutti i dipendenti
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Dipendente'
      responses:
        '200':
          description: Dipendenti aggiornati con successo
          content:
            application/json:
              schema:
                type: object
                properties:
                  n:
                    type: integer
                    description: Numero di documenti modificati
                  nModified:
                    type: integer
                    description: Numero di documenti effettivamente modificati
                  ok:
                    type: integer
                    description: Stato dell'operazione
    delete:
      summary: Elimina tutti i dipendenti
      responses:
        '200':
          description: Dipendenti eliminati con successo
          content:
            application/json:
              schema:
                type: object
                properties:
                  n:
                    type: integer
                    description: Numero di documenti eliminati
                  ok:
                    type: integer
                    description: Stato dell'operazione
  /dipendenti/{id}:
    get:
      summary: Restituisce un singolo dipendente
      parameters:
        - name: id
          in: path
          required: true
          description: ID del dipendente da restituire
          schema:
            type: string
      responses:
        '200':
          description: Dipendente restituito con successo
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Dipendente'
        '404':
          description: Dipendente non trovato
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
    put:
      summary: Aggiorna un singolo dipendente
      parameters:
        - name: id
          in: path
          required: true
          description: ID del dipendente da aggiornare
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Dipendente'
      responses:
        '200':
          description: Dipendente aggiornato con successo
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Dipendente'
        '404':
          description: Dipendente non trovato
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
    delete:
      summary: Elimina un singolo dipendente
      parameters:
        - name: id
          in: path
          required: true
          description: ID del dipendente da eliminare
          schema:
            type: string
      responses:
        '200':
          description: Dipendente eliminato con successo
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Dipendente'
        '404':
          description: Dipendente non trovato
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
components:
  schemas:
    Dipendente:
      type: object
      properties:
        username:
          type: string
          description: Nome utente del dipendente
        password:
          type: string
          description: Password del dipendente
        status:
          type: boolean
          description: Stato del dipendente (default: false)
        loggedIn:
          type: boolean
          description: Flag che indica se il dipendente è loggato (default: false)
        isFirstAccess:
          type: boolean
          description: Flag che indica se è il primo accesso del dipendente (


*/

const express = require('express');
const router = express.Router();

const Dipendente = require('./models/dipendente');

// GET /dipendenti
router.get('', async(req,res)=>{
    try{
      const arrayDipendentiDB = await Dipendenti.find().populate('anagrafica');
            
      if (arrayDipendentiDB) res.json(arrayDipendentiDB);
      else res.status(404).json({ error: 'La lista dipendenti è vuota.' });           
    } catch(error){
        console.log(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dei dipendenti.' });
    }
})

// GET /dipendenti/:id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const cliente = await Dipendente.findById(id).populate('anagrafica');

        if (cliente) res.json(cliente);
        else res.status(404).json({ error: 'Il dipendente richiesto non è stato trovato.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca del dipendente.' });
    }
});

 // POST /dipendenti
router.post('', async (req, res) => {
  try {
    const nuovoDipendente = new Dipendente(req.body);
    const risultato = await nuovoDipendente.save();
    res.json({
      message: "Dipendente inserito con successo",
      createdDipendente: {
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
    const updatedDipendenti = await Dipendente.updateMany({}, req.body);
    res.status(200).json(updatedDipendenti);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (id)
router.put('/:id', async (req, res) => {
  try {
    const idDipendente = req.params.id;
    const nuovoDipendente = req.body;
    const risultato = await Dipendente.findByIdAndUpdate(idDipendente, nuovoDipendente, { new: true });
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

// DELETE
router.delete('', async (req, res) => {
  try {
    const deletedDipendenti = await Dipendenti.deleteMany({});
    res.status(200).json(deletedDipendenti);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE (id)
router.delete('/:id', async (req, res) => {
  try {
    const idDipendente = req.params.id;
    const risultato = await Dipendente.findByIdAndDelete(idDipendente);
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

module.exports = router;