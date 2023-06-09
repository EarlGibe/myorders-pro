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
const apiName = 'exportPDF';
const apiURL = '/' + apiName;

// settings
const timeout = 20000;

// documents IDs
const html = `
          <td colspan="9" style="background-color: #f2f2f2; color: #333;">
            nomeCatalogo
          </td>
          <tr>
            <th>Nome</th>
            <th>Descrizione</th>
            <th>Prezzo(€)</th>
            <th>Sconto <br> Applicato (%)</th>
            <th>Codici a barre</th>
            <th>Totale(€)</th>
            <th>Colori Disponibili</th>
            <th>Taglie Disponibili</th>
            <th>Qta</th>
          </tr>
        `;

const email = {
  azienda: "azienda@email.com",
  ufficio: "gabriele.tabarellidefatis@gmail.com",
  cliente: "filippo.conti@studenti.unitn.it",
  subagente: "robertogiordano113@gmail.com"
}

const outputFilePath = "test1.pdf";
const wrongFilePath = "/cartella/test1.pdf";

describe('[Testing] ' + apiName, () => {
  beforeAll( async () => {
    jest.setTimeout(timeout);
    app.locals.db = await mongoose.connect(dbURL);
  });

  afterAll( () => { mongoose.connection.close(true); });

  test('POST ' + apiURL + ' should respond with 200', async () => {
    
    const response = await request(app)
    .post(apiURL)
    .set('x-access-token', passepartout)
    .set('Accept', 'application/json')
    .send({ html: html })
    .send({ outputFilePath: outputFilePath })
    .send({ email: email });

    expect(response.statusCode).toBe(200);
  }, timeout);

  test.skip('POST ' + apiURL + ' with a directory in the request should respond with 404', async () => {
    
    const response = await request(app)
    .post(apiURL)
    .set('x-access-token', passepartout)
    .set('Accept', 'application/json')
    .send({ html: html })
    .send({ outputFilePath: wrongFilePath })
    .send({ email: email });

    expect(response.statusCode).toBe(404);
  }, timeout);
  
});