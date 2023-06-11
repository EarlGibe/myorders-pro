const express = require('express');
const router = express.Router();

const Cliente = require('./models/cliente');

// Gestore per la richiesta GET /clienti
router.get('', async (req, res) => {
  try {

    const arrayClientiDB = await Cliente.find().sort({ cognome: 1, nome: 1 })

    if (arrayClientiDB) {
      res.json(arrayClientiDB);
    } else {
      res.status(404).json({ error: 'La lista clienti è vuota.' });
    }
  } catch (error) {
    if (process.env.VERBOSE_LOG == '1') console.error(error);
    res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dei clienti.' });
  }
})

// Gestore per la richiesta GET /clienti/:id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const cliente = await Cliente.findById(id)
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ error: 'Il cliente richiesto non è stato trovato.' });
    }
  } catch (error) {
    if (process.env.VERBOSE_LOG == '1') console.error(error);
    res.status(500).json({ error: 'Si è verificato un errore durante la ricerca del cliente.' });
  }
});

router.get('/filtered/queryNome/:nome', async (req, res) => {
  try {
    const nome = req.params.nome;
    const arrayDB = await Cliente.find({
      $or: [
        { nome: { $regex: nome, $options: 'i' } },
        { cognome: { $regex: nome, $options: 'i' } }
      ]
    }).sort({ nome: 1, cognome: 1 });

    if (arrayDB) {
      res.json(arrayDB);
    } else {
      res.status(404).json({ error: 'La lista clienti è vuota.' });
    }
  } catch (error) {
    if (process.env.VERBOSE_LOG == '1') console.error(error);
    res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dei clienti filtrati.' });
  }
})

router.get('/filtered/queryNome/:nome/paesi/:paese/regioni/:regione/province/:provincia', async (req, res) => {
  try {
    var nome = req.params.nome;
    var paese = req.params.paese;
    var regione = req.params.regione;
      var provincia = req.params.provincia;

      if(nome=="empty"){
        nome={ $regex: /^/ };
      }else{
        nome={ $regex: nome, $options: 'i' }
      }

      if(paese=="empty"){
        paese={ $regex: /^/ };
      }

      if(regione=="empty"){
        regione={ $regex: /^/ };
      }

      if(provincia=="empty"){
        provincia={ $regex: /^/ };
      }
    
      const arrayDB = await Cliente.find({
        $and: [
          {$or: [
            { nome: nome },
            { cognome: nome }
          ]},
          { paese: paese  },
          { regione: regione},
          { provincia:provincia}
        ]
      }).sort({ nome: 1, cognome: 1 });

    if (arrayDB) {
      res.json(arrayDB);
    } else {
      res.status(404).json({ error: 'La lista clienti è vuota.' });
    }
  } catch (error) {
    if (process.env.VERBOSE_LOG == '1') console.error(error);
    res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dei clienti filtrati.' });
  }
})

// Gestore per la richiesta POST /clienti
router.post('', async (req, res) => {
  try {
    if (process.env.VERBOSE_LOG == '1') console.log(req.body);
    const nuovoCliente = new Cliente(req.body);
    const risultato = await nuovoCliente.save();
    res.status(201).json({
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
    if(risultato === null) res.status(404).json(risultato);
    else res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

// DELETE generale
router.delete('', async (req, res) => {
  try {
    const deletedClienti = await Cliente.deleteMany({});
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
    if(risultato === null) res.status(404).json(risultato);
    else res.status(200).json(risultato);
  } catch (err) {
    res.status(400).json({ errore: err.message });
  }
});

module.exports = router;