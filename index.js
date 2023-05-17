const https = require("node:https");
const fs = require("fs");

const express = require("express");

const app = require('./app/app.js');
const mongoose=require('mongoose');

const secureApp = express();

const port = process.env.PORT || 3000;
const securePort = 4000;

const user = 'Group19';
const password = 'BDqYxCkjxOx5lWA0';
const dbname='myorders_pro'

const URL = `mongodb+srv://${user}:${password}@maincluster.yx3zxsu.mongodb.net/${dbname}?retryWrites=true&w=majority`;

app.locals.db = mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then ( () => {
    
    console.log("Connected to Database");
    
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
    
});


//HTTPS CRUD
/*
https.createServer({
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
}, secureApp).listen(securePort, ()=>{
    console.log("Secure server running on port ", securePort);
})

secureApp.get('/', (req, res) => {
    res.send('get secure');
});

secureApp.post('/', (req, res) => {
    res.send('post secure');
});

secureApp.put('/', (req, res) => {
    res.send('put secure');
});

secureApp.delete('/', (req, res) => {
    res.send('delete secure');
});
*/

module.exports=app;