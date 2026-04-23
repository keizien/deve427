import { Router } from 'express';
import { createOrder } from './ordersRepository';

const router = Router();

router.post('/orders', async (req, res) => {
  try {
    const { userId, address, items } = req.body;
    const orderId = await createOrder(userId, address, items);
    res.status(201).json({ orderId });
  } catch {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;