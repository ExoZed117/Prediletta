import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo simple y elegante */}
        <div className="logo">
          <span>PREDILETTA</span>
        </div>
        
        {/* Navegación minimalista */}
        <nav className="nav">
          <ul>
            <li><a href="#inicio" className="nav-link">INICIO</a></li>
            <li><a href="#menu" className="nav-link">MENÚ</a></li>
            <li><a href="#galeria" className="nav-link">GALERÍA</a></li>
            <li><a href="#contacto" className="nav-link">CONTACTO</a></li>
          </ul>
        </nav>

        {/* Botón de acción */}
        <div className="header-actions">
          <button className="reservation-btn">RESERVAR</button>
        </div>
      </div>
    </header>
  );
};

export default Header;