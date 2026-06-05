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
          {/* Imagen Grande - Ocupa 2x2 columnas */}
          <div className="gallery-item gallery-item-large">
            <div className="gallery-image-placeholder">
              <img 
                src="https://res.cloudinary.com/dupoow7pa/image/upload/v1780546523/WhatsApp_Image_2026-06-03_at_23.40.14_1_qurtud.jpg" 
                alt="Interior Minimalista Prediletta" 
              />
            </div>
            <div className="gallery-overlay">
              <span></span>
            </div>
          </div>

          {/* Siguientes imágenes normales */}
          <div className="gallery-item">
            <div className="gallery-image-placeholder">
              <img 
                src="https://res.cloudinary.com/dupoow7pa/image/upload/v1780546647/WhatsApp_Image_2026-06-03_at_23.40.16_bie8bm.jpg" 
                alt="Barra de Café Premium" 
              />
            </div>
            <div className="gallery-overlay">
              <span></span>
            </div>
          </div>

          <div className="gallery-item">
            <div className="gallery-image-placeholder">
              <img 
                src="https://res.cloudinary.com/dupoow7pa/image/upload/v1780546524/WhatsApp_Image_2026-06-03_at_23.40.15_1_zy2wem.jpg" 
                alt="Zona de Trabajo Confortable" 
              />
            </div>
            <div className="gallery-overlay">
              <span></span>
            </div>
          </div>

          <div className="gallery-item">
            <div className="gallery-image-placeholder">
              <img 
                src="https://res.cloudinary.com/dupoow7pa/image/upload/v1780546525/WhatsApp_Image_2026-06-03_at_23.40.15_2_cy4qin.jpg" 
                alt="Terraza Exterior" 
              />
            </div>
            <div className="gallery-overlay">
              <span></span>
            </div>
          </div>

          {/* Quinta imagen - Repetimos la primera o puedes cambiar este link luego por otra */}
          <div className="gallery-item">
            <div className="gallery-image-placeholder">
              <img 
                src="https://res.cloudinary.com/dupoow7pa/image/upload/v1780546513/WhatsApp_Image_2026-06-03_at_23.39.59_rkg3wh.jpg" 
                alt="Detalles Artesanales" 
              />
            </div>
            <div className="gallery-overlay">
              <span></span>
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