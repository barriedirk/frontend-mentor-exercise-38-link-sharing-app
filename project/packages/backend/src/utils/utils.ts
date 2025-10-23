import path from 'path';
import fs from 'fs/promises';
import { Request } from 'express';
import { PayloadJWT } from '../models/PayloadJWT';

export const readJSON = (path: string) => require(path);

export const removeAvatar = async (file: string) => {
  const oldFilePath = path.join(__dirname, '../uploads', file);

  try {
    await fs.unlink(oldFilePath);
    console.log(`Old avatar deleted: ${oldFilePath}`);
  } catch (err) {
    console.warn(`Failed to delete old avatar: ${oldFilePath}`, err);
  }
};

export function parseJwt<T>(token: string): T | null {
  // Header – info about the type and algorithm.
  // Payload – the actual data (e.g., user ID, email, roles).
  // Signature – verifies the token wasn't tampered with.

  // online test: https://www.jwt.io/

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );

    return JSON.parse(jsonPayload) as T;
  } catch (error) {
    console.error('Invalid JWT token:', error);
    return null;
  }
}

export function getIdFromJWT(req: Request): {
  errorStatus?: number;
  errorMessage?: string;
  userId: number;
} {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      errorStatus: 401,
      errorMessage: 'Unauthorized',
      userId: 0,
    };
  }

  const payload = parseJwt<PayloadJWT>(authHeader.split(' ')[1]);

  if (!payload) {
    return {
      errorStatus: 400,
      errorMessage: 'Invalid Payload',
      userId: 0,
    };
  }

  if (!payload.userId) {
    return {
      errorStatus: 400,
      errorMessage: 'Invalid Payload',
      userId: 0,
    };
  }

  return {
    userId: payload.userId,
  };
}

export function memoize<T>(fn: () => T): () => T {
  let cached: T | undefined;

  return () => {
    if (cached === undefined) {
      cached = fn();
    }
    return cached;
  };
}

interface JWTValues {
  JWT_SECRET: string;
  PORT: string | number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  ACCEPTED_ORIGINS: string[];
  DATABASE_URL: string;
  CLOUD_NAME: string;
  CLOUD_API_KEY: string;
  CLOUD_API_SECRET: string;
  CLOUDINARY_URL: string;
}

export const getJWTValues = memoize(() => {
  const jwtValues: JWTValues = {
    JWT_SECRET: process.env.JWT_SECRET || 'default_secret',
    PORT: process.env.PORT ?? 1234,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: Number(process.env.DB_PORT) || 5432,
    DB_USER: process.env.DB_USER || 'linkuser',
    DB_PASSWORD: process.env.DB_PASSWORD || 'linkpassword',
    DB_NAME: process.env.DB_NAME || 'linkdb',
    DATABASE_URL:
      process.env.DB_NAME ||
      'postgresql://linkuser:linkpassword@localhost:5432/linkdb',
    ACCEPTED_ORIGINS: process.env.CORS_ACCEPTED_ORIGINS
      ? process.env.CORS_ACCEPTED_ORIGINS.split(',')
      : [
          'http://localhost:8080',
          'http://localhost:3333',
          'http://localhost:4200',
        ],
    CLOUD_NAME: process.env.CLOUD_NAME || '',
    CLOUD_API_KEY: process.env.CLOUD_API_KEY || '',
    CLOUD_API_SECRET: process.env.CLOUD_API_SECRET || '',
    CLOUDINARY_URL: process.env.CLOUDINARY_URL || '',
  };

  const allKeysHaveValue = (
    Object.keys(jwtValues) as (keyof JWTValues)[]
  ).every((key) => {
    const value = jwtValues[key];

    return value !== undefined && value !== null && value !== '';
  });

  if (!allKeysHaveValue) {
    throw new Error(
      'Missing required environment variables: ' +
        Object.entries(jwtValues)
          .filter(([_, value]) => !value)
          .map(([key]) => key)
          .join(', ')
    );
  }

  return jwtValues;
});
