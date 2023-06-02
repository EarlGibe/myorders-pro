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
const passepartout = 'supercalifragilistichespiralitoso';

describe('[Testing] users', () => {
  beforeAll( async () => { jest.setTimeout(8000);

  app.locals.db = await mongoose.connect(dbURL); });

  afterAll( () => { mongoose.connection.close(true); });

  test('GET /users should respond with 200', async () => {
    return request(app).get('/users')
    .set('x-access-token', passepartout).set('Accept', 'application/json')
    .expect(200);
  });

  test('GET /users/{id} should respond with 200', async () => {
    return request(app).get('/users/64776deb362c8813b703b829')
    .set('x-access-token', passepartout).set('Accept', 'application/json')
    .expect(200);
  });

  test('POST /users with User not specified', () => {
    return request(app).post('/users')
    .set('x-access-token', passepartout).set('Accept', 'application/json')
    .expect(400, { error: 'Student not specified' });
  });

  test('PUT /users with User not specified', () => {
    return request(app).put('/users')
    .set('x-access-token', passepartout).set('Accept', 'application/json')
    .expect(400, { error: 'Student not specified' });
  });

  test('PUT /users/{id} should respond with 200', async () => {
    return request(app).put('/users/64776deb362c8813b703b829')
    .set('x-access-token', passepartout).set('Accept', 'application/json')
    .expect(400, { error: 'User not specified' });
  });

  // !!!!!!! Questo comando ELIMINA TUTTI GLI USER !!!!!!!
  // test('DELETE /users should respond with 200', async () => {
  //   return request(app).delete('/users').expect(200);
  // });

  // test('DELETE /users/{id} should respond with 200', async () => {
  //   return request(app).delete('/users/6479bd3e2c5000e3da081642').expect(200);
  // });
  
});