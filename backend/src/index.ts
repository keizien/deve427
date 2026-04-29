import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import productsRouter from './products';
import ordersRouter from './orders'; 
import authRouter from './auth';   
import cartRouter from './cart';
import checkoutRouter from './checkout';
import registerRouter from './register';

import { Checkout } from "@polar-sh/express";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api', productsRouter);
app.use('/api', ordersRouter);
app.use('/api', authRouter);
app.use('/api', cartRouter);
app.use('/api', checkoutRouter);
app.use('/api', registerRouter);

app.get(
  "/checkout",
  Checkout({
    accessToken: process.env.POLAR_ACCESS_TOKEN, // Or set an environment variable to POLAR_ACCESS_TOKEN
    successUrl: process.env.SUCCESS_URL,
    returnUrl: "http://localhost:3000/", // An optional URL which renders a back-button in the Checkout
    server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
    theme: "dark", // Enforces the theme - System-preferred theme will be set if left omitted
  })
);

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));