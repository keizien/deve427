import { pool } from './db';

export type Order = {
  id: number;
  customer_name: string;
  customer_email: string;
  status: string;
  total_price: number;
  created_at: Date;
  street: string;
  city: string;
  zip_code: string;
  country: string;
};

export const getRecentOrders = async (): Promise<Order[]> => {
  const result = await pool.query<Order>(`
    SELECT
      orders.id,
      users.name AS customer_name,
      users.email AS customer_email,
      orders.status,
      orders.total_price::float,
      orders.created_at,
      addresses.street,
      addresses.city,
      addresses.zip_code,
      addresses.country
    FROM orders
    JOIN users ON orders.user_id = users.id
    JOIN addresses ON orders.address_id = addresses.id
    ORDER BY orders.created_at DESC
    LIMIT 10
  `);
  return result.rows;
};