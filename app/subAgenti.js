/*

openapi: 3.0.0
info:
  title: Documentazione API Subagenti
  version: 1.0.0
paths:
  /subagenti:
    get:
      summary: Restituisce tutti i subagenti
      responses:
        '200':
          description: Elenco dei subagenti
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Subagente'
        '404':
          description: La lista dei subagenti è vuota
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
    post:
      summary: Crea un nuovo subagente
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Subagente'
      responses:
        '200':
          description: Subagente inserito con successo
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                  createdsubagente:
                    type: object
                    properties:
                      risultato:
                        $ref: '#/components/schemas/Subagente'
                      request:
                        type: object
                        properties:
                          type:
                            type: string
                            example: GET
                          url:
                            type: string
                            example: /subagenti/1
    put:
      summary: Aggiorna tutti i subagenti
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Subagente'
      responses:
        '200':
          description: Subagenti aggiornati con successo
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
      summary: Elimina tutti i subagenti
      responses:
        '200':
          description: Subagenti eliminati con successo
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
  /subagenti/{id}:
    get:
      summary: Restituisce un singolo subagente
      parameters:
        - name: id
          in: path
          required: true
          description: ID del subagente da restituire
          schema:
            type: string
      responses:
        '200':
          description: Subagente restituito con successo
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Subagente'
        '404':
          description: Subagente non trovato
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
    put:
      summary: Aggiorna un singolo subagente
      parameters:
        - name: id
          in: path
          required: true
          description: ID del subagente da aggiornare
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Subagente'
      responses:
        '200':
          description: Subagente aggiornato con successo
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Subagente'
        '404':
          description: Subagente non trovato
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
    delete:
      summary: Elimina un singolo subagente
      parameters:
        - name: id
          in: path
          required: true
          description: ID del subagente da eliminare
          schema:
            type: string
      responses:
        '200':
          description: Subagente eliminato con successo
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Subagente'
        '404':
          description: Subagente non trovato
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
components:
  schemas:
    Subagente:
      type: object
      properties:
        id:
          type: array
          items:
            type: number
          description: ID del subagente
        matricola:
          type: array
          items:
            type: string
          description: Matricola del subagente
        listaOrdini:
          type: array
          items:
            type: object
            properties:
              ordine:
                type: string
                description: ID dell'ordine
          description: Elenco degli ID degli ordini associati al subagente
        listaClienti:
          type: array
          items:
            type: object
            properties:
              cliente:
                type: string
                description: ID del cliente
          description: Elenco degli ID dei clienti associati al subagente
        listaAziende:
          type: array
          items:
            type: object
            properties:
              azienda:
                type: string
                description: ID dell'azienda
          description: Elenco degli ID delle aziende associate al subagente
        dataInserimento:
          type: string
          format: date-time
          description: Data di inserimento del subagente
        status:
          type: boolean
          description: Stato del subagente (default: false)


*/

const express = require('express');
const router = express.Router();

const subagente = require('./models/subagente');

// Gestore per la richiesta GET /Subagenti
router.get('', async(req,res)=>{
    try{
        const arraySubagentiDB = await subagente.find()
            .populate('id')
            .populate('matricola')
            .populate('listaOrdini.ordine')
            .populate('listaClienti.cliente')
            .populate('listaAziende.azienda')
            .populate('dataInserimento')
            .populate('status');
            if (arraySubagentiDB) {
              res.json(arraySubagentiDB);
            } else {
              res.status(404).json({ error: 'La lista dei Subagenti è vuota.' });
            }
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dei Subagenti.' });
    }
})

// Gestore per la richiesta GET /Subagenti/:id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const subagente = await subagente.findById(id)
          .populate('matricola')
          .populate('listaOrdini.ordine')
          .populate('listaClienti.cliente')
          .populate('listaAziende.azienda')
          .populate('dataInserimento')
          .populate('status');
        if (subagente) {
            res.json(subagente);
        } else {
            res.status(404).json({ error: 'Il subagente richiesto non è stato trovato.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca del subagente.' });
    }
});

 // Gestore per la richiesta POST /subagenti
router.post('', async (req, res) => {
  try {
    const nuovosubagente = new subagente(req.body);
    const risultato = await nuovosubagente.save();
    res.json({
      message: "subagente inserito con successo",
      createdsubagente: {
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

// PUT generale
router.put('', async (req, res) => {
  try {
    const updatedsubagente = await subagente.updateMany({}, req.body);
    res.status(200).json(updatedsubagente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT con ID specifico
router.put('/:id', async (req, res) => {
  try {
    const idsubagente = req.params.id;
    const nuovosubagente = req.body;
    const risultato = await subagente.findByIdAndUpdate(idsubagente, nuovosubagente, { new: true });
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

// DELETE generale
router.delete('', async (req, res) => {
  try {
    const deletedSubagenti = await subagente.deleteMany({});
    res.status(200).json(deletedSubagenti);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE con ID specifico
router.delete('/:id', async (req, res) => {
  try {
    const idsubagente = req.params.id;
    const risultato = await subagente.findByIdAndDelete(idsubagente);
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

module.exports = router;