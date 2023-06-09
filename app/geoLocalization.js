const express = require('express');
const router = express.Router();
const User = require('./models/address'); // get our mongoose model
const Address = require('./models/address');

// API
const geoSearchUrl = "https://nominatim.openstreetmap.org/search?";
const queryParameter = "q=";
const cityParameter = "city=";
const countryParameter = "country=";
const streetParameter = "street=";
const postalcodeParam = "postalcode=";

const formatParameter = "format=json";
const limitParameter = "limit=1"; // one result

var parameters;

// ---------------------------------------------------------
// Simple query
// ---------------------------------------------------------
router.post('', async function(req, res) {

	if(process.env.VERBOSE_LOG == '1') console.log("Entro in geoLocalization simple");

	let simpleQuery = geoSearchUrl + queryParameter + req.body + "&" + formatParameter + "&" + limitParameter;

	// fetch

});

// ---------------------------------------------------------
// Advanced query
// ---------------------------------------------------------
router.post('/adv', async function(req, res) {

	if(process.env.VERBOSE_LOG == '1') console.log("Entro in geoLocalization");

	let checkAddress = new Address(req.body);

	let advQuery = geoSearchUrl;

	if (checkAddress.indirizzo != null) {

		advQuery = advQuery + streetParameter + checkAddress.indirizzo;

	}

	advQuery = advQuery + "&" + formatParameter + "&" + limitParameter;

	// fetch


});

module.exports = router;