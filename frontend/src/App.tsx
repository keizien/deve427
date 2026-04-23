import ProductList from './ProductList';
import { CartProvider } from './CartContext';
import Cart from './Cart';

const App = () => (
  <CartProvider>
    <div>
      <ProductList />
      <Cart />
    </div>
  </CartProvider>
);

export default App;