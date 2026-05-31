import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

export const WHATSAPP_NUMBER = "+59170345866"; // Tu número de Prediletta

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // ESTADO GLOBAL: Controla el modal de opciones de entrega
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const addToCart = (product) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((p) => p.name === product.name);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: updated[existingIndex].qty + 1,
        };
        return updated;
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeOne = (name) => {
    setItems((prev) =>
      prev.flatMap((p) =>
        p.name === name
          ? p.qty > 1
            ? [{ ...p, qty: p.qty - 1 }]
            : []
          : [p]
      )
    );
  };

  const addOne = (name) => {
    setItems((prev) =>
      prev.map((p) =>
        p.name === name ? { ...p, qty: p.qty + 1 } : p
      )
    );
  };

  const removeItem = (name) => {
    setItems((prev) => prev.filter((p) => p.name !== name));
  };

  const clearCart = () => setItems([]);

  const count = useMemo(() => items.reduce((n, p) => n + p.qty, 0), [items]);
  const total = useMemo(() => items.reduce((t, p) => t + p.price * p.qty, 0), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        addOne,
        removeOne,
        removeItem,
        clearCart,
        count,
        total,
        isCartOpen,
        setIsCartOpen,
        isOrderModalOpen,     // Exportamos estado
        setIsOrderModalOpen,  // Exportamos modificador
      }}
    >
      {children}
    </CartContext.Provider>
  );
};