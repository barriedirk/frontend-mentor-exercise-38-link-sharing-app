import { Request, Response, NextFunction } from 'express';

import { UserModel } from '../models/postgress/UserModel';
import { LinkModel } from '../models/postgress/LinkModel';

export class ViewController {
  static async viewProfile(req: Request, res: Response, next: NextFunction) {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ errors: 'slug is empty' });
    }

    const dbUser = await UserModel.findBySlug(slug);

    if (!dbUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    try {
      const links = await LinkModel.findByUser(dbUser.id);
      const { password: _, ...userWithoutPwd } = dbUser;

      return res.json({ user: userWithoutPwd, links });
    } catch (err) {
      next(err);

      return res
        .status(409)
        .json({ error: 'Error when try to get user and links' });
    }
  }
}
