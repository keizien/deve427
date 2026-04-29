import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Checkout from '../Checkout';
import { CartProvider } from '../CartContext';

const renderCheckoutWithURL = (url: string) => {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <CartProvider>
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </CartProvider>
    </MemoryRouter>
  );
};

describe('Checkout Component - Polar Success', () => {
  test('affiche le succès du paiement quand checkoutId est présent dans l\'URL', () => {
    const successUrl = '/checkout?checkoutId=zsdfdsfsd&customer_session_token=sadadasd';
    
    renderCheckoutWithURL(successUrl);

    // On vérifie que le message de succès est affiché
    expect(screen.getByText(/✅ Commande confirmée !/i)).toBeInTheDocument();
    expect(screen.getByText(/Merci pour votre achat/i)).toBeInTheDocument();
    
    // On vérifie que le formulaire de paiement n'est plus visible
    expect(screen.queryByText(/Indiquez votre adresse de livraison/i)).not.toBeInTheDocument();
  });

  test('n\'affiche pas le succès si checkoutId est absent', () => {
    renderCheckoutWithURL('/checkout');
    
    // Si le panier est vide (cas par défaut du provider dans le test), le composant retourne null
    expect(screen.queryByText(/✅ Commande confirmée !/i)).not.toBeInTheDocument();
  });
});
