import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

router.post('/auth/signup', UserController.signup);
export default router;