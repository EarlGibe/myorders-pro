const express = require('express');
const router = express.Router();

const RegionePerPaese = require('./models/regionePerPaese.js');

// GET generico
router.get('/paesi', async(req,res)=>{
    try{
         const arrayDB= await RegionePerPaese.distinct("paese");
         if(process.env.VERBOSE_LOG == '1') console.log(arrayDB);
         if(!arrayDB){
          res.status(404).send("Error: regioni non trovate");
         }else{
          res.json(arrayDB);
         }
         
    }catch(error){
      if(process.env.VERBOSE_LOG == '1') console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca delle regioni.' });
    }
})

// GET generico
router.get('/paesi/:paese/regioni', async(req,res)=>{
  try{
      const paese = req.params.paese;
       const arrayDB= await RegionePerPaese.distinct("regione",{paese: paese});
       if(process.env.VERBOSE_LOG == '1') console.log(arrayDB);
       if(!arrayDB){
        res.status(404).send("Error: regioni non trovate");
       }else{
        res.json(arrayDB);
       }
       
  }catch(error){
    if(process.env.VERBOSE_LOG == '1') console.error(error);
      res.status(500).json({ error: 'Si è verificato un errore durante la ricerca delle regioni.' });
  }
})

// GET generico
router.get('/paesi/:paese/regioni/:regione/province', async(req,res)=>{
  try{
      const paese = req.params.paese;
      const regione = req.params.regione;
       const arrayDB= await RegionePerPaese.find({paese: paese, regione: regione});
       if(process.env.VERBOSE_LOG == '1') console.log(arrayDB);
       if(!arrayDB){
        res.status(404).send("Error: regioni non trovate");
       }else{
        res.json(arrayDB);
       }
       
  }catch(error){
    if(process.env.VERBOSE_LOG == '1') console.error(error);
      res.status(500).json({ error: 'Si è verificato un errore durante la ricerca delle regioni.' });
  }
})

module.exports = router;