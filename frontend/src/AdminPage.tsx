import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

type Order = {
  id: number;
  customer_name: string;
  customer_email: string;
  status: string;
  total_price: number;
  created_at: string;
  street: string;
  city: string;
  zip_code: string;
  country: string;
};

const getStatusClass = (status: string) => {
  if (status === 'paid') return 'order-status status-paid';
  if (status === 'cancelled') return 'order-status status-cancelled';
  return 'order-status status-pending';
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

const AdminPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:3001/api/admin/orders', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          setOrders(data);
          setLoading(false);
        }
      })
      .catch(() => {
        setError('Impossible de charger les commandes.');
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <p className="admin-loading">Chargement des commandes...</p>;
  if (error) return <p className="admin-error">{error}</p>;

  return (
    <div className="admin-container">
      <h1 className="admin-title">Commandes récentes</h1>
      <p className="admin-subtitle">Les 10 dernières commandes passées sur la plateforme</p>
      {orders.length === 0 ? (
        <p className="admin-empty">Aucune commande pour le moment.</p>
      ) : (
        <div className="orders-grid">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div>
                <p className="order-id">Commande #{order.id}</p>
                <span className={getStatusClass(order.status)}>{order.status}</span>
              </div>
              <div>
                <p className="order-customer">{order.customer_name}</p>
                <p className="order-email">{order.customer_email}</p>
                <p className="order-address">{order.street}, {order.city} {order.zip_code}</p>
              </div>
              <div>
                <p className="order-total">{order.total_price.toFixed(2)} €</p>
                <p className="order-date">{formatDate(order.created_at)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;