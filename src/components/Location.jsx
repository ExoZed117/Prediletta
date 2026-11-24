import Reveal from './Reveal';
import OpenStatus from './OpenStatus';
import { IconArrow } from './Icons';
import './Location.css';

export default function Location() {
  return (
    <section id="ubicacion" className="section section--paper location">
      <div className="container location__grid">
        <Reveal className="location__info">
          <span className="eyebrow">04 — Visítanos</span>
          <h2>Te esperamos en <em>Quillacollo</em></h2>
          <p className="lead">Calle Cochabamba casi Héroes del Chaco, Quillacollo</p>

          <dl className="hours">
            <div>
              <dt>Lunes a sábado</dt>
              <dd>8:30 a 21:30</dd>
            </div>
            <div>
              <dt>Domingo</dt>
              <dd>15:30 a 21:30</dd>
            </div>
          </dl>
          <p className="hours__note"><OpenStatus /> · Feriados: el horario varía</p>

          <a
            href="https://maps.app.goo.gl/hQY7sHtXrg9v2kDc7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--line"
          >
            Abrir en Google Maps <IconArrow />
          </a>
        </Reveal>

        <Reveal delay={100} className="location__map">
          <iframe
            src="https://maps.google.com/maps?q=PREDILETTA%201825,%20Calle%20cochabamba,%20Quillacollo&t=&z=16&ie=UTF8&iwloc=&output=embed"
            title="Ubicación de Prediletta 1825"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </section>
  );
}
