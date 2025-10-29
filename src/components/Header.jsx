import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const Header = ({ scrolled, dark }) => {
  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${dark ? 'dark' : ''}`}>
      <div className="header-container">

        <div className="logo">
          <span>PREDILETTA</span>
        </div>
        
        <nav className="nav">
          <ul>
            <li><a href="#inicio" className="nav-link">INICIO</a></li>
            <li><a href="#menu" className="nav-link">MENÚ</a></li>
            <li><a href="#galeria" className="nav-link">GALERÍA</a></li>
            <li><a href="#contacto" className="nav-link">CONTACTO</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="cart-btn">
            <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
