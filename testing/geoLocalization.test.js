// imports section
const request = require('supertest');
const app = require('../app/app');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

// Database section
const dbuser = 'Group19';
const dbpassword = 'BDqYxCkjxOx5lWA0';
const dbname = 'myorders_pro';
const dbhost = 'maincluster.yx3zxsu.mongodb.net';
const dbparams = 'retryWrites=true&w=majority';
const dbURL = `mongodb+srv://${dbuser}:${dbpassword}@${dbhost}/${dbname}?${dbparams}`;

// token section
const passepartout = 'supercalifragilistichespiralitoso';

// API url
const apiName = 'geolocalization';
const apiURL = '/' + apiName;

// settings
const timeout = 10000;

// human tested, it works from the browser, we left this file to show our attempt at testing it with jest 

describe('[Testing] ' + apiName, () => {
  beforeAll( async () => {
    jest.setTimeout(timeout);
    app.locals.db = await mongoose.connect(dbURL);
  });

  afterAll( () => { mongoose.connection.close(true); });

  test.skip('POST ' + apiURL + ' should respond with 200', async () => {
    const response = await request(app)
    .post(apiURL)
    .set('Accept', 'application/json')
    .send({ provincia: "Trento" });

    expect(response.statusCode).toBe(200);

  }, timeout);

  test.skip('POST ' + apiURL + '/adv should respond with 200', async () => {
    const response = await request(app)
    .post(apiURL + '/adv')
    .set('Accept', 'application/json')
    .send({ provincia: "Trento" })
    .send({ via: "Via delle Marnighe" });

    expect(response.statusCode).toBe(200);
  }, timeout);
  
});