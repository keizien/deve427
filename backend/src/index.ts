import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import productsRouter from './products';
import cartRouter from './cart';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api', productsRouter);
app.use('/api', cartRouter);

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));