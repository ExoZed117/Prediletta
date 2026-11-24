import { useEffect, useRef, useState } from 'react';

// Muestra su contenido una sola vez al entrar en pantalla.
// variant="clip" revela una imagen con clip-path (el hijo directo debe ser <img>).
export default function Reveal({ variant, delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (!('IntersectionObserver' in window)) {
      setSeen(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const base = variant === 'clip' ? 'reveal-clip' : 'reveal';
  return (
    <div
      ref={ref}
      className={`${base} ${seen ? 'is-in' : ''} ${className}`.trim()}
      style={{ '--d': `${delay}ms` }}
      {...rest}
    >
      {children}
    </div>
  );
}
