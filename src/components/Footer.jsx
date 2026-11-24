import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer on-dark">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <p className="site-footer__wordmark">Prediletta</p>
            <p className="site-footer__tagline">Café de especialidad, masitas artesanales y un rincón para quedarse un rato.</p>
          </div>

          <div className="site-footer__col">
            <h4>Horarios</h4>
            <p>Lunes a sábado<br />8:30 a 21:30</p>
            <p>Domingo<br />15:30 a 21:30</p>
            <p className="site-footer__note">Feriados: el horario varía</p>
          </div>

          <div className="site-footer__col">
            <h4>Contacto</h4>
            <p>Calle Cochabamba casi Héroes del Chaco<br />Quillacollo, Bolivia</p>
            <p><a href="tel:+59170345866">+591 70345866</a></p>
            <p><a href="mailto:Prediletta794@gmail.com">Prediletta794@gmail.com</a></p>
          </div>

          <div className="site-footer__col">
            <h4>Síguenos</h4>
            <ul>
              <li><a href="https://www.instagram.com/prediletta1825?igsh=ZWRoN2MxaGRyN2Fo" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.facebook.com/share/1JehRXhtH9/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://wa.me/59170345866" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><Link to="/menu">Ver el menú</Link></li>
            </ul>
          </div>
        </div>

        <p className="site-footer__legal">&copy; 2026 Prediletta. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
