/*

openapi: 3.0.0
info:
  title: Documentazione API di Autenticazione
  version: 1.0.0
paths:
  /authenticate:
    post:
      summary: Autenticazione e ottenimento di un nuovo token
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                username:
                  type: string
                  description: Nome utente
                password:
                  type: string
                  description: Password dell'utente
      responses:
        '200':
          description: Autenticazione riuscita
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    description: Stato dell'autenticazione
                    example: true
                  message:
                    type: string
                    description: Messaggio di successo
                    example: Enjoy your token!
                  token:
                    type: string
                    description: Token generato per l'autenticazione
                  username:
                    type: string
                    description: Nome utente
                  id:
                    type: string
                    description: ID dell'utente
                  self:
                    type: string
                    description: URL di auto-referenziazione
                    example: users/12345
        '401':
          description: Autenticazione fallita
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    description: Stato dell'autenticazione
                    example: false
                  message:
                    type: string
                    description: Messaggio di errore
                    example: Authentication failed. User or password not found.
components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer


*/

const express = require('express');
const router = express.Router();
const User = require('./models/user'); // get our mongoose model
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


// ---------------------------------------------------------
// route to authenticate and get a new token
// ---------------------------------------------------------
router.post('', async function(req, res) {
	
	// find the user
	let user = await User.findOne({
		username: req.body.username
	}).exec();
	
	// user not found or password doesn't match
	if (!(user) || user.password != req.body.password) {
		res.json({ success: false, message: 'Authentication failed. User or password not found.' });
		return;
	}
	
	// if user is found and password is right create a token
	var payload = {
		username: user.username,
		id: user._id
		// other data encrypted in the token	
	}
	var options = {
		expiresIn: 86400 // expires in 24 hours
	}
	var token = jwt.sign(payload, process.env.SUPER_SECRET, options);

	res.json({
		success: true,
		message: 'Enjoy your token!',
		token: token,
		username: user.username,
		id: user._id,
		self: "users/" + user._id
	});

});



module.exports = router;