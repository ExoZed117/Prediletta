import { createContext, useContext, useMemo, useState } from "react";

// ==========================================
// CONTEXTO GLOBAL DEL CARRITO
// ==========================================
const CartContext = createContext(null);

// Hook personalizado para acceder fácilmente al contexto
export const useCart = () => useContext(CartContext);

// Número de WhatsApp del negocio (para la Fase 3)
export const WHATSAPP_NUMBER = "+59170345866";

export const CartProvider = ({ children }) => {
  // Lista de productos en el carrito
  const [items, setItems] = useState([]); // cada item: { name, price, qty }
  
  // Estado del modal del carrito
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ==========================================
  // 📦 FUNCIONES PRINCIPALES
  // ==========================================

  // ➕ Agregar producto al carrito
  const addToCart = (product) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((p) => p.name === product.name);
      if (existingIndex !== -1) {
        // Si ya existe, aumentamos la cantidad
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: updated[existingIndex].qty + 1,
        };
        return updated;
      }
      // Si es nuevo, lo agregamos con qty = 1
      return [...prev, { ...product, qty: 1 }];
    });

    // Abrimos el modal del carrito automáticamente
    setIsCartOpen(true);
  };

  // ➖ Eliminar una unidad de un producto
  const removeOne = (name) => {
    setItems((prev) =>
      prev.flatMap((p) =>
        p.name === name
          ? p.qty > 1
            ? [{ ...p, qty: p.qty - 1 }]
            : [] // Si la cantidad llega a 0, lo quitamos del carrito
          : [p]
      )
    );
  };

  // ➕ Aumentar la cantidad de un producto
  const addOne = (name) => {
    setItems((prev) =>
      prev.map((p) =>
        p.name === name ? { ...p, qty: p.qty + 1 } : p
      )
    );
  };

  // ❌ Eliminar completamente un producto del carrito
  const removeItem = (name) => {
    setItems((prev) => prev.filter((p) => p.name !== name));
  };

  // 🧹 Vaciar el carrito
  const clearCart = () => setItems([]);

  // ==========================================
  // VALORES DERIVADOS (MEMOIZADOS)
  // ==========================================
  const count = useMemo(
    () => items.reduce((n, p) => n + p.qty, 0),
    [items]
  );

  const total = useMemo(
    () => items.reduce((t, p) => t + p.price * p.qty, 0),
    [items]
  );

  // ==========================================
  // EXPORTACIÓN DEL CONTEXTO
  // ==========================================
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
