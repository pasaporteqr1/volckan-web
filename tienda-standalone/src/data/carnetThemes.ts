import type { CarnetTheme, CarnetServiceFormConfig } from '../types/carnet';

export const CARNET_THEMES: CarnetTheme[] = [
  {
    id: 'volckan-cyber',
    name: 'Volckan Cyber Magma',
    description: 'Estilo tecnológico oscuro con destellos volcánicos naranja y carmesí.',
    frontBg: 'linear-gradient(135deg, #0b0f19 0%, #1e1b4b 45%, #7f1d1d 90%, #b91c1c 100%)',
    backBg: 'linear-gradient(135deg, #0b0f19 0%, #18181b 50%, #450a0a 100%)',
    textColor: '#ffffff',
    subtextColor: '#cbd5e1',
    accentColor: '#f97316',
    headerBg: 'rgba(15, 23, 42, 0.75)',
    chipColor: '#fbbf24',
    badgeBg: 'rgba(249, 115, 22, 0.25)',
    badgeText: '#fdba74',
    borderColor: 'rgba(249, 115, 22, 0.45)',
    glowColor: 'rgba(239, 68, 68, 0.35)'
  },
  {
    id: 'executive-navy-gold',
    name: 'Corporativo Navy & Gold',
    description: 'Elegancia ejecutiva en azul marino profundo con filigrana dorada.',
    frontBg: 'linear-gradient(135deg, #020617 0%, #0f172a 40%, #1e3a8a 80%, #172554 100%)',
    backBg: 'linear-gradient(135deg, #020617 0%, #0f172a 60%, #1e293b 100%)',
    textColor: '#ffffff',
    subtextColor: '#94a3b8',
    accentColor: '#facc15',
    headerBg: 'rgba(2, 6, 23, 0.8)',
    chipColor: '#eab308',
    badgeBg: 'rgba(234, 179, 8, 0.2)',
    badgeText: '#fef08a',
    borderColor: 'rgba(234, 179, 8, 0.4)',
    glowColor: 'rgba(234, 179, 8, 0.25)'
  },
  {
    id: 'emerald-security',
    name: 'Escudo Esmeralda Biométrico',
    description: 'Verde esmeralda militar de alta seguridad para colegios y control de acceso.',
    frontBg: 'linear-gradient(135deg, #022c22 0%, #064e3b 40%, #047857 80%, #065f46 100%)',
    backBg: 'linear-gradient(135deg, #022c22 0%, #043e30 60%, #0f2e25 100%)',
    textColor: '#ffffff',
    subtextColor: '#a7f3d0',
    accentColor: '#34d399',
    headerBg: 'rgba(2, 44, 34, 0.85)',
    chipColor: '#6ee7b7',
    badgeBg: 'rgba(52, 211, 153, 0.25)',
    badgeText: '#a7f3d0',
    borderColor: 'rgba(52, 211, 153, 0.45)',
    glowColor: 'rgba(16, 185, 129, 0.3)'
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Holográfico',
    description: 'Púrpura y cian fluorescente con trama de circuito digital.',
    frontBg: 'linear-gradient(135deg, #180929 0%, #3b0764 45%, #083344 85%, #0e7490 100%)',
    backBg: 'linear-gradient(135deg, #180929 0%, #2e1065 50%, #164e63 100%)',
    textColor: '#ffffff',
    subtextColor: '#e0e7ff',
    accentColor: '#22d3ee',
    headerBg: 'rgba(24, 9, 41, 0.8)',
    chipColor: '#38bdf8',
    badgeBg: 'rgba(168, 85, 247, 0.25)',
    badgeText: '#c084fc',
    borderColor: 'rgba(34, 211, 238, 0.45)',
    glowColor: 'rgba(168, 85, 247, 0.35)'
  },
  {
    id: 'minimal-frost',
    name: 'Frost Minimal Blanco & Grafito',
    description: 'Diseño claro y limpio tipo tarjeta de acceso inteligente nórdica.',
    frontBg: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
    backBg: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 70%, #cbd5e1 100%)',
    textColor: '#0f172a',
    subtextColor: '#475569',
    accentColor: '#2563eb',
    headerBg: 'rgba(241, 245, 249, 0.9)',
    chipColor: '#3b82f6',
    badgeBg: 'rgba(37, 99, 235, 0.12)',
    badgeText: '#1d4ed8',
    borderColor: 'rgba(37, 99, 235, 0.35)',
    glowColor: 'rgba(59, 130, 246, 0.2)'
  },
  {
    id: 'royal-crimson',
    name: 'Carmesí Real Institucional',
    description: 'Rojo borgoña con contrastes plateados para universidades y personal.',
    frontBg: 'linear-gradient(135deg, #3f0713 0%, #881337 40%, #4c0519 80%, #1f0308 100%)',
    backBg: 'linear-gradient(135deg, #3f0713 0%, #4c0519 60%, #1f0308 100%)',
    textColor: '#ffffff',
    subtextColor: '#fecdd3',
    accentColor: '#f43f5e',
    headerBg: 'rgba(63, 7, 19, 0.85)',
    chipColor: '#fb7185',
    badgeBg: 'rgba(244, 63, 94, 0.25)',
    badgeText: '#fda4af',
    borderColor: 'rgba(244, 63, 94, 0.4)',
    glowColor: 'rgba(244, 63, 94, 0.3)'
  }
];

export const DEFAULT_CARNET_FORM_CONFIG: CarnetServiceFormConfig = {
  id: 'form-carnets-principal',
  slug: 'general',
  title: 'Acreditación Oficial & Credenciales',
  institutionName: 'Mesa de Competitividad de Quetzaltenango',
  subtitle: 'Completa tus datos personales, encuadra tu fotografía oficial y genera tu credencial digital y carnet imprimible CR80 con código QR.',
  description: 'Credencial oficial en PVC estándar CR80 con código QR intransferible para control de accesos y acreditación de la Mesa de Competitividad de Quetzaltenango.',
  logoUrl: '',
  defaultThemeId: 'volckan-cyber',
  allowUserThemeSelection: true,
  allowedThemes: ['volckan-cyber', 'executive-navy-gold', 'emerald-security', 'cyberpunk-neon', 'minimal-frost', 'royal-crimson'],
  fields: {
    requireIdNumber: true, // DPI de 13 dígitos
    requirePhone: true, // Teléfono (+502 con 8 dígitos)
    requireInstitutionRepresented: true, // Empresa / Institución que representa
    requireDepartmentMunicipality: true, // Departamento / Municipio
    requirePhoto: true,
    qrDestination: 'conferencia_pass',
    customUrlPrefix: ''
  },
  isActive: true,
  deliveryNotes: 'Entrega física en la recepción del evento o envío previo de credenciales en PVC. El pase digital QR se emite inmediatamente.',
  supportPhone: '50246741239',
  createdAt: '2025-01-01T00:00:00Z'
};
