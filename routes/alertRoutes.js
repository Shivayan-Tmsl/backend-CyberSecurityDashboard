import express from 'express';
import {getAlerts} from '../controllers/alertController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/alerts', authMiddleware, getAlerts);
export default router;