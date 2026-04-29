import { Router } from 'express';
import { addItemToCart, getCartItems } from './cartRepository';

const router = Router();

router.get('/cart/:userId', async (req, res) => {
  try {
    const items = await getCartItems(Number(req.params.userId));
    res.json(items);
  } catch(error) {
    res.status(500).json({ message: error });
  }
});

router.post('/cart/:userId', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    await addItemToCart(Number(req.params.userId), productId, quantity ?? 1);
    res.status(201).json({ message: 'Produit ajouté au panier' });
  } catch(error) {
    console.log(error)
    res.status(500).json({ message: error });
  }
});

export default router;