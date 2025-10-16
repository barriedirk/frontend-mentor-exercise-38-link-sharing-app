import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

import { UserModel } from '../models/postgress/UserModel';

import {
  registerSchema,
  loginSchema,
  type RegisterInput,
  type LoginInput,
  idSchema,
  IdInput,
  updateSchema,
  UpdateInput,
} from '../schemas/auth.schema';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export class UserController {
  static async helloWorld(req: Request, res: Response) {
    res.json({ message: 'Hello World!' });
  }

  static async create(req: Request, res: Response) {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      const flattened = result.error.flatten();
      return res.status(400).json({ errors: flattened.fieldErrors });
    }

    const data: LoginInput = result.data;

    const existing = await UserModel.findByEmail(data.email);
    if (existing) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    const hashed = await bcrypt.hash(data.password, 10);

    const user = await UserModel.create({
      email: data.email,
      password: hashed,
      first_name: ' ',
      last_name: ' ',
      slug: crypto.randomUUID(),
    });

    const token = jwt.sign(
      {
        userId: user.id,
        tokenVersion: user.token_version,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const { password: _, ...userWithoutPwd } = user;

    return res.status(201).json({
      user: userWithoutPwd,
      token,
    });
  }

  static async update(req: Request, res: Response) {
    console.log('update => ', req.body);

    const result = updateSchema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;

      return res.status(400).json({ errors });
    }

    let avatarUrl = undefined;
    if (req.file) {
      avatarUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.avatar_url) {
      avatarUrl = req.body.avatar_url;
    } else {
      console.log('No file uploaded');
    }

    const data: UpdateInput = result.data;

    if (!data.id) {
      return res.status(400).json({ error: 'Missing user ID' });
    }

    const duplicate = await UserModel.checkEmailAndSlugNotDuplicated(
      data.email,
      data.slug,
      data.id
    );

    if (duplicate) {
      return res.status(409).json({ error: 'Email or slug already in use' });
    }

    const hashedPassword = data.password
      ? await bcrypt.hash(data.password, 10)
      : undefined;

    console.log('update', data);
    const updatedUser = await UserModel.update({
      id: data.id,
      email: data.email,
      password: hashedPassword,
      first_name: data.firstName,
      last_name: data.lastName,
      slug: data.slug,
      avatar_url: avatarUrl,
    });

    const token = jwt.sign(
      {
        userId: updatedUser.id,
        tokenVersion: updatedUser.token_version,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const { password: _pw, ...safeUser } = updatedUser;

    return res.status(200).json({
      user: safeUser,
      token,
    });
  }

  static async register(req: Request, res: Response) {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      const flattened = result.error.flatten();

      return res.status(400).json({ errors: flattened.fieldErrors });
    }

    const data: RegisterInput = result.data;

    const existingEmail = await UserModel.findByEmail(data.email);
    const existingSlug = await UserModel.findBySlug(data.slug);

    if (existingEmail) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    if (existingSlug) {
      return res.status(409).json({ error: 'Slug already in use' });
    }

    const hashed = await bcrypt.hash(data.password, 10);

    const user = await UserModel.create({
      email: data.email,
      password: hashed,
      first_name: data.first_name,
      last_name: data.last_name,
      slug: data.slug,
      avatar_url: data.avatar_url,
    });

    const token = jwt.sign(
      {
        userId: user.id,
        tokenVersion: user.token_version,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const { password: _, ...userWithoutPwd } = user;

    return res.status(201).json({
      user: userWithoutPwd,
      token,
    });
  }

  static async login(req: Request, res: Response) {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      const flattened = result.error.flatten();
      return res.status(400).json({ errors: flattened.fieldErrors });
    }

    const data: LoginInput = result.data;
    const user = await UserModel.findByEmail(data.email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(data.password, user.password);

    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        tokenVersion: user.token_version,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const { password: _, ...userWithoutPwd } = user;

    return res.json({
      user: userWithoutPwd,
      token,
    });
  }

  static async getProfile(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user;
    const dbUser = await UserModel.findByEmail(user.email);

    if (!dbUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password: _, ...userWithoutPwd } = dbUser;
    return res.json({ user: userWithoutPwd });
  }

  static async getProfileById(req: Request, res: Response) {
    const result = idSchema.safeParse(req.body);

    if (!result.success) {
      const flattened = result.error.flatten();

      return res.status(400).json({ errors: flattened.fieldErrors });
    }

    const data: IdInput = result.data;

    const dbUser = await UserModel.findById(data.id);

    if (!dbUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password: _, ...userWithoutPwd } = dbUser;
    return res.json({ user: userWithoutPwd });
  }
}
