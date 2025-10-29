import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">☕</div>
              <span className="logo-text">PREDILETTA</span>
            </div>
            <p className="footer-description">
              Donde el arte del café se encuentra con la excelencia. 
              Cada taza es una experiencia única.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Twitter</a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4>Menú</h4>
              <a href="#">Cafés Especiales</a>
              <a href="#">Pastelería</a>
              <a href="#">Desayunos</a>
              <a href="#">Bebidas</a>
            </div>
            
            <div className="link-group">
              <h4>Información</h4>
              <a href="#">Sobre Nosotros</a>
              <a href="#">Galería</a>
              <a href="#">Eventos</a>
              <a href="#">Blog</a>
            </div>
            
            <div className="link-group">
              <h4>Contacto</h4>
              <a href="#">Reservaciones</a>
              <a href="#">Ubicación</a>
              <a href="#">Tel: +1 234 567 890</a>
              <a href="#">Email: hola@prediletta.com</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-info">
            <p>Horario: Lunes a Domingo • 7:00 - 22:00</p>
            <p>Ubicación: Av. Principal 123, Ciudad</p>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2024 Prediletta. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;