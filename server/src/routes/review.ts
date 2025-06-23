import { Router, Request, Response } from 'express';
const router = Router();

router.post('/', (req: Request, res: Response) => {
  // TODO: Tambah review
  res.json({ message: 'Create review' });
});

router.get('/service/:id', (req: Request, res: Response) => {
  // TODO: List review by service
  res.json({ message: 'List reviews for service' });
});

export default router; 