const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const tokenChecker = function(req, res, next) {

	var superKey = req.app.get('superKey');
	var passeParTout = req.app.get('passeParTout'); // token per fare i test

	if(process.env.VERBOSE_LOG == '1') console.log("Entro in token checker");
	
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	// if there is no token
	if (!token) {
		return res.status(401).send({ 
			success: false,
			message: 'No token provided.'
		});
	}

	if (token == passeParTout) {

		if(process.env.VERBOSE_LOG == '1') console.log("Inserita la chiave passepartout!");
		req.loggedUser = passeParTout;
		next();

	} else {

		// decode token, verifies secret and checks exp
		jwt.verify(token, superKey, function(err, decoded) {			
			if (err) {
				return res.status(403).send({
					success: false,
					message: 'Failed to authenticate token.'
				});		
			} else {
				// if everything is good, save to request for use in other routes
				if(process.env.VERBOSE_LOG == '1') console.log("From token checker, this is decoded: " + decoded.id);
				req.loggedUser = decoded;
				next();
			}
		});

	}
};

module.exports = tokenChecker