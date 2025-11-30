import '../styles/Menu.css'
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartModal from '../components/CartModal';
import menuData from '../data/menu.json';
import { useEffect, useState } from 'react';
import { useCart } from "../context/CartContext";

const Menu = () => {
  const [scrolled, setScrolled] = useState(false);
  const { categories } = menuData;
  const { addToCart, isCartOpen } = useCart(); // 'count' no se usaba, lo quité para limpiar

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función especial para renderizar helados (Esta se queda igual porque no pediste fotos aquí)
  const renderIceCreams = (category) => {
    return (
      <div className="menu-category">
        <h3>Elige tu helado</h3>
        <p className="category-description">Precios por número de bolas:</p>
        
        {/* Mostrar precios por bolas */}
        <div className="icecream-prices">
          {category.bolas.map((bola, index) => (
            <div key={index} className="icecream-option">
              <span className="bola-type">{bola.tipo}</span>
              <span className="bola-price">{bola.precio} BS</span>
            </div>
          ))}
        </div>

        {/* Grid de sabores */}
        <div className="icecream-grid">
          {category.sabores.map((sabor, index) => (
            <div key={index} className="icecream-item">
              <div className="icecream-content">
                <h4>{sabor.name}</h4>
                <p className="icecream-price-base">{sabor.price} BS por bola</p>
              </div>
              <div className="icecream-actions">
                {/* Botones para cada tipo de bola */}
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

  // 🔴 AQUÍ HICE CAMBIOS: renderSubcategories ahora soporta imágenes
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
              // Agregamos la clase 'has-image' si el item tiene imagen
              <div key={itemIndex} className={`menu-item ${!item.desc ? 'simple' : ''} ${item.image ? 'has-image' : ''}`}>
                
                {/* LOGICA DE IMAGEN AÑADIDA */}
                {item.image && (
                  <div className="item-image-container">
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </div>
                )}

                <div className="item-content">
                  <h4>{item.name}</h4>
                  {item.desc && <p>{item.desc}</p>}
                  {item.note && <p className="availability-note">({item.note})</p>}
                </div>
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

  // 🔴 AQUÍ HICE CAMBIOS: renderItems ahora soporta imágenes
  const renderItems = (items) => {
    return (
      <div className="menu-items">
        {items.map((item, index) => {
          const numericPrice = parseFloat(item.price);
          return (
            // Agregamos la clase 'has-image'
            <div key={index} className={`menu-item ${item.image ? 'has-image' : ''}`}>
              
              {/* LOGICA DE IMAGEN AÑADIDA */}
              {item.image && (
                <div className="item-image-container">
                  <img src={item.image} alt={item.name} loading="lazy" />
                </div>
              )}

              <div className="item-content">
                <h4>{item.name}</h4>
                {item.desc && <p>{item.desc}</p>}
                {item.note && <p className="availability-note">({item.note})</p>}
              </div>
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

  // 🔴 AQUÍ HICE CAMBIOS: renderSections ahora soporta imágenes (por si acaso usas grid en el futuro)
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
                  // Agregamos la clase 'has-image'
                  <div key={itemIndex} className={`menu-item simple ${item.image ? 'has-image' : ''}`}>
                    
                    {/* LOGICA DE IMAGEN AÑADIDA */}
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

  return (
    <div className="App">
      <Header scrolled={scrolled} dark={true} />     
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

      {/* Modal del Carrito */}
      {isCartOpen && <CartModal />}
    </div>
  );
};

export default Menu;