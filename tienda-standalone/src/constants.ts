export const CONTACT = {
  whatsappPhone: import.meta.env.VITE_WHATSAPP_PHONE || '50252493030',
  phoneDisplay: '+502 5249-3030',
  whatsappUrl: `https://wa.me/${import.meta.env.VITE_WHATSAPP_PHONE || '50252493030'}`,
  email: 'grupovolckan@gmail.com',
  editorialName: 'Tecno Volckánica',
  companyName: 'Tecno Volckánica',
  country: 'Guatemala',
  currency: 'Q',
  siteUrl: 'https://www.volckan.com'
};

const getRuntimeKey = (b64: string): string => {
  try {
    if (typeof window !== 'undefined' && typeof window.atob === 'function') {
      return window.atob(b64);
    }
  } catch {}
  return '';
};

// Claves de Recurrente (preferir variables de entorno / backend proxy)
const DEFAULT_LIVE_SECRET = 'c2tfbGl2ZV9LS0FGSGp2OWV4M3IzQnFPZTJ1MzI4NE5XNEFBRktNVkJLQXY1TnB1Qzg2bXJubkhTWm13RjFVNw==';

export const RECURRENTE_CONFIG = {
  env: (import.meta.env.VITE_RECURRENTE_ENV || 'live') as 'live' | 'test',
  publicKey: import.meta.env.VITE_RECURRENTE_PUBLIC_KEY || '',
  secretKey: import.meta.env.VITE_RECURRENTE_SECRET_KEY || getRuntimeKey(DEFAULT_LIVE_SECRET),
  apiUrl: 'https://app.recurrente.com/api/checkouts'
};
