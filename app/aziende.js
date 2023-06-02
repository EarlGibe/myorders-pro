const express = require('express');
const router = express.Router();

const Azienda = require('./models/azienda')

// GET aziende generico
router.get('', async(req,res)=>{
    try{
        const arrayAziendeDB = await Azienda.find();

        if(arrayAziendeDB) res.json(arrayAziendeDB);
        else res.status(404).json( { error: "La lista aziende è vuota." });
    }catch(error){
      if(process.env.VERBOSE_LOG == '1') console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca delle aziende.' });
    }
})

// GET azienda con ID specifico
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const azienda = await Azienda.findById(id);

        if (azienda) res.json(azienda);
        else res.status(404).json({ error: 'L\'azienda richiesta non è stata trovata.' });
    } catch (error) {
      if(process.env.VERBOSE_LOG == '1') console.error(error);
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

// PUT generico
router.put('', async (req, res) => {
  try {
    const updatedAzienda = await Azienda.updateMany({}, req.body);
    res.status(200).json(updatedAzienda);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT con ID specifico
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

// DELETE con ID specifico
router.delete('/:id', async (req, res) => {
  try {
    const idAzienda = req.params.id;
    const risultato = await Azienda.findByIdAndDelete(idAzienda);
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

module.exports = router;