const express = require('express');
const app = express();

//const authentication = require('./authentication.js');
//const tokenChecker = require('./tokenChecker.js');

const cataloghi = require('./deprecated/cataloghi.js');
const example = require('./examples/NoDB/exampleRESTcrud.js');
const conn1 = require('./examples/DB/conn1.js');
const articoli = require('./articoli.js');

/**
 * Configure Express.js parsing middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
//app.use('/api/v1/authentications', authentication);

// Protect booklendings endpoint
// access is restricted only to authenticated users
// a valid token must be provided in the request
//app.use('/api/v1/booklendings', tokenChecker);
//app.use('/api/v1/students/me', tokenChecker);



/**
 * Resource routing
 */

app.use('/myorders-pro/cataloghi', cataloghi);
app.use('/example', example);
app.use('/api/conn', conn1);
app.use('/articoli', articoli);


/* Default 404 handler */
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});



module.exports = app;
