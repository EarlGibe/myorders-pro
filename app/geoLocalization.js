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
const stateParameter = "state=";

const formatParameter = "format=json";
const limitParameter = "limit=1"; // one result

const resultField = "display_name" // where is our result

var parameters;

// ---------------------------------------------------------
// Simple query
// ---------------------------------------------------------
router.post('', async function(req, res) {

	if(process.env.VERBOSE_LOG == '1') console.log("Entro in geoLocalization simple");

	if (req.body == null) {

		if(process.env.VERBOSE_LOG == '1') console.log("No data to search");
		res.status(400).json("Richiesta vuota");
	}

	let simpleQuery = geoSearchUrl + queryParameter + req.body + "&" + formatParameter + "&" + limitParameter;

	fetchGeoResult(simpleQuery);

});

// ---------------------------------------------------------
// Advanced query
// ---------------------------------------------------------
router.post('/adv', async function(req, res) {

	if(process.env.VERBOSE_LOG == '1') console.log("Entro in geoLocalization advanced");

	let checkAddress = new Address(req.body);

	if (checkAddress.indirizzo == null && checkAddress.civico == null && checkAddress.citta == null && checkAddress.nazione == null && checkAddress.provReg == null & checkAddress.capZip == null) {
		if(process.env.VERBOSE_LOG == '1') console.log("No data to search");
		res.status(400).json("Richiesta vuota");
	}

	let advQuery = geoSearchUrl;

	if (checkAddress.civico != null && checkAddress.indirizzo != null) {
		advQuery = advQuery + streetParameter + checkAddress.civico + " " + checkAddress.indirizzo + "&";
	} else if (checkAddress.indirizzo != null) {
		advQuery = advQuery + streetParameter + checkAddress.indirizzo + "&";
	}

	if (checkAddress.citta != null ) {
		advQuery = advQuery + cityParameter + checkAddress.citta + "&";
	}

	if (checkAddress.nazione != null ) {
		advQuery = advQuery + countryParameter + checkAddress.nazione + "&";
	}

	if (checkAddress.capZip != null ) {
		advQuery = advQuery + postalcodeParam + checkAddress.capZip + "&";
	}

	if (checkAddress.provReg != null ) {
		advQuery = advQuery + stateParameter + checkAddress.provReg + "&";
	}

	advQuery = advQuery + formatParameter + "&" + limitParameter;

	fetchGeoResult(advQuery);

});

async function fetchGeoResult(urlString) {

	await fetch(urlString, {
        method: 'GET'
    })
	.then(resp => resp.json())
	.then(function (data) { 

		console.log(data);


	})
	.catch(error => console.error(error))

};

module.exports = router;