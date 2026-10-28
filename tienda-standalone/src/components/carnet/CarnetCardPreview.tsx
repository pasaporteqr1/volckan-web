import React, { useEffect, useState } from 'react';
import type { CarnetTheme } from '../../types/carnet';
import { generateQrDataUrl } from '../../utils/carnetExport';
import './CarnetCardPreview.css';

export interface CarnetCardData {
  fullName: string;
  idNumber: string; // DPI de 13 dígitos
  phone?: string; // Teléfono (+502 ########)
  role?: string;
  institutionRepresented?: string; // Institución o Empresa que representa
  departmentMunicipality?: string; // Departamento / Municipio
  photoUrl?: string;
  institutionName: string; // Evento, Congreso o Empresa anfitriona
  logoUrl?: string;
  qrToken?: string;
}

interface CarnetCardPreviewProps {
  data: CarnetCardData;
  theme: CarnetTheme;
  orientation?: 'vertical' | 'horizontal';
  side?: 'front' | 'back' | 'both';
  interactiveFlip?: boolean;
  onFlip?: () => void;
  scale?: number;
  className?: string;
  frontRef?: React.RefObject<HTMLDivElement | null>;
  backRef?: React.RefObject<HTMLDivElement | null>;
}

// Función auxiliar para dar formato de 13 dígitos al DPI (ej: 1234 56789 0101)
export function formatDpiString(raw?: string): string {
  if (!raw) return '0000 00000 0000';
  const clean = raw.replace(/\D/g, '');
  if (clean.length === 13) {
    return `${clean.slice(0, 4)} ${clean.slice(4, 9)} ${clean.slice(9, 13)}`;
  }
  return raw;
}

// Función auxiliar para dar formato a número de teléfono guatemalteco (+502 #### ####)
export function formatPhoneString(raw?: string): string {
  if (!raw) return '+502 0000 0000';
  const clean = raw.replace(/\D/g, '');
  if (clean.length === 11 && clean.startsWith('502')) {
    const num = clean.slice(3);
    return `+502 ${num.slice(0, 4)} ${num.slice(4)}`;
  }
  if (clean.length === 8) {
    return `+502 ${clean.slice(0, 4)} ${clean.slice(4)}`;
  }
  return raw.startsWith('+502') ? raw : `+502 ${raw}`;
}

export const CarnetCardPreview: React.FC<CarnetCardPreviewProps> = ({
  data,
  theme,
  orientation = 'vertical',
  side = 'front',
  interactiveFlip = true,
  scale = 1,
  className = '',
  frontRef,
  backRef
}) => {
  const [currentSide, setCurrentSide] = useState<'front' | 'back'>(side === 'back' ? 'back' : 'front');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    if (side === 'front' || side === 'back') {
      setCurrentSide(side);
    }
  }, [side]);

  // Generar código QR dinámico cuando cambie el token, ID o teléfono
  useEffect(() => {
    const qrPayload = data.qrToken || 
      `https://volckan.com/tienda/#/carnet/verify?id=${encodeURIComponent(data.idNumber || 'DEMO')}&phone=${encodeURIComponent(data.phone || '')}`;
    generateQrDataUrl(qrPayload).then(url => setQrDataUrl(url));
  }, [data.qrToken, data.idNumber, data.phone]);

  const toggleFlip = () => {
    if (!interactiveFlip) return;
    setCurrentSide(prev => (prev === 'front' ? 'back' : 'front'));
  };

  const isVertical = orientation === 'vertical';

  return (
    <div 
      className={`carnet-preview-container ${orientation} ${className}`}
      style={{ transform: scale !== 1 ? `scale(${scale})` : undefined }}
    >
      {side === 'both' ? (
        <div className={`carnet-both-sides-wrapper ${orientation}`}>
          <div className="carnet-single-stage">
            <span className="carnet-side-label">Frente Oficial (Front)</span>
            <div 
              ref={frontRef} 
              className={`carnet-card-cr80 front-face ${orientation}`} 
              style={{ background: theme.frontBg, borderColor: theme.borderColor }}
            >
              {isVertical ? (
                <VerticalFrontCardContent data={data} theme={theme} />
              ) : (
                <FrontCardContent data={data} theme={theme} />
              )}
            </div>
          </div>
          <div className="carnet-single-stage">
            <span className="carnet-side-label">Reverso Comercial (Back)</span>
            <div 
              ref={backRef} 
              className={`carnet-card-cr80 back-face ${orientation}`} 
              style={{ background: theme.backBg, borderColor: theme.borderColor }}
            >
              {isVertical ? (
                <VerticalBackCardContent data={data} theme={theme} qrDataUrl={qrDataUrl} />
              ) : (
                <BackCardContent data={data} theme={theme} qrDataUrl={qrDataUrl} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={`carnet-flip-scene ${orientation}`}>
          <div 
            className={`carnet-flip-card ${orientation} ${currentSide === 'back' ? 'is-flipped' : ''}`}
            onClick={toggleFlip}
            title={interactiveFlip ? "Haz clic para voltear la credencial (Frente / Reverso)" : undefined}
          >
            {/* Frente */}
            <div 
              ref={frontRef} 
              className={`carnet-card-cr80 front-face ${orientation}`} 
              style={{ background: theme.frontBg, borderColor: theme.borderColor }}
            >
              {isVertical ? (
                <VerticalFrontCardContent data={data} theme={theme} />
              ) : (
                <FrontCardContent data={data} theme={theme} />
              )}
            </div>

            {/* Reverso */}
            <div 
              ref={backRef} 
              className={`carnet-card-cr80 back-face ${orientation}`} 
              style={{ background: theme.backBg, borderColor: theme.borderColor }}
            >
              {isVertical ? (
                <VerticalBackCardContent data={data} theme={theme} qrDataUrl={qrDataUrl} />
              ) : (
                <BackCardContent data={data} theme={theme} qrDataUrl={qrDataUrl} />
              )}
            </div>
          </div>

          {/* Botones de control de vista si es interactivo */}
          {interactiveFlip && (
            <div className="carnet-preview-controls">
              <button 
                type="button" 
                className={`btn-carnet-side-toggle ${currentSide === 'front' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setCurrentSide('front'); }}
              >
                🪪 Frente Oficial
              </button>
              <button 
                type="button" 
                className={`btn-carnet-side-toggle ${currentSide === 'back' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setCurrentSide('back'); }}
              >
                🔄 Reverso con QR
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// DISEÑO VERTICAL PROFESIONAL CR80 (53.98mm x 85.60mm - Ratio Estándar Vertical)
// Inspirado en el Sistema de Acreditación Summit de Competitividad / Quetzaltenango
// ============================================================================

const VerticalFrontCardContent: React.FC<{ data: CarnetCardData; theme: CarnetTheme }> = ({ data, theme }) => {
  return (
    <div className="carnet-vertical-inner">
      {/* Fondo Dinámico con Geometría de Cumbres (Mesh Gradient + SVG Cumbres de Quetzaltenango) */}
      <div className="carnet-bg-mesh" aria-hidden="true">
        <svg className="carnet-mountain-pattern" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-20 220L95 55L215 220H-20Z" fill={`url(#gradPeak1-${theme.id})`} />
          <path d="M120 220L245 35L380 220H120Z" fill={`url(#gradPeak2-${theme.id})`} />
          <path d="M230 220L335 85L430 220H230Z" fill={`url(#gradPeak1-${theme.id})`} />
          <defs>
            <linearGradient id={`gradPeak1-${theme.id}`} x1="100" y1="40" x2="100" y2="220" gradientUnits="userSpaceOnUse">
              <stop stopColor={theme.accentColor} stopOpacity="0.45" />
              <stop offset="1" stopColor={theme.accentColor} stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`gradPeak2-${theme.id}`} x1="250" y1="35" x2="250" y2="220" gradientUnits="userSpaceOnUse">
              <stop stopColor={theme.borderColor || '#38bdf8'} stopOpacity="0.4" />
              <stop offset="1" stopColor={theme.borderColor || '#38bdf8'} stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Ranura Superior para Cinta / Lanyard */}
      <div className="carnet-lanyard-slot-wrap">
        <div className="carnet-lanyard-slot" title="Ranura para cinta"></div>
      </div>

      {/* 1. Cabecera Institucional: Logotipo prominente + Píldora del Organizador y Título */}
      <header className="carnet-header-top">
        {data.logoUrl ? (
          <div className="carnet-header-logo-container">
            <img src={data.logoUrl} alt="Logo Institucional" className="carnet-header-prominent-logo" />
          </div>
        ) : (
          <div className="carnet-header-logo-container">
            <div className="carnet-header-logo-fallback" style={{ background: theme.badgeBg, color: theme.accentColor, borderColor: theme.borderColor }}>
              ⚡
            </div>
          </div>
        )}

        <div className="carnet-organizer-pill">
          <span className="carnet-organizer-dot" style={{ background: theme.accentColor, boxShadow: `0 0 8px ${theme.accentColor}` }}></span>
          <span className="carnet-organizer-name" style={{ color: theme.textColor }}>
            {data.institutionName || 'Mesa de Competitividad de Quetzaltenango'}
          </span>
        </div>

        <h2 className="carnet-summit-title" style={{ color: theme.textColor }}>
          SUMMIT DE COMPETITIVIDAD<span className="year-highlight" style={{ color: theme.accentColor }}> 2026</span>
        </h2>
        <p className="carnet-summit-subtitle" style={{ color: theme.subtextColor }}>
          Innovación · Productividad · Desarrollo Regional
        </p>
      </header>

      {/* 2. Sección de Fotografía del Portador (Formato Rectangular Vertical 3:4 con Marco Squircle y Sello) */}
      <div className="carnet-photo-cluster-wrap">
        <div className="carnet-photo-ring rectangular" style={{ background: `linear-gradient(135deg, ${theme.accentColor} 0%, rgba(56, 189, 248, 0.85) 100%)`, boxShadow: `0 10px 24px -6px rgba(0,0,0,0.55), 0 0 18px ${theme.glowColor}` }}>
          <div className="carnet-photo-frame-inner rectangular" style={{ background: '#020617' }}>
            {data.photoUrl ? (
              <img src={data.photoUrl} alt={data.fullName} className="carnet-bearer-photo" />
            ) : (
              <div className="carnet-photo-empty-state" style={{ color: theme.subtextColor }}>
                <span style={{ fontSize: '1.6rem' }}>👤</span>
                <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.05em' }}>FOTOGRAFÍA</span>
              </div>
            )}
            <div className="carnet-verified-seal-badge" style={{ background: theme.accentColor, color: '#071120' }} title="Identidad Verificada">
              ✓
            </div>
          </div>
        </div>
      </div>

      {/* 3. Jerarquía de Datos del Titular */}
      <div className="carnet-bearer-body">
        <div className="carnet-role-pill-badge" style={{ background: `linear-gradient(135deg, ${theme.accentColor} 0%, rgba(217, 119, 6, 0.95) 100%)`, color: '#071120', boxShadow: `0 4px 14px ${theme.glowColor}` }}>
          {data.role || 'ACREDITACIÓN OFICIAL'}
        </div>

        <h3 className="carnet-bearer-name" style={{ color: theme.textColor }}>
          {data.fullName || 'NOMBRE DEL TITULAR'}
        </h3>

        {/* Tarjeta Glassmorphism de la Institución o Empresa que Representa (Texto multilínea sin cortes) */}
        {data.institutionRepresented && (
          <div className="carnet-institution-card">
            <span className="carnet-field-label" style={{ color: theme.accentColor }}>EMPRESA / INSTITUCIÓN</span>
            <span className="carnet-institution-val" style={{ color: theme.textColor }}>
              {data.institutionRepresented}
            </span>
          </div>
        )}

        {/* Tira de Contacto y Ubicación (Procedencia adaptable en 2 filas sin cortes) */}
        <div className="carnet-contact-strip">
          {data.phone && (
            <div className="carnet-phone-block">
              <div className="carnet-phone-icon-box" style={{ background: theme.badgeBg, borderColor: theme.borderColor, color: theme.accentColor }}>
                📱
              </div>
              <div className="carnet-phone-texts">
                <span className="carnet-field-label" style={{ color: theme.subtextColor, fontSize: '0.52rem' }}>TELÉFONO</span>
                <span className="carnet-phone-number" style={{ color: theme.textColor }}>
                  {formatPhoneString(data.phone)}
                </span>
              </div>
            </div>
          )}

          {data.departmentMunicipality && (
            <div className="carnet-location-block">
              <span className="carnet-field-label" style={{ color: theme.subtextColor, fontSize: '0.52rem' }}>PROCEDENCIA</span>
              <span className="carnet-location-value" style={{ color: theme.textColor }}>
                📍 {data.departmentMunicipality}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 4. Pie del Carnet con Marca y Sello de Seguridad */}
      <footer className="carnet-footer-bottom">
        <span className="carnet-footer-brand" style={{ color: theme.accentColor }}>volckan.com</span>
        <span className="carnet-footer-serial" style={{ color: theme.subtextColor }}>◈ OFICIAL CR80 ◈</span>
      </footer>
    </div>
  );
};

const VerticalBackCardContent: React.FC<{ data: CarnetCardData; theme: CarnetTheme; qrDataUrl: string }> = ({
  data,
  theme,
  qrDataUrl
}) => {
  return (
    <div className="carnet-v-back-inner">
      {/* Ranura Superior para Cinta */}
      <div className="carnet-lanyard-slot-wrap">
        <div className="carnet-lanyard-slot" title="Ranura para cinta"></div>
      </div>

      {/* Banda Magnética */}
      <div className="carnet-v-magstripe" />

      {/* QR de Acceso y Validación Oficial */}
      <div className="carnet-v-qr-cluster">
        <div className="carnet-v-qr-large-box" style={{ borderColor: theme.accentColor }}>
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="QR Verificación" className="carnet-v-qr-img" />
          ) : (
            <div style={{ fontSize: '0.65rem', color: '#666' }}>Cargando QR...</div>
          )}
        </div>
        <span className="carnet-v-qr-caption" style={{ color: theme.accentColor }}>
          ESCANEAR PARA VALIDAR ACCESO
        </span>
      </div>

      {/* Rejilla de Zonas Habilitadas del Evento */}
      <div className="carnet-v-zones-grid">
        <span className="carnet-v-zone-pill" style={{ color: theme.textColor }}>CONFERENCIA</span>
        <span className="carnet-v-zone-pill" style={{ color: theme.textColor }}>PANELES</span>
        <span className="carnet-v-zone-pill active" style={{ color: theme.accentColor, borderColor: theme.accentColor }}>NETWORKING</span>
      </div>

      {/* Normativa y Aviso Legal Oficial */}
      <div className="carnet-v-back-rules">
        <strong style={{ color: theme.textColor }}>CREDENCIAL PERSONAL E INTRANSFERIBLE</strong>
        <p style={{ color: theme.subtextColor }}>
          Pase oficial emitido para {data.institutionName || 'la entidad organizadora'}. Su portación es obligatoria para el acceso a salones y actividades de la conferencia.
        </p>
      </div>

      {/* Resumen del Titular (Sin DPI) */}
      <div className="carnet-v-back-summary" style={{ color: theme.textColor }}>
        <div style={{ fontWeight: 800, color: theme.accentColor, fontSize: '0.74rem' }}>{data.fullName || 'TITULAR'}</div>
        {data.phone && <div style={{ fontSize: '0.64rem' }}>TEL: {formatPhoneString(data.phone)}</div>}
        {data.institutionRepresented && <div style={{ fontSize: '0.64rem' }}>ENTIDAD: {data.institutionRepresented}</div>}
      </div>

      {/* Pie del Reverso */}
      <footer className="carnet-v-back-footer">
        <span style={{ color: theme.accentColor, fontWeight: 800 }}>volckan.com</span>
        <span style={{ color: theme.subtextColor }}>VERIFICACIÓN OFICIAL</span>
      </footer>
    </div>
  );
};

// ============================================================================
// DISEÑO HORIZONTAL CLÁSICO CR80 (85.60mm x 53.98mm)
// ============================================================================

// Contenido del Frente Comercial y de Conferencia
const FrontCardContent: React.FC<{ data: CarnetCardData; theme: CarnetTheme }> = ({ data, theme }) => {
  return (
    <div className="carnet-card-inner">
      {/* Cabecera: Logo y Nombre de Conferencia / Empresa Emisora */}
      <div className="carnet-header" style={{ background: theme.headerBg }}>
        <div className="carnet-brand-group">
          {data.logoUrl ? (
            <img src={data.logoUrl} alt="Logo" className="carnet-header-logo" />
          ) : (
            <div className="carnet-header-logo-placeholder" style={{ background: theme.badgeBg, color: theme.accentColor }}>
              <span>⚡</span>
            </div>
          )}
          <div className="carnet-brand-titles">
            <span className="carnet-institution-name" style={{ color: theme.textColor }}>
              {data.institutionName || 'Mesa de Competitividad de Quetzaltenango'}
            </span>
            <span className="carnet-subtag" style={{ color: theme.accentColor }}>
              ACREDITACIÓN OFICIAL & CREDENCIAL
            </span>
          </div>
        </div>
      </div>

      {/* Cuerpo Principal del Frente */}
      <div className="carnet-body-front">
        {/* Fotografía de Usuario con Marco Proporción 3:4 */}
        <div className="carnet-photo-frame" style={{ borderColor: theme.accentColor, boxShadow: `0 0 12px ${theme.glowColor}` }}>
          {data.photoUrl ? (
            <img src={data.photoUrl} alt={data.fullName} className="carnet-user-photo" />
          ) : (
            <div className="carnet-user-photo-empty" style={{ background: 'rgba(255,255,255,0.08)', color: theme.subtextColor }}>
              <span className="empty-photo-icon">👤</span>
              <span className="empty-photo-text">Subir Foto</span>
            </div>
          )}
          <span className="photo-verified-seal" title="Identidad Acreditada">✓</span>
        </div>

        {/* Datos Comerciales del Titular */}
        <div className="carnet-user-details">
          {/* Badge con el Teléfono del Titular */}
          {data.phone && (
            <div className="carnet-role-pill" style={{ background: theme.badgeBg, color: theme.badgeText, borderColor: theme.borderColor }}>
              📱 {formatPhoneString(data.phone)}
            </div>
          )}

          <h3 className="carnet-user-name" style={{ color: theme.textColor }}>
            {data.fullName || 'NOMBRE DEL TITULAR'}
          </h3>

          <div className="carnet-meta-grid">
            {data.institutionRepresented && (
              <div className="carnet-meta-item">
                <span className="carnet-meta-label" style={{ color: theme.subtextColor }}>EMPRESA / ENTIDAD</span>
                <span className="carnet-meta-val" style={{ color: theme.textColor }}>
                  {data.institutionRepresented}
                </span>
              </div>
            )}

            {data.departmentMunicipality && (
              <div className="carnet-meta-item">
                <span className="carnet-meta-label" style={{ color: theme.subtextColor }}>PROCEDENCIA</span>
                <span className="carnet-meta-val" style={{ color: theme.accentColor }}>
                  📍 {data.departmentMunicipality}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pie del Frente con Patrón de Seguridad */}
      <div className="carnet-footer-front">
        <div className="carnet-security-strip" />
        <div className="carnet-footer-labels">
          <span className="security-tag" style={{ color: theme.subtextColor, fontWeight: 700 }}>volckan.com</span>
          <span className="security-hologram" style={{ color: theme.accentColor }}>◈ ◈ OFICIAL ◈ ◈</span>
        </div>
      </div>
    </div>
  );
};

// Contenido del Reverso Comercial (Sin datos médicos)
const BackCardContent: React.FC<{ data: CarnetCardData; theme: CarnetTheme; qrDataUrl: string }> = ({
  data,
  theme,
  qrDataUrl
}) => {
  return (
    <div className="carnet-card-inner back-inner">
      {/* Banda Magnética Superior Decorativa */}
      <div className="carnet-magstripe" />

      {/* Cuerpo del Reverso */}
      <div className="carnet-body-back">
        {/* Contenedor del QR de Acceso y Validación */}
        <div className="carnet-qr-container">
          <div className="carnet-qr-box" style={{ borderColor: theme.accentColor }}>
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="Código QR de Verificación" className="carnet-qr-code-img" />
            ) : (
              <div className="carnet-qr-loading">Cargando QR...</div>
            )}
          </div>
          <span className="carnet-qr-caption" style={{ color: theme.accentColor }}>
            ESCANEAR PARA VALIDAR ACCESO
          </span>
        </div>

        {/* Datos Comerciales y de Contacto */}
        <div className="carnet-emergency-details">
          <div className="carnet-commercial-badge" style={{ background: theme.badgeBg, borderColor: theme.borderColor }}>
            <span className="badge-bullet">🎟️</span>
            <span className="badge-text" style={{ color: theme.badgeText }}>PASE OFICIAL DE ACCESO</span>
          </div>

          <div style={{ fontWeight: 800, color: theme.textColor, fontSize: '0.85rem' }}>
            {data.fullName || 'TITULAR'}
          </div>

          {data.phone && (
            <div className="carnet-emergency-item">
              <span className="em-label" style={{ color: theme.subtextColor }}>TELÉFONO REGISTRADO:</span>
              <span className="em-val" style={{ color: theme.accentColor, fontWeight: 700 }}>
                {formatPhoneString(data.phone)}
              </span>
            </div>
          )}

          {data.institutionRepresented && (
            <div className="carnet-emergency-item">
              <span className="em-label" style={{ color: theme.subtextColor }}>EMPRESA / INSTITUCIÓN:</span>
              <span className="em-val" style={{ color: theme.textColor, fontWeight: 700 }}>{data.institutionRepresented}</span>
            </div>
          )}

          {data.departmentMunicipality && (
            <div className="carnet-emergency-item">
              <span className="em-label" style={{ color: theme.subtextColor }}>DEPARTAMENTO / MUNICIPIO:</span>
              <span className="em-val" style={{ color: theme.textColor }}>📍 {data.departmentMunicipality}</span>
            </div>
          )}
        </div>
      </div>

      {/* Términos y Aviso Legal al pie */}
      <div className="carnet-footer-back">
        <p className="carnet-legal-notice" style={{ color: theme.subtextColor }}>
          Credencial personal e intransferible para acceso y acreditación oficial de {data.institutionName || 'la institución emisora'}.
        </p>
        <div className="carnet-back-bar">
          <span className="volckan-seal" style={{ color: theme.accentColor, fontWeight: 700 }}>volckan.com</span>
          <span className="serial-number" style={{ color: theme.subtextColor }}>VERIFICACIÓN OFICIAL</span>
        </div>
      </div>
    </div>
  );
};

export default CarnetCardPreview;
