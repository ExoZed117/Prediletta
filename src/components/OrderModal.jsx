import { useCallback, useRef, useState } from 'react';
import { useCart } from '../context/cart';
import { WHATSAPP_NUMBER } from '../config';
import { useDialog } from '../hooks/useDialog';
import { IconClose } from './Icons';
import './OrderModal.css';

export default function OrderModal() {
  const { items, total, clearCart, setIsOrderModalOpen } = useCart();
  const [orderType, setOrderType] = useState(null);
  const [tableNumber, setTableNumber] = useState('');
  const dialogRef = useRef(null);

  const handleClose = useCallback(() => setIsOrderModalOpen(false), [setIsOrderModalOpen]);
  useDialog(true, dialogRef, handleClose);

  const handleSendWhatsApp = () => {
    // 1. Formato de productos
    const formattedItems = items
      .map((item) => `${item.qty}x ${item.name} -> ${(item.price * item.qty).toFixed(2)} Bs`)
      .join('\n');

    // 2. Hora en formato 24 h (evita el bug del "p. m.")
    const safeTime = new Date().toLocaleTimeString('es-BO', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    // 3. Mensaje en texto plano
    let message = `PREDILETTA 1825 - NUEVO PEDIDO\n`;
    message += `-----------------------------------------\n\n`;
    message += `DETALLE DE LA ORDEN:\n`;
    message += `${formattedItems}\n\n`;
    message += `-----------------------------------------\n\n`;
    message += `RESUMEN:\n`;
    message += `• Total productos: ${items.reduce((sum, item) => sum + item.qty, 0)}\n`;
    message += `• Total a pagar: ${total.toFixed(2)} Bs\n\n`;
    message += `-----------------------------------------\n\n`;
    message += `ENTREGA:\n`;
    message += `• Tipo: ${orderType === 'local' ? 'Comer en el local' : 'Para llevar'}\n`;
    if (orderType === 'local' && tableNumber) {
      message += `• Ubicacion: Mesa ${tableNumber}\n`;
    }
    message += `• Hora: ${safeTime}\n\n`;
    message += `-----------------------------------------\n`;
    message += `Muchas gracias. Quedo a la espera de la confirmacion.`;

    // 4. URL hacia WhatsApp
    const cleanNumber = WHATSAPP_NUMBER.replace('+', '');
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');

    // 5. Limpieza
    clearCart();
    handleClose();
  };

  return (
    <div className="dialog-backdrop" onClick={handleClose}>
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-title"
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="icon-btn dialog__close" onClick={handleClose} aria-label="Cerrar"><IconClose /></button>

        {!orderType && (
          <>
            <h2 id="order-title">¿Cómo deseas tu pedido?</h2>
            <div className="choices">
              <button type="button" className="choice" onClick={() => setOrderType('local')}>
                <span className="choice__title">Comer aquí</span>
                <span className="choice__desc">Disfruta en nuestro local</span>
              </button>
              <button type="button" className="choice" onClick={() => setOrderType('takeaway')}>
                <span className="choice__title">Para llevar</span>
                <span className="choice__desc">Recoge tu pedido</span>
              </button>
            </div>
          </>
        )}

        {orderType === 'local' && (
          <>
            <h2 id="order-title">Número de mesa</h2>
            <p className="dialog__text">Indica el número de tu mesa para que te lo llevemos.</p>
            <label className="field">
              <span className="sr-only">Número o ubicación de la mesa</span>
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="Ej: Mesa 5, ventana, barra…"
                maxLength={20}
                data-autofocus
                autoComplete="off"
              />
            </label>
            <div className="dialog__actions">
              <button type="button" className="btn btn--line" onClick={() => setOrderType(null)}>Atrás</button>
              <button type="button" className="btn btn--primary" disabled={!tableNumber.trim()} onClick={handleSendWhatsApp}>Enviar pedido</button>
            </div>
          </>
        )}

        {orderType === 'takeaway' && (
          <>
            <h2 id="order-title">Pedido para llevar</h2>
            <p className="dialog__text">Tu pedido se procesará de inmediato. Estará listo en caja en aproximadamente 15 a 20 minutos.</p>
            <div className="dialog__actions">
              <button type="button" className="btn btn--line" onClick={() => setOrderType(null)}>Atrás</button>
              <button type="button" className="btn btn--primary" onClick={handleSendWhatsApp}>Enviar pedido</button>
            </div>
          </>
        )}

        <div className="summary">
          <h3>Productos seleccionados</h3>
          <ul>
            {items.map((item) => (
              <li key={item.name}>
                <span>{item.qty}× {item.name}</span>
                <span>{(item.price * item.qty).toFixed(2)} Bs</span>
              </li>
            ))}
          </ul>
          <p className="summary__total"><span>Total</span><strong>{total.toFixed(2)} Bs</strong></p>
        </div>
      </div>
    </div>
  );
}
