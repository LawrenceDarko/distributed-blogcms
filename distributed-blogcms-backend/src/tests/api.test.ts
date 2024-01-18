// src/tests/api.test.ts
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { app } from '..';
import { describe, it } from 'node:test';
// import app from '../index';

chai.use(chaiHttp);

describe('API Endpoints', () => {
    it('should retrieve all blog posts', async () => {
        const res = await chai.request(app)
            .get('/blogposts');

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
    });

    // Add more integration tests for other API endpoints
});
