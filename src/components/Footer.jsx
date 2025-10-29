import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <span>PREDILETTA</span>
            </div>
            <p className="footer-description">
              Donde el arte del café se encuentra con la excelencia.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4>HORARIOS</h4>
              <p>Lunes - Viernes: 7:00 - 21:00</p>
              <p>Sábado - Domingo: 8:00 - 22:00</p>
            </div>
            
            <div className="link-group">
              <h4>CONTACTO</h4>
              <p>Av. Principal 123</p>
              <p>Ciudad, País</p>
              <p>+1 234 567 890</p>
              <p>hola@prediletta.com</p>
            </div>
            
            <div className="link-group">
              <h4>SÍGUENOS</h4>
              <div className="social-links">
                <a href="#">Instagram</a>
                <a href="#">Facebook</a>
                <a href="#">Twitter</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 PREDILETTA. TODOS LOS DERECHOS RESERVADOS.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;