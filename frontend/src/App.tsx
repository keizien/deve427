import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import ProductList from './ProductList';
import Cart from './Cart';
import LoginPage from './LoginPage';
import AdminPage from './AdminPage';
import RegisterPage from './RegisterPage';
import Navbar from './Navbar';
import Checkout from './Checkout';

const App = () => (
  <BrowserRouter>
    <CartProvider>
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
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </CartProvider>
  </BrowserRouter>
);

export default App;