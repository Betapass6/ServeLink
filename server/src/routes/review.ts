import { Router } from 'express';
import { createReview, listReviewsByService } from '../controllers/reviewController';
import { authenticate, authorize } from '../middleware/auth';
const router = Router();

router.post('/', authenticate as any, authorize(['BUYER']) as any, createReview);
router.get('/service/:id', listReviewsByService);

export default router; 