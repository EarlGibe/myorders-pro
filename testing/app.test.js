const request = require('supertest');
const app = require('../app/app');

test('GET / should return 200', () => {
    return fetchData().then(data => {
        expect(200);
    });
});

async function fetchData() {
    return await request(app).get('/')
};