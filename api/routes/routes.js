import express from 'express';
import orderController from '../controllers/orderController';
// import OrderValidator from '../middlewares/validateOrders';

const router = express.Router();

router.get('/orders', orderController.allOrders);
router.get('/orders/:id', orderController.getOrderId);
router.post('/orders', orderController.postOrders);
router.put('/orders/:id', orderController.updateStatus);


export default router;