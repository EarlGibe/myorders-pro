const express = require('express');
const router = express.Router();

const Ordine = require('./models/ordine');
const Cliente = require('./models/cliente');
const Subagente = require('./models/subAgente');
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