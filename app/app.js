// const express = require('express');
// const app = express();

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// //Uncomment to import swagger file
// /*var options = {
//     swaggerOptions: {
//         url: "/api-docs/swagger.json",
//     },
// }
// app.get("/api-docs/swagger.json", (req, res) => res.json(swaggerDocument));
// app.use('/api-docs', swaggerUi.serveFiles(null, options), swaggerUi.setup(null, options));*/

// //

// const cors = require('cors')

// const authentication = require('./authentication.js');
// const tokenChecker = require('./tokenChecker.js');

// const cliente = require('./cliente.js');
// const ordine = require('./ordine.js');
// //implement others...


// /**
//  * Configure Express.js parsing middleware
//  */
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));



// /**
//  * CORS requests
//  */
// app.use(cors())

// // // Add headers before the routes are defined
// // app.use(function (req, res, next) {

// //     // Website you wish to allow to connect
// //     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

// //     // Request methods you wish to allow
// //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// //     // Request headers you wish to allow
// //     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// //     // Set to true if you need the website to include cookies in the requests sent
// //     // to the API (e.g. in case you use sessions)
// //     res.setHeader('Access-Control-Allow-Credentials', true);

// //     // Pass to next layer of middleware
// //     next();
// // });



// /**
//  * Serve front-end static files
//  */
// app.use('/', express.static(process.env.FRONTEND || 'static'));
// // If process.env.FRONTEND folder does not contain index.html then use the one from static
// app.use('/', express.static('static')); // expose also this folder



// app.use((req,res,next) => {
//     console.log(req.method + ' ' + req.url)
//     next()
// })



// /**
//  * Authentication routing and middleware
//  */
// app.use('/api/v1/authentications', authentication);

// // Protect booklendings endpoint
// // access is restricted only to authenticated users
// // a valid token must be provided in the request
// app.use('/api/v1/booklendings', tokenChecker);
// app.use('/api/v1/students/me', tokenChecker);



// /**
//  * Resource routing
//  */

// app.use('/api/v1/books', books);
// app.use('/api/v1/students', students);
// app.use('/api/v1/booklendings', booklendings);



// /* Default 404 handler */
// app.use((req, res) => {
//     res.status(404);
//     res.json({ error: 'Not found' });
// });



// module.exports = app;

//Start here

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Example',
      version: '1.0.0',
      description: 'A simple API example'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const helloRouter = require('./routes/hello');
app.use('/hello', helloRouter);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
