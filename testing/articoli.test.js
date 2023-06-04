// imports section
const request = require('supertest');
const app = require('../app/app');
const mongoose = require('mongoose');

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
const apiName = 'articoli';
const apiURL = '/' + apiName;

// settings
const timeout = 8000;

// documents IDs
const getID = '647b50f7fcfaae5ccd0c3d6b';
const putID = '647b50f7fcfaae5ccd0c3d6b';
const deleteID = '6479e3ba3ca23122500c7c75';
const getCatalogo = '647b50f7fcfaae5ccd0c3d69';

describe('[Testing] ' + apiName, () => {
  beforeAll( async () => { jest.setTimeout(timeout);

  app.locals.db = await mongoose.connect(dbURL); });

  afterAll( () => { mongoose.connection.close(true); });

  // test('GET ' + apiURL + ' should respond with 200', async () => {
  //   return request(app).get(apiURL)
  //   .set('x-access-token', passepartout).set('Accept', 'application/json')
  //   .expect(200);
  // });

  test('GET ' + apiURL + '/{id} should respond with 200', async () => {
    return request(app).get(apiURL + '/' + getID)
    .set('x-access-token', passepartout).set('Accept', 'application/json')
    .expect(200);
  });

  // test('GET ' + apiURL + '/filtered/{catalogo} should respond with 200', async () => {
  //   return request(app).get(apiURL + '/filtered/' + getCatalogo)
  //   .set('x-access-token', passepartout).set('Accept', 'application/json')
  //   .expect(200);
  // });

  // test('POST ' + apiURL + ' should respond with 200', () => {
  //   return request(app).post(apiURL)
  //   .set('x-access-token', passepartout).set('Accept', 'application/json')
  //   .send({ nome: "Articolo" })
  //   .send({ prezzo: "1000000000" })
  //   .expect(200);
  // });

  // test('PUT ' + apiURL + ' should respond with 200', () => {
  //   return request(app).put(apiURL)
  //   .set('x-access-token', passepartout).set('Accept', 'application/json')
  //   .send({ status: true })
  //   .expect(200);
  // });

  // test('PUT ' + apiURL + '/{id} should respond with 200', async () => {
  //   return request(app).put(apiURL + '/' + putID)
  //   .set('x-access-token', passepartout).set('Accept', 'application/json')
  //   .send({ dataInserimento: "2023-06-03" })
  //   .expect(200);
  // });

  // // !!!!!!! Questo comando ELIMINA TUTTO !!!!!!!
  // // -----------------------------------------------------
  // test('DELETE ' + apiURL + ' should respond with 200', async () => {
  //   return request(app).delete(apiURL)
  //   .set('x-access-token', passepartout).set('Accept', 'application/json')
  //   .expect(200);
  // });

  // Elimina il documento selezionato. assicurarsi di averlo presente
  // ------------------------------------------------------------
  // test('DELETE ' + apiURL + '/{id} should respond with 200', async () => {
  //   return request(app).delete(apiURL + '/' + deleteID)
  //   .set('x-access-token', passepartout).set('Accept', 'application/json')
  //   .expect(200);
  // });
  
});