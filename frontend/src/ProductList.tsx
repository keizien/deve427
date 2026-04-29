// frontend/src/ProductList.tsx
import { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import './ProductList.css';

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  polarProductId: string;
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productsVisible, setProductsVisible] = useState(false);
  const { addItem } = useCart();
  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Impossible de charger les produits.');
        setLoading(false);
      });
  }, []);

  const handleAdd = (product: Product) => {
    addItem(product);
  };

  const launchProducts = () => {
    setProductsVisible(true);
  };

  if (loading) return <p className="loading">Chargement des produits...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="product-list">
      {!productsVisible ? (
        <div className="launch-screen">
          <div className="launch-copy">
            <p className="launch-kicker">Mode lancement</p>
            <h1>Clique pour faire décoller les produits.</h1>
            <p className="hero-text">
              Au départ, tout est caché. Un seul bouton au centre déclenche l’arrivée des cartes en mode fusée.
            </p>
          </div>
          <button className="launch-button" onClick={launchProducts}>
            Lancer la collection
          </button>
        </div>
      ) : null}

      {productsVisible ? (
        <div className="rocket-stage">
          <div className="product-grid rocket-grid">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="product-card rocket-card is-visible"
                style={{ '--card-delay': `${index * 90}ms` } as React.CSSProperties}
              >
                <span className="product-shape product-shape-a" aria-hidden="true" />
                <span className="product-shape product-shape-b" aria-hidden="true" />
                <span className="product-glow" aria-hidden="true" />
                <span className="rocket-trail" aria-hidden="true" />
                <span className="product-badge">Pop</span>
                <h2>{product.name}</h2>
                <p className="product-id-tag">REF: {product.polarProductId}</p>
                <p className="product-price">{product.price.toFixed(2)} €</p>
                <p className="product-stock">
                  En stock : <span>{product.stock} unités</span>
                </p>
                <button className="btn-add-cart" onClick={() => handleAdd(product)}>
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductList;