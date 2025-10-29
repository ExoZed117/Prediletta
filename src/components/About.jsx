import '../styles/About.css'

export default function About() {
  return (
    <section id="nosotros" className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="section-header">
            <h2>CAFETERÍA PREDILETTA 1825</h2>
            <div className="section-divider"></div>
            <p>Más que café, momentos para compartir</p>
          </div>
          
          <div className="about-grid">
            <div className="about-text">
              <h3>¿QUIÉNES SOMOS?</h3>
              <p>
                En Cafetería Prediletta 1825 somos un rincón acogedor en Quillacollo, 
                donde cada visita se convierte en una experiencia de sabor y calidez. 
                Nos encanta recibir a quienes buscan una pausa en su día y hacerlos 
                sentir como en casa.
              </p>
              <p>
                Trabajamos con ingredientes frescos y locales, preparados con cariño 
                para que cada café y cada masita sea un pequeño motivo para sonreír.
                Queremos ser parte de los mejores momentos de nuestra comunidad.
              </p>

              <h3>MISIÓN</h3>
              <p>
                Brindar una experiencia cercana y familiar a través de productos 
                artesanales y un ambiente cálido, promoviendo la conexión entre 
                personas y contribuyendo a la vida social de Quillacollo.
              </p>

              <h3>VISIÓN</h3>
              <p>
                Convertirnos en la cafetería más querida de Quillacollo: un punto 
                de encuentro lleno de sabor, accesible para todos y con una 
                identidad que crezca junto a nuestra comunidad.
              </p>

              <div className="about-stats">
                <div className="stat">
                  <span className="stat-number">2+</span>
                  <span className="stat-label">AÑOS CONTIGO</span>
                </div>
                <div className="stat">
                  <span className="stat-number">25+</span>
                  <span className="stat-label">DELICIAS EN EL MENÚ</span>
                </div>
                <div className="stat">
                  <span className="stat-number">300+</span>
                  <span className="stat-label">CLIENTES FELICES</span>
                </div>
              </div>
            </div>

            <div className="about-visual">
              <div className="visual-main">
                <div className="main-image-placeholder">
                  
                </div>
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
