import path from 'path';
import fs from 'fs/promises';

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
