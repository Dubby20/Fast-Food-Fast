import express from 'express';
import orderController from '../controllers/orderController';

const router = express.Router();

router.get('/orders', orderController.allOrders);

export default router;