// Servers start flags
const HTTP_START = true;
const HTTPS_START = true;

// HTTP section
const app = require('./app/app.js');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

// HTTPS section
const https = require("node:https");
const fs = require("fs");
const securePort = process.env.SECURE_PORT || 4000;

var https_options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
};

// Database section
const dbuser = 'Group19';
const dbpassword = 'BDqYxCkjxOx5lWA0';
const dbname = 'myorders_pro';
const dbhost = 'maincluster.yx3zxsu.mongodb.net'
const dbparams = 'retryWrites=true&w=majority'
const dbURL = `mongodb+srv://${dbuser}:${dbpassword}@${dbhost}/${dbname}?${dbparams}`;

// Connection to database and server start
console.log("Attempt to connect to database...");

app.locals.db = mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
.then ( () => {
    
    console.log("... connected to Database!");

    if (HTTP_START) {

        app.listen(port, () => {
            console.log(`Server HTTP listening on port ${port}`);
        });
    } 

    if (HTTPS_START) {

        https.createServer(https_options, app).listen(securePort, ()=>{
            console.log(`Secure server HTTPS listening on port ${securePort}`);
        })
    }
    
});

module.exports=app;