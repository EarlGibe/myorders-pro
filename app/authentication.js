const express = require('express');
const router = express.Router();
const User = require('./models/user'); // get our mongoose model
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

// ---------------------------------------------------------
// route to authenticate and get a new token
// ---------------------------------------------------------
router.post('', async function(req, res) {

	var superKey = req.app.get('superKey');

	if(process.env.VERBOSE_LOG == '1') console.log("Entro in autentication");
	
	// find the user
	let user = await User.findOne({
		username: req.body.username
	}).exec();

	if(user){
		if(req.body.password!=null){
			if (user.password != req.body.password) {
				res.status(401).json({ success: false, message: 'Authentication failed. User or password not found.' });
				return;
			}
		}else{
			if(req.body.email!=null){
				if (user.email != req.body.email) {
					res.status(401).json({ success: false, message: 'Authentication failed. User or email not found.' });
					return;
				}
			}else{
				res.status(401).json({ success: false, message: 'Authentication failed. Email not found' });
			}
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

		var token = jwt.sign(payload, superKey, options);

		res.status(200).json({
			success: true,
			message: 'Enjoy your token!',
			token: token,
			username: user.username,
			id: user._id,
			self: "users/" + user._id
		});

	} else {
		res.status(401).json({ success: false, message: 'Authentication failed. User not found' });
	}

});

module.exports = router;