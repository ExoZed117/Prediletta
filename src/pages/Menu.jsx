import { useEffect, useState } from 'react';
import '../styles/Menu.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartModal from '../components/CartModal';
import OrderModal from '../components/OrderModal';
import menuData from '../data/menu.json';
import { useCart } from "../context/CartContext";

const Menu = () => {
  const [scrolled, setScrolled] = useState(false);
  const { categories } = menuData;
  const { addToCart, isCartOpen, isOrderModalOpen } = useCart();

  // Control del scroll para cambiar el comportamiento estético del Header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ==========================================
  // FUNCIONES DE RENDERIZADO DE PRODUCTOS
  // ==========================================

  // Vista especial para la sección de helados
  const renderIceCreams = (category) => {
    return (
      <div className="menu-category">
        <h3>Elige tu helado</h3>
        <p className="category-description">Precios por número de bolas:</p>
        
        {/* Despliegue informativo de precios base */}
        <div className="icecream-prices">
          {category.bolas.map((bola, index) => (
            <div key={index} className="icecream-option">
              <span className="bola-type">{bola.tipo}</span>
              <span className="bola-price">{bola.precio} BS</span>
            </div>
          ))}
        </div>

        {/* Grid de Sabores de Helado */}
        <div className="icecream-grid">
          {category.sabores.map((sabor, index) => (
            <div key={index} className="icecream-item">
              <div className="icecream-content">
                <h4>{sabor.name}</h4>
                <p className="icecream-price-base">{sabor.price} BS por bola</p>
              </div>
              <div className="icecream-actions">
                {category.bolas.map((bola, bolaIndex) => {
                  const numericPrice = parseFloat(bola.precio);
                  return (
                    <button
                      key={bolaIndex}
                      className="add-btn icecream-btn"
                      onClick={() =>
                        addToCart({
                          name: `Helado ${sabor.name} (${bola.tipo.toLowerCase()})`,
                          price: numericPrice,
                          desc: `Delicioso helado de ${sabor.name.toLowerCase()}`
                        })
                      }
                    >
                      {bola.tipo.split(' ')[0]} 🍦
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Vista para categorías con subdivisiones (Ej: Tortas, Cafés Especiales)
  const renderSubcategories = (subcategories) => {
    return subcategories.map((subcategory, index) => (
      <div key={index} className="menu-category">
        <h3>{subcategory.name}</h3>
        {subcategory.description && (
          <p className="category-description">{subcategory.description}</p>
        )}
        <div className={`menu-items ${subcategory.type === 'grid' ? 'grid-items' : ''}`}>
          {subcategory.items.map((item, itemIndex) => {
            const numericPrice = parseFloat(item.price);
            return (
              <div key={itemIndex} className={`menu-item ${!item.desc ? 'simple' : ''} ${item.image ? 'has-image' : ''}`}>
                
                {/* 1. Imagen (Alineada fija a la Izquierda) */}
                {item.image && (
                  <div className="item-image-container">
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </div>
                )}

                {/* 2. Información (Centro expansivo) */}
                <div className="item-content">
                  <h4>{item.name}</h4>
                  {item.desc && <p>{item.desc}</p>}
                  {item.note && <p className="availability-note">({item.note})</p>}
                </div>

                {/* 3. Acciones y Precios (Fijos a la Derecha) */}
                <div className="item-actions">
                  <span className="item-price">{item.price}</span>
                  <button
                    className="add-btn"
                    onClick={() =>
                      addToCart({
                        name: item.name,
                        price: numericPrice,
                        desc: item.desc
                      })
                    }
                  >
                    Añadir 🛒
                  </button>
                </div>

              </div>
            );
          })}
        </div>
        {subcategory.combinations && (
          <div className="combination-prices">
            {subcategory.combinations.map((combo, comboIndex) => {
              const numericPrice = parseFloat(combo.price);
              return (
                <div key={comboIndex} className="combination">
                  <span>{combo.name}</span>
                  <div className="combination-actions">
                    <span className="item-price">{combo.price}</span>
                    <button
                      className="add-btn"
                      onClick={() =>
                        addToCart({
                          name: combo.name,
                          price: numericPrice,
                        })
                      }
                    >
                      Añadir 🛒
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    ));
  };

  // Vista estándar para listas planas de productos sin subcategorías
  const renderItems = (items) => {
    return (
      <div className="menu-items">
        {items.map((item, index) => {
          const numericPrice = parseFloat(item.price);
          return (
            <div key={index} className={`menu-item ${item.image ? 'has-image' : ''}`}>
              
              {/* 1. Imagen (Alineada fija a la Izquierda) */}
              {item.image && (
                <div className="item-image-container">
                  <img src={item.image} alt={item.name} loading="lazy" />
                </div>
              )}

              {/* 2. Información (Centro) */}
              <div className="item-content">
                <h4>{item.name}</h4>
                {item.desc && <p>{item.desc}</p>}
                {item.note && <p className="availability-note">({item.note})</p>}
              </div>

              {/* 3. Acciones (Derecha) */}
              <div className="item-actions">
                <span className="item-price">{item.price}</span>
                <button
                  className="add-btn"
                  onClick={() =>
                    addToCart({
                      name: item.name,
                      price: numericPrice,
                      desc: item.desc
                    })
                  }
                >
                  Añadir 🛒
                </button>
              </div>

            </div>
          );
        })}
      </div>
    );
  };

  // Vista en formato de matriz / tabla (Ej: Refrescos Naturales - Vaso o Jarra)
  const renderTables = (tables) => {
    return tables.map((table, index) => (
      <div key={index} className="refrescos-category">
        <h3>{table.name}</h3>
        <div className="refrescos-table">
          <div className="table-header">
            {table.headers.map((header, headerIndex) => (
              <span key={headerIndex}>{header}</span>
            ))}
            <span>Acción</span>
          </div>
          {table.rows.map((row, rowIndex) => {
            const numericPriceVaso = parseFloat(row.vaso);
            const numericPriceJarra = parseFloat(row.jarra);
            return (
              <div key={rowIndex} className="table-row">
                <span>{row.sabor}</span>
                <span>{row.vaso}</span>
                <span>{row.jarra}</span>
                <div className="table-actions">
                  <button
                    className="add-btn small"
                    onClick={() =>
                      addToCart({
                        name: `${row.sabor} (Vaso)`,
                        price: numericPriceVaso,
                      })
                    }
                  >
                    Vaso 🛒
                  </button>
                  <button
                    className="add-btn small"
                    onClick={() =>
                      addToCart({
                        name: `${row.sabor} (Jarra)`,
                        price: numericPriceJarra,
                      })
                    }
                  >
                    Jarra 🛒
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ));
  };

  // Orquestador secundario para grids y layouts mixtos
  const renderSections = (sections) => {
    return sections.map((section, index) => (
      <div key={index} className="menu-category">
        <h3>{section.name}</h3>
        {section.type === 'grid' ? (
          <>
            <div className="menu-items grid-items">
              {section.items.map((item, itemIndex) => {
                const numericPrice = parseFloat(item.price);
                return (
                  <div key={itemIndex} className={`menu-item simple ${item.image ? 'has-image' : ''}`}>
                    
                    {item.image && (
                      <div className="item-image-container">
                        <img src={item.image} alt={item.name} loading="lazy" />
                      </div>
                    )}

                    <div className="item-content">
                      <h4>{item.name}</h4>
                    </div>
                    <div className="item-actions">
                      <span className="item-price">{item.price}</span>
                      <button
                        className="add-btn"
                        onClick={() =>
                          addToCart({
                            name: item.name,
                            price: numericPrice,
                          })
                        }
                      >
                        Añadir 🛒
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            {section.combinations && (
              <div className="combination-prices">
                {section.combinations.map((combo, comboIndex) => {
                  const numericPrice = parseFloat(combo.price);
                  return (
                    <div key={comboIndex} className="combination">
                      <span>{combo.name}</span>
                      <div className="combination-actions">
                        <span className="item-price">{combo.price}</span>
                        <button
                          className="add-btn"
                          onClick={() =>
                            addToCart({
                              name: combo.name,
                              price: numericPrice,
                            })
                          }
                        >
                          Añadir 🛒
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          renderItems(section.items)
        )}
      </div>
    ));
  };

  // ==========================================
  // ESTRUCTURA DE RENDERIZADO COMPONENTE PRINCIPAL
  // ==========================================
  return (
    <div className="App">
      <Header scrolled={scrolled} dark={true} />     
      <div className="menu-page">
        
        {/* Hero Section Banner */}
        <section className="menu-hero">
          <div className="menu-hero-background">
            <div className="background-overlay"></div>
          </div>
          <div className="menu-hero-content">
            <h1>MENÚ</h1>
            
          </div>
        </section>

        {/* Barra de Navegación de Categorías (Carrusel Infinito CSS Autorrotativo) */}
        <nav className="menu-nav">
          <div className="menu-carousel-wrapper">
            
            {/* Bloque Espejo 1 */}
            <div className="menu-nav-container">
              {categories.map((category) => (
                <a key={`${category.id}-1`} href={`#${category.id}`} className="nav-item">
                  {category.title}
                </a>
              ))}
            </div>

            {/* Bloque Espejo 2 (Clon estructural para efecto infinito continuo en PC) */}
            <div className="menu-nav-container" aria-hidden="true">
              {categories.map((category) => (
                <a key={`${category.id}-2`} href={`#${category.id}`} className="nav-item">
                  {category.title}
                </a>
              ))}
            </div>

          </div>
        </nav>

        {/* Renderizado Dinámico de Módulos del Menú */}
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

              {/* Conmutador de renderizado por tipo de dato estructurado */}
              {category.type === 'icecream' && renderIceCreams(category)}
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

        {/* Nota Legal / Deslinde de Responsabilidad */}
        <section className="menu-note">
          <div className="section-container">
            <p className="note-text">
              * Los precios pueden variar. Por favor consulta la disponibilidad del día.
            </p>
          </div>
        </section>
      </div>

      <Footer />
      
      {/* CONTROL DE FLUJO SÍNCRONO: Inyección de Modales globales sin superposición */}
      {isCartOpen && <CartModal />}
      {isOrderModalOpen && <OrderModal />}
    </div>
  );
};

export default Menu;