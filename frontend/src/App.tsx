import ProductList from './ProductList';
import { CartProvider } from './CartContext';

const App = () => (
  <CartProvider>
    <div>
      <ProductList />
    </div>
  </CartProvider>
);

export default App;