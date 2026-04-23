import { pool } from './db';

export const createOrder = async (
  userId: number,
  address: { street: string; city: string; zipCode: string; country: string },
  items: { productId: number; quantity: number; unitPrice: number }[]
) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const addressResult = await client.query(
      `INSERT INTO addresses (street, city, zip_code, country)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [address.street, address.city, address.zipCode, address.country]
    );
    const addressId = addressResult.rows[0].id;

    const total = items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity, 0
    );

    const orderResult = await client.query(
      `INSERT INTO orders (user_id, address_id, total_price)
       VALUES ($1, $2, $3) RETURNING id`,
      [userId, addressId, total]
    );
    const orderId = orderResult.rows[0].id;

    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, unit_price)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.productId, item.quantity, item.unitPrice]
      );
    }

    await client.query(
      'DELETE FROM cart_items WHERE cart_id IN (SELECT id FROM carts WHERE user_id = $1)',
      [userId]
    );

    await client.query('COMMIT');
    return orderId;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};