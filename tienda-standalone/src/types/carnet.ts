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
  requireIdNumber: boolean; // Exigir DPI de 13 dígitos
  requireRole: boolean; // Cargo / Acreditación
  requireInstitutionRepresented: boolean; // Empresa / Institución que representa
  requireDepartmentMunicipality: boolean; // Departamento y Municipio
  requirePhoto: boolean;
  qrDestination: 'conferencia_pass' | 'digital_pass' | 'custom_url';
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
  schemaVersion?: number; // v2: comercial y conferencias
  
  // Datos comerciales y de acreditación (desacoplados del diseño)
  fullName: string;
  idNumber: string; // DPI con exactamente 13 dígitos
  role: string; // Cargo / Tipo de Acreditación (Conferencista, Delegado, Prensa, etc.)
  institutionRepresented?: string; // Institución o Empresa a la que representa
  departmentMunicipality?: string; // Departamento / Municipio de procedencia
  
  // Fotografía y almacenamiento
  photoUrl: string; // URL en Cloud Storage o fallback WebP estandarizado
  photoStoragePath?: string; // Ruta interna en Firebase Storage
  
  // Configuración visual preservada
  themeId: string;
  themeSnapshot?: CarnetTheme; // Congela paleta y diseño exactos al momento de emisión
  institutionName?: string; // Nombre del evento, congreso o empresa anfitriona
  
  // Control de acreditación y estado
  qrToken: string;
  status: 'pendiente' | 'aprobado' | 'impreso';
}
