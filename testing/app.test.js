const request = require('supertest');
const app = require('../app/app');

test('GET / should return 200', () => {
  return request(app).get('/').expect(200);
});