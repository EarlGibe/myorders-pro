const express = require('express');
const router = express.Router();

const Articolo = require('../../models/articolo');

router.get('', async(req,res)=>{
    try{
         const arrayArticoliDB= await Articolo.find();
         console.log(arrayArticoliDB)
         res.json(arrayArticoliDB);
    }catch(error){
        console.log(error);
    }
})

module.exports=router;