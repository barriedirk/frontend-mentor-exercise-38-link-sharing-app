import { Request, Response, NextFunction } from 'express';
import { LinkModel } from '../models/postgress/LinkModel';
import { linkArraySchema } from '../schemas/link.schema';
import { getIdFromJWT } from '../utils/utils';

export class LinksController {
  static async getLinks(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const links = await LinkModel.findByUser(user.userId);

      return res.json({ links });
    } catch (err) {
      next(err);
    }
  }

  static async replaceAllLinks(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { errorStatus, errorMessage, userId } = getIdFromJWT(req);

    if (errorStatus) {
      return res.status(errorStatus).json({ error: errorMessage });
    }

    try {
      const parsed = linkArraySchema.safeParse(req.body);

      if (!parsed.success) {
        return res
          .status(400)
          .json({ errors: parsed.error.flatten().fieldErrors });
      }

      await LinkModel.replaceLinks(userId, parsed.data);

      return res.status(204).send();
    } catch (err) {
      next(err);

      return res
        .status(409)
        .json({ error: 'Error when try to replace the links' });
    }
  }

  static async createLink(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const { platform, url, position } = req.body;
      const newLink = await LinkModel.create(user.userId, {
        platform,
        url,
        position,
      });
      return res.status(201).json({ link: newLink });
    } catch (err) {
      next(err);
    }
  }

  static async updateLink(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const linkId = Number(req.params.id);
      const updates = req.body;
      const updated = await LinkModel.update(linkId, user.userId, updates);
      if (!updated) {
        return res
          .status(404)
          .json({ error: 'Link not found or not authorized' });
      }
      return res.json({ link: updated });
    } catch (err) {
      next(err);
    }
  }

  static async deleteLink(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const linkId = Number(req.params.id);
      const ok = await LinkModel.delete(linkId, user.userId);
      if (!ok) {
        return res
          .status(404)
          .json({ error: 'Link not found or not authorized' });
      }
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
