const request = require('supertest');
const app = require('../../app/app');

test('GET /clienti should respond with 200', async () => {
    request(app).get('/clienti').expect(200)
});