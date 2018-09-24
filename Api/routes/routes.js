import express from 'express';
import UserController from '../controllers/UserController';
// import OrderController from '../controllers/OrderController';
import MenuController from '../controllers/MenuController';
import verifyToken from '../middlewares/verifyToken';
// import userRole from '../middlewares/validateUserRole';


const router = express.Router();

router.post('/auth/signup', UserController.signup);
router.post('/auth/login', UserController.login);
// router.post('/orders', verifyToken, OrderController.placeOrder);
router.post('/menu', verifyToken, MenuController.addMenu);
router.get('/menu', MenuController.getMenu);

export default router;