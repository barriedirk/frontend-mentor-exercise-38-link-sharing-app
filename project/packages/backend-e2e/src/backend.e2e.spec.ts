import axios from 'axios';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '1234';
const baseUrl = `http://${HOST}:${PORT}/api/devlinks`;

describe('Links API (E2E)', () => {
  let authToken: string;

  beforeAll(async () => {
    const loginResponse = await axios.post(`${baseUrl}/login`, {
      email: 'test@example.com',
      password: 'TestPassword123!',
    });

    authToken = loginResponse.data.token;
  });

  it('should return the user links on GET /links', async () => {
    const response = await axios.get(`${baseUrl}/links`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data.links)).toBe(true);

    if (response.data.links.length > 0) {
      const link = response.data.links[0];
      expect(link).toHaveProperty('id');
      expect(link).toHaveProperty('platform');
      expect(link).toHaveProperty('url');
    }
  });

  it('should create a new link on POST /links', async () => {
    const newLink = {
      platform: 'Twitter',
      url: 'https://twitter.com/testuser',
      position: 1,
    };

    const response = await axios.post(`${baseUrl}/links`, newLink, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('link');
    expect(response.data.link.platform).toBe(newLink.platform);
    expect(response.data.link.url).toBe(newLink.url);
  });
});
