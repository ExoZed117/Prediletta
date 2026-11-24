import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { IconArrow } from './Icons';
import { cld } from '../utils/img';
import './Specialty.css';

const PHOTO = 'https://res.cloudinary.com/dupoow7pa/image/upload/v1780546524/LecheConChocolate_cvvcqp.jpg';

export default function Specialty() {
  return (
    <section id="especialidad" className="section specialty">
      <div className="container specialty__grid">
        <Reveal className="specialty__text">
          <span className="eyebrow">01 — Especialidad</span>
          <h2>Café de <em>especialidad</em></h2>
          <p className="lead">
            Un buen café empieza en los detalles: ingredientes frescos, una preparación cuidada y el tiempo justo para cada taza.
            En Prediletta lo servimos como nos gusta recibirte: sin prisa y con calidez.
          </p>
          <p>
            Del espresso más intenso a un frappé helado, acompañado de una masita recién hecha. Ven y elige tu momento.
          </p>
          <Link to="/menu" className="text-link">Ver el menú <IconArrow /></Link>
        </Reveal>

        <Reveal variant="clip" className="specialty__photo">
          <img src={cld(PHOTO, 1000)} alt="Dos tazas de leche con chocolate junto a postres" width="1000" height="1250" loading="lazy" />
        </Reveal>
      </div>
    </section>
  );
}
