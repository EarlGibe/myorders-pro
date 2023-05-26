const express = require('express');
const router = express.Router();

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const User = require('./models/user.js');

// API to find a specific user by its username
router.post('', async (req, res) => {
    try {

      // find the user

      console.log(req.body.username);
      console.log(req.body.email);

      let user = await User.findOne({
        username: req.body.username,
      }).exec();

      if(user.email==req.body.email){
        const msg = {
          to: req.body.email, // Change to your recipient
          from: 'app.myorderspro@gmail.com', // Change to your verified sender
          subject: 'OTP Recupera Password My Orders Pro',
          text: 'Questo è il tuo OTP: '+req.body.OTP,
          //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }
        
        sgMail
          .send(msg)
          .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
          })
          .catch((error) => {
            console.error(error)
          })
      }

      console.log(user)
	
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

  module.exports = router;