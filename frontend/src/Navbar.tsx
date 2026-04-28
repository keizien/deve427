import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const getRole = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch {
    return null;
  }
};

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = getRole();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate('/')}>
        🛍️ MonShop
      </div>
      <div className="navbar-links">
        <button className="btn-nav" onClick={() => navigate('/')}>Accueil</button>
        {token ? (
          <>
            {role === 'admin' && (
              <button className="btn-nav" onClick={() => navigate('/admin')}>Admin</button>
            )}
            <button className="btn-nav btn-logout" onClick={handleLogout}>Se déconnecter</button>
          </>
        ) : (
          <>
            <button className="btn-nav" onClick={() => navigate('/register')}>S'inscrire</button>
            <button className="btn-nav btn-login" onClick={() => navigate('/login')}>Connexion</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;