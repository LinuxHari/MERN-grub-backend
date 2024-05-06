import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import myUserRoute from './routes/MyUserRoute';
import myRestaurantRoute from './routes/MyRestaurantRoute';
import restaurantRoute from './routes/RestaurantRoute';
import { v2 as cloudinary } from 'cloudinary';
import orderRoute from './routes/OrderRoutes';

const environment = process.env.NODE_ENV || 'development';

if (environment === 'production') {
  dotenv.config({ path: '.env' });
} else if (environment === 'development') {
  dotenv.config({ path: '.env.development' });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

app.use(cors({origin: process.env.FRONTEND_URL}));

app.use('/api/order/checkout/webhook', express.raw({ type: '*/*' }));

app.use(express.json());

app.use('/api/my/user', myUserRoute);
app.use('/api/my/restaurant', myRestaurantRoute);
app.use('/api/restaurant', restaurantRoute);
app.use('/api/order', orderRoute);

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
