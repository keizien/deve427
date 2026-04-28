import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './CartContext';
import ProductList from './ProductList';
import Cart from './Cart';
import LoginPage from './LoginPage';
import AdminPage from './AdminPage';
import Navbar from './Navbar';
import Checkout from './Checkout';
import './App.css';

const VisualEffects = () => {
  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updatePointer = (x: number, y: number) => {
      root.style.setProperty('--pointer-x', `${x}px`);
      root.style.setProperty('--pointer-y', `${y}px`);
    };

    const updateScroll = () => {
      const scrollMax = Math.max(1, document.body.scrollHeight - window.innerHeight);
      root.style.setProperty('--scroll-progress', `${window.scrollY / scrollMax}`);
    };

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = reduceMotion
      ? null
      : new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
              }
            });
          },
          { threshold: 0.16 }
        );

    targets.forEach(target => observer?.observe(target));

    updatePointer(window.innerWidth * 0.5, window.innerHeight * 0.25);
    updateScroll();

    const handlePointerMove = (event: PointerEvent) => updatePointer(event.clientX, event.clientY);
    const handleScroll = () => updateScroll();

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return null;
};

const App = () => (
  <BrowserRouter>
    <CartProvider>
      <VisualEffects />
      <div className="app-shell">
        <div className="scroll-progress" aria-hidden="true" />
        <div className="orb orb-one" aria-hidden="true" />
        <div className="orb orb-two" aria-hidden="true" />
        <div className="orb orb-three" aria-hidden="true" />
        <Navbar />
        <Routes>
          <Route path="/" element={
            <div className="home-container">
              <ProductList />
              <Cart />
            </div>
          } />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </CartProvider>
  </BrowserRouter>
);

export default App;