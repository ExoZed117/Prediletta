import { useCallback, useRef } from 'react';
import { useCart } from '../context/cart';
import { useDialog } from '../hooks/useDialog';
import { IconClose, IconPlus, IconMinus } from './Icons';
import './CartDrawer.css';

export default function CartDrawer() {
  const { items, addOne, removeOne, removeItem, total, count, isCartOpen, setIsCartOpen, clearCart, setIsOrderModalOpen } = useCart();
  const panelRef = useRef(null);
  const close = useCallback(() => setIsCartOpen(false), [setIsCartOpen]);
  useDialog(isCartOpen, panelRef, close);

  return (
    <div className={`drawer ${isCartOpen ? 'is-open' : ''}`} inert={!isCartOpen}>
      <div className="drawer__scrim" onClick={close} />
      <aside className="drawer__panel cart" role="dialog" aria-modal="true" aria-labelledby="cart-title" ref={panelRef}>
        <header className="drawer__head">
          <h2 className="drawer__title" id="cart-title">
            Tu pedido {count > 0 && <span className="cart__count">({count})</span>}
          </h2>
          <button type="button" className="icon-btn" onClick={close} aria-label="Cerrar pedido"><IconClose /></button>
        </header>

        {items.length === 0 ? (
          <div className="cart__empty">
            <p className="serif-italic">Tu pedido está vacío.</p>
            <p>Elige algo del menú y aparecerá aquí.</p>
          </div>
        ) : (
          <>
            <ul className="cart__list">
              {items.map((p) => (
                <li key={p.name} className="cart__row">
                  <div className="cart__info">
                    <strong>{p.name}</strong>
                    <span>{p.price.toFixed(2)} Bs</span>
                  </div>
                  <div className="qty">
                    <button type="button" onClick={() => removeOne(p.name)} aria-label={`Quitar una unidad de ${p.name}`}><IconMinus width={16} height={16} /></button>
                    <span aria-live="polite">{p.qty}</span>
                    <button type="button" onClick={() => addOne(p.name)} aria-label={`Añadir una unidad de ${p.name}`}><IconPlus width={16} height={16} /></button>
                  </div>
                  <span className="cart__line">{(p.price * p.qty).toFixed(2)} Bs</span>
                  <button type="button" className="cart__remove" onClick={() => removeItem(p.name)} aria-label={`Eliminar ${p.name}`}>Eliminar</button>
                </li>
              ))}
            </ul>

            <footer className="cart__foot">
              <div className="cart__total">
                <span>Total</span>
                <strong>{total.toFixed(2)} Bs</strong>
              </div>
              <div className="cart__actions">
                <button type="button" className="btn btn--line" onClick={clearCart}>Vaciar</button>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsOrderModalOpen(true);
                  }}
                >
                  Finalizar pedido
                </button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
