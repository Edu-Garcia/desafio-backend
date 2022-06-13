import supertest from 'supertest';
import app from '../../src/app';

describe('App', () => {
  it('should return status 200', async () => {
    const response = await supertest(app).get('/api/healthcheck');
    expect(response.statusCode).toBe(200);
  });
});
