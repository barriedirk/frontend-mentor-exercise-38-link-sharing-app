import request from 'supertest';
import { createApp } from './createApp';

describe('UserController - Hello World Route', () => {
  it('GET /api/devlinks/test should return Hello World', async () => {
    const app = createApp();
    const response = await request(app).get('/api/devlinks/test');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello World!' });
  });
});
