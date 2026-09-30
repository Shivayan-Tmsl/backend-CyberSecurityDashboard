import express from 'express';
import {collectEvent} from '../controllers/eventController.js';
import authWebsiteMiddleware from '../middlewares/authWebsiteMiddleware.js';

const router = express.Router();
router.post('/events', authWebsiteMiddleware, collectEvent);
export default router;