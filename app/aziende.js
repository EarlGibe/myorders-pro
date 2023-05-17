/*

swagger: '2.0'
info:
  version: 1.0.0
  title: API Aziende
paths:
  /aziende:
    get:
      description: Restituisce la lista di tutte le aziende
      responses:
        200:
          description: Successo
          schema:
            type: array
            items:
              $ref: '#/definitions/Azienda'
        404:
          description: La lista delle aziende è vuota
          schema:
            $ref: '#/definitions/ErrorResponse'
        500:
          description: Errore del server
          schema:
            $ref: '#/definitions/ErrorResponse'
    post:
      description: Crea una nuova azienda
      parameters:
        - name: body
          in: body
          description: Dati dell'azienda da creare
          required: true
          schema:
            $ref: '#/definitions/Azienda'
      responses:
        200:
          description: Azienda creata con successo
          schema:
            $ref: '#/definitions/SuccessResponse'
        400:
          description: Errore di validazione dei dati
          schema:
            $ref: '#/definitions/ErrorResponse'
    put:
      description: Aggiorna i dati di tutte le aziende
      parameters:
        - name: body
          in: body
          description: Nuovi dati per l'aggiornamento delle aziende
          required: true
          schema:
            $ref: '#/definitions/Azienda'
      responses:
        200:
          description: Aziende aggiornate con successo
          schema:
            $ref: '#/definitions/SuccessResponse'
        400:
          description: Errore di validazione dei dati
          schema:
            $ref: '#/definitions/ErrorResponse'
    delete:
      description: Elimina tutte le aziende
      responses:
        200:
          description: Aziende eliminate con successo
          schema:
            $ref: '#/definitions/SuccessResponse'
        400:
          description: Errore di validazione dei dati
          schema:
            $ref: '#/definitions/ErrorResponse'
  /aziende/{id}:
    get:
      description: Restituisce i dettagli di un'azienda specificata dall'ID
      parameters:
        - name: id
          in: path
          description: ID dell'azienda da recuperare
          required: true
          type: string
      responses:
        200:
          description: Successo
          schema:
            $ref: '#/definitions/Azienda'
        404:
          description: L'azienda richiesta non è stata trovata
          schema:
            $ref: '#/definitions/ErrorResponse'
        500:
          description: Errore del server
          schema:
            $ref: '#/definitions/ErrorResponse'
    put:
      description: Aggiorna i dati di un'azienda specificata dall'ID
      parameters:
        - name: id
          in: path
          description: ID dell'azienda da aggiornare
          required: true
          type: string
        - name: body
          in: body
          description: Nuovi dati dell'azienda
          required: true
          schema:
            $ref: '#/definitions/Azienda'
      responses:
        200:
          description: Azienda aggiornata con successo
          schema:
            $ref: '#/definitions/Azienda'
        400:
          description: Errore di validazione dei dati
          schema:
            $ref: '#/definitions/ErrorResponse'
        404:
          description: L'azienda richiesta non è stata trovata
          schema:
            $ref: '#/definitions/ErrorResponse'
    delete:
      description: Elimina un'azienda specificata dall'ID
      parameters:
        - name: id
          in: path
          description: ID dell'azienda da eliminare
          required: true
          type: string
      responses:
        200:
          description: Azienda eliminata con successo
          schema:
            $ref: '#/definitions/SuccessResponse'
        400:
          description: Errore di validazione dei dati
          schema:
            $ref: '#/definitions/ErrorResponse'
        404:
          description: L'azienda richiesta non è stata trovata
          schema:
            $ref: '#/definitions/ErrorResponse'
definitions:
  Azienda:
    type: object
    properties:
      dati:
        type: string
        description: ID dell'oggetto Anagrafica associato all'azienda
      listaCataloghi:
        type: array
        items:
          type: string
          description: ID degli oggetti Catalogo associati all'azienda
      status:
        type: boolean
        description: Stato dell'azienda (default: false)
  ErrorResponse:
    type: object
    properties:
      error:
        type: string
  SuccessResponse:
    type: object
    properties:
      message:
        type: string
      createdAzienda:
        $ref: '#/definitions/Azienda'


*/

const express = require('express');
const router = express.Router();

const Azienda = require('./models/azienda')

// GET /aziende
router.get('', async(req,res)=>{
    try{
        const arrayAziendeDB = await Azienda.find().populate('listaCataloghi.catalogo');

        if(arrayAziendeDB) res.json(arrayAziendeDB);
        else res.status(404).json( { error: "La lista aziende è vuota." });
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca delle aziende.' });
    }
})

// GET /aziende/:id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const azienda = await Azienda.findById(id).populate('listaCataloghi.catalogo');

        if (azienda) res.json(azienda);
        else res.status(404).json({ error: 'L\'azienda richiesta non è stata trovata.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dell\'azienda.' });
    }
});

 // POST /aziende
router.post('', async (req, res) => {
  try {
    const nuovaAzienda = new Azienda(req.body);
    const risultato = await nuovaAzienda.save();
    res.json({
      message: "Azienda creata con successo",
      createdAzienda: {
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
    const updatedAzienda = await Azienda.updateMany({}, req.body);
    res.status(200).json(updatedAzienda);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (id)
router.put('/:id', async (req, res) => {
  try {
    const idAzienda = req.params.id;
    const nuovaAzienda = req.body;
    const risultato = await Azienda.findByIdAndUpdate(idAzienda, nuovaAzienda, { new: true });
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

// DELETE
router.delete('', async (req, res) => {
  try {
    const deletedAzienda = await Azienda.deleteMany({});
    res.status(200).json(deletedAzienda);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE (id)
router.delete('/aziende/:id', async (req, res) => {
  try {
    const idAzienda = req.params.id;
    const risultato = await Azienda.findByIdAndDelete(idAzienda);
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

module.exports = router;