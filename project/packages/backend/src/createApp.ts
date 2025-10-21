import express, { Express } from 'express';
import path from 'path';
import dotenv from 'dotenv';

import { devLinksRouter } from './routes/devlink';
import { corsMiddleware } from './middlewares/cors.middleware';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});

export function createApp(): Express {
  const app = express();

  app.use(corsMiddleware());

  app.use(
    '/api/devlinks/uploads',
    express.static(path.join(__dirname, '../uploads'))
  );

  app.use((req, res, next) => {
    const contentType = req.headers['content-type'] || '';

    if (contentType.includes('multipart/form-data')) return next();

    express.json()(req, res, next);
  });

  app.disable('x-powered-by');

  app.use('/api/devlinks', devLinksRouter);

  return app;
}
