import '../styles/About.css'

export default function About() {
  return (
    <section id="nosotros" className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="section-header">
            <h2>SOBRE NOSOTROS</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="about-grid">
            <div className="about-text">
              <h3>MÁS QUE UNA CAFETERÍA,<br/>UN ESPACIO DE INSPIRACIÓN</h3>
              <p>
                En el corazón de la ciudad, Prediletta nace como un refugio para los 
                amantes del buen café y los momentos de calidad. Cada rincón ha sido 
                cuidadosamente diseñado para crear una experiencia sensorial única.
              </p>
              <p>
                Nuestro equipo de baristas certificados trabaja con granos de origen 
                único, tostados artesanalmente para resaltar sus notas más exquisitas. 
                Creemos que cada taza cuenta una historia y nos dedicamos a hacer que 
                la tuya sea memorable.
              </p>

              <div className="about-stats">
                <div className="stat">
                  <span className="stat-number">?</span>
                  <span className="stat-label">AÑOS DE EXPERIENCIA</span>
                </div>
                <div className="stat">
                  <span className="stat-number">?</span>
                  <span className="stat-label">TIPOS DE CAFÉ</span>
                </div>
                <div className="stat">
                  <span className="stat-number">100+</span>
                  <span className="stat-label">CLIENTES FELICES</span>
                </div>
              </div>
            </div>

            <div className="about-visual">
              <div className="visual-main">
                <div className="main-image-placeholder"></div>
              </div>
              <div className="visual-secondary">
                <div className="secondary-image-1"></div>
                <div className="secondary-image-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
