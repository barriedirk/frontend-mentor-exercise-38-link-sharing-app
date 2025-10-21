import request from 'supertest';
import { createApp } from './createApp';

const emailTest = 'demo-devlinks-app-2@fakeemail.com';
const passwordTest = '3nT3rt#4inMen1';

describe('DevLinks API Endpoints', () => {
  let app: ReturnType<typeof createApp>;

  beforeAll(async () => {
    app = createApp();

    await request(app)
      .delete('/api/devlinks/delete-account')
      .send({ email: emailTest });

    await request(app)
      .delete('/api/devlinks/delete-account')
      .send({ email: 'test@test.com' });
  });

  // Optionally clean up again after tests
  // afterAll(async () => {
  //   await request(app)
  //     .delete('/api/devlinks/delete-account')
  //     .send({ email: emailTest });

  //   await request(app)
  //     .delete('/api/devlinks/delete-account')
  //     .send({ email: 'test@test.com' });
  // });

  it('GET /api/devlinks/test should return Hello World', async () => {
    const res = await request(app).get('/api/devlinks/test');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Hello World!');
  });

  it('POST /api/devlinks/create should create a demo account', async () => {
    const res = await request(app)
      .post('/api/devlinks/create')
      .send({
        email: emailTest,
        password: passwordTest,
      })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body.user).toHaveProperty('email', emailTest);
  });

  it('POST /api/devlinks/create should create a test account', async () => {
    const res = await request(app)
      .post('/api/devlinks/create')
      .send({
        email: 'test@test.com',
        password: 'acmeP4ssw0rd',
      })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body.user).toHaveProperty('email', 'test@test.com');
  });

  it('POST /api/devlinks/login should login with test account', async () => {
    const res = await request(app)
      .post('/api/devlinks/login')
      .send({
        email: 'test@test.com',
        password: 'acmeP4ssw0rd',
      })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('POST /api/devlinks/login should login with demo account', async () => {
    const res = await request(app)
      .post('/api/devlinks/login')
      .send({
        email: emailTest,
        password: passwordTest,
      })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
