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
