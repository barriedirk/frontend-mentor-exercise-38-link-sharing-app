import express, { json } from 'express';
import { devLinksRouter } from './routes/devlink';
import { corsMiddleware } from './middlewares/cors.js';

console.log('main.ts loaded');

try {
  const PORT = process.env.PORT ?? 1234;
  const app = express();

  app.use(json());
  app.use(corsMiddleware());
  app.disable('x-powered-by');

  app.use('/api/devlinks', devLinksRouter);

  app.listen(PORT, () => {
    console.log(`✅ Server listening on http://localhost:${PORT}`);
  });
} catch (err) {
  console.error('❌ Server crashed during setup:', err);
}
