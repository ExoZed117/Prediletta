import '../styles/Info.css'

export default function Info() {
  return (
    <section className="info-section">
      <div className="info-container">
        <div className="info-text">
          <h2>CAFÉ DE ESPECIALIDAD</h2>
          <p>
            En Prediletta, cada taza es el resultado de un meticuloso proceso…
          </p>
        </div>

        <div className="info-image">
          <div className="image-placeholder">
            <img 
              src="https://res.cloudinary.com/dupoow7pa/image/upload/v1780546524/LecheConChocolate_cvvcqp.jpg" 
              alt="Café de Especialidad Prediletta" 
              className="info-img-fluid"
            />
          </div>
        </div>
      </div>
    </section>
  )
}