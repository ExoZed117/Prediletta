import { useCallback, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/cart';
import { useScrolled } from '../hooks/useScrolled';
import { useDialog } from '../hooks/useDialog';
import { IconBag, IconMenu, IconClose } from './Icons';
import logoImg from '../assets/img/Prediletta.png';
import './Header.css';

const LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/menu', label: 'Menú' },
  { to: '/#galeria', label: 'Galería', hash: true },
  { to: '/#nosotros', label: 'Nosotros', hash: true },
];

export default function Header() {
  const { count, setIsCartOpen } = useCart();
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useDialog(menuOpen, panelRef, closeMenu);

  const renderLink = (l, className) =>
    l.hash ? (
      <Link to={l.to} className={className} onClick={closeMenu}>{l.label}</Link>
    ) : (
      <NavLink to={l.to} end={l.end} className={className} onClick={closeMenu}>{l.label}</NavLink>
    );

  return (
    <>
      <header className={`site-header on-dark ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container site-header__inner">
          <Link to="/" className="brand" aria-label="Prediletta, ir al inicio">
            <img src={logoImg} alt="" className="brand__logo" />
            <span className="brand__name">Prediletta</span>
          </Link>

          <nav className="site-nav" aria-label="Principal">
            <ul>
              {LINKS.map((l) => (
                <li key={l.to}>{renderLink(l, 'site-nav__link')}</li>
              ))}
            </ul>
          </nav>

          <div className="site-header__actions">
            <button type="button" className="icon-btn cart-btn" onClick={() => setIsCartOpen(true)} aria-label={`Abrir pedido, ${count} productos`}>
              <IconBag />
              {count > 0 && <span key={count} className="cart-btn__badge">{count}</span>}
            </button>
            <button type="button" className="icon-btn menu-btn" onClick={() => setMenuOpen(true)} aria-label="Abrir menú" aria-expanded={menuOpen}>
              <IconMenu />
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer drawer--nav ${menuOpen ? 'is-open' : ''}`} inert={!menuOpen}>
        <div className="drawer__scrim" onClick={closeMenu} />
        <div className="drawer__panel on-dark" role="dialog" aria-modal="true" aria-label="Menú de navegación" ref={panelRef}>
          <div className="drawer__head" style={{ borderColor: 'var(--line-dark)' }}>
            <span className="drawer__title">Prediletta</span>
            <button type="button" className="icon-btn" onClick={closeMenu} aria-label="Cerrar menú"><IconClose /></button>
          </div>
          <nav className="drawer-nav" aria-label="Móvil">
            <ul>
              {LINKS.map((l, i) => (
                <li key={l.to} style={{ '--i': i }}>{renderLink(l, 'drawer-nav__link')}</li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
