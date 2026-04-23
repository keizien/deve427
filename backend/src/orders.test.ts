import request from 'supertest';
import express from 'express';

jest.mock('./ordersRepository', () => ({
  getRecentOrders: jest.fn(),
}));

jest.mock('./authMiddleware', () => ({
  authMiddleware: (req: any, res: any, next: any) => next(),
  adminMiddleware: (req: any, res: any, next: any) => next(),
}));

import { getRecentOrders } from './ordersRepository';
import ordersRouter from './orders';

const mockedGetRecentOrders = getRecentOrders as jest.MockedFunction<typeof getRecentOrders>;

const app = express();
app.use(express.json());
app.use('/api', ordersRouter);

describe('GET /api/admin/orders', () => {
  it('doit retourner une liste de commandes avec les bons champs', async () => {
    mockedGetRecentOrders.mockResolvedValue([
      {
        id: 1,
        customer_name: 'Jean Dupont',
        customer_email: 'jean@dupont.fr',
        status: 'pending',
        total_price: 89.99,
        created_at: new Date('2026-04-22'),
        street: '12 rue de la Paix',
        city: 'Paris',
        zip_code: '75001',
        country: 'France',
      },
    ]);

    const response = await request(app).get('/api/admin/orders');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    const order = response.body[0];
    expect(order).toHaveProperty('id');
    expect(order).toHaveProperty('customer_name');
    expect(order).toHaveProperty('customer_email');
    expect(order).toHaveProperty('status');
    expect(order).toHaveProperty('total_price');
    expect(order).toHaveProperty('street');
    expect(order).toHaveProperty('city');
  });

  it('doit retourner 500 si le repository plante', async () => {
    mockedGetRecentOrders.mockRejectedValue(new Error('BDD inaccessible'));

    const response = await request(app).get('/api/admin/orders');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Erreur serveur');
  });
});