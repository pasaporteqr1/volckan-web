export const CONTACT = {
  whatsappPhone: import.meta.env.VITE_WHATSAPP_PHONE || '50246741239',
  phoneDisplay: '+502 4674-1239',
  whatsappUrl: `https://wa.me/${import.meta.env.VITE_WHATSAPP_PHONE || '50246741239'}`,
  email: 'grupovolckan@gmail.com',
  editorialName: 'Tecno Volckánica',
  companyName: 'Tecno Volckánica',
  country: 'Guatemala',
  currency: 'Q',
  siteUrl: 'https://www.volckan.com'
};

export const RECURRENTE_CONFIG = {
  env: (import.meta.env.VITE_RECURRENTE_ENV || 'live') as 'live' | 'test',
  publicKey: import.meta.env.VITE_RECURRENTE_PUBLIC_KEY || '',
  secretKey: import.meta.env.VITE_RECURRENTE_SECRET_KEY || '',
  apiUrl: 'https://app.recurrente.com/api/checkouts'
};
