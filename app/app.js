const express = require('express');
const app = express();

const authentication = require('./authentication.js');
const tokenChecker = require('./tokenChecker.js');

const users = require('./users.js');
const articoli = require('./articoli.js');
const aziende = require('./aziende.js');
const cataloghi = require('./cataloghi.js');
const clienti = require('./clienti.js');
const dipendenti = require('./dipendenti.js');
const ordini = require('./ordini.js');
const subAgenti = require('./subAgenti.js');
const tecnici = require('./tecnici.js');

/**
 * Configure Express.js parsing middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Serve front-end static files
 */
app.use('/', express.static(process.env.FRONTEND || 'static'));
// If process.env.FRONTEND folder does not contain index.html then use the one from static
app.use('/', express.static('static')); // expose also this folder

/**
 * Print on console the request
 */
app.use((req,res,next) => {
    console.log(req.method + ' ' + req.url)
    next()
})


/**
 * Authentication routing and middleware
 */
app.use('/authentications', authentication);

// Protect endpoint
// access is restricted only to authenticated users
// a valid token must be provided in the request.
// No resources are available without authentication.
app.use('', tokenChecker);


/**
 * Resource routing
 */

app.use('/users', users);
app.use('/articoli', articoli);
app.use('/aziende', aziende);
app.use('/cataloghi', cataloghi);
app.use('/clienti', clienti);
app.use('/dipendenti', dipendenti);
app.use('/ordini', ordini);
app.use('/subAgenti', subAgenti);
app.use('/tecnici', tecnici);

/* Default 404 handler */
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});



module.exports = app;
