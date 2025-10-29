import '../styles/Menu.css'
import Header from '../components/Header';
import Footer from '../components/Footer';
import menuData from '../data/menu.json';
import { useEffect, useState } from 'react';

const Menu = () => {
  const [scrolled, setScrolled] = useState(false);
  const { categories } = menuData;

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderSubcategories = (subcategories) => {
    return subcategories.map((subcategory, index) => (
      <div key={index} className="menu-category">
        <h3>{subcategory.name}</h3>
        {subcategory.description && (
          <p className="category-description">{subcategory.description}</p>
        )}
        <div className={`menu-items ${subcategory.type === 'grid' ? 'grid-items' : ''}`}>
          {subcategory.items.map((item, itemIndex) => (
            <div key={itemIndex} className={`menu-item ${!item.desc ? 'simple' : ''}`}>
              <div className="item-content">
                <h4>{item.name}</h4>
                {item.desc && <p>{item.desc}</p>}
                {item.note && <p className="availability-note">({item.note})</p>}
              </div>
              <span className="item-price">{item.price}</span>
            </div>
          ))}
        </div>
        {subcategory.combinations && (
          <div className="combination-prices">
            {subcategory.combinations.map((combo, comboIndex) => (
              <div key={comboIndex} className="combination">
                <span>{combo.name}</span>
                <span className="item-price">{combo.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    ));
  };

  const renderItems = (items) => {
    return (
      <div className="menu-items">
        {items.map((item, index) => (
          <div key={index} className="menu-item">
            <div className="item-content">
              <h4>{item.name}</h4>
              {item.desc && <p>{item.desc}</p>}
              {item.note && <p className="availability-note">({item.note})</p>}
            </div>
            <span className="item-price">{item.price}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderTables = (tables) => {
    return tables.map((table, index) => (
      <div key={index} className="refrescos-category">
        <h3>{table.name}</h3>
        <div className="refrescos-table">
          <div className="table-header">
            {table.headers.map((header, headerIndex) => (
              <span key={headerIndex}>{header}</span>
            ))}
          </div>
          {table.rows.map((row, rowIndex) => (
            <div key={rowIndex} className="table-row">
              <span>{row.sabor}</span>
              <span>{row.vaso}</span>
              <span>{row.jarra}</span>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  const renderSections = (sections) => {
    return sections.map((section, index) => (
      <div key={index} className="menu-category">
        <h3>{section.name}</h3>
        {section.type === 'grid' ? (
          <>
            <div className="menu-items grid-items">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="menu-item simple">
                  <div className="item-content">
                    <h4>{item.name}</h4>
                  </div>
                  <span className="item-price">{item.price}</span>
                </div>
              ))}
            </div>
            {section.combinations && (
              <div className="combination-prices">
                {section.combinations.map((combo, comboIndex) => (
                  <div key={comboIndex} className="combination">
                    <span>{combo.name}</span>
                    <span className="item-price">{combo.price}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          renderItems(section.items)
        )}
      </div>
    ));
  };

  return (
    <div className="App">
      <Header scrolled={true} dark={true} />
      
      <div className="menu-page">
        {/* Hero Section */}
        <section className="menu-hero">
          <div className="menu-hero-background">
            <div className="background-overlay"></div>
          </div>
          <div className="menu-hero-content">
            <h1>MENÚ</h1>
            <p>EXPERIENCIAS ÚNICAS EN CADA BEBIDA</p>
          </div>
        </section>

        {/* Navegación */}
        <nav className="menu-nav">
          <div className="menu-nav-container">
            {categories.map((category) => (
              <a key={category.id} href={`#${category.id}`} className="nav-item">
                {category.title}
              </a>
            ))}
          </div>
        </nav>

        {/* Secciones del Menú */}
        {categories.map((category) => (
          <section key={category.id} id={category.id} className="menu-section">
            <div className="section-container">
              <div className="section-header">
                <h2>{category.title}</h2>
                <div className="section-divider"></div>
                {category.availability && (
                  <p className="availability">({category.availability})</p>
                )}
              </div>

              {/* Renderizar según la estructura de la categoría */}
              {category.subcategories && renderSubcategories(category.subcategories)}
              {category.items && !category.tables && !category.sections && renderItems(category.items)}
              {category.sections && renderSections(category.sections)}
              {category.tables && (
                <div className="refrescos-grid">
                  {renderTables(category.tables)}
                </div>
              )}
            </div>
          </section>
        ))}

        {/* Nota final */}
        <section className="menu-note">
          <div className="section-container">
            <p className="note-text">
              * Los precios pueden variar. Por favor consulta la disponibilidad del día.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Menu;