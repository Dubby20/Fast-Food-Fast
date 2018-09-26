import express from 'express';
import UserController from '../controllers/UserController';
import MenuController from '../controllers/MenuController';
import OrderController from '../controllers/OrderController';
import verifyToken from '../middlewares/verifyToken';
import userRole from '../middlewares/validateUserRole';


const router = express.Router();

router.post('/auth/signup', UserController.signup);
router.post('/auth/login', UserController.login);
router.post('/orders', verifyToken, OrderController.placeOrder);
router.post('/menu', verifyToken, userRole, MenuController.addMenu);
router.get('/menu', MenuController.getMenu);
router.get('/users/:id/orders', verifyToken, OrderController.userOrderHistory);
router.get('/orders', verifyToken, userRole, OrderController.allOrders);


export default router;