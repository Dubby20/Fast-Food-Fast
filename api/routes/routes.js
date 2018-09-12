import express from 'express';
import orderController from '../controllers/orderController';

const router = express.Router();

router.get('/orders', orderController.allOrders);
router.get('/orders/:id', orderController.getOrderId);


export default router;