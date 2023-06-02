const request = require('supertest');
const app = require('../../app/app');

test('GET /users should respond with 200', async () => {
    request(app).get('/users').expect(200)
});