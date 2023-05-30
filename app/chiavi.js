const express = require('express');
const router = express.Router();

const Chiave = require('./models/chiave.js');

// API per cercare chiave da nome chiave
router.get('/:nome', async(req,res)=>{
  try{
       const nome = req.params.nome;
       const arrayChiaviDB= await Chiave.findOne(nome);
       console.log(arrayChiaviDB);
       if(!arrayChiaviDB){
        res.status(404).send("Error: chiave desiderata non trovata");
       }else{
        res.json(arrayChiaviDB);
       }
       
  }catch(error){
      console.log(error);
      res.status(500).json({ error: 'Si è verificato un errore durante la ricerca della chiave desiderata.' });
  }
})

// GET generale
router.get('', async(req,res)=>{
    try{
         const arrayChiaviDB= await Chiave.find();
         console.log(arrayChiaviDB);
         if(!arrayChiaviDB){
          res.status(404).send("Error: chiavi non trovate");
         }else{
          res.json(arrayChiaviDB);
         }
         
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca delle chiavi.' });
    }
})

// GET con ID specifico
router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const chiave = await Chiave.findById(id);
      if (chiave) {
        res.json(chiave);
      } else {
        res.status(404).json({ error: 'La chiave richiesta non è stata trovata.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Si è verificato un errore durante la ricerca della chiave.' });
    }
  });

 // Gestore per la richiesta POST /chiavi
router.post('', async (req, res) => {
    try {
      const nuovaChiave = new Chiave(req.body);
      const risultato = await nuovaChiave.save();
      res.json({
        message: "Chiave inserita con successo",
        createdArticolo: {
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
    const updatedChiave = await Chiave.updateMany({}, req.body);
    res.status(200).json(updatedChiave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT con ID specifico
router.put('/:id', async (req, res) => {
  try {
    const updatedChiave = await Chiave.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedChiave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE generale
router.delete('', async (req, res) => {
  try {
    const deletedChiave = await Chiave.deleteMany({});
    res.status(200).json(deletedChiave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE con ID specifico
router.delete('/:id', async (req, res) => {
  try {
    const deletedChiave = await Chiave.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedChiave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;