import { Router } from 'express';
import { addASale } from '../services/sale.services';

const router = Router();

router.post('/', addASale);

export default router;
