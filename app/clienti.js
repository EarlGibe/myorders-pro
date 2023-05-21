/*

openapi: 3.0.0
info:
  title: Documentazione API Clienti
  version: 1.0.0
paths:
  /clienti:
    get:
      summary: Restituisce tutti i clienti
      responses:
        '200':
          description: Elenco dei clienti
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Cliente'
        '404':
          description: Lista clienti vuota
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
    post:
      summary: Inserisce un nuovo cliente
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Cliente'
      responses:
        '200':
          description: Cliente inserito con successo
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                  createdCliente:
                    type: object
                    properties:
                      risultato:
                        $ref: '#/components/schemas/Cliente'
                      request:
                        type: object
                        properties:
                          type:
                            type: string
                            example: GET
                          url:
                            type: string
                            example: /clienti/1
    put:
      summary: Aggiorna tutti i clienti
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Cliente'
      responses:
        '200':
          description: Clienti aggiornati con successo
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
      summary: Elimina tutti i clienti
      responses:
        '200':
          description: Clienti eliminati con successo
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
  /clienti/{id}:
    get:
      summary: Restituisce un singolo cliente
      parameters:
        - name: id
          in: path
          required: true
          description: ID del cliente da restituire
          schema:
            type: string
      responses:
        '200':
          description: Cliente restituito con successo
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Cliente'
        '404':
          description: Cliente non trovato
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
    put:
      summary: Aggiorna un singolo cliente
      parameters:
        - name: id
          in: path
          required: true
          description: ID del cliente da aggiornare
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Cliente'
      responses:
        '200':
          description: Cliente aggiornato con successo
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Cliente'
        '404':
          description: Cliente non trovato
          content:
            application/json:
              schema:
                type: object
                properties:
                  errore:
                    type: string
    delete:
      summary: Elimina un singolo cliente
      parameters:
        - name: id
          in: path
          required: true
          description: ID del cliente da eliminare
          schema:
            type: string
      responses:
        '200':
          description: Cliente eliminato con successo
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Cliente'
        '404':
          description: Cliente non trovato
          content:
            application/json:
              schema:
                type: object
                properties:
                  errore:
                    type: string
components:
  schemas:
    Cliente:
      type: object
      properties:
        id:
          type: array
          items:
            type: number
          description: Identificatore del cliente
        anagrafica:
          type: string
          description: ID dell'anagrafica associata al cliente
        subagente:
          type: string
          description: ID del subagente associato al cliente
        dataInserimento:
          type: string
          format: date-time
          description: Data di inserimento del cliente
        status:
          type: boolean
          description: Stato del cliente (default: true)
*/

const express = require('express');
const router = express.Router();

const Cliente = require('./models/cliente');

// Gestore per la richiesta GET /clienti
router.get('', async(req,res)=>{
    try{
      
        const arrayClientiDB = await Cliente.find()

            if (arrayClientiDB) {
              res.json(arrayClientiDB);
            } else {
              res.status(404).json({ error: 'La lista clienti è vuota.' });
            }
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dei clienti.' });
    }
})

// Gestore per la richiesta GET /clienti/:id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const cliente = await Cliente.findById(id)
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({ error: 'Il cliente richiesto non è stato trovato.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca del cliente.' });
    }
});

 // Gestore per la richiesta POST /clienti
router.post('', async (req, res) => {
  try {
    console.log(req.body);
    const nuovoCliente = new Cliente(req.body);
    const risultato = await nuovoCliente.save();
    res.json({
      message: "Cliente inserito con successo",
      createdCliente: {
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
    const updatedCliente = await Cliente.updateMany({}, req.body);
    res.status(200).json(updatedCliente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT con ID specifico
router.put('/:id', async (req, res) => {
  try {
    const idCliente = req.params.id;
    const nuovoCliente = req.body;
    const risultato = await Cliente.findByIdAndUpdate(idCliente, nuovoCliente, { new: true });
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

// DELETE generale
router.delete('', async (req, res) => {
  try {
    const deletedClienti = await Clienti.deleteMany({});
    res.status(200).json(deletedClienti);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE con ID specifico
router.delete('/:id', async (req, res) => {
  try {
    const idCliente = req.params.id;
    const risultato = await Cliente.findByIdAndDelete(idCliente);
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

module.exports = router;