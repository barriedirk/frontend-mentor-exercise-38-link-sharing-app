import axios from 'axios';

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ?? '1234';

axios.defaults.baseURL = `http://${host}:${port}`;
