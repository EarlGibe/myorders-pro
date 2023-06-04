const express = require('express');
const router = express.Router();

const Subagente = require('./models/subagente');

// Gestore per la richiesta GET /Subagenti
router.get('', async(req,res)=>{
    try{
        const arraySubagentiDB = await Subagente.find();

          if (arraySubagentiDB) {
            res.json(arraySubagentiDB);
          } else {
            res.status(404).json({ error: 'La lista dei Subagenti è vuota.' });
          }
    } catch(error){
      if(process.env.VERBOSE_LOG == '1') console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dei Subagenti.' });
    }
})

// Gestore per la richiesta GET /Subagenti/:id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const subagente = await Subagente.findById(id)
          
        if (subagente) {
            res.json(subagente);
        } else {
            res.status(404).json({ error: 'Il subagente richiesto non è stato trovato.' });
        }
    } catch (error) {
      if(process.env.VERBOSE_LOG == '1') console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca del subagente.' });
    }
});

 // Gestore per la richiesta POST /subagenti
router.post('', async (req, res) => {
  try {
    const nuovosubagente = new Subagente(req.body);
    const risultato = await nuovosubagente.save();
    res.json({
      message: "subagente inserito con successo",
      createdsubagente: {
        risultato,
        request: {
          type: 'GET',
          id: risultato._id
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
    const updatedsubagente = await Subagente.updateMany({}, req.body);
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
    const risultato = await Subagente.findByIdAndUpdate(idsubagente, nuovosubagente, { new: true });
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

// PUT per aggiungere cliente alla lista
router.put('/addCliente/:id', async (req, res) => {
  try {
    const idsubagente = req.params.id;
    const nuovoCliente = req.body.cliente;
    const risultato = await Subagente.updateOne(
      { _id: idsubagente},
      { $push: { listaClienti: nuovoCliente } }
   );
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

// DELETE generale
router.delete('', async (req, res) => {
  try {
    const deletedSubagenti = await Subagente.deleteMany({});
    res.status(200).json(deletedSubagenti);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE con ID specifico
router.delete('/:id', async (req, res) => {
  try {
    const idsubagente = req.params.id;
    const risultato = await Subagente.findByIdAndDelete(idsubagente);
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

module.exports = router;