import { Router } from 'express';

import { getRate, subscribe } from '../controllers';

const router = Router();

router.get('/rate', getRate);
router.post('/subscribe', subscribe);

export default router;
