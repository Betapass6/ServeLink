import { Router } from 'express';
import { listServices, getService, createService, updateService, deleteService } from '../controllers/serviceController';
import { authenticate, authorize } from '../middleware/auth';
const router = Router();

router.get('/', listServices);
router.get('/:id', getService);
router.post('/', authenticate as any, authorize(['SELLER']) as any, createService);
router.put('/:id', authenticate as any, authorize(['SELLER']) as any, updateService);
router.delete('/:id', authenticate as any, authorize(['SELLER']) as any, deleteService);

export default router; 