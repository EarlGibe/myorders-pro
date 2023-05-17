const express = require('express');
const router = express.Router();

const Tecnico = require('./models/tecnico');

// GET /tecnici
router.get('', async(req,res)=>{
    try{
      const arrayTecniciDB = await Tecnici.find();
            
      if (arrayTecniciDB) res.json(arrayTecniciDB);
      else res.status(404).json({ error: 'La lista tecnici è vuota.' });           
    } catch(error){
        console.log(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dei tecnici.' });
    }
})

// GET /tecnici/:id
router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const tecnico = await tecnico.findById(id);

      if (tecnico) res.json(tecnico);
      else res.status(404).json({ error: 'Il tecnico richiesto non è stato trovato.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca del tecnico.' });
    }
});

 // POST /tecnici
router.post('', async (req, res) => {
  try {
    const nuovoTecnico = new Tecnico(req.body);
    const risultato = await nuovoTecnico.save();
    res.json({
      message: "Tecnico inserito con successo",
      createdTecnico: {
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
    const updatedTecnici = await Tecnico.updateMany({}, req.body);
    res.status(200).json(updatedTecnici);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (id)
router.put('/:id', async (req, res) => {
  try {
    const idTecnico = req.params.id;
    const nuovoTecnico = req.body;
    const risultato = await Tecnico.findByIdAndUpdate(idTecnico, nuovoTecnico, { new: true });
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

// DELETE
router.delete('', async (req, res) => {
  try {
    const deletedTecnici = await Tecnici.deleteMany({});
    res.status(200).json(deletedTecnici);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE (id)
router.delete('/:id', async (req, res) => {
  try {
    const idTecnico = req.params.id;
    const risultato = await Tecnico.findByIdAndDelete(idTecnico);
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

module.exports = router;