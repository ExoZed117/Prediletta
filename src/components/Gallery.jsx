import '../styles/Gallery.css'

export default function Gallery() {
  return (
    <section id="galeria" className="gallery-section">
      <div className="gallery-container">
        <div className="section-header">
          <h2>NUESTRO ESPACIO</h2>
          <div className="section-divider"></div>
          <p>UN AMBIENTE DISEÑADO PARA LA COMODIDAD Y LA INSPIRACIÓN</p>
        </div>
        
        <div className="gallery-grid">
          <div className="gallery-item gallery-item-large">
            <div className="gallery-image-placeholder"></div>
            <div className="gallery-overlay">
              <span>INTERIOR MINIMALISTA</span>
            </div>
          </div>

          <div className="gallery-item">
            <div className="gallery-image-placeholder"></div>
            <div className="gallery-overlay">
              <span>BARRA DE CAFÉ</span>
            </div>
          </div>

          <div className="gallery-item">
            <div className="gallery-image-placeholder"></div>
            <div className="gallery-overlay">
              <span>ZONA DE TRABAJO</span>
            </div>
          </div>

          <div className="gallery-item">
            <div className="gallery-image-placeholder"></div>
            <div className="gallery-overlay">
              <span>TERRAZA EXTERIOR</span>
            </div>
          </div>

          <div className="gallery-item">
            <div className="gallery-image-placeholder"></div>
            <div className="gallery-overlay">
              <span>DETALLES ARTESANALES</span>
            </div>
          </div>
        </div>

        <div className="gallery-cta">
          <button className="gallery-btn">VER GALERÍA COMPLETA</button>
        </div>
      </div>
    </section>
  )
}
