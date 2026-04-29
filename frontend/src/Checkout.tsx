import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from './CartContext';
import './Checkout.css';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const { items, total, clearCart } = useCart();
  const [address, setAddress] = useState({
    street: '', city: '', zipCode: '', country: ''
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get('checkoutId')) {
      setSuccess(true);
      clearCart();
    }
  }, [searchParams, clearCart]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getCustomerEmail = () => {
    const token = localStorage.getItem('token');
    if (!token) return '';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.email || '';
    } catch {
      return '';
    }
  };

  const getUserId = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id || null;
    } catch {
      return null;
    }
  };

  const handleSubmit = () => {
    const polarProductIds = items
      .map(item => item.polarProductId)
      .filter(id => !!id)
      .join(',');

    const email = getCustomerEmail();
    const emailParam = email ? `&customerEmail=${encodeURIComponent(email)}` : '';
    
    const userId = getUserId();
    const userIdParam = userId ? `&customerExternalId=${userId}` : '';

    if (polarProductIds) {
      window.location.href = `http://localhost:3001/api/checkout?products=${polarProductIds}${emailParam}${userIdParam}`;
    } else {
      alert("Erreur: Aucun identifiant Polar trouvé pour ces produits.");
    }
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