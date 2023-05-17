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