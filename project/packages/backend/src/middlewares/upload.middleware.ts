import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';

// @todo, for memory
// const upload = multer({
//   storage: multer.memoryStorage(),
//   fileFilter: (
//     req: Request,
//     file: Express.Multer.File,
//     callback: FileFilterCallback
//   ) => {
//     if (!file.mimetype.startsWith('image/')) {
//       return callback(new Error('Only images are allowed!'));
//     }
//     callback(null, true);
//   },
// });

const uploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);

    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
  ) => {
    if (!file.mimetype.startsWith('image/')) {
      return callback(new Error('Only images are allowed!'));
    }
    callback(null, true);
  },
});

export default upload;
