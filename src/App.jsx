import { useCart } from "./context/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Menu from "./pages/Menu";
import Info from "./components/Info";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Location from "./components/Location";
import Footer from "./components/Footer";
import CartModal from "./components/CartModal";
import OrderModal from "./components/OrderModal"; // Importación del modal globalizado
import "./App.css";

function App() {
  const { isCartOpen, isOrderModalOpen } = useCart(); // Escuchamos los modales globales de forma segura

  return (
    <div className="app-container">
      <Header />
      <main>
        {/* Tu estructura modular actual */}
        <section id="inicio"><Hero /></section>
        <section id="info"><Info /></section>
        <section id="nosotros"><About /></section>
        <section id="galeria"><Gallery /></section>
        <section id="ubicacion"><Location /></section>
      </main>
      <Footer />

      {/* RENDERIZADO GLOBAL DESDE EL CONTEXTO */}
      {isCartOpen && <CartModal />}
      {isOrderModalOpen && <OrderModal />} 
    </div>
  );
}

export default App;