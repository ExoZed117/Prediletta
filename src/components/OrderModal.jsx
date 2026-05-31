import { useState } from "react";
import { useCart, WHATSAPP_NUMBER } from "../context/CartContext";
import "../styles/OrderModal.css";

const OrderModal = () => {
  const { items, total, clearCart, setIsOrderModalOpen } = useCart();
  const [orderType, setOrderType] = useState(null);
  const [tableNumber, setTableNumber] = useState("");

  const handleClose = () => setIsOrderModalOpen(false);

  const handleSendWhatsApp = () => {
    // 1. Formato de productos ultra seguro y limpio
    const formattedItems = items
      .map((item) => `${item.qty}x ${item.name} -> ${(item.price * item.qty).toFixed(2)} Bs`)
      .join("\n");

    // 2. Obtener la hora en formato estricto de 24 horas (Ej: 17:04) para evitar el bug del "p. m."
    const safeTime = new Date().toLocaleTimeString('es-BO', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });

    // 3. Construcción del mensaje con strings puros e inmunes a errores de codificación
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
    message += `• Tipo: ${orderType === "local" ? "Comer en el local" : "Para llevar"}\n`;
    if (orderType === "local" && tableNumber) {
      message += `• Ubicacion: Mesa ${tableNumber}\n`;
    }
    message += `• Hora: ${safeTime}\n\n`;
    
    message += `-----------------------------------------\n`;
    message += `Muchas gracias. Quedo a la espera de la confirmacion.`;

    // 4. Procesamiento seguro de la URL hacia la API de WhatsApp
    const cleanNumber = WHATSAPP_NUMBER.replace("+", "");
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(url, "_blank");

    // Limpieza final de estados
    clearCart();
    handleClose();
  };

  return (
    <div className="order-modal-backdrop" onClick={handleClose}>
      <div className="order-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={handleClose}>×</button>

        {!orderType && (
          <>
            <h2>🎯 ¿Cómo deseas tu pedido?</h2>
            <div className="order-options">
              <button className="option-btn local" onClick={() => setOrderType("local")}>
                <span className="emoji">🍽️</span>
                <span className="text">Comer aquí</span>
                <span className="desc">Disfruta en nuestro local</span>
              </button>
              <button className="option-btn takeaway" onClick={() => setOrderType("takeaway")}>
                <span className="emoji">🛍️</span>
                <span className="text">Para llevar</span>
                <span className="desc">Recoge tu pedido</span>
              </button>
            </div>
          </>
        )}

        {orderType === "local" && (
          <>
            <h3>🏷️ Número de Mesa</h3>
            <p className="instruction">Por favor, indica el número de tu mesa para que te lo llevemos:</p>
            <input
              type="text"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Ej: Mesa 5, Ventana, Barra..."
              className="order-input"
              maxLength={20}
              autoFocus
            />
            <div className="modal-actions-nav">
              <button className="back-btn" onClick={() => setOrderType(null)}>Atrás</button>
              <button className="send-btn" disabled={!tableNumber.trim()} onClick={handleSendWhatsApp}>
                📱 Enviar Pedido
              </button>
            </div>
          </>
        )}

        {orderType === "takeaway" && (
          <>
            <h3>🛍️ Pedido Para Llevar</h3>
            <p className="instruction">Tu pedido se procesará inmediatamente. Estará listo en caja en aproximadamente 15 a 20 minutos.</p>
            <div className="modal-actions-nav">
              <button className="back-btn" onClick={() => setOrderType(null)}>Atrás</button>
              <button className="send-btn" onClick={handleSendWhatsApp}>
                📱 Enviar Pedido
              </button>
            </div>
          </>
        )}

        <div className="order-summary">
          <h4>📦 Productos seleccionados:</h4>
          <div className="summary-list">
            {items.map((item, index) => (
              <div key={index} className="summary-item">
                <span>{item.qty}x {item.name}</span>
                <span>{(item.price * item.qty).toFixed(2)} Bs</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <strong>Total: {total.toFixed(2)} Bs</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;