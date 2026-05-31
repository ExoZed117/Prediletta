// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Info from '../components/Info';
import Location from '../components/Location'; // Añadido que faltaba
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import CartModal from '../components/CartModal';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const { isCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Header scrolled={scrolled} dark={false} />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Info />
        <Location />
      </main>
      <Footer />

      {isCartOpen && <CartModal />}
    </div>
  );
}