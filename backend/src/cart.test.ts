import request from 'supertest';
import express from 'express';

jest.mock('./cartRepository', () => ({
  addItemToCart: jest.fn(),
  getCartItems: jest.fn(),
}));

import { addItemToCart, getCartItems } from './cartRepository';
import cartRouter from './cart';

const mockedAdd = addItemToCart as jest.MockedFunction<typeof addItemToCart>;
const mockedGet = getCartItems as jest.MockedFunction<typeof getCartItems>;

const app = express();
app.use(express.json());
app.use('/api', cartRouter);

describe('Cart routes', () => {
  it('GET /api/cart/:userId retourne les items', async () => {
    mockedGet.mockResolvedValue([
      { id: 1, name: 'Perceuse Bosch', price: 89.99, quantity: 2 }
    ]);
    const res = await request(app).get('/api/cart/1');
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty('name');
  });

  it('POST /api/cart/:userId ajoute un produit', async () => {
    mockedAdd.mockResolvedValue();
    const res = await request(app)
      .post('/api/cart/1')
      .send({ productId: 1, quantity: 1 });
    expect(res.status).toBe(201);
  });

  it('retourne 500 si le repository plante', async () => {
    mockedGet.mockRejectedValue(new Error('BDD inaccessible'));
    const res = await request(app).get('/api/cart/1');
    expect(res.status).toBe(500);
  });
});