import request from 'supertest';
import express from 'express';

jest.mock('./productsRepository', () => ({
  getAllProducts: jest.fn(),
}));

import { getAllProducts } from './productsRepository';
import productsRouter from './products';
import { describe } from 'node:test';

const mockedGetAllProducts = getAllProducts as jest.MockedFunction<typeof getAllProducts>;

const app = express();
app.use(express.json());
app.use('/api', productsRouter);

describe('GET /api/products', () => {
  it('doit retourner une liste de produits avec les bons champs', async () => {
    mockedGetAllProducts.mockResolvedValue([
      {
        id: 1, name: 'UwU Doudou Mignon', price: 100.000, stock: 15,
        polarProductId: 'f0867242-1a72-42db-b222-a6fc271587ce'
}
    ]);

    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    const product = response.body[0];
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('stock');
  });

  it('doit retourner 500 si le repository plante', async () => {
    mockedGetAllProducts.mockRejectedValue(new Error('BDD inaccessible'));

    const response = await request(app).get('/api/products');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Erreur serveur');
  });
});