const https = require("node:https");
const fs = require("fs");
const express = require("express");

const app = express();
const secureApp = express();

const port = 3000;
const securePort = 4000;

app.listen(port, function(){
    console.log('Server running on port: ', port);
})

app.get('/', (req, res) => {
    res.send("get NOT secure")
});

app.post('/', (req, res) => {
    res.send('post');
});

app.put('/', (req, res) => {
    res.send('put');
});

app.delete('/', (req, res) => {
    res.send('delete');
});

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