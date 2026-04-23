import { useState } from 'react';
import { useCart } from './CartContext';
import './Checkout.css';

const Checkout = () => {
  const { items, total } = useCart();
  const [address, setAddress] = useState({
    street: '', city: '', zipCode: '', country: ''
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:3001/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 1,
        address,
        items: items.map(i => ({
          productId: i.productId,
          quantity: i.quantity,
          unitPrice: i.price,
        })),
      }),
    });

    if (response.ok) setSuccess(true);
  };

  if (success) return (
    <div className="checkout-success">
      <h2>✅ Commande confirmée !</h2>
      <p>Merci pour votre achat. Vous serez livré prochainement.</p>
    </div>
  );

  if (items.length === 0) return null;

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <h1 className="checkout-title">Paiement</h1>
        <p className="checkout-subtitle">Indiquez votre adresse de livraison</p>
        <div className="checkout-field">
          <label>Rue</label>
          <input name="street" placeholder="12 rue de la Paix" onChange={handleChange} />
        </div>
        <div className="checkout-field">
          <label>Ville</label>
          <input name="city" placeholder="Paris" onChange={handleChange} />
        </div>
        <div className="checkout-field">
          <label>Code postal</label>
          <input name="zipCode" placeholder="75001" onChange={handleChange} />
        </div>
        <div className="checkout-field">
          <label>Pays</label>
          <input name="country" placeholder="France" onChange={handleChange} />
        </div>
        <div className="checkout-total">
          <span>Total à payer</span>
          <span>{total.toFixed(2)} €</span>
        </div>
        <button className="btn-pay" onClick={handleSubmit}>
          Confirmer la commande
        </button>
      </div>
    </div>
  );
};

export default Checkout;