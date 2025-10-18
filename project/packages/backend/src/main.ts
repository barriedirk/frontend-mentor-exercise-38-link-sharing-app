import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import { devLinksRouter } from './routes/devlink';
import { corsMiddleware } from './middlewares/cors.middleware';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});

console.log('main.ts loaded');

try {
  const PORT = process.env.PORT ?? 1234;
  const app = express();

  app.use(corsMiddleware());
  app.use(
    '/api/devlinks/uploads',
    express.static(path.join(__dirname, '../uploads'))
  );

  // app.use(json()); because, we receive a Picture File
  app.use((req, res, next) => {
    const contentType = req.headers['content-type'] || '';

    if (contentType.includes('multipart/form-data')) {
      return next();
    }

    express.json()(req, res, next);
  });

  app.disable('x-powered-by');

  app.use('/api/devlinks', devLinksRouter);

  app.listen(PORT, () => {
    console.log(`✅ Server listening on http://localhost:${PORT}`);
  });
} catch (err) {
  console.error('❌ Server crashed during setup:', err);
}
