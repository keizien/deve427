import { pool } from './db';

export const getOrCreateCart = async (userId: number) => {
  const existing = await pool.query(
    'SELECT id FROM carts WHERE user_id = $1',
    [userId]
  );
  if (existing.rows.length > 0) return existing.rows[0];
  const created = await pool.query(
    'INSERT INTO carts (user_id) VALUES ($1) RETURNING id',
    [userId]
  );
  return created.rows[0];
};

export const addItemToCart = async (userId: number, productId: number, quantity: number) => {
  const cart = await getOrCreateCart(userId);
  await pool.query(
    `INSERT INTO cart_items (cart_id, product_id, quantity)
     VALUES ($1, $2, $3)
     ON CONFLICT (cart_id, product_id)
     DO UPDATE SET quantity = cart_items.quantity + $3`,
    [cart.id, productId, quantity]
  );
};

export const getCartItems = async (userId: number) => {
  const cart = await getOrCreateCart(userId);
  const result = await pool.query(
    `SELECT ci.id, p.name, p.price::float, ci.quantity
     FROM cart_items ci
     JOIN products p ON p.id = ci.product_id
     WHERE ci.cart_id = $1`,
    [cart.id]
  );
  return result.rows;
};