import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from './db';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      return;
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);


    if (!isPasswordValid) {
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      return;
    }


    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );


    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;