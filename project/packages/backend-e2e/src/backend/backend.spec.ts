import axios from 'axios';

const HOST = (process.env.HOST || 'localhost').replace(/^https?:\/\//, '');
const PORT = process.env.PORT || '1234';

const baseUrl = `http://${HOST}:${PORT}/api/devlinks`;

describe('GET /test', () => {
  it('should return a message', async () => {
    const res = await axios.get(`${baseUrl}/test`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello World!' });
  });
});
