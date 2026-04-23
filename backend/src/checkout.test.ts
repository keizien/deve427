import request from 'supertest';
import express from 'express';

jest.mock('./ordersRepository', () => ({
  createOrder: jest.fn(),
}));

import { createOrder } from './ordersRepository';
import checkoutRouter from './checkout';

const mockedCreateOrder = createOrder as jest.MockedFunction<typeof createOrder>;

const app = express();
app.use(express.json());
app.use('/api', checkoutRouter);

describe('POST /api/orders', () => {
  it('doit créer une commande et retourner un orderId', async () => {
    mockedCreateOrder.mockResolvedValue(42);

    const res = await request(app)
      .post('/api/orders')
      .send({
        userId: 1,
        address: {
          street: '10 rue de la Paix',
          city: 'Paris',
          zipCode: '75001',
          country: 'France',
        },
        items: [
          { productId: 1, quantity: 2, unitPrice: 89.99 },
        ],
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('orderId', 42);
  });

  it('doit retourner 500 si le repository plante', async () => {
    mockedCreateOrder.mockRejectedValue(new Error('BDD inaccessible'));

    const res = await request(app)
      .post('/api/orders')
      .send({
        userId: 1,
        address: {
          street: '10 rue de la Paix',
          city: 'Paris',
          zipCode: '75001',
          country: 'France',
        },
        items: [],
      });

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('message', 'Erreur serveur');
  });
});