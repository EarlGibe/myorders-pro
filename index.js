// Servers start flags
const HTTP_START = false;
const SECURE_START = true;

// HTTP section
const app = require('./app/app.js');
const mongoose = require('mongoose');
const port = process.env.HTTP_PORT || 3000;

// HTTPS section
const https = require("node:https");
const fs = require("fs");
const securePort = process.env.SECURE_PORT || 4000;

// Database section
const dbuser = 'Group19';
const dbpassword = 'BDqYxCkjxOx5lWA0';
const dbname = 'myorders_pro';
const dbhost = 'maincluster.yx3zxsu.mongodb.net'
const dbparams = 'retryWrites=true&w=majority'
const dbURL = `mongodb+srv://${dbuser}:${dbpassword}@${dbhost}/${dbname}?${dbparams}`;

const Chiave = require('./app/models/chiave.js');

// Show our logo
console.log("  __  __        ____          _                  ______            ");
console.log(" |  \\/  |      / __ \\        | |                 |  __ \\           ");
console.log(" | \\  / |_   _| |  | |_ __ __| | ___ _ __ ___    | |__) | __ ___   ");
console.log(" | |\\/| | | | | |  | | '__/ _` |/ _ \\ '__/ __|   |  ___/ '__/ _ \\  ");
console.log(" | |  | | |_| | |__| | | | (_| |  __/ |  \\__ \\   | |   | | | (_) | ");
console.log(" |_|  |_|\\__, |\\____/|_|  \\__,_|\\___|_|  |___/   |_|   |_|  \\___/  ");
console.log("          __/ |                                                    ");
console.log("         |___/                                                     ");
console.log("                                                                   ");

// Connection to database and server start
if(process.env.VERBOSE_LOG == '1') console.log("Attempt to connect to database...");

app.locals.db = mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
.then ( async () => {
    
    if(process.env.VERBOSE_LOG == '1') console.log("... connected to Database!");

    if (HTTP_START) {

        app.listen(port, () => {
            console.log(`Server HTTP listening on port ${port} \n`);
        });
    } 

    if (SECURE_START) {

        if(process.env.VERBOSE_LOG == '1') console.log("Downloading the HTTPS private key...");

        try{
            httpsKey = (await Chiave.findOne({ nome: 'key.pem' })).valore;
            app.set('httpsKey', httpsKey);
            if(process.env.VERBOSE_LOG == '1') console.log("... HTTPS private key acquired!");
            
        }catch(error){
            if(process.env.VERBOSE_LOG == '1') console.log(error);
            res.status(500).json({ error: 'Si è verificato un errore durante la ricerca delle chiave https.' });
        }

        https.createServer({key: httpsKey, cert: fs.readFileSync('./cert.pem')}, app).listen(securePort, () => {
            console.log(`Secure server HTTPS listening on port ${securePort} \n`);
        })
    }
    
});

module.exports=app;