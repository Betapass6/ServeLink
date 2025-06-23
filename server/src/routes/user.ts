import { Router } from 'express';
const router = Router();

router.get('/me', (req, res) => {
  // TODO: Get profile user
  res.json({ message: 'User profile' });
});

router.put('/update', (req, res) => {
  // TODO: Update user
  res.json({ message: 'Update user' });
});

router.delete('/:id', (req, res) => {
  // TODO: Delete user (admin only)
  res.json({ message: 'Delete user' });
});

export default router; 