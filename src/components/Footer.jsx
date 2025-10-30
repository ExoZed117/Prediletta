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
              <p>De lunes a sábado de 8:30 a 9:30</p>
              <p>Domingo de 14:30 a 9:30</p>
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
                <a href="https://www.instagram.com/prediletta1825?igsh=ZWRoN2MxaGRyN2Fo">Instagram</a>
                <a href="https://www.facebook.com/share/1JehRXhtH9/?mibextid=wwXIfr">Facebook</a>
                <a href="#">WhatsApp</a>
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