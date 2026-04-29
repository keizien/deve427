import { createContext, useContext, useState, useCallback, useMemo } from 'react';

type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  polarProductId: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: { id: number; name: string; price: number; polarProductId: string }) => void;
  removeOneItem: (productId: number) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: { id: number; name: string; price: number; polarProductId: string }) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === product.id);
      if (existing) {
        return prev.map(i =>
          i.productId === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          polarProductId: product.polarProductId,
        },
      ];
    });

    fetch(`http://localhost:3001/api/cart/1`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product.id, quantity: 1 }),
    });
  }, []);

  const removeOneItem = useCallback((productId: number) => {
    setItems(prev =>
      prev
        .map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);

  const value = useMemo(() => ({
    items,
    addItem,
    removeOneItem,
    clearCart,
    total
  }), [items, addItem, removeOneItem, clearCart, total]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};