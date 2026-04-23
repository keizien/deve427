import { Router } from 'express';
import { getRecentOrders } from './ordersRepository';
import { authMiddleware, adminMiddleware } from './authMiddleware';

const router = Router();

router.get('/admin/orders', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await getRecentOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;