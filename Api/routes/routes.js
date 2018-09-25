import express from 'express';
import UserController from '../controllers/UserController';
import OrderController from '../controllers/OrderController';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.post('/auth/signup', UserController.signup);
router.post('/auth/login', UserController.login);
router.post('/orders', verifyToken, OrderController.placeOrder);

export default router;