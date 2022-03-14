/* eslint-disable import/extensions */
import { Router } from 'express';
import SessionController from '../controllers/SessionController.js';

const sessionController = new SessionController();

const router = Router();

router.get('/session', sessionController.index.bind(sessionController));
router.get('/session/:id', sessionController.getOne.bind(sessionController));
router.put('/session/:id', sessionController.update.bind(sessionController));
router.delete('/session/:id', sessionController.remove.bind(sessionController));
router.post('/session', sessionController.store.bind(sessionController));

export default router;
