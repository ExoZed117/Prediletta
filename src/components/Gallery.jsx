import Reveal from './Reveal';
import { cld } from '../utils/img';
import './Gallery.css';

const BASE = 'https://res.cloudinary.com/dupoow7pa/image/upload/';
const PHOTOS = [
  { src: `${BASE}v1780546523/WhatsApp_Image_2026-06-03_at_23.40.14_1_qurtud.jpg`, alt: 'Interior de Prediletta' },
  { src: `${BASE}v1780546647/WhatsApp_Image_2026-06-03_at_23.40.16_bie8bm.jpg`, alt: 'Barra de café' },
  { src: `${BASE}v1780546524/WhatsApp_Image_2026-06-03_at_23.40.15_1_zy2wem.jpg`, alt: 'Zona cómoda para trabajar' },
  { src: `${BASE}v1780546525/WhatsApp_Image_2026-06-03_at_23.40.15_2_cy4qin.jpg`, alt: 'Terraza exterior' },
  { src: `${BASE}v1780546513/WhatsApp_Image_2026-06-03_at_23.39.59_rkg3wh.jpg`, alt: 'Detalles artesanales' },
];

export default function Gallery() {
  return (
    <section id="galeria" className="section section--paper gallery">
      <div className="container">
        <Reveal className="gallery__head">
          <span className="eyebrow">02 — Nuestro espacio</span>
          <h2>Un ambiente pensado para <em>quedarse</em></h2>
        </Reveal>

        <div className="gallery__grid">
          {PHOTOS.map((p, i) => (
            <Reveal key={p.src} variant="clip" delay={i * 70} className={`gallery__item gallery__item--${i + 1}`}>
              <img src={cld(p.src, i === 0 ? 1000 : 700)} alt={p.alt} loading="lazy" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
