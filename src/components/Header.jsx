import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

const Header = ({ scrolled, dark }) => {
  const { count, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Evitar scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Cerrar menú móvil al hacer clic en un enlace
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
    setIsMobileMenuOpen(false); // Cerrar menú móvil al abrir carrito
  };

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''} ${dark ? 'dark' : ''}`}>
        <div className="header-container">

          {/* Logo - Modificado */}
          <div className="logo">
            <img src="/src/assets/img/Prediletta.png" alt="Prediletta logo" className="logo-img" />
            <span className="logo-text">PREDILETTA</span>
          </div>

          {/* Navegación Desktop */}
          <nav className="nav">
            <ul>
              <li><a href="/" className="nav-link">INICIO</a></li>
              <li><a href="/menu" className="nav-link">MENÚ</a></li>
              <li><a href="/galeria" className="nav-link">GALERÍA</a></li>
              <li><a href="/contacto" className="nav-link">CONTACTO</a></li>
            </ul>
          </nav>

          {/* Acciones Desktop */}
          <div className="header-actions">
            <button className="reservation-btn">
              RESERVAR
            </button>
            <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
              <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
              {count > 0 && <span className="cart-badge">{count}</span>}
            </button>
          </div>

          {/* Botón Menú Móvil */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

        </div>
      </header>

      {/* Overlay del Menú Móvil */}
      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Menú Móvil */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-menu-logo">PREDILETTA</div>
          <button 
            className="mobile-close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <nav className="mobile-nav">
          <ul>
            <li>
              <a 
                href="#inicio" 
                className="mobile-nav-link"
                onClick={handleNavClick}
              >
                INICIO
              </a>
            </li>
            <li>
              <a 
                href="/menu" 
                className="mobile-nav-link"
                onClick={handleNavClick}
              >
                MENÚ
              </a>
            </li>
            <li>
              <a 
                href="#galeria" 
                className="mobile-nav-link"
                onClick={handleNavClick}
              >
                GALERÍA
              </a>
            </li>
            <li>
              <a 
                href="#contacto" 
                className="mobile-nav-link"
                onClick={handleNavClick}
              >
                CONTACTO
              </a>
            </li>
          </ul>
        </nav>

        <div className="mobile-actions">
          <button className="mobile-cart-btn" onClick={handleCartClick}>
            <FontAwesomeIcon icon={faCartShopping} />
            CARRITO ({count})
          </button>
          <button className="mobile-reservation-btn">
            RESERVAR MESA
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;