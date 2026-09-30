import express from 'express';
import {getWebsites, registerWebsite} from '../controllers/WebsiteController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', authMiddleware, registerWebsite);
router.get('/websites', authMiddleware, getWebsites);
export default router;

