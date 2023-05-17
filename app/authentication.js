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