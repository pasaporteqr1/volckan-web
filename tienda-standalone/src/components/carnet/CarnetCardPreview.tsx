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
// ============================================================================

const VerticalFrontCardContent: React.FC<{ data: CarnetCardData; theme: CarnetTheme }> = ({ data, theme }) => {
  return (
    <div className="carnet-vertical-inner">
      {/* Cabecera Vertical: Logo Institucional Prominente + Institución Emisora */}
      <div className="carnet-v-header" style={{ background: theme.headerBg }}>
        <div className="carnet-v-brand">
          {data.logoUrl ? (
            <img src={data.logoUrl} alt="Logo Institucional" className="carnet-v-logo" />
          ) : (
            <div className="carnet-v-logo-fallback" style={{ background: theme.badgeBg, color: theme.accentColor }}>
              <span>🏛️</span>
            </div>
          )}
          <div className="carnet-v-titles">
            <span className="carnet-v-inst-name" style={{ color: theme.textColor }}>
              {data.institutionName || 'Mesa de Competitividad'}
            </span>
            <span className="carnet-v-subtag" style={{ color: theme.accentColor }}>
              ACREDITACIÓN OFICIAL & CREDENCIAL
            </span>
          </div>
        </div>
      </div>

      {/* Bloque Fotográfico Vertical Proporción 3:4 */}
      <div className="carnet-v-photo-cluster">
        <div className="carnet-v-photo-frame" style={{ borderColor: theme.accentColor, boxShadow: `0 0 16px ${theme.glowColor}` }}>
          {data.photoUrl ? (
            <img src={data.photoUrl} alt={data.fullName} className="carnet-v-user-photo" />
          ) : (
            <div className="carnet-v-photo-empty" style={{ color: theme.subtextColor }}>
              <span style={{ fontSize: '1.4rem' }}>👤</span>
              <span>Fotografía</span>
            </div>
          )}
          <span className="carnet-v-verified-seal" title="Identidad Verificada">✓</span>
        </div>
      </div>

      {/* Jerarquía de Identidad del Titular */}
      <div className="carnet-v-identity">
        {data.phone && (
          <div className="carnet-v-role-badge" style={{ background: theme.badgeBg, color: theme.badgeText, borderColor: theme.borderColor }}>
            📱 {formatPhoneString(data.phone)}
          </div>
        )}

        <h3 className="carnet-v-name" style={{ color: theme.textColor }}>
          {data.fullName || 'NOMBRE DEL TITULAR'}
        </h3>

        {data.institutionRepresented && (
          <div className="carnet-v-org" style={{ color: theme.accentColor }}>
            🏢 {data.institutionRepresented}
          </div>
        )}

        {data.departmentMunicipality && (
          <div className="carnet-v-loc" style={{ color: theme.subtextColor }}>
            📍 {data.departmentMunicipality}
          </div>
        )}
      </div>

      {/* Pie de Seguridad y Marca Oficial */}
      <div className="carnet-v-footer" style={{ color: theme.subtextColor }}>
        <span style={{ fontWeight: 800, letterSpacing: '0.04em' }}>volckan.com</span>
        <span style={{ color: theme.accentColor }}>◈ OFICIAL CR80 ◈</span>
      </div>
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
      <div className="carnet-v-magstripe" />

      {/* Bloque QR Central */}
      <div className="carnet-v-qr-cluster">
        <div className="carnet-v-qr-box" style={{ borderColor: theme.accentColor }}>
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="QR Verificación" className="carnet-v-qr-img" />
          ) : (
            <div style={{ fontSize: '0.65rem', color: '#666' }}>Cargando...</div>
          )}
        </div>
        <span className="carnet-v-qr-caption" style={{ color: theme.accentColor }}>
          ESCANEAR PARA VALIDAR ACCESO
        </span>
      </div>

      {/* Datos Clave Resumen (Sin DPI) */}
      <div className="carnet-v-back-details" style={{ color: theme.textColor }}>
        <div style={{ fontWeight: 800, color: theme.accentColor, fontSize: '0.74rem' }}>
          {data.fullName || 'TITULAR'}
        </div>
        {data.phone && <div><span>TEL:</span> <strong>{formatPhoneString(data.phone)}</strong></div>}
        {data.institutionRepresented && <div><span>ENTIDAD:</span> <strong>{data.institutionRepresented}</strong></div>}
        {data.departmentMunicipality && <div><span>PROCEDENCIA:</span> <strong>{data.departmentMunicipality}</strong></div>}
      </div>

      <p className="carnet-v-back-notice" style={{ color: theme.subtextColor }}>
        Credencial oficial de acceso y acreditación para {data.institutionName || 'la entidad emisora'}. Su portación es personal e intransferible.
      </p>

      <div className="carnet-v-back-footer">
        <span style={{ color: theme.accentColor, fontWeight: 800 }}>volckan.com</span>
        <span style={{ color: theme.subtextColor }}>VERIFICACIÓN OFICIAL</span>
      </div>
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
