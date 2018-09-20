import express from 'express';
import OrderControllers from '../controllers/OrderController';

const router = express.Router();


router.get('/orders', OrderControllers.allOrders);
router.get('/orders/:id', OrderControllers.getOrderId);
router.post('/orders', OrderControllers.postOrders);
router.put('/orders/:id', OrderControllers.updateStatus);


export default router;