const express = require('express');
const router = express.Router();

const Articolo = require('./models/articolo.js');

router.get('', async(req,res)=>{
    try{
         const arrayArticoliDB= await Articolo.find();
         console.log(arrayArticoliDB);
         if(!arrayArticoliDB){
          res.status(404).send("Error: articoli non trovati");
         }else{
          res.json(arrayArticoliDB);
         }
         
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca degli articoli.' });
    }
})

router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const articolo = await Articolo.findById(id);
      if (articolo) {
        res.json(articolo);
      } else {
        res.status(404).json({ error: 'L\'articolo richiesto non è stato trovato.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dell\'articolo.' });
    }
  });

 // Gestore per la richiesta POST /articoli
router.post('', async (req, res) => {
    try {
      const nuovoArticolo = new Articolo(req.body);
      const risultato = await nuovoArticolo.save();
      res.json({
        message: "Articolo inserito con successo",
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
    const updatedArticolo = await Articolo.updateMany({}, req.body);
    res.status(200).json(updatedArticolo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT con ID specifico
router.put('/:id', async (req, res) => {
  try {
    const updatedArticolo = await Articolo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedArticolo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE generale
router.delete('', async (req, res) => {
  try {
    const deletedArticolo = await Articolo.deleteMany({});
    res.status(200).json(deletedArticolo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// DELETE con ID specifico
router.delete('/:id', async (req, res) => {
  try {
    const deletedArticolo = await Articolo.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedArticolo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;