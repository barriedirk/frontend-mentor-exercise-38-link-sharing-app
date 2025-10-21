import request from 'supertest';
import { createApp } from './createApp';

const testEmail = 'links-test@example.com';
const testPassword = 'StrongP@ssw0rd!';
let app: ReturnType<typeof createApp>;
let token: string;
// let createdLinkId: number;

describe('LinksController - API Tests', () => {
  beforeAll(async () => {
    app = createApp();

    await request(app)
      .delete('/api/devlinks/delete-account')
      .send({ email: testEmail });

    await request(app)
      .post('/api/devlinks/create')
      .send({ email: testEmail, password: testPassword });

    const loginRes = await request(app)
      .post('/api/devlinks/login')
      .send({ email: testEmail, password: testPassword });

    token = loginRes.body.token;
  });

  afterAll(async () => {
    await request(app)
      .delete('/api/devlinks/delete-account')
      .send({ email: testEmail });
  });

  // it('POST /api/devlinks/create-link should create a new link', async () => {
  //   const res = await request(app)
  //     .post('/api/devlinks/create-link')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({
  //       platform: 'GitHub',
  //       url: 'https://github.com/yourhandle',
  //       position: 0,
  //     });
  //
  //   expect(res.status).toBe(201);
  //   expect(res.body).toHaveProperty('link');
  //   expect(res.body.link).toMatchObject({
  //     platform: 'GitHub',
  //     url: 'https://github.com/yourhandle',
  //   });
  //
  //   createdLinkId = res.body.link.id;
  // });

  // it('GET /api/devlinks/links should return links for the user', async () => {
  //   const res = await request(app)
  //     .get('/api/devlinks/links')
  //     .set('Authorization', `Bearer ${token}`);
  //
  //   expect(res.status).toBe(200);
  //   expect(res.body).toHaveProperty('links');
  //   expect(Array.isArray(res.body.links)).toBe(true);
  //   expect(res.body.links.length).toBeGreaterThan(0);
  // });
  //
  // it('PUT /api/devlinks/update-link/:id should update an existing link', async () => {
  //   const res = await request(app)
  //     .put(`/api/devlinks/update-link/${createdLinkId}`)
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({
  //       platform: 'UpdatedPlatform',
  //       url: 'https://updated-url.com',
  //       position: 1,
  //     });
  //
  //   expect(res.status).toBe(200);
  //   expect(res.body).toHaveProperty('link');
  //   expect(res.body.link.platform).toBe('UpdatedPlatform');
  //   expect(res.body.link.url).toBe('https://updated-url.com');
  // });

  // it('DELETE /api/devlinks/delete-link/:id should delete the link', async () => {
  //   const res = await request(app)
  //     .delete(`/api/devlinks/delete-link/${createdLinkId}`)
  //     .set('Authorization', `Bearer ${token}`);
  //
  //   expect(res.status).toBe(204);
  // });

  it('PUT /api/devlinks/links should replace all links', async () => {
    const res = await request(app)
      .put('/api/devlinks/links')
      .set('Authorization', `Bearer ${token}`)
      .send([
        {
          platform: 'YouTube',
          url: 'https://youtube.com/@devchannel',
          position: 0,
        },
        {
          platform: 'LinkedIn',
          url: 'https://linkedin.com/in/devuser',
          position: 1,
        },
      ]);

    expect(res.status).toBe(204);
  });

  it('DELETE non-existing link should return 404', async () => {
    const res = await request(app)
      .delete('/api/devlinks/delete-link/999999')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});
