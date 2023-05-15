const express = require('express');
const router = express.Router();

const Anagrafica = require('./models/anagrafica');
const SubAgente = require('./models/subagente');

// Gestore per la richiesta GET /clienti
router.get('', async(req,res)=>{
    try{
        const arrayClientiDB = await Clienti.find()
            .populate('id')
            .populate('anagrafica')
            .populate('subagente')
            .populate('dataInserimento')
            .populate('status');
        res.json(arrayClientiDB);
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dei clienti.' });
    }
})

// Gestore per la richiesta GET /clienti/:id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const cliente = await Cliente.findById(id)
          .populate('anagrafica')
          .populate('subagente')
          .populate('dataInserimento')
          .populate('status');
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({ error: 'Il cliente richiesto non è stato trovato.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca del cliente.' });
    }
});

 // Gestore per la richiesta POST /clienti
router.post('', async (req, res) => {
  try {
    const nuovoCliente = new Cliente(req.body);
    const risultato = await nuovoCliente.save();
    res.json({
      message: "Cliente inserito con successo",
      createdCliente: {
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
    const updatedCliente = await Cliente.updateMany({}, req.body);
    res.status(200).json(updatedCliente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT con ID specifico
router.put('/:id', async (req, res) => {
  try {
    const idCliente = req.params.id;
    const nuovoCliente = req.body;
    const risultato = await Cliente.findByIdAndUpdate(idCliente, nuovoCliente, { new: true });
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

// DELETE generale
router.delete('', async (req, res) => {
  try {
    const deletedClienti = await Clienti.deleteMany({});
    res.status(200).json(deletedClienti);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE con ID specifico
router.delete('/:id', async (req, res) => {
  try {
    const idCliente = req.params.id;
    const risultato = await Cliente.findByIdAndDelete(idCliente);
    res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});