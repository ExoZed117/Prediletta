import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../components/Header.css'; 
import logoImg from '../assets/img/Prediletta.png';

const Header = ({ scrolled, dark }) => {
  const { count, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Bloquear scroll al abrir menú móvil
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const handleNavClick = () => setIsMobileMenuOpen(false);

  const handleCartClick = () => {
    setIsCartOpen(true);
    setIsMobileMenuOpen(false);
  };

  // Scroll suave para enlaces internos
  const scrollToSection = (e, id) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    handleNavClick();
  };

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''} ${dark ? 'dark' : ''}`}>
        <div className="header-container">

          {/* 1. Logo (Izquierda) */}
          <Link to="/" className="logo">
            <img src={logoImg} alt="Prediletta logo" className="logo-img" />
            <span className="logo-text">PREDILETTA</span>
          </Link>

          {/* 2. Navegación (Centro exacto) */}
          <nav className="nav">
            <ul>
              <li><Link to="/" className="nav-link">INICIO</Link></li>
              <li><Link to="/menu" className="nav-link">MENÚ</Link></li>
              <li>
                <a href="/#galeria" onClick={(e) => scrollToSection(e, 'galeria')} className="nav-link">
                  GALERÍA
                </a>
              </li>
            </ul>
          </nav>

          {/* 3. Acciones (Derecha) */}
          <div className="header-actions">
            {/* Solo dejamos el carrito, quitamos reservar */}
            <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
              <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
              {count > 0 && <span className="cart-badge">{count}</span>}
            </button>
            
            {/* Botón Menú Móvil (Solo visible en celular) */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>

        </div>
      </header>

      {/* Menú Móvil (Overlay + Panel) */}
      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-menu-logo">PREDILETTA</div>
          <button className="mobile-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <nav className="mobile-nav">
          <ul>
            <li><Link to="/" className="mobile-nav-link" onClick={handleNavClick}>INICIO</Link></li>
            <li><Link to="/menu" className="mobile-nav-link" onClick={handleNavClick}>MENÚ</Link></li>
            <li><a href="/#galeria" className="mobile-nav-link" onClick={(e) => scrollToSection(e, 'galeria')}>GALERÍA</a></li>
          </ul>
        </nav>

        <div className="mobile-actions">
          <button className="mobile-cart-btn" onClick={handleCartClick}>
            <FontAwesomeIcon icon={faCartShopping} />
            CARRITO ({count})
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;