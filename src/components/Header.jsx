// src/components/Header.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../components/Header.css'; 
import logoImg from '../assets/img/Prediletta.png';

// Quitamos 'scrolled' de las props porque ahora lo manejaremos internamente
const Header = ({ dark }) => {
  const { count, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // <--- NUEVO: Estado interno para el scroll
  const location = useLocation();
  const navigate = useNavigate();

  // NUEVO: Escuchador global de scroll para activar la clase oscura
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true); // Si baja más de 50px, oscurece
      } else {
        setScrolled(false); // Si vuelve arriba, transparente
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const handleNavClick = () => setIsMobileMenuOpen(false);

  const handleLinkNavigation = (targetPath, sectionId) => {
    handleNavClick();
    if (location.pathname !== targetPath) {
      navigate(targetPath);
      if (sectionId) {
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    } else if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Ahora scrolled cambiará a true dinámicamente aquí */}
      <header className={`header ${scrolled ? 'scrolled' : ''} ${dark ? 'dark' : ''}`}>
        <div className="header-container">
          <Link to="/" className="logo" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src={logoImg} alt="Prediletta logo" className="logo-img" />
            <span className="logo-text">PREDILETTA</span>
          </Link>

          <nav className="nav">
            <ul>
              <li><Link to="/" className="nav-link">INICIO</Link></li>
              <li><Link to="/menu" className="nav-link">MENÚ</Link></li>
              <li>
                <span style={{cursor: 'pointer'}} onClick={() => handleLinkNavigation('/', 'galeria')} className="nav-link">
                  GALERÍA
                </span>
              </li>
              <li>
                <span style={{cursor: 'pointer'}} onClick={() => handleLinkNavigation('/', 'nosotros')} className="nav-link">
                  NOSOTROS
                </span>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
              <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
              {count > 0 && <span className="cart-badge">{count}</span>}
            </button>
            
            <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)} aria-label="Abrir menú">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </header>

      {/* Menú Móvil */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)} />
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
            <li><span className="mobile-nav-link" onClick={() => handleLinkNavigation('/', 'galeria')}>GALERÍA</span></li>
            <li><span className="mobile-nav-link" onClick={() => handleLinkNavigation('/', 'nosotros')}>NOSOTROS</span></li>
          </ul>
        </nav>
        <div className="mobile-actions">
          <button className="mobile-cart-btn" onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }}>
            <FontAwesomeIcon icon={faCartShopping} /> CARRITO ({count})
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;