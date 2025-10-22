import axios from 'axios';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '1234';
const baseUrl = `http://${HOST}:${PORT}/api/devlinks`;

const email = 'teste2ebackend@fakeemail.com';
const password = 'TestPassword123!';

describe('Links API (E2E)', () => {
  let authToken: string;

  beforeAll(async () => {
    try {
      await axios.delete(`${baseUrl}/delete-account`, {
        data: { email },
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      console.log('Error delete');
    }

    try {
      await axios.post(
        `${baseUrl}/create`,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (err) {
      console.log('Error create');
    }

    const loginResponse = await axios.post(
      `${baseUrl}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

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

  it('should create a new link on PUT /links', async () => {
    const links = [
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
    ];

    const response = await axios.put(`${baseUrl}/links`, links, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    expect(response.status).toBe(204);
  });

  // it('should create a new link on POST /links', async () => {
  //   const newLink = {
  //     platform: 'Twitter',
  //     url: 'https://twitter.com/testuser',
  //     position: 1,
  //   };
  //
  //   const response = await axios.post(`${baseUrl}/links`, newLink, {
  //     headers: {
  //       Authorization: `Bearer ${authToken}`,
  //     },
  //   });
  //
  //   expect(response.status).toBe(201);
  //   expect(response.data).toHaveProperty('link');
  //   expect(response.data.link.platform).toBe(newLink.platform);
  //   expect(response.data.link.url).toBe(newLink.url);
  // });
});
