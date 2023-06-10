const express = require('express');
const router = express.Router();

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

	if (req.body.query == null) {

		if(process.env.VERBOSE_LOG == '1') console.log("No data to search");
		res.status(400).json("Richiesta vuota");
	}

	console.log(req)

	let simpleQuery = geoSearchUrl + queryParameter + req.body.query + "&" + formatParameter + "&" + limitParameter;

	fetch(simpleQuery, {
        method: 'GET'
    })
	.then(resp => resp.json())
	.then(function (data) { 
		res.status(200).send(data);
	})
	.catch(error => console.error(error))

});

// ---------------------------------------------------------
// Advanced query
// ---------------------------------------------------------
router.post('/adv', async function(req, res) {

	if(process.env.VERBOSE_LOG == '1') console.log("Entro in geoLocalization advanced");

	let checkAddress = new Address(req.body);

	console.log(checkAddress)

	if (checkAddress.civico == null && checkAddress.via == null && checkAddress.citta == null && checkAddress.provincia == null && checkAddress.regione == null && checkAddress.capZip == null && checkAddress.nazione == null) {
		if(process.env.VERBOSE_LOG == '1') console.log("No data to search");
		res.status(400).json("Richiesta vuota");
	}

	let advQuery = geoSearchUrl;

	if (checkAddress.civico != null && checkAddress.via != null) {
		advQuery = advQuery + streetParameter + checkAddress.civico + " " + checkAddress.via + "&";
	} else if (checkAddress.via != null) {
		advQuery = advQuery + streetParameter + checkAddress.via + "&";
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

	if (checkAddress.provincia != null ) {
		advQuery = advQuery + stateParameter + checkAddress.provincia + "&";
	}

	if (checkAddress.regione != null ) {
		advQuery = advQuery + stateParameter + checkAddress.regione + "&";
	}

	advQuery = advQuery + formatParameter + "&" + limitParameter;

	
	fetch(advQuery, {
        method: 'GET'
    })
	.then(resp => resp.json())
	.then(function (data) { 
		console.log(data)

		if(data.length!=0){
			res.status(200).send(JSON.stringify({field:data[0].display_name}));
		}else{
			res.status(200).send(JSON.stringify({field:"empty"})) //non cambiare codice, la ricerca è stata effettuata con successo ma la vita non trovata
		}
		

	})
	.catch(error => console.error(error))

});

module.exports = router;