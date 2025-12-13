import '../styles/Location.css'; // Ahora crearemos este CSS

export default function Location() {
  return (
    <section className="location-section">
      <div className="location-container">
        <div className="location-info">
          <h2>VISÍTANOS</h2>
          <div className="divider"></div>
          <p>Av. Principal 123, Quillacollo</p>
          <p className="schedule">Abierto todos los días</p>
        </div>
        
        <div className="map-wrapper">
          {/* Este iframe es de Google Maps. Puedes cambiar el 'src' por el de tu ubicación exacta */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.666934676449!2d-66.28254822591605!3d-17.39889866418854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e3716f6b57117d%3A0xa19f972043689d06!2sQuillacollo!5e0!3m2!1ses-419!2sbo!4v1709845000000!5m2!1ses-419!2sbo" 
            width="100%" 
            height="400" 
            style={{border:0}} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </section>
  )
}