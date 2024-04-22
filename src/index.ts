import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import myUserRoutes from './routes/MyUserRoute';

const environment = process.env.NODE_ENV || 'development';

if (environment === 'production') {
  dotenv.config({ path: '.env' });
} else if (environment === 'development') {
  dotenv.config({ path: '.env.development' });
}

const app = express();

app.use(express.json());

const origin =
  environment === 'production'
    ? process.env.FRONTEND_URL
    : new RegExp('https://mern-grub-[a-z0-9]+\\.vercel\\.app$');

app.use(
  cors({
    origin
  })
);

app.use('/api/my/user', myUserRoutes);

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Database connection error', error);
  });
