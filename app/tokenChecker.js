/*

openapi: 3.0.0
info:
  title: Documentazione API Token Checker
  version: 1.0.0
paths:
  /tokenChecker:
    post:
      summary: Verifica il token di accesso
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                token:
                  type: string
                  description: Token di accesso
      responses:
        '200':
          description: Token valido
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    description: Indicatore di successo
                  message:
                    type: string
                    description: Messaggio di successo
        '401':
          description: Token non fornito
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    description: Indicatore di errore
                  message:
                    type: string
                    description: Messaggio di errore
        '403':
          description: Token di autenticazione non valido
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    description: Indicatore di errore
                  message:
                    type: string
                    description: Messaggio di errore


*/

const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const tokenChecker = function(req, res, next) {
	
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	// if there is no token
	if (!token) {
		return res.status(401).send({ 
			success: false,
			message: 'No token provided.'
		});
	}

	// decode token, verifies secret and checks exp
	jwt.verify(token, process.env.SUPER_SECRET, function(err, decoded) {			
		if (err) {
			return res.status(403).send({
				success: false,
				message: 'Failed to authenticate token.'
			});		
		} else {
			// if everything is good, save to request for use in other routes
			req.loggedUser = decoded;
			next();
		}
	});
	
};

module.exports = tokenChecker