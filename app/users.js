const express = require('express');
const router = express.Router();

const User = require('./models/user.js');

router.get('', async(req,res)=>{
    try{
         const arrayUsersDB= await User.find();
         console.log(arrayUsersDB)
         res.status(200).json(arrayUsersDB);
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dell\'utente.' });
    }
})

router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'L\'user richiesto non è stato trovato.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dell\'user.' });
    }
  });

  // API to find a specific user by its username
  router.get('/:username', async (req, res) => {
    try {

      // find the user
      let user = await User.findOne({
        username: req.params.username
      }).exec();
	
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'L\'user richiesto non è stato trovato.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dell\'user.' });
    }
  });

   // Gestore per la richiesta POST /users
router.post('', async (req, res) => {
  try {
    const nuovouser = new User(req.body);
    const risultato = await nuovouser.save();
    res.json({
      message: "User inserito con successo",
      createduser: {
        risultato,
        request: {
          type: 'GET',
          id: risultato._id
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
    const updatedUser = await User.updateMany({}, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT con ID specifico
router.put('/:id', async (req, res) => {
  try {
    console.log(req.body);
    console.log(res.body);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE generale
router.delete('', async (req, res) => {
  try {
    const deletedUser = await User.deleteMany({});
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// DELETE con ID specifico
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;