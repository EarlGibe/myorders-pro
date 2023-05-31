const express = require('express');
const router = express.Router();

const sgMail = require('@sendgrid/mail')
const User = require('./models/user.js');

// API to find a specific user by its username
router.post('', async (req, res) => {

  console.log("Entro in reimposta password API");

  var SGMailToken = req.app.get('SGMailToken');
  sgMail.setApiKey(SGMailToken);

  console.log("SG token: " + SGMailToken);

    try {

      // find the user
      console.log(req.body.username);
      console.log(req.body.email);

      let user = await User.findOne({
        username: req.body.username,
      }).exec();

      if(user){
        if(user.email==req.body.email){
          const msg = {
            to: req.body.email, // Change to your recipient
            from: 'app.myorderspro@gmail.com', // Change to your verified sender
            subject: 'OTP Recupera Password My Orders Pro',
            text: 'Questo è il tuo OTP: '+req.body.OTP,
            //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
          }
          
          sgMail.send(msg).then((response) => {
              console.log(response[0].statusCode)
              console.log(response[0].headers)
              res.json(user);
          })
            .catch((error) => {
              console.error(error)
          });
          
        } else {
          res.status(404).json({ error: 'User e email non coincidono' });
        }

      } else {
        res.status(404).json({ error: 'User e email non coincidono' });
        
      }} catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la ricerca dell\'user.' });
      }
    });

  module.exports = router;