import { Router } from 'express';
import { createBooking, listBookings, updateBookingStatus } from '../controllers/bookingController';
import { authenticate, authorize } from '../middleware/auth';
const router = Router();

router.post('/', authenticate as any, authorize(['BUYER']) as any, createBooking);
router.get('/', authenticate as any, listBookings);
router.patch('/:id/status', authenticate as any, authorize(['SELLER']) as any, updateBookingStatus);

export default router; 