import Reveal from './Reveal';
import imgSalon from '../assets/img/imagen3.jpg';
import imgTazas from '../assets/img/imagen2.jpg';
import './About.css';

const PILLARS = [
  {
    n: '01',
    title: '¿Quiénes somos?',
    text: [
      'En Cafetería Prediletta 1825 somos un rincón acogedor en Quillacollo, donde cada visita se convierte en una experiencia de sabor y calidez. Nos encanta recibir a quienes buscan una pausa en su día y hacerlos sentir como en casa.',
      'Trabajamos con ingredientes frescos y locales, preparados con cariño para que cada café y cada masita sea un pequeño motivo para sonreír. Queremos ser parte de los mejores momentos de nuestra comunidad.',
    ],
  },
  {
    n: '02',
    title: 'Misión',
    text: [
      'Brindar una experiencia cercana y familiar a través de productos artesanales y un ambiente cálido, promoviendo la conexión entre personas y contribuyendo a la vida social de Quillacollo.',
    ],
  },
  {
    n: '03',
    title: 'Visión',
    text: [
      'Convertirnos en la cafetería más querida de Quillacollo: un punto de encuentro lleno de sabor, accesible para todos y con una identidad que crezca junto a nuestra comunidad.',
    ],
  },
];

export default function About() {
  return (
    <section id="nosotros" className="section about">
      <div className="container">
        <Reveal className="about__head">
          <span className="eyebrow">03 — Nosotros</span>
          <h2>Más que café, <em>momentos para compartir</em></h2>
        </Reveal>

        <div className="about__photos">
          <Reveal variant="clip" className="about__photo about__photo--wide">
            <img src={imgSalon} alt="Clientes disfrutando en el salón de Prediletta" width="1600" height="1200" loading="lazy" />
          </Reveal>
          <Reveal variant="clip" delay={120} className="about__photo about__photo--side">
            <img src={imgTazas} alt="Dos cafés con leche y dos postres sobre la mesa" width="1600" height="1200" loading="lazy" />
          </Reveal>
        </div>

        <div className="about__pillars">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={i * 80} className="pillar">
              <span className="pillar__n">{p.n}</span>
              <h3>{p.title}</h3>
              {p.text.map((t) => (
                <p key={t.slice(0, 24)}>{t}</p>
              ))}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
