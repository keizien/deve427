import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import productsRouter from './products';
import ordersRouter from './orders'; 
import authRouter from './auth';   
import cartRouter from './cart';
import checkoutRouter from './checkout';
import registerRouter from './register';
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

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));