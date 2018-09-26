import express from 'express';
import UserController from '../controllers/UserController';
import MenuController from '../controllers/MenuController';
import OrderController from '../controllers/OrderController';
import verifyToken from '../middlewares/verifyToken';


const router = express.Router();

router.post('/auth/signup', UserController.signup);
router.post('/auth/login', UserController.login);
router.post('/orders', verifyToken.userAuthentication, OrderController.placeOrder);
router.post('/menu', verifyToken.adminAuthentication, MenuController.addMenu);
router.get('/menu', MenuController.getMenu);
router.get('/users/:id/orders', verifyToken.userAuthentication, OrderController.userOrderHistory);
router.get('/orders', verifyToken.adminAuthentication, OrderController.allOrders);
router.get('/orders/:id', verifyToken.adminAuthentication, OrderController.orderId);
router.put('/orders/:id', verifyToken.adminAuthentication, OrderController.updateStatus);


export default router;