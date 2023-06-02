const express = require('express');
const router = express.Router();

const Catalogo = require('./models/catalogo');

// Gestore per la richiesta GET /cataloghi
router.get('', async(req,res)=>{
    try{
        const arrayCataloghiDB = await Catalogo.find()
          
            if (arrayCataloghiDB) {
              res.json(arrayCataloghiDB);
            } else {
              res.status(404).json({ error: 'La lista cataloghi è vuota.' });
            }            
    }catch(error){
      if(process.env.VERBOSE_LOG == '1') console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dei cataloghi.' });
    }
})

// Gestore per la richiesta GET /cataloghi/:id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const catalogo = await Catalogo.findById(id)
        
        if (catalogo) {
            res.json(catalogo);
        } else {
            res.status(404).json({ error: 'Il catalogo richiesto non è stato trovato.' });
        }
    } catch (error) {
      if(process.env.VERBOSE_LOG == '1') console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca del catalogo.' });
    }
});

 // Gestore per la richiesta POST /cataloghi
router.post('', async (req, res) => {
  try {
    const nuovoCatalogo = new Catalogo(req.body);
    const risultato = await nuovoCatalogo.save();
    res.json({
      message: "Catalogo inserito con successo",
      createdCatalogo: {
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
    const updatedCatalogo = await Catalogo.updateMany({}, req.body);
    res.status(200).json(updatedCatalogo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT con ID specifico
router.put('/:id', async (req, res) => {
  try {
    const idCatalogo = req.params.id;
    const nuovoCatalogo = req.body;
    const risultato = await Catalogo.findByIdAndUpdate(idCatalogo, nuovoCatalogo, { new: true });
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

// DELETE generale
router.delete('', async (req, res) => {
  try {
    const deletedCatalogo = await Catalogo.deleteMany({});
    res.status(200).json(deletedCatalogo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE con ID specifico
router.delete('/:id', async (req, res) => {
  try {
    const idCatalogo = req.params.id;
    const risultato = await Catalogo.findByIdAndDelete(idCatalogo);
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

module.exports = router;