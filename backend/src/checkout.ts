import { Router } from 'express';
import { createOrder } from './ordersRepository';
import { Checkout } from "@polar-sh/express";

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

router.get(
  "/checkout",
  Checkout({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    successUrl: process.env.SUCCESS_URL,
    returnUrl: "http://localhost:3000/",
    server: "sandbox",
    theme: "dark",
  })
);

export default router;