import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { items, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) return (
    <div className="cart-empty">
      🛒 Panier vide
    </div>
  );

  return (
    <div className="cart">
      <h2>Mon panier</h2>
      {items.map(item => (
        <div key={item.productId} className="cart-item">
          <span>{item.name}</span>
          <span>x{item.quantity}</span>
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