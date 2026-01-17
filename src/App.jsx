import { useEffect, useState } from 'react';
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import Info from './components/Info'


import { useCart } from './context/CartContext'
import CartModal from './components/CartModal'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const { isCartOpen, setIsCartOpen } = useCart(); // ✅ del contexto

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header scrolled={scrolled} />
      <Hero />
      <About />
      <Gallery />
      <Info />
      <Footer />

      {/* ✅ Modal del carrito */}
      {isCartOpen && (
        <CartModal onProceed={() => {
          setIsCartOpen(false);
          // Luego aquí llamaremos al OrderModal (Fase 2)
        }} />
      )}
    </>
  );
}

export default App;
