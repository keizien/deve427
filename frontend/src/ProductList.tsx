// frontend/src/ProductList.tsx
import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // ✅ déplacé ici

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

  if (loading) return <p className="loading">Chargement des produits...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="product-list">
      <h1>Nos produits</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <p className="product-price">{product.price.toFixed(2)} €</p>
            <p className="product-stock">
              En stock : <span>{product.stock} unités</span>
            </p>
            <button className="btn-add-cart">
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;