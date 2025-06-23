import { Router, Request, Response } from 'express';
const router = Router();

router.post('/', (req: Request, res: Response) => {
  // TODO: Booking layanan
  res.json({ message: 'Create booking' });
});

router.get('/', (req: Request, res: Response) => {
  // TODO: List booking (by role)
  res.json({ message: 'List bookings' });
});

router.patch('/:id/status', (req: Request, res: Response) => {
  // TODO: Update status booking
  res.json({ message: 'Update booking status' });
});

export default router; 