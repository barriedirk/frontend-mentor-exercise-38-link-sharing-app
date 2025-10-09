import { Router } from 'express';

import { DevLinksController } from '../controllers/DevLinks';
import { authenticateJWT } from '../middlewares/auth.middleware';

export const devLinksRouter: Router = Router();

devLinksRouter.get('/test', DevLinksController.helloWorld);
devLinksRouter.post('/create', DevLinksController.create);
devLinksRouter.post('/login', DevLinksController.login);
devLinksRouter.get('/me', authenticateJWT, DevLinksController.getProfile);
