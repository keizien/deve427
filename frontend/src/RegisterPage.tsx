import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch {
      setError('Erreur de connexion au serveur');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Inscription</h1>
        <p className="register-subtitle">Creez votre compte pour continuer vos achats</p>
        {error && <p className="register-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="register-field">
            <label>Nom</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="register-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="register-field">
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-submit">S'inscrire</button>
          <p className="register-footer">
            Deja un compte ?{' '}
            <span className="register-link" onClick={() => navigate('/login')}>
              Se connecter
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
