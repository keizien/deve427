import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

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
            <button className="btn-nav" onClick={() => navigate('/admin')}>Admin</button>
            <button className="btn-nav btn-logout" onClick={handleLogout}>Se déconnecter</button>
          </>
        ) : (
          <button className="btn-nav btn-login" onClick={() => navigate('/login')}>Connexion</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;