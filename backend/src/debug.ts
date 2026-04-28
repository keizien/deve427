import { Router } from 'express';
import { pool } from './db';

const router = Router();

router.get('/debug/status', async (_req, res) => {
  try {
    const [productsResult, usersResult] = await Promise.all([
      pool.query('SELECT COUNT(*)::int AS count FROM products'),
      pool.query('SELECT COUNT(*)::int AS count FROM users'),
    ]);

    res.json({
      databaseUrlConfigured: Boolean(process.env.DATABASE_URL),
      jwtSecretConfigured: Boolean(process.env.JWT_SECRET),
      productsCount: productsResult.rows[0]?.count ?? 0,
      usersCount: usersResult.rows[0]?.count ?? 0,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Impossible de lire la base connectée',
    });
  }
});

export default router;