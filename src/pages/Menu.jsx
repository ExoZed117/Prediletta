import { useEffect, useRef, useState } from 'react';
import menuData from '../data/menu.json';
import { useCart } from '../context/cart';
import { IconPlus } from '../components/Icons';
import { cld, fmtPrice } from '../utils/img';
import '../components/Menu.css';

const HERO_BG = 'https://res.cloudinary.com/dupoow7pa/image/upload/v1780546648/FondoMenu_djuild.jpg';

function AddButton({ label, onAdd, small = false }) {
  return (
    <button type="button" className={`add-btn ${small ? 'add-btn--text' : ''}`} onClick={onAdd} aria-label={`Añadir ${label} al pedido`}>
      {small ? <span>{small}</span> : <IconPlus width={18} height={18} />}
    </button>
  );
}

function Dish({ item, addToCart, simple = false }) {
  return (
    <li className={`dish ${item.image ? 'has-image' : ''}`}>
      {item.image && (
        <img className="dish__img" src={cld(item.image, 240)} alt="" width="96" height="96" loading="lazy" />
      )}
      <div className="dish__body">
        <h4>{item.name}</h4>
        {!simple && item.desc && <p>{item.desc}</p>}
        {item.note && <p className="dish__note">{item.note}</p>}
      </div>
      <div className="dish__buy">
        <span className="price">{fmtPrice(item.price)}</span>
        <AddButton
          label={item.name}
          onAdd={() => addToCart({ name: item.name, price: parseFloat(item.price), desc: item.desc })}
        />
      </div>
    </li>
  );
}

function Dishes({ items, addToCart, grid = false, simple = false }) {
  return (
    <ul className={`dishes ${grid ? 'dishes--grid' : ''}`}>
      {items.map((item) => (
        <Dish key={item.name} item={item} addToCart={addToCart} simple={simple} />
      ))}
    </ul>
  );
}

function Combinations({ combos, addToCart }) {
  return (
    <ul className="dishes combos">
      {combos.map((combo) => (
        <li key={combo.name} className="dish">
          <div className="dish__body"><h4>{combo.name}</h4></div>
          <div className="dish__buy">
            <span className="price">{fmtPrice(combo.price)}</span>
            <AddButton label={combo.name} onAdd={() => addToCart({ name: combo.name, price: parseFloat(combo.price) })} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function IceCreams({ category, addToCart }) {
  return (
    <div className="block">
      <h3>Elige tu helado</h3>
      <p className="block__desc">Precios por número de bolas</p>
      <ul className="scoops">
        {category.bolas.map((bola) => (
          <li key={bola.tipo}>
            <span>{bola.tipo.toLowerCase()}</span>
            <strong>{bola.precio} Bs</strong>
          </li>
        ))}
      </ul>
      <ul className="dishes">
        {category.sabores.map((sabor) => (
          <li key={sabor.name} className="dish dish--flavor">
            <div className="dish__body">
              <h4>{sabor.name}</h4>
              <p>{sabor.price} Bs por bola</p>
            </div>
            <div className="dish__buy dish__buy--multi">
              {category.bolas.map((bola) => (
                <AddButton
                  key={bola.tipo}
                  small={bola.tipo.split(' ')[0]}
                  label={`helado ${sabor.name.toLowerCase()} (${bola.tipo.toLowerCase()})`}
                  onAdd={() =>
                    addToCart({
                      name: `Helado ${sabor.name} (${bola.tipo.toLowerCase()})`,
                      price: parseFloat(bola.precio),
                      desc: `Delicioso helado de ${sabor.name.toLowerCase()}`,
                    })
                  }
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DrinkTable({ table, addToCart }) {
  return (
    <div className="block">
      <h3>{table.name}</h3>
      <div className="drinks" role="table" aria-label={table.name}>
        <div className="drinks__row drinks__row--head" role="row">
          {table.headers.map((h) => (
            <span key={h} role="columnheader">{h}</span>
          ))}
        </div>
        {table.rows.map((row) => (
          <div key={row.sabor} className="drinks__row" role="row">
            <span className="drinks__name" role="cell">{row.sabor}</span>
            <span role="cell" className="drinks__cell">
              <span className="price">{fmtPrice(row.vaso)}</span>
              <AddButton small="Vaso" label={`${row.sabor} (vaso)`} onAdd={() => addToCart({ name: `${row.sabor} (Vaso)`, price: parseFloat(row.vaso) })} />
            </span>
            <span role="cell" className="drinks__cell">
              <span className="price">{fmtPrice(row.jarra)}</span>
              <AddButton small="Jarra" label={`${row.sabor} (jarra)`} onAdd={() => addToCart({ name: `${row.sabor} (Jarra)`, price: parseFloat(row.jarra) })} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({ section, addToCart }) {
  const grid = section.type === 'grid';
  return (
    <div className="block">
      <h3>{section.name}</h3>
      <Dishes items={section.items} addToCart={addToCart} grid={grid} simple={grid} />
      {section.combinations && <Combinations combos={section.combinations} addToCart={addToCart} />}
    </div>
  );
}

export default function Menu() {
  const { categories } = menuData;
  const { addToCart } = useCart();
  const [active, setActive] = useState(categories[0].id);
  const navRef = useRef(null);

  // Categoría activa según el scroll
  useEffect(() => {
    const sections = categories.map((c) => document.getElementById(c.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-35% 0px -60% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [categories]);

  // Mantiene visible el enlace activo en la barra horizontal
  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector(`[data-id="${active}"]`);
    if (!nav || !link) return;
    const left = link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2;
    nav.scrollTo({ left, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }, [active]);

  return (
    <div className="menu-page">
      <section className="menu-hero on-dark">
        <img className="menu-hero__bg" src={cld(HERO_BG, 1600)} alt="" />
        <div className="container menu-hero__content">
          <span className="eyebrow">La carta</span>
          <h1>Menú</h1>
          <p className="lead">Café, frappés, pastelería, masitas, sándwiches, helados y refrescos.</p>
        </div>
      </section>

      <nav className="menu-nav" aria-label="Categorías del menú">
        <div className="menu-nav__scroll" ref={navRef}>
          <ul>
            {categories.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} data-id={c.id} className="menu-nav__link" aria-current={active === c.id ? 'location' : undefined}>
                  {c.title.charAt(0) + c.title.slice(1).toLowerCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="container menu-body">
        {categories.map((category, index) => (
          <section key={category.id} id={category.id} className="menu-section">
            <header className="menu-section__head">
              <span className="menu-section__n">{String(index + 1).padStart(2, '0')}</span>
              <h2>{category.title.charAt(0) + category.title.slice(1).toLowerCase()}</h2>
              {category.availability && (
                <p className="menu-section__avail">{category.availability.charAt(0) + category.availability.slice(1).toLowerCase()}</p>
              )}
            </header>

            {category.type === 'icecream' && <IceCreams category={category} addToCart={addToCart} />}

            {category.subcategories?.map((sub) => (
              <div key={sub.name} className="block">
                <h3>{sub.name.charAt(0) + sub.name.slice(1).toLowerCase()}</h3>
                {sub.description && (
                  <p className="block__desc">{sub.description.charAt(0) + sub.description.slice(1).toLowerCase()}</p>
                )}
                <Dishes items={sub.items} addToCart={addToCart} grid={sub.type === 'grid'} />
                {sub.combinations && <Combinations combos={sub.combinations} addToCart={addToCart} />}
              </div>
            ))}

            {category.items && !category.tables && !category.sections && category.type !== 'icecream' && (
              <Dishes items={category.items} addToCart={addToCart} />
            )}
            {category.sections?.map((s) => (
              <Section key={s.name} section={s} addToCart={addToCart} />
            ))}
            {category.tables?.map((t) => (
              <DrinkTable key={t.name} table={t} addToCart={addToCart} />
            ))}
          </section>
        ))}

        <p className="menu-note">* Los precios pueden variar. Por favor consulta la disponibilidad del día.</p>
      </div>
    </div>
  );
}
