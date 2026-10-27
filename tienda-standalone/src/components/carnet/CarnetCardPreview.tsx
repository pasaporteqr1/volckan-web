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

  return (
    <div 
      className={`carnet-preview-container ${className}`}
      style={{ transform: scale !== 1 ? `scale(${scale})` : undefined }}
    >
      {side === 'both' ? (
        <div className="carnet-both-sides-wrapper">
          <div className="carnet-single-stage">
            <span className="carnet-side-label">Frente Oficial (Front)</span>
            <div ref={frontRef} className="carnet-card-cr80 front-face" style={{ background: theme.frontBg, borderColor: theme.borderColor }}>
              <FrontCardContent data={data} theme={theme} />
            </div>
          </div>
          <div className="carnet-single-stage">
            <span className="carnet-side-label">Reverso Comercial (Back)</span>
            <div ref={backRef} className="carnet-card-cr80 back-face" style={{ background: theme.backBg, borderColor: theme.borderColor }}>
              <BackCardContent data={data} theme={theme} qrDataUrl={qrDataUrl} />
            </div>
          </div>
        </div>
      ) : (
        <div className="carnet-flip-scene">
          <div 
            className={`carnet-flip-card ${currentSide === 'back' ? 'is-flipped' : ''}`}
            onClick={toggleFlip}
            title={interactiveFlip ? "Haz clic para voltear la credencial (Frente / Reverso)" : undefined}
          >
            {/* Frente */}
            <div 
              ref={frontRef} 
              className="carnet-card-cr80 front-face" 
              style={{ background: theme.frontBg, borderColor: theme.borderColor }}
            >
              <FrontCardContent data={data} theme={theme} />
              {interactiveFlip && (
                <div className="carnet-flip-hint">
                  <span>🔄 Voltear Reverso</span>
                </div>
              )}
            </div>

            {/* Reverso */}
            <div 
              ref={backRef} 
              className="carnet-card-cr80 back-face" 
              style={{ background: theme.backBg, borderColor: theme.borderColor }}
            >
              <BackCardContent data={data} theme={theme} qrDataUrl={qrDataUrl} />
              {interactiveFlip && (
                <div className="carnet-flip-hint">
                  <span>🔄 Voltear Frente</span>
                </div>
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
              {data.institutionName || 'CONGRESO & NETWORKING'}
            </span>
            <span className="carnet-subtag" style={{ color: theme.accentColor }}>
              ACREDITACIÓN OFICIAL & CREDENCIAL
            </span>
          </div>
        </div>
        <div className="carnet-chip-icon" style={{ borderColor: theme.chipColor }}>
          <div className="smart-chip-grid" style={{ borderColor: theme.chipColor }}>
            <span className="chip-line" />
            <span className="chip-line" />
          </div>
          <span className="nfc-symbol">📶</span>
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
          <div className="carnet-role-pill" style={{ background: theme.badgeBg, color: theme.badgeText, borderColor: theme.borderColor }}>
            📱 {formatPhoneString(data.phone)}
          </div>

          <h3 className="carnet-user-name" style={{ color: theme.textColor }}>
            {data.fullName || 'NOMBRE DEL TITULAR'}
          </h3>

          <div className="carnet-meta-grid">
            <div className="carnet-meta-item">
              <span className="carnet-meta-label" style={{ color: theme.subtextColor }}>DPI (13 DÍGITOS)</span>
              <span className="carnet-meta-val" style={{ color: theme.textColor, letterSpacing: '0.04em' }}>
                {formatDpiString(data.idNumber)}
              </span>
            </div>

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
          <span className="security-tag" style={{ color: theme.subtextColor }}>ACREDITACIÓN COMERCIAL · VOLCKAN ID</span>
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

          <div className="carnet-emergency-item">
            <span className="em-label" style={{ color: theme.subtextColor }}>DPI CUI VALIDADO:</span>
            <span className="em-val" style={{ color: theme.textColor, fontFamily: 'monospace' }}>
              {formatDpiString(data.idNumber)}
            </span>
          </div>
        </div>
      </div>

      {/* Términos y Aviso Legal al pie */}
      <div className="carnet-footer-back">
        <p className="carnet-legal-notice" style={{ color: theme.subtextColor }}>
          Credencial personal e intransferible para acceso y acreditación oficial de {data.institutionName || 'la institución emisora'}.
        </p>
        <div className="carnet-back-bar">
          <span className="volckan-seal" style={{ color: theme.accentColor }}>POWERED BY VOLCKAN SMART ID</span>
          <span className="serial-number" style={{ color: theme.subtextColor }}>{formatDpiString(data.idNumber)}</span>
        </div>
      </div>
    </div>
  );
};

export default CarnetCardPreview;
