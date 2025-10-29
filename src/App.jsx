import './App.css';
import Header from './components/Header';
import { useEffect, useState } from 'react';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Header scrolled={scrolled} />
      
      {/* Hero Section como la referencia */}
      <section id="inicio" className="hero">
        <div className="hero-background">
          {/* Imagen de fondo - puedes reemplazar con una imagen real */}
          <div className="background-image"></div>
          <div className="background-overlay"></div>
        </div>
        
        <div className="hero-content">
          {/* Título principal repetido como en la referencia */}
          <div className="title-container">
            
            <h1 className="hero-title">PREDILETTA</h1>
            <h1 className="hero-title">PREDILETTA</h1>
            <h1 className="hero-title">PREDILETTA</h1>
            <h1 className="hero-title">PREDILETTA</h1>
            <h1 className="hero-title">PREDILETTA</h1>
          </div>
          
          {/* Texto descriptivo */}
          <div className="hero-description">
            <p>EXPERIENCIA DE CAFÉ PREMIUM</p>
            <p>DONDE CADA DETALLE CUENTA UNA HISTORIA</p>
          </div>
          
          {/* CTA Buttons */}
          <div className="hero-actions">
            <button className="cta-primary">VER MENÚ</button>
            <button className="cta-secondary">RESERVAR MESA</button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <span>SCROLL</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Sección de información */}
      <section className="info-section">
        <div className="info-container">
          <div className="info-text">
            <h2>CAFÉ DE ESPECIALIDAD</h2>
            <p>
              En Prediletta, cada taza es el resultado de un meticuloso proceso 
              de selección y preparación. Trabajamos con los mejores granos de 
              origen único para ofrecerte una experiencia sensorial única.
            </p>
            <button className="info-btn">CONOCER MÁS</button>
          </div>
          <div className="info-image">
            <div className="image-placeholder">
              {/* Aquí iría una imagen del café */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;