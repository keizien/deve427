import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { items, total, removeOneItem, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) return (
    <div className="cart-empty">
      🛒 Panier vide
    </div>
  );

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Mon panier</h2>
        <button className="btn-clear-cart" onClick={clearCart}>
          Vider le panier
        </button>
      </div>
      <p className="cart-intro">Ajuste les quantités, supprime une unité ou passe au paiement en un clic.</p>
      {items.map(item => (
        <div key={item.productId} className="cart-item">
          <span className="cart-item-name">{item.name}</span>
          <div className="cart-item-controls">
            <button
              className="btn-cart-quantity"
              onClick={() => removeOneItem(item.productId)}
              aria-label={`Retirer une unité de ${item.name}`}
            >
              -
            </button>
            <span className="cart-item-quantity">x{item.quantity}</span>
          </div>
          <span>{(item.price * item.quantity).toFixed(2)} €</span>
        </div>
      ))}
      <div className="cart-total">
        <strong>Total : {total.toFixed(2)} €</strong>
      </div>
      <button className="btn-checkout" onClick={() => navigate('/checkout')}>
        Payer
      </button>
    </div>
  );
};

export default Cart;