const express = require('express');
const app = express();

const authentication = require('./authentication.js');
const tokenChecker = require('./tokenChecker.js');

const users = require('./users.js');
const articoli = require('./articoli.js');
//const ordini = require('./ordini.js');

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

// Protect booklendings endpoint
// access is restricted only to authenticated users
// a valid token must be provided in the request

app.use('/users', tokenChecker);


/**
 * Resource routing
 */


app.use('/users', users);
app.use('/articoli', articoli);
//app.use('/ordini', ordini);


/* Default 404 handler */
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});



module.exports = app;
