const request = require('supertest');
const app = require('../app/app');
const mongoose = require('mongoose');

// Database section
const dbuser = 'Group19';
const dbpassword = 'BDqYxCkjxOx5lWA0';
const dbname = 'myorders_pro';
const dbhost = 'maincluster.yx3zxsu.mongodb.net'
const dbparams = 'retryWrites=true&w=majority'
const dbURL = `mongodb+srv://${dbuser}:${dbpassword}@${dbhost}/${dbname}?${dbparams}`;

const timeout = 10000;

describe('[Testing] app', () => {
  beforeAll( async () => {
      jest.setTimeout(timeout);
      app.locals.db = await mongoose.connect(dbURL);
  });

  afterAll( () => { mongoose.connection.close(true); });

  test.skip('GET / should respond with 200', async () => {
      return request(app).get('/').expect(200).then( (res) => {
          if(res.body) expect(res.body).not.toBe('null');
      })
  });
});
