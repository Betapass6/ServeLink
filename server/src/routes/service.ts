import { Router, Request, Response } from 'express';
const router = Router();

router.get('/', (req: Request, res: Response) => {
  // TODO: List semua layanan
  res.json({ message: 'List services' });
});

router.get('/:id', (req: Request, res: Response) => {
  // TODO: Detail layanan
  res.json({ message: 'Service detail' });
});

router.post('/', (req: Request, res: Response) => {
  // TODO: Tambah layanan
  res.json({ message: 'Create service' });
});

router.put('/:id', (req: Request, res: Response) => {
  // TODO: Update layanan
  res.json({ message: 'Update service' });
});

router.delete('/:id', (req: Request, res: Response) => {
  // TODO: Hapus layanan
  res.json({ message: 'Delete service' });
});

export default router; 