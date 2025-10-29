import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import Info from './components/Info'
import { useEffect, useState } from 'react'

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="App">
      <Header scrolled={scrolled} />
      <Hero />
      <About />
      <Gallery />
      <Info />
      <Footer />
    </div>
  )
}

export default App
