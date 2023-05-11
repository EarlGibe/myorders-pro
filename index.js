const express = require("express");
var app = express();

const httpPort = 3000;

app.get('/', (req, res) => {
    res.sendStatus(404);
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

app.listen(httpPort, function(){
    console.log('Server running on port: ', httpPort);
})

// const app = require('./app/app.js');
// const mongoose = require('mongoose');

// /**
//  * https://devcenter.heroku.com/articles/preparing-a-codebase-for-heroku-deployment#4-listen-on-the-correct-port
//  */
// const port = process.env.PORT || 8080;


// /**
//  * Configure mongoose
//  */
// // mongoose.Promise = global.Promise;
// app.locals.db = mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
// .then ( () => {
    
//     console.log("Connected to Database");
    
//     app.listen(port, () => {
//         console.log(`Server listening on port ${port}`);
//     });
    
// });