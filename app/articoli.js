const express = require('express');
const router = express.Router();

const Articolo = require('./models/articolo');

router.get('', async(req,res)=>{
    try{
         const arrayArticoliDB= await Articolo.find();
         console.log(arrayArticoliDB)
         res.json(arrayArticoliDB);
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
    const newArticolo = req.body;
  
    try {
      // Crea un nuovo oggetto Articolo con i dati ricevuti dalla richiesta
      const nuovoArticolo = new Articolo({
        name:newArticolo.name,
        descrizione: newArticolo.descrizione,
        coloriDisponibili: newArticolo.coloriDisponibili,
        taglieDisponibili:newArticolo.taglieDisponibili,
        scontoApplicato:newArticolo.scontoApplicato,
        prezzo:newArticolo.prezzo,
        status:newArticolo.status
      });
  
      // Salva il nuovo articolo nel database
      const result = await nuovoArticolo.save();


      // Invia la risposta HTTP con il nuovo documento creato
      res.status(201).json({
        message: "Articolo creato con successo",
        createdArticolo: {
          _id: result._id,
          name: result.name,
          descrizione: result.descrizione,
          coloriDisponibili: result.coloriDisponibili,
          taglieDisponibili: result.taglieDisponibili,
          scontoApplicato: result.scontoApplicato,
          prezzo: result.prezzo,
          status: result.status,
          request: {
            type: 'GET',
            url: '/' + result._id
          }
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json("error: "+error);
    }
  });

module.exports=router;