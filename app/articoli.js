const express = require('express');
const router = express.Router();

const csv = require('csv-parser');
const fs = require('fs');

const multer = require('multer');

const Articolo = require('./models/articolo.js');
const { error } = require('console');

// GET generico
router.get('', async(req,res)=>{
    try{
         const arrayArticoliDB= await Articolo.find().sort({nome: 1});
         if(process.env.VERBOSE_LOG == '1') console.log(arrayArticoliDB);
         if(!arrayArticoliDB){
          res.status(404).send("Error: articoli non trovati");
         }else{
          res.json(arrayArticoliDB);
         }
         
    }catch(error){
      if(process.env.VERBOSE_LOG == '1') console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca degli articoli.' });
    }
})

// GET con ID specifico
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
      if(process.env.VERBOSE_LOG == '1') console.error(error);
      res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dell\'articolo.' });
    }
  });

  router.get('/filtered/:catalogo', async(req,res)=>{
    try{
      const catalogo = req.params.catalogo;
        const arrayCataloghiDB = await Articolo.find({catalogo:catalogo}).sort({nome: 1});
          
            if (arrayCataloghiDB) {
              res.json(arrayCataloghiDB);
            } else {
              res.status(404).json({ error: 'La lista cataloghi è vuota.' });
            }            
    }catch(error){
      if(process.env.VERBOSE_LOG == '1') console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dei cataloghi filtrati.' });
    }
  })

  router.get('/filtered/:catalogo/queryBarcode/:barcode', async(req,res)=>{
    try{
      const catalogo = req.params.catalogo;
      const barcode = req.params.barcode;
        const arrayCataloghiDB = await Articolo.find({catalogo:catalogo, barCodes: {$regex: barcode, $options: 'i'}}).sort({nome: 1});
          
            if (arrayCataloghiDB) {
              res.json(arrayCataloghiDB);
            } else {
              res.status(404).json({ error: 'La lista cataloghi è vuota.' });
            }            
    }catch(error){
      if(process.env.VERBOSE_LOG == '1') console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dei cataloghi filtrati.' });
    }
  })

  router.get('/filtered/:catalogo/queryNome/:nome', async(req,res)=>{
    try{
      const catalogo = req.params.catalogo;
      const nome = req.params.nome;
        const arrayCataloghiDB = await Articolo.find({catalogo:catalogo, nome: {$regex: nome, $options: 'i'}}).sort({nome: 1});
          
            if (arrayCataloghiDB) {
              res.json(arrayCataloghiDB);
            } else {
              res.status(404).json({ error: 'La lista cataloghi è vuota.' });
            }            
    }catch(error){
      if(process.env.VERBOSE_LOG == '1') console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dei cataloghi filtrati.' });
    }
  })

 // Gestore per la richiesta POST /articoli
router.post('', async (req, res) => {
    try {
      if(req.body.prezzo < 0) throw("prezzo non può essere negativo");
      const nuovoArticolo = new Articolo(req.body);
      const risultato = await nuovoArticolo.save();
      res.status(201).json({
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
    const idArticolo = req.params.id;
    const nuovoArticolo = req.body;
    const risultato = await Articolo.findByIdAndUpdate(idArticolo, nuovoArticolo, { new: true });
    if(risultato === null) res.status(404).json(risultato);
    else res.status(200).json(risultato);
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
    if(deletedArticolo === null) res.status(404).json(deletedArticolo);
    else res.status(200).json(deletedArticolo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//CSV IMPORT

const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files

router.post('/upload', upload.single('csvFile'), (req, res) => {
  try {
    const file = req.file;

    fs.createReadStream(file.path)
      .pipe(csv({ separator: ',' })) // Specify the semicolon as the delimiter
      .on('data', (data) => {
        if(data.nome){
          insertRecordToMongoDB(data,req.body.catalogo);
        }
        
      })
      .on('end', () => {
        console.log("Fatto");
        res.send('CSV data imported successfully');
        //res.redirect('/home');
      });
  } catch (error) {
    if(process.env.VERBOSE_LOG == '1') console.error('Error processing CSV file', error);
    res.status(500).send('Internal Server Error');
  }
});

async function insertRecordToMongoDB(record,catalogo) {
  try {
    record.coloriDisponibili=record.coloriDisponibili.split(',');
    record.taglieDisponibili=record.taglieDisponibili.split(',');
    record.barCodes=record.barCodes.split(',');
    record.catalogo=catalogo;
    
    await Articolo.create(record);
    if(process.env.VERBOSE_LOG == '1') console.log('Record inserted successfully:', record);
  } catch (error) {
    if(process.env.VERBOSE_LOG == '1') console.error('Error inserting record:', error);
  }
}

module.exports = router;