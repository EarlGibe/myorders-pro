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
const apiName = 'cataloghi';
const apiURL = '/' + apiName;

// settings
const timeout = 8000;

// documents IDs
const getID = '646a20c4d322a15436346aa0';
const putID = '646a20c4d322a15436346aa0';
const deleteID = '6479d378cf6294b91cc9fd72';
const getAzienda = '6469f19a9cc45fcbd7f072e2';

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

  test.skip('GET ' + apiURL + '/filtered/{azienda} should respond with 200', async () => {
    return request(app).get(apiURL + '/filtered/' + getAzienda)
    .set('x-access-token', passepartout).set('Accept', 'application/json')
    .expect(200);
  });

  test.skip('POST ' + apiURL + ' should respond with 200', () => {
    return request(app).post(apiURL)
    .set('x-access-token', passepartout).set('Accept', 'application/json')
    .send( { nome: "Catalogo" })
    .send( { listaArticoli: [] })
    .expect(200);
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