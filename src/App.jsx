import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import Info from './components/Info'

function App() {
  return (
    <>
      <Header scrolled={false} dark={false} />
      <Hero />
      <About />
      <Gallery />
      <Info />
      <Footer />
    </>
  )
}

export default App
