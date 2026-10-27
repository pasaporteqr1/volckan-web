export interface CarnetTheme {
  id: string;
  name: string;
  description: string;
  frontBg: string;
  backBg: string;
  textColor: string;
  subtextColor: string;
  accentColor: string;
  headerBg: string;
  chipColor: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  glowColor: string;
}

export interface CarnetFieldConfig {
  requireIdNumber: boolean;
  requireRole: boolean;
  requireGradeOrArea: boolean;
  requireBloodType: boolean;
  requireEmergencyContact: boolean;
  requireEmergencyPhone: boolean;
  requireExpirationDate: boolean;
  requirePhoto: boolean;
  qrDestination: 'sosqr_profile' | 'digital_pass' | 'custom_url';
  customUrlPrefix?: string;
}

export interface CarnetServiceFormConfig {
  id: string;
  slug: string;
  title: string;
  institutionName: string;
  subtitle: string;
  description: string;
  logoUrl?: string;
  defaultThemeId: string;
  allowUserThemeSelection: boolean;
  allowedThemes: string[];
  fields: CarnetFieldConfig;
  isActive: boolean;
  deliveryNotes?: string;
  supportPhone?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CarnetSubmission {
  id: string;
  formId: string;
  createdAt: string;
  updatedAt?: string;
  schemaVersion?: number; // v1: versión de esquema para migraciones futuras
  
  // Datos personales canónicos (desacoplados del diseño)
  fullName: string;
  idNumber: string;
  role: string;
  gradeOrArea?: string;
  bloodType?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  expirationDate?: string;
  allergiesOrNotes?: string;
  
  // Fotografía y almacenamiento
  photoUrl: string; // URL en Cloud Storage o fallback WebP
  photoStoragePath?: string; // Ruta interna en Firebase Storage (para gestión/borrado)
  
  // Configuración visual preservada
  themeId: string;
  themeSnapshot?: CarnetTheme; // Congela la paleta y estilo en el momento del envío
  institutionName?: string;
  
  // Control de seguridad y estado
  qrToken: string;
  status: 'pendiente' | 'aprobado' | 'impreso';
}
