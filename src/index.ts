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
app.use(cors({
  origin: process.env.FRONTEND_URL
}));

app.use('/api/my/user', myUserRoutes);

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) throw 'Mongoose URL should not be given inside env file';

mongoose
  .connect(MONGO_URL)
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
