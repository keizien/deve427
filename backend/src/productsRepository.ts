// backend/src/productsRepository.ts
import { pool } from './db';

export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const result = await pool.query<Product>(
    'SELECT id, name, price::float, stock FROM products'
  );
  return result.rows;
};