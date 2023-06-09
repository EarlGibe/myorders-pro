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

// API url
const apiName = 'authentications';
const apiURL = '/' + apiName;

// settings
const timeout = 8000;

// values
const username = 'admin';
const password = 'admin';
const wrongUsername = 'wrongUsername';
const wrongPassword = 'wrongPassword';
const blank = '';

describe('[Testing] ' + apiName, () => {
  beforeAll( async () => {
    jest.setTimeout(timeout);
    app.locals.db = await mongoose.connect(dbURL);
  });

  afterAll( () => { mongoose.connection.close(true); });

  test.skip('POST ' + apiURL + ' should respond with 200 and valid authentication token', async () => {
    const response =  await request(app)
    .post(apiURL)
    .send({ username: username })
    .send({ password: password });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test.skip('POST ' + apiURL + ' wrong username should respond with 401', async () => {
    const response = await request(app)
    .post(apiURL)
    .send({ username: wrongUsername })
    .send({ password: password });

    expect(response.statusCode).toBe(401);
    expect(response.body).not.toHaveProperty('token');
  });

  test.skip('POST ' + apiURL + ' wrong password should respond with 401', async () => {
    const response = await request(app)
    .post(apiURL)
    .send({ username: username })
    .send({ password: wrongPassword });

    expect(response.statusCode).toBe(401);
    expect(response.body).not.toHaveProperty('token');
  });

  test.skip('POST ' + apiURL + ' wrong everything should respond with 401', async () => {
    const response = await request(app)
    .post(apiURL)
    .send({ username: wrongUsername })
    .send({ password: wrongPassword });

    expect(response.statusCode).toBe(401);
    expect(response.body).not.toHaveProperty('token');
  });

  test.skip('POST ' + apiURL + ' no password should respond with 401', async () => {
    const response = await request(app)
    .post(apiURL)
    .send({ username: username })
    .send({ password: blank });

    expect(response.statusCode).toBe(401);
    expect(response.body).not.toHaveProperty('token');
  });

  test.skip('POST ' + apiURL + ' no username should respond with 401', async () => {
    const response = await request(app)
    .post(apiURL)
    .send({ username: blank })
    .send({ password: password });

    expect(response.statusCode).toBe(401);
    expect(response.body).not.toHaveProperty('token');
  });

  test.skip('POST ' + apiURL + ' nothing should respond with 401', async () => {
    const response = await request(app)
    .post(apiURL)
    .send({ username: blank })
    .send({ password: blank });

    expect(response.statusCode).toBe(401);
    expect(response.body).not.toHaveProperty('token');
  });
  
});