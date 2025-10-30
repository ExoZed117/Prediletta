import { useEffect, useState } from 'react';
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import Info from './components/Info'

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Header scrolled={scrolled} />
      <Hero />
      <About />
      <Gallery />
      <Info />
      <Footer />
    </>
  )
}

export default App
