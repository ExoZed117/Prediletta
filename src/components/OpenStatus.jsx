import { useEffect, useState } from 'react';
import { isOpenNow } from '../utils/hours';

export default function OpenStatus({ className = '' }) {
  const [open, setOpen] = useState(() => isOpenNow());
  useEffect(() => {
    const id = setInterval(() => setOpen(isOpenNow()), 60000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={`open-status ${open ? 'is-open' : ''} ${className}`.trim()}>
      <span className="open-status__dot" aria-hidden="true" />
      {open ? 'Abierto ahora' : 'Cerrado ahora'}
    </span>
  );
}
