import express from 'express';
import multer from 'multer';
import MyRestaurantController from '../controllers/MyRestaurantController';
import { jwtCheck, jwtParse } from '../middlewares/auth';
import { validateMyRestaurantRequest } from '../middlewares/validation';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024
  }
});

router.get('/order', jwtCheck, jwtParse, MyRestaurantController.getMyRestaurantOrders);

router.patch(
  '/order/:orderId/status',
  jwtCheck,
  jwtParse,
  MyRestaurantController.updateOrderStatus
);

router.get('/', jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant);

router.post(
  '/',
  upload.single('productImg'),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantController.createMyRestaurant
);

router.put(
  '/',
  upload.single('productImg'),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantController.updateMyRestaurant
);

export default router;
