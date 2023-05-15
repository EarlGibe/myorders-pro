const express = require('express');
const router = express.Router();

const SubAgente = require('./models/subAgente');

// Gestore per la richiesta GET /subAgenti
router.get('', async(req,res)=>{
    try{
        const arraySubAgentiDB = await SubAgente.find()
            .populate('id')
            .populate('matricola')
            .populate('listaOrdini.ordine')
            .populate('listaClienti.cliente')
            .populate('listaAziende.azienda')
            .populate('dataInserimento')
            .populate('status');
            if (arraySubAgentiDB) {
              res.json(arraySubAgentiDB);
            } else {
              res.status(404).json({ error: 'La lista dei subagenti è vuota.' });
            }
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dei subagenti.' });
    }
})

// Gestore per la richiesta GET /SubAgenti/:id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const subAgente = await SubAgente.findById(id)
          .populate('matricola')
          .populate('listaOrdini.ordine')
          .populate('listaClienti.cliente')
          .populate('listaAziende.azienda')
          .populate('dataInserimento')
          .populate('status');
        if (subAgente) {
            res.json(subAgente);
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
    const nuovoSubAgente = new SubAgente(req.body);
    const risultato = await nuovoSubAgente.save();
    res.json({
      message: "Subagente inserito con successo",
      createdSubAgente: {
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
    const updatedSubAgente = await SubAgente.updateMany({}, req.body);
    res.status(200).json(updatedSubAgente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT con ID specifico
router.put('/:id', async (req, res) => {
  try {
    const idSubAgente = req.params.id;
    const nuovoSubAgente = req.body;
    const risultato = await SubAgente.findByIdAndUpdate(idSubAgente, nuovoSubAgente, { new: true });
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

// DELETE generale
router.delete('', async (req, res) => {
  try {
    const deletedSubAgenti = await SubAgente.deleteMany({});
    res.status(200).json(deletedSubAgenti);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE con ID specifico
router.delete('/:id', async (req, res) => {
  try {
    const idSubAgente = req.params.id;
    const risultato = await SubAgente.findByIdAndDelete(idSubAgente);
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});