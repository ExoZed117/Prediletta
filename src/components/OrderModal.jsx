import { useState } from "react";
import { useCart, WHATSAPP_NUMBER } from "../context/CartContext";
import "../styles/OrderModal.css";

const OrderModal = ({ onClose }) => {
  const { items, total, clearCart } = useCart();
  const [orderType, setOrderType] = useState(null);
  const [tableNumber, setTableNumber] = useState("");

  const handleSendWhatsApp = () => {
    // Formatear los items de manera más elegante
    const formattedItems = items
      .map((item, index) => 
        `🍽️ *${item.qty}x ${item.name}*
         ${"─".repeat(25)}
         Subtotal: ${(item.price * item.qty).toFixed(2)} Bs`
      )
      .join("\n\n");

    // Encabezado con emojis y formato mejorado
    const message = `
🎯 *NUEVO PEDIDO - CAFETERÍA PREDILETTA 1825*
${"═".repeat(35)}

📋 *DETALLE DEL PEDIDO:*
${formattedItems}

${"═".repeat(35)}

💰 *RESUMEN DEL PEDIDO:*
🛒 Total de items: ${items.reduce((sum, item) => sum + item.qty, 0)}
💵 Total a pagar: *${total.toFixed(2)} Bs*

📍 *INFORMACIÓN DEL PEDIDO:*
🏷️ Tipo: ${orderType === "local" ? `🍽️ Comer en local (Mesa ${tableNumber})` : "🛍️ Para llevar"}
⏰ Hora: ${new Date().toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' })}
📅 Fecha: ${new Date().toLocaleDateString('es-BO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

${"═".repeat(35)}


    `.trim();

    const url = `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    clearCart();
    onClose();
  };

  // Función para calcular subtotales por categoría (opcional)
  const getCategorySubtotals = () => {
    const categories = {};
    items.forEach(item => {
      // Aquí podrías agregar lógica para categorizar items si tienes esa info
      const category = "Productos"; // Por defecto
      if (!categories[category]) {
        categories[category] = 0;
      }
      categories[category] += item.price * item.qty;
    });
    return categories;
  };

  return (
    <div className="order-modal-backdrop">
      <div className="order-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        {!orderType && (
          <>
            <h2>🎯 ¿Cómo deseas tu pedido?</h2>
            <div className="order-options">
              <button 
                className="option-btn local" 
                onClick={() => setOrderType("local")}
              >
                <span className="emoji">🍽️</span>
                <span className="text">Comer aquí</span>
                <span className="desc">Disfruta en nuestro local</span>
              </button>
              <button 
                className="option-btn takeaway" 
                onClick={() => setOrderType("takeaway")}
              >
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
            <p className="instruction">Por favor, indica el número de tu mesa:</p>
            <input
              type="text"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Ej: Mesa 5, Mesa 12..."
              className="order-input"
            />
            <button
              className="send-btn"
              disabled={!tableNumber.trim()}
              onClick={handleSendWhatsApp}
            >
              📱 Enviar Pedido por WhatsApp
            </button>
          </>
        )}

        {orderType === "takeaway" && (
          <>
            <h3>🛍️ Pedido Para Llevar</h3>
            <p className="instruction">Tu pedido estará listo para recoger en aproximadamente 15-20 minutos.</p>
            <button className="send-btn" onClick={handleSendWhatsApp}>
              📱 Enviar Pedido por WhatsApp
            </button>
          </>
        )}

        {/* Resumen del pedido */}
        <div className="order-summary">
          <h4>📦 Resumen de tu Pedido:</h4>
          {items.map((item, index) => (
            <div key={index} className="summary-item">
              <span>{item.qty}x {item.name}</span>
              <span>{(item.price * item.qty).toFixed(2)} Bs</span>
            </div>
          ))}
          <div className="summary-total">
            <strong>Total: {total.toFixed(2)} Bs</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;