import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

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
import { getIdFromJWT, getJWTValues, removeAvatar } from '../utils/utils';

const { JWT_SECRET } = getJWTValues();

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

  static async deleteUserByEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ error: 'Email required' });

      const deletedCount = await UserModel.deleteOne(email);
      if (deletedCount === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({ message: 'User deleted' });
    } catch (error) {
      console.log('DeleteUserByEmail ', error);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  static async updateSaveLocally(req: Request, res: Response) {
    const { errorStatus, errorMessage, userId } = getIdFromJWT(req);

    if (errorStatus) {
      return res.status(errorStatus).json({ error: errorMessage });
    }

    const result = updateSchema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;

      return res.status(400).json({ errors });
    }

    let avatarUrl = undefined;
    if (req.file) {
      avatarUrl = `${req.file.filename}`;
    } else if (req.body.avatar_url) {
      avatarUrl = req.body.avatar_url;
    } else {
      // console.log('No file uploaded');
    }

    const data: UpdateInput = result.data;

    const duplicate = await UserModel.checkEmailAndSlugNotDuplicated(
      data.email,
      data.slug,
      userId
    );

    if (duplicate) {
      return res.status(409).json({ error: 'Email or slug already in use' });
    }

    const hashedPassword = data.password
      ? await bcrypt.hash(data.password, 10)
      : undefined;

    const updatedUser = await UserModel.update({
      id: userId,
      email: data.email,
      password: hashedPassword,
      first_name: data.firstName,
      last_name: data.lastName,
      slug: data.slug,
      avatar_url: avatarUrl,
    });

    if (req.file && req.body.avatar_url) {
      removeAvatar(req.body.avatar_url);
    }

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

  static async update(req: Request, res: Response) {
    const { errorStatus, errorMessage, userId } = getIdFromJWT(req);

    if (errorStatus) {
      return res.status(errorStatus).json({ error: errorMessage });
    }

    const result = updateSchema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({ errors });
    }

    const data: UpdateInput = result.data;

    const currentUser = await UserModel.findById(userId);

    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    let avatarUrl = currentUser.avatar_url;
    let oldAvatarPublicId = currentUser.avatar_public_id;

    const duplicate = await UserModel.checkEmailAndSlugNotDuplicated(
      data.email,
      data.slug,
      userId
    );

    if (duplicate) {
      return res.status(409).json({ error: 'Email or slug already in use' });
    }

    if (req.file) {
      const buffer = req.file.buffer;

      if (!buffer) {
        return res.status(400).json({ error: 'File buffer is missing' });
      }

      try {
        const uploadResult = await new Promise<UploadApiResponse>(
          (resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                folder: 'avatars',
                resource_type: 'image',
              },
              (error, result) => {
                if (error || !result) {
                  return reject(error || new Error('Upload failed'));
                }
                resolve(result);
              }
            );

            stream.end(buffer);
          }
        );

        avatarUrl = uploadResult.secure_url;

        const newAvatarPublicId = uploadResult.public_id;

        if (oldAvatarPublicId && oldAvatarPublicId !== newAvatarPublicId) {
          try {
            await cloudinary.uploader.destroy(oldAvatarPublicId);
          } catch (_) {}
        }

        oldAvatarPublicId = newAvatarPublicId;
      } catch (error) {
        console.error('Cloudinary upload error:', error);
        return res.status(500).json({ error: 'Failed to upload avatar' });
      }
    } else if (req.body.avatar_url) {
      avatarUrl = req.body.avatar_url;
    }

    const hashedPassword = data.password
      ? await bcrypt.hash(data.password, 10)
      : undefined;

    const updatedUser = await UserModel.update({
      id: userId,
      email: data.email,
      password: hashedPassword,
      first_name: data.firstName,
      last_name: data.lastName,
      slug: data.slug,
      avatar_url: avatarUrl,
      avatar_public_id: oldAvatarPublicId,
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
      first_name: data.firstName,
      last_name: data.lastName,
      slug: data.slug,
      avatar_url: '',
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

    try {
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
    } catch (err) {
      console.log('Invalid Credentials', err);

      return res
        .status(401)
        .json({ error: 'Invalid credentials', errorMessage: err as string });
    }
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
