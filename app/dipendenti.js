const express = require('express');
const router = express.Router();

const Dipendente = require('./models/dipendente');

// GET /dipendenti
router.get('', async(req,res)=>{
    try{
      const arrayDipendentiDB = await Dipendente.find().sort({anagrafica: 1});            
      if (arrayDipendentiDB) res.json(arrayDipendentiDB);
      else res.status(404).json({ error: 'La lista dipendenti è vuota.' });           
    } catch(error){
      if(process.env.VERBOSE_LOG == '1') console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dei dipendenti.' });
    }
})

// GET /dipendenti/:id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const cliente = await Dipendente.findById(id);

        if (cliente) res.json(cliente);
        else res.status(404).json({ error: 'Il dipendente richiesto non è stato trovato.' });
    } catch (error) {
      if(process.env.VERBOSE_LOG == '1') console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca del dipendente.' });
    }
});

router.get('/filtered/queryNome/:nome', async(req,res)=>{
  try{
    const nome = req.params.nome;
      const arrayDB = await Dipendente.find({
        $or: [
          { nome: { $regex: nome, $options: 'i' } },
          { cognome: { $regex: nome, $options: 'i' } }
        ]
      }).sort({ nome: 1, cognome: 1 });
        
          if (arrayDB) {
            res.json(arrayDB);
          } else {
            res.status(404).json({ error: 'La lista dipendenti è vuota.' });
          }            
  }catch(error){
    if(process.env.VERBOSE_LOG == '1') console.error(error);
      res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dei dipendenti filtrati.' });
  }
})

 // POST /dipendenti
router.post('', async (req, res) => {
  try {
    const nuovoDipendente = new Dipendente(req.body);
    const risultato = await nuovoDipendente.save();
    res.status(201).json({
      message: "Dipendente inserito con successo",
      createdDipendente: {
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

// PUT
router.put('', async (req, res) => {
  try {
    const updatedDipendenti = await Dipendente.updateMany({}, req.body);
    res.status(200).json(updatedDipendenti);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT con ID specifico
router.put('/:id', async (req, res) => {
  try {
    const idDipendente = req.params.id;
    const nuovoDipendente = req.body;
    const risultato = await Dipendente.findByIdAndUpdate(idDipendente, nuovoDipendente, { new: true });
    if(risultato === null) res.status(404).json(risultato);
    else res.status(200).json(risultato);
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

// DELETE con ID specifico
router.delete('/:id', async (req, res) => {
  try {
    const idDipendente = req.params.id;
    const risultato = await Dipendente.findByIdAndDelete(idDipendente);
    if(risultato === null) res.status(404).json(risultato);
    else res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

module.exports = router;