import { Router } from 'express';
import { createOrder } from './ordersRepository';
import { Checkout, Webhooks } from "@polar-sh/express";

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

router.post(
  "/polar/webhooks",
  Webhooks({
    webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
    onPayload: async (payload) => {
      if (payload.type === "order.paid") {
        const order = payload.data;
        const userId = order.customer_external_id;
        console.log(`💰 Order paid: ${order.id} for customer ${order.customer_id} (Local User ID: ${userId})`);
        
        if (userId) {
          console.log(`📦 Delivering digital products to user ${userId}...`);
          // On pourrait ici appeler une fonction de service pour débloquer l'accès
        }
        
        console.log(`✅ Webhook processed for order ${order.id}`);
      }
    },
  })
);

export default router;