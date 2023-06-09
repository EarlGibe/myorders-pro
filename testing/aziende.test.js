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
const apiName = 'aziende';
const apiURL = '/' + apiName;

// settings
const timeout = 8000;

// documents IDs
const getID = '6469f1899cc45fcbd7f072e0';
const putID = '6469f1899cc45fcbd7f072e0';
const deleteID = '6479e8d1eca6babb1c5b1414';
const wrongID = '999999999999999999999999';

describe('[Testing] ' + apiName, () => {
  beforeAll( async () => {
    jest.setTimeout(timeout);
    app.locals.db = await mongoose.connect(dbURL);
  });

  afterAll( () => { mongoose.connection.close(true); });

  test.skip('GET ' + apiURL + ' should respond with 200', async () => {
    return request(app).get(apiURL)
    .set('x-access-token', passepartout).set('Accept', 'application/json')
    .expect(200);
  });

  test.skip('GET ' + apiURL + '/{id} should respond with 200', async () => {
    return request(app).get(apiURL + '/' + getID)
    .set('x-access-token', passepartout).set('Accept', 'application/json')
    .expect(200);
  });

  test.skip('GET ' + apiURL + '/{id} with wrong ID should respond with 404', async () => {
    return request(app).get(apiURL + '/' + wrongID)
    .set('x-access-token', passepartout).set('Accept', 'application/json')
    .expect(404);
  });

  test.skip('POST ' + apiURL + ' should respond with 201', () => {
    return request(app).post(apiURL)
    .set('x-access-token', passepartout).set('Accept', 'application/json')
    .send({ dati: [] })
    .expect(201);
  });

  test.skip('PUT ' + apiURL + ' should respond with 200', () => {
    return request(app).put(apiURL)
    .set('x-access-token', passepartout).set('Accept', 'application/json')
    .send({ status: true })
    .expect(200);
  });

  test.skip('PUT ' + apiURL + '/{id} should respond with 200', async () => {
    return request(app).put(apiURL + '/' + putID)
    .set('x-access-token', passepartout).set('Accept', 'application/json')
    .send({ dataInserimento: "2023-06-03" })
    .expect(200);
  });

  test.skip('PUT ' + apiURL + '/{id} with wrong ID should respond with 404', async () => {
    return request(app).put(apiURL + '/' + wrongID)
    .set('x-access-token', passepartout).set('Accept', 'application/json')
    .send({ dataInserimento: "2023-06-03" })
    .expect(404);
  });

  // // !!!!!!! Questo comando ELIMINA TUTTO !!!!!!!
  // // -----------------------------------------------------
  // test.skip('DELETE ' + apiURL + ' should respond with 200', async () => {
  //   return request(app).delete(apiURL)
  //   .set('x-access-token', passepartout).set('Accept', 'application/json')
  //   .expect(200);
  // });

  // Elimina il documento selezionato. assicurarsi di averlo presente
  // ------------------------------------------------------------
  test.skip('DELETE ' + apiURL + '/{id} should respond with 200', async () => {
    return request(app).delete(apiURL + '/' + deleteID)
    .set('x-access-token', passepartout).set('Accept', 'application/json')
    .expect(200);
  });

  test.skip('DELETE ' + apiURL + '/{id} with wrong ID should respond with 404', async () => {
    return request(app).delete(apiURL + '/' + wrongID)
    .set('x-access-token', passepartout).set('Accept', 'application/json')
    .expect(404);
  });
  
});