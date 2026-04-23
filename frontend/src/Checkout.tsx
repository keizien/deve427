import { useState } from 'react';
import { useCart } from './CartContext';

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

  if (success) return <p>✅ Commande passée avec succès !</p>;

  if (items.length === 0) return null;

  return (
    <div className="checkout">
      <h2>Paiement</h2>
      <input name="street" placeholder="Rue" onChange={handleChange} />
      <input name="city" placeholder="Ville" onChange={handleChange} />
      <input name="zipCode" placeholder="Code postal" onChange={handleChange} />
      <input name="country" placeholder="Pays" onChange={handleChange} />
      <p>Total : {total.toFixed(2)} €</p>
      <button onClick={handleSubmit}>Payer</button>
    </div>
  );
};

export default Checkout;