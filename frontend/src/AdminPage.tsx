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

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  polarProductId: string;
};

const AdminPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] = useState<'orders' | 'products'>('orders');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          fetch('http://localhost:3001/api/admin/orders', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('http://localhost:3001/api/products')
        ]);

        if (ordersRes.status === 401 || ordersRes.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        const ordersData = await ordersRes.json();
        const productsData = await productsRes.json();

        setOrders(ordersData);
        setProducts(productsData);
        setLoading(false);
      } catch {
        setError('Impossible de charger les données.');
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <p className="admin-loading">Chargement...</p>;
  if (error) return <p className="admin-error">{error}</p>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Administration</h1>
          <p className="admin-subtitle">Gérez vos commandes et vos produits</p>
        </div>
        <div className="admin-tabs">
          <button 
            className={`admin-tab ${view === 'orders' ? 'active' : ''}`}
            onClick={() => setView('orders')}
          >
            Commandes
          </button>
          <button 
            className={`admin-tab ${view === 'products' ? 'active' : ''}`}
            onClick={() => setView('products')}
          >
            Produits
          </button>
        </div>
      </div>

      {view === 'orders' ? (
        <>
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
        </>
      ) : (
        <div className="products-admin-grid">
          {products.map(product => (
            <div key={product.id} className="product-admin-card">
              <div className="product-admin-info">
                <h3>{product.name}</h3>
                <p className="product-admin-polar">Polar ID: <code>{product.polarProductId}</code></p>
              </div>
              <div className="product-admin-stats">
                <p>Prix: <strong>{product.price.toFixed(2)} €</strong></p>
                <p>Stock: <strong>{product.stock}</strong></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;