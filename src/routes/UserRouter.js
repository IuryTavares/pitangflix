/* eslint-disable import/extensions */
import { Router } from 'express';
import UserController from '../controllers/UserController.js';

const userController = new UserController();

const router = Router();

router.get('/user', userController.index.bind(userController));
router.get('/user/:id', userController.getOne.bind(userController));
router.put('/user/:id', userController.update.bind(userController));
router.post('/user', userController.store.bind(userController));
router.delete('/user/:id', userController.remove.bind(userController));
router.post('/login', userController.login.bind(userController));

export default router;
