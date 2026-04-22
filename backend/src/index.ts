import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import productsRouter from './products';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api', productsRouter);

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));