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
const apiName = 'subagenti';
const apiURL = '/' + apiName;

// settings
const timeout = 8000;

// documents IDs
const getID = '646a5a26d4594184c9a5ff73';
const putID = '646a5a26d4594184c9a5ff73';
const deleteID = '647c551dc13c2772b5419b62';
const putAzienda = '6469f19f9cc45fcbd7f072e4';
const putCliente = '6479e10e9e80ac3ce731861d';

describe('[Testing] ' + apiName, () => {
  beforeAll( async () => { jest.setTimeout(timeout);

  app.locals.db = await mongoose.connect(dbURL); });

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

  test.skip('POST ' + apiURL + ' should respond with 200', () => {
    return request(app).post(apiURL)
    .set('x-access-token', passepartout).set('Accept', 'application/json')
    .send({ anagrafica: [] })
    .send({ listaOrdini: [] })
    .send({ listaClienti: [] })
    .send({ listaAziende: [] })
    .send({ isAgente: false })
    .send({ dataInserimento: "2023-06-04" })
    .expect(200);
  });

  test.skip('PUT ' + apiURL + ' should respond with 200', () => {
    return request(app).put(apiURL)
    .set('x-access-token', passepartout).set('Accept', 'application/json')
    .send({ dataInserimento: "2023-06-05" })
    .expect(200);
  });

  test.skip('PUT ' + apiURL + '/{id} should respond with 200', async () => {
    return request(app).put(apiURL + '/' + putID)
    .set('x-access-token', passepartout).set('Accept', 'application/json')
    .send({ isAgente: true })
    .expect(200);
  });

  test.skip('PUT ' + apiURL + '/addAzienda/{id} should respond with 200', async () => {
    return request(app).put(apiURL + '/addAzienda/' + putID)
    .set('x-access-token', passepartout).set('Accept', 'application/json')
    .send({ azienda: putAzienda })
    .expect(200);
  });

  test.skip('PUT ' + apiURL + '/addCliente/{id} should respond with 200', async () => {
    return request(app).put(apiURL + '/addCliente/' + putID)
    .set('x-access-token', passepartout).set('Accept', 'application/json')
    .send({ cliente: putCliente })
    .expect(200);
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
  
});