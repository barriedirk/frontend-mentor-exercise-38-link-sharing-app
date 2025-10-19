import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getJWTValues } from '../utils/utils';

const { JWT_SECRET } = getJWTValues();

interface JwtPayload {
  userId: number;
  tokenVersion: number;
}

export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: 'Missing authorization header' });

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Invalid authorization format' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Optionally, fetch user and check tokenVersion
    // e.g., const user = await UserModel.findById(payload.userId)
    // and confirm user.token_version === payload.tokenVersion

    // Attach user info to request
    (req as any).user = {
      userId: payload.userId,
      tokenVersion: payload.tokenVersion,
    };

    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}

export function authenticateJWTv2(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
