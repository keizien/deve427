import { Router } from 'express';
import { addItemToCart, getCartItems } from './cartRepository';

const router = Router();

router.get('/cart/:userId', async (req, res) => {
  try {
    const items = await getCartItems(Number(req.params.userId));
    res.json(items);
  } catch {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.post('/cart/:userId', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    await addItemToCart(Number(req.params.userId), productId, quantity ?? 1);
    res.status(201).json({ message: 'Produit ajouté au panier' });
  } catch {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;