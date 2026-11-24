import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import OrderModal from './OrderModal';
import { useCart } from '../context/cart';

export default function Layout() {
  const { pathname, hash, key } = useLocation();
  const { isOrderModalOpen } = useCart();
  const lastPath = useRef(null);

  // Scroll al cambiar de página, o al ancla (#galeria, #nosotros…)
  useEffect(() => {
    const samePage = lastPath.current === pathname;
    lastPath.current = pathname;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!samePage) window.scrollTo({ top: 0, behavior: 'instant' });
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    else if (samePage) window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  }, [pathname, hash, key]);

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header />
      <main id="contenido">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      {isOrderModalOpen && <OrderModal />}
    </>
  );
}
