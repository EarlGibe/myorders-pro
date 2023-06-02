const request = require('supertest');
const app = require('../app/app');

test('GET / should respond with 200', async () => {
    await request(app).get('/').expect(200).then( (res) => {
        if(res.body) expect(res.body).not.toBe('null');
    })
});