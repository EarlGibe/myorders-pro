const express = require('express');
const router = express.Router();

// Gestore per la richiesta GET /chiavi
router.get('', async(req,res)=>{
    res.json(req.app.get('arrayChiaviDB')[0].nome);
})

module.exports = router;