import { Router } from 'express';
import userController from '../controllers/user.controller.js';

const router = Router();

router.get('/', userController.getUsers);

router.post('/', userController.saveUser);

export default router