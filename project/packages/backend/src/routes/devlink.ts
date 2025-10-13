import { Router } from 'express';

import { UserController } from '../controllers/UserController';
import { LinksController } from '../controllers/LinksController';

import { authenticateJWT } from '../middlewares/auth.middleware';

export const devLinksRouter: Router = Router();

devLinksRouter.get('/test', UserController.helloWorld);
devLinksRouter.post('/create', UserController.create);
devLinksRouter.post('/login', UserController.login);
devLinksRouter.get('/me', authenticateJWT, UserController.getProfile);
devLinksRouter.post('/get', authenticateJWT, UserController.getProfileById);

devLinksRouter.get('/links', authenticateJWT, LinksController.getLinks);
devLinksRouter.put('/links', authenticateJWT, LinksController.replaceAllLinks);

devLinksRouter.post(
  '/create-link',
  authenticateJWT,
  LinksController.createLink
);
devLinksRouter.put(
  '/update-link/:id',
  authenticateJWT,
  LinksController.updateLink
);
devLinksRouter.delete(
  '/delete-link/:id',
  authenticateJWT,
  LinksController.deleteLink
);
