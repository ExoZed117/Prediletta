import '../styles/Hero.css'

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-background">
        <div className="background-image"></div>
        <div className="background-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="title-container">
          <h1 className="hero-title">PREDILETTA</h1>
          <h1 className="hero-title">PREDILETTA</h1>
          <h1 className="hero-title">PREDILETTA</h1>
          <h1 className="hero-title">PREDILETTA</h1>
          <h1 className="hero-title">PREDILETTA</h1>
        </div>
        
        <div className="hero-description">
          <p>EXPERIENCIA DE CAFÉ PREMIUM</p>
          <p>DONDE CADA DETALLE CUENTA UNA HISTORIA</p>
        </div>
        
        <div className="hero-actions">
          <button className="cta-primary">VER MENÚ</button>
        </div>
      </div>
    </section>
  )
}
