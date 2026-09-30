import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {totalAttacks} from '../controllers/dashboardController.js';
import {highSeverityAttacks} from '../controllers/dashboardController.js';
import {mediumSeverityAttacks} from '../controllers/dashboardController.js';
import {lowSeverityAttacks} from '../controllers/dashboardController.js';
import {last5Attacks} from '../controllers/dashboardController.js';
import {last5Alerts} from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/total-attacks', authMiddleware, totalAttacks);
router.get('/high-severity-attacks', authMiddleware, highSeverityAttacks);
router.get('/medium-severity-attacks', authMiddleware, mediumSeverityAttacks);
router.get('/low-severity-attacks', authMiddleware, lowSeverityAttacks);
router.get('/last5-attacks', authMiddleware, last5Attacks);
router.get('/last5-alerts', authMiddleware, last5Alerts);

export default router;