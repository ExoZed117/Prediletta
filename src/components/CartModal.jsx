import { useState } from "react";
import { useCart } from "../context/CartContext";
import OrderModal from "./OrderModal";
import "./Cart.css";

export default function CartModal() {
  const {
    items,
    addOne,
    removeOne,
    removeItem,
    total,
    setIsCartOpen,
    clearCart,
  } = useCart();

  const [showOrderModal, setShowOrderModal] = useState(false);

  const handleCloseCart = () => setIsCartOpen(false);

  return (
    <>
      <div className="modal-backdrop" onClick={handleCloseCart}>
        <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
          <header className="cart-header">
            <h3>Tu pedido</h3>
            <button className="icon-btn" onClick={handleCloseCart}>✕</button>
          </header>

          {items.length === 0 ? (
            <div className="empty">
              <p>Tu carrito está vacío.</p>
            </div>
          ) : (
            <>
              <div className="cart-list">
                {items.map((p) => (
                  <div key={p.name} className="cart-row">
                    <div className="cart-info">
                      <strong>{p.name}</strong>
                      <span className="muted">{p.price.toFixed(2)} Bs</span>
                    </div>

                    <div className="qty-controls">
                      <button onClick={() => removeOne(p.name)} className="qty-btn">−</button>
                      <span className="qty">{p.qty}</span>
                      <button onClick={() => addOne(p.name)} className="qty-btn">＋</button>
                    </div>

                    <div className="line-total">
                      {(p.price * p.qty).toFixed(2)} Bs
                    </div>

                    <button className="row-remove" onClick={() => removeItem(p.name)}>Eliminar</button>
                  </div>
                ))}
              </div>

              <footer className="cart-footer">
                <div className="total">
                  <span>Total</span>
                  <strong>{total.toFixed(2)} Bs</strong>
                </div>

                <div className="actions">
                  <button className="ghost" onClick={clearCart}>Vaciar</button>
                  <button
                    className="primary"
                    onClick={() => setShowOrderModal(true)}
                  >
                    Finalizar pedido
                  </button>
                </div>
              </footer>
            </>
          )}
        </div>
      </div>

      {/* ✅ Modal para elegir "Comer aquí / Para llevar" */}
      {showOrderModal && (
        <OrderModal onClose={() => setShowOrderModal(false)} />
      )}
    </>
  );
}
