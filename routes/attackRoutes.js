import express from 'express';
import {getAttacks} from '../controllers/attackControllers.js';
import {getAttackTrend} from '../controllers/attackControllers.js';
import {getSeverityTrend} from '../controllers/attackControllers.js';
import {getAttackTypeDistribution} from '../controllers/attackControllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/attacks', authMiddleware, getAttacks);
router.get('/attack-trend', authMiddleware, getAttackTrend);
router.get('/severity-trend', authMiddleware, getSeverityTrend);
router.get('/attack-type-distribution', authMiddleware, getAttackTypeDistribution);
export default router;