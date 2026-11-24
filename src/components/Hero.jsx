import { Link } from 'react-router-dom';
import OpenStatus from './OpenStatus';
import heroImg from '../assets/img/imagen1.jpg';
import './Hero.css';

export default function Hero() {
  return (
    <section id="inicio" className="hero on-dark">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow hero__in" style={{ '--i': 0 }}>Cafetería · Quillacollo</p>
          <h1 className="hero__title hero__in" style={{ '--i': 1 }}>
            Prediletta <span className="hero__year">1825</span>
          </h1>
          <p className="lead hero__lead hero__in" style={{ '--i': 2 }}>
            Café de especialidad, masitas artesanales y un rincón para quedarse un rato.
          </p>
          <div className="hero__actions hero__in" style={{ '--i': 3 }}>
            <Link to="/menu" className="btn btn--primary">Ver el menú</Link>
            <a href="#ubicacion" className="btn btn--line">Cómo llegar</a>
          </div>
        </div>

        <figure className="hero__figure hero__in" style={{ '--i': 2 }}>
          <img src={heroImg} alt="Barra de Prediletta con vitrina de pasteles bajo un arco iluminado" width="1200" height="1600" fetchPriority="high" />
        </figure>
      </div>

      <div className="container hero__meta hero__in" style={{ '--i': 4 }}>
        <OpenStatus />
        <span>Lun a sáb 8:30 – 21:30 · Dom 15:30 – 21:30</span>
      </div>
    </section>
  );
}
