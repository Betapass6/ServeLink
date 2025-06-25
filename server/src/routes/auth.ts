import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
const router = Router();

router.post('/register', register as any);
router.post('/login', login as any);
router.get('/me', authenticate as any, getProfile as any);

export default router; 