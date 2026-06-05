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
              <p>Lunes a Sábado: 8:30 a.m. a 21:30 p.m.</p>
              <p>Domingo: 15:30 p.m. a 21:30 p.m.</p>
              <p className="schedule-note">Feriados: Horario varía</p>
            </div>
            
            <div className="link-group">
              <h4>CONTACTO</h4>
              <p>Calle Cochabamba casi Héroes del Chaco</p>
              <p>Quillacollo, Bolivia</p>
              <p>+591 70345866</p>
              <p>Prediletta794@gmail.com</p>
            </div>
            
            <div className="link-group">
              <h4>SÍGUENOS</h4>
              <div className="social-links">
                <a href="https://www.instagram.com/prediletta1825?igsh=ZWRoN2MxaGRyN2Fo" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://www.facebook.com/share/1JehRXhtH9/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://wa.me/59170345866" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 PREDILETTA. TODOS LOS DERECHOS RESERVADOS.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;