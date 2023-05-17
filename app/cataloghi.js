/*
Ecco la documentazione Swagger aggiornata per l'API fornita:

swagger: '2.0'
info:
  version: 1.0.0
  title: API Cataloghi
paths:
  /cataloghi:
    get:
      description: Restituisce la lista di tutti i cataloghi
      responses:
        200:
          description: Successo
          schema:
            type: array
            items:
              $ref: '#/definitions/Catalogo'
        404:
          description: La lista dei cataloghi è vuota
          schema:
            $ref: '#/definitions/ErrorResponse'
        500:
          description: Errore del server
          schema:
            $ref: '#/definitions/ErrorResponse'
    post:
      description: Crea un nuovo catalogo
      parameters:
        - name: body
          in: body
          description: Dati del catalogo da creare
          required: true
          schema:
            $ref: '#/definitions/Catalogo'
      responses:
        200:
          description: Catalogo inserito con successo
          schema:
            $ref: '#/definitions/SuccessResponse'
        400:
          description: Errore di validazione dei dati
          schema:
            $ref: '#/definitions/ErrorResponse'
    put:
      description: Aggiorna i dati di tutti i cataloghi
      parameters:
        - name: body
          in: body
          description: Nuovi dati per l'aggiornamento dei cataloghi
          required: true
          schema:
            $ref: '#/definitions/Catalogo'
      responses:
        200:
          description: Cataloghi aggiornati con successo
          schema:
            $ref: '#/definitions/SuccessResponse'
        400:
          description: Errore di validazione dei dati
          schema:
            $ref: '#/definitions/ErrorResponse'
    delete:
      description: Elimina tutti i cataloghi
      responses:
        200:
          description: Cataloghi eliminati con successo
          schema:
            $ref: '#/definitions/SuccessResponse'
        400:
          description: Errore di validazione dei dati
          schema:
            $ref: '#/definitions/ErrorResponse'
  /cataloghi/{id}:
    get:
      description: Restituisce i dettagli di un catalogo specificato dall'ID
      parameters:
        - name: id
          in: path
          description: ID del catalogo da recuperare
          required: true
          type: string
      responses:
        200:
          description: Successo
          schema:
            $ref: '#/definitions/Catalogo'
        404:
          description: Il catalogo richiesto non è stato trovato
          schema:
            $ref: '#/definitions/ErrorResponse'
        500:
          description: Errore del server
          schema:
            $ref: '#/definitions/ErrorResponse'
    put:
      description: Aggiorna i dati di un catalogo specificato dall'ID
      parameters:
        - name: id
          in: path
          description: ID del catalogo da aggiornare
          required: true
          type: string
        - name: body
          in: body
          description: Nuovi dati del catalogo
          required: true
          schema:
            $ref: '#/definitions/Catalogo'
      responses:
        200:
          description: Catalogo aggiornato con successo
          schema:
            $ref: '#/definitions/Catalogo'
        400:


          description: Errore di validazione dei dati
          schema:
            $ref: '#/definitions/ErrorResponse'
    delete:
      description: Elimina un catalogo specificato dall'ID
      parameters:
        - name: id
          in: path
          description: ID del catalogo da eliminare
          required: true
          type: string
      responses:
        200:
          description: Catalogo eliminato con successo
          schema:
            $ref: '#/definitions/SuccessResponse'
        400:
          description: Errore di validazione dei dati
          schema:
            $ref: '#/definitions/ErrorResponse'
definitions:
  Catalogo:
    type: object
    properties:
      id:
        type: number
        description: Identificatore del catalogo
      listaArticoli:
        type: array
        items:
          type: string
          description: ID degli articoli associati al catalogo
      azienda:
        type: string
        description: ID dell'azienda associata al catalogo
      data:
        type: string
        format: date-time
        description: Data del catalogo
      status:
        type: boolean
        description: Stato del catalogo (default: true)
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
      createdCatalogo:
        $ref: '#/definitions/Catalogo'

*/


const express = require('express');
const router = express.Router();

//const Azienda = require('./models/azienda');
const Articolo = require('./models/articolo');

// Gestore per la richiesta GET /cataloghi
router.get('', async(req,res)=>{
    try{
        const arrayCataloghiDB = await Cataloghi.find()
            .populate('id')
            .populate('listaArticoli.articolo')
            .populate('azienda')
            .populate('data')
            .populate('status');
            if (arrayCataloghiDB) {
              res.json(arrayCataloghiDB);
            } else {
              res.status(404).json({ error: 'La lista cataloghi è vuota.' });
            }            
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dei cataloghi.' });
    }
})

// Gestore per la richiesta GET /cataloghi/:id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const catalogo = await Catalogo.findById(id)
          .populate('listaArticoli.articolo')
          .populate('azienda')
          .populate('data')
          .populate('status');
        if (catalogo) {
            res.json(catalogo);
        } else {
            res.status(404).json({ error: 'Il catalogo richiesto non è stato trovato.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca del catalogo.' });
    }
});

 // Gestore per la richiesta POST /cataloghi
router.post('', async (req, res) => {
  try {
    const nuovoCatalogo = new Catalogo(req.body);
    const risultato = await nuovoCatalogo.save();
    res.json({
      message: "Catalogo inserito con successo",
      createdCatalogo: {
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
    const updatedCatalogo = await Catalogo.updateMany({}, req.body);
    res.status(200).json(updatedCatalogo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT con ID specifico
router.put('/:id', async (req, res) => {
  try {
    const idCatalogo = req.params.id;
    const nuovoCatalogo = req.body;
    const risultato = await Catalogo.findByIdAndUpdate(idCatalogo, nuovoCatalogo, { new: true });
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

// DELETE generale
router.delete('', async (req, res) => {
  try {
    const deletedCatalogo = await Catalogo.deleteMany({});
    res.status(200).json(deletedCatalogo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE con ID specifico
router.delete('/:id', async (req, res) => {
  try {
    const idCatalogo = req.params.id;
    const risultato = await Catalogo.findByIdAndDelete(idCatalogo);
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

module.exports = router;