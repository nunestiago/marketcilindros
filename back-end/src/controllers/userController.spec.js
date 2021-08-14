const request = require('supertest');

const app = require('../server');

describe('Register endpoint', () => {
  it('Register missing one of the req.body', () =>
    request(app)
      .post('/cadastro')
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) =>
        expect(response.body).toEqual('Todos os campos são obrigatórios'),
      ));
});
