/*

openapi: 3.0.0
info:
  title: Documentazione API Ordini
  version: 1.0.0
paths:
  /ordini:
    get:
      summary: Restituisce tutti gli ordini
      responses:
        '200':
          description: Elenco degli ordini
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Ordine'
        '404':
          description: Ordini non trovati
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
    post:
      summary: Crea un nuovo ordine
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Ordine'
      responses:
        '200':
          description: Ordine creato con successo
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                  createdOrdine:
                    type: object
                    properties:
                      risultato:
                        $ref: '#/components/schemas/Ordine'
                      request:
                        type: object
                        properties:
                          type:
                            type: string
                            example: GET
                          url:
                            type: string
                            example: /ordini/1
    put:
      summary: Aggiorna tutti gli ordini
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Ordine'
      responses:
        '200':
          description: Ordini aggiornati con successo
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
      summary: Elimina tutti gli ordini
      responses:
        '200':
          description: Ordini eliminati con successo
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
  /ordini/{id}:
    get:
      summary: Restituisce un singolo ordine
      parameters:
        - name: id
          in: path
          required: true
          description: ID dell'ordine da restituire
          schema:
            type: string
      responses:
        '200':
          description: Ordine restituito con successo
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Ordine'
        '404':
          description: Ordine non trovato
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
    put:
      summary: Aggiorna un singolo ordine
      parameters:
        - name: id
          in: path
          required: true
          description: ID dell'ordine da aggiornare
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Ordine'
      responses:
        '200':
          description: Ordine aggiornato con successo
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Ordine'
        '404':
          description: Ordine non trovato
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
    delete:
      summary: Elimina un singolo ordine
      parameters:
        - name: id
          in: path
          required: true
          description: ID dell'ordine da eliminare
          schema:
            type: string
      responses:
        '200':
          description: Ordine eliminato con successo
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Ordine'
        '404':
          description: Ordine non trovato
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
components:
  schemas:
    Ordine:
      type: object
      properties:
        cliente:
          type: string
          description: ID del cliente associato all'ordine
        subagente:
          type: string
          description: ID del subagente associato all'ordine
        data:
          type: string
          format: date-time
          description: Data dell'ordine
        listaArticoli:
          type: array
          items:
            type: string
          description: Elenco degli ID degli articoli nell'ordine
        indirizzoSpedizione:
          type: string
          description: Indirizzo di spedizione dell'ordine
        indirizzoFatturazione:
          type: string
          description: Indirizzo di fatturazione dell'ordine
        status:
          type: boolean
          description: Stato dell'ordine (default: true)


*/

const express = require('express');
const router = express.Router();

const Ordine = require('./models/ordine');
const Cliente = require('./models/cliente');
const Subagente = require('./models/subagente');
const Articolo = require('./models/articolo');

// Gestore per la richiesta GET /ordini
router.get('', async(req,res)=>{
    try{
        const arrayOrdiniDB = await Ordine.find()
            .populate('cliente')
            .populate('subagente')
            .populate('listaArticoli.articolo');

        if(!arrayOrdiniDB){
          res.status(404).send("Error: ordini non trovati");
        }else{
          res.json(arrayOrdiniDB);
        }
        
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca degli ordini.' });
    }
})

// Gestore per la richiesta GET /ordini/:id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const ordine = await Ordine.findById(id)
            .populate('cliente')
            .populate('subagente')
            .populate('listaArticoli.articolo');
        if (ordine) {
            res.json(ordine);
        } else {
            res.status(404).json({ error: 'L\'ordine richiesto non è stato trovato.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dell\'ordine.' });
    }
});

 // Gestore per la richiesta POST /ordini
router.post('', async (req, res) => {
  try {
    const nuovoOrdine = new Ordine(req.body);
    const risultato = await nuovoOrdine.save();
    res.json({
      message: "Ordine creato con successo",
      createdOrdine: {
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
    const updatedOrdine = await Ordine.updateMany({}, req.body);
    res.status(200).json(updatedOrdine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT con ID specifico
router.put('/:id', async (req, res) => {
  try {
    const idOrdine = req.params.id;
    const nuovoOrdine = req.body;
    const risultato = await Ordine.findByIdAndUpdate(idOrdine, nuovoOrdine, { new: true });
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

// DELETE generale
router.delete('', async (req, res) => {
  try {
    const deletedOrdine = await Ordine.deleteMany({});
    res.status(200).json(deletedOrdine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/ordini/:id', async (req, res) => {
  try {
    const idOrdine = req.params.id;
    const risultato = await Ordine.findByIdAndDelete(idOrdine);
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

module.exports = router;