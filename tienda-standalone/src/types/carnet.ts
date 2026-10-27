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
  fullName: string;
  idNumber: string;
  role: string;
  gradeOrArea?: string;
  bloodType?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  expirationDate?: string;
  allergiesOrNotes?: string;
  photoUrl: string;
  themeId: string;
  qrToken: string;
  status: 'pendiente' | 'aprobado' | 'impreso';
  institutionName?: string;
}
