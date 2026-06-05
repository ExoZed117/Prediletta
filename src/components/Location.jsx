import '../styles/Location.css'; 

export default function Location() {
  return (
    <section className="location-section">
      <div className="location-container">
        <div className="location-info">
          <h2>VISÍTANOS</h2>
          <div className="divider"></div>
          <p className="address">Calle Cochabamba casi Héroes del Chaco, Quillacollo</p>
          
          <div className="schedule-box">
            <h3>NUESTROS HORARIOS</h3>
            <p><strong>Lunes a Sábado:</strong> 8:30 a.m. a 21:30 p.m.</p>
            <p><strong>Domingo:</strong> 15:30 p.m. a 21:30 p.m.</p>
            <p className="feriados-info">Feriados (El horario varía)</p>
          </div>

          <div className="location-cta">
            <a 
              href="https://maps.app.goo.gl/hQY7sHtXrg9v2kDc7" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="maps-link-btn"
            >
              ABRIR EN GOOGLE MAPS
            </a>
          </div>
        </div>
        
        <div className="map-wrapper">
          {/* URL limpia usando la dirección explícita para evitar errores de cifrado 'pb' */}
          <iframe 
            src="https://maps.google.com/maps?q=PREDILETTA%201825,%20Calle%20cochabamba,%20Quillacollo&t=&z=16&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de Prediletta 1825"
          >
          </iframe>
        </div>
      </div>
    </section>
  );
}