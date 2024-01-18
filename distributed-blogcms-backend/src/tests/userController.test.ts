// src/tests/userController.test.ts
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'node:test';
import { app } from '..';

chai.use(chaiHttp);

describe('User Controller', () => {
    it('should create a new user', async () => {
        const res = await chai.request(app)
            .post('/users/create')
            .send({ username: 'testuser', email: 'test@example.com', password: 'testpassword' });

        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message').to.equal('User created successfully');
    });

});
