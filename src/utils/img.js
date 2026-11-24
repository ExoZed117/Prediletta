// Pide a Cloudinary un formato y ancho optimizados. Otras URLs se dejan igual.
export function cld(url, width) {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
}

// "8 BS" -> "8 Bs" (solo presentación; el valor numérico no cambia)
export function fmtPrice(price) {
  return String(price).replace(/\s*bs/i, ' Bs');
}
