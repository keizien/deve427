import { Router } from 'express';
import { getAllProducts } from './productsRepository';

const router = Router();

router.get('/products', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;