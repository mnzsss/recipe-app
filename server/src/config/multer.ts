import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

const storage = {
  local: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err, __filename);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
  s3: multerS3({
    s3: new aws.S3({}),
    bucket: process.env.AWS_BUCKET_NAME || '',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err, __filename);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};

export default {
  storage: process.env.STORAGE_TYPE === 's3' ? storage.s3 : storage.local,
};
