import React, { useEffect, useState, forwardRef } from 'react';
import type { CarnetTheme } from '../../types/carnet';
import { generateQrDataUrl } from '../../utils/carnetExport';
import './CarnetCardPreview.css';

export interface CarnetCardData {
  fullName: string;
  idNumber: string;
  role: string;
  gradeOrArea?: string;
  bloodType?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  expirationDate?: string;
  allergiesOrNotes?: string;
  photoUrl?: string;
  institutionName: string;
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

  // Generar código QR dinámico cuando cambie el token o ID
  useEffect(() => {
    const qrPayload = data.qrToken || 
      `https://volckan.com/tienda/#/carnet/verify?id=${encodeURIComponent(data.idNumber || 'DEMO')}&name=${encodeURIComponent(data.fullName || 'VOLCKAN')}`;
    generateQrDataUrl(qrPayload).then(url => setQrDataUrl(url));
  }, [data.qrToken, data.idNumber, data.fullName]);

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
            <span className="carnet-side-label">Frente (Front)</span>
            <div ref={frontRef} className="carnet-card-cr80 front-face" style={{ background: theme.frontBg, borderColor: theme.borderColor }}>
              <FrontCardContent data={data} theme={theme} />
            </div>
          </div>
          <div className="carnet-single-stage">
            <span className="carnet-side-label">Reverso (Back)</span>
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
                🪪 Frente
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

// Contenido del Frente
const FrontCardContent: React.FC<{ data: CarnetCardData; theme: CarnetTheme }> = ({ data, theme }) => {
  return (
    <div className="carnet-card-inner">
      {/* Cabecera: Logo y Nombre de Institución */}
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
              {data.institutionName || 'INSTITUCIÓN EMISORA'}
            </span>
            <span className="carnet-subtag" style={{ color: theme.accentColor }}>
              CREDENCIAL OFICIAL INTELIGENTE
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
        {/* Fotografía de Usuario con Marco Holográfico */}
        <div className="carnet-photo-frame" style={{ borderColor: theme.accentColor, boxShadow: `0 0 12px ${theme.glowColor}` }}>
          {data.photoUrl ? (
            <img src={data.photoUrl} alt={data.fullName} className="carnet-user-photo" />
          ) : (
            <div className="carnet-user-photo-empty" style={{ background: 'rgba(255,255,255,0.08)', color: theme.subtextColor }}>
              <span className="empty-photo-icon">👤</span>
              <span className="empty-photo-text">Subir Foto</span>
            </div>
          )}
          <span className="photo-verified-seal" title="Identidad Verificada">✓</span>
        </div>

        {/* Datos del Titular */}
        <div className="carnet-user-details">
          <div className="carnet-role-pill" style={{ background: theme.badgeBg, color: theme.badgeText, borderColor: theme.borderColor }}>
            {data.role || 'MIEMBRO REGISTRADO'}
          </div>

          <h3 className="carnet-user-name" style={{ color: theme.textColor }}>
            {data.fullName || 'NOMBRE COMPLETO'}
          </h3>

          <div className="carnet-meta-grid">
            <div className="carnet-meta-item">
              <span className="carnet-meta-label" style={{ color: theme.subtextColor }}>ID / DPI / CÓDIGO</span>
              <span className="carnet-meta-val" style={{ color: theme.textColor }}>
                {data.idNumber || 'ID-00000000'}
              </span>
            </div>

            {data.gradeOrArea && (
              <div className="carnet-meta-item">
                <span className="carnet-meta-label" style={{ color: theme.subtextColor }}>ÁREA / GRADO</span>
                <span className="carnet-meta-val" style={{ color: theme.textColor }}>
                  {data.gradeOrArea}
                </span>
              </div>
            )}

            <div className="carnet-meta-item">
              <span className="carnet-meta-label" style={{ color: theme.subtextColor }}>VIGENCIA</span>
              <span className="carnet-meta-val" style={{ color: theme.accentColor }}>
                {data.expirationDate || '2025 - 2026'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pie del Frente con Patrón de Seguridad */}
      <div className="carnet-footer-front">
        <div className="carnet-security-strip" />
        <div className="carnet-footer-labels">
          <span className="security-tag" style={{ color: theme.subtextColor }}>SECURE SMARTPASS · VOLCKAN ID</span>
          <span className="security-hologram" style={{ color: theme.accentColor }}>◈ ◈ BIOMETRIC ◈ ◈</span>
        </div>
      </div>
    </div>
  );
};

// Contenido del Reverso
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
        {/* Contenedor del QR de Acceso / SOS */}
        <div className="carnet-qr-container">
          <div className="carnet-qr-box" style={{ borderColor: theme.accentColor }}>
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="Código QR de Verificación" className="carnet-qr-code-img" />
            ) : (
              <div className="carnet-qr-loading">Cargando QR...</div>
            )}
          </div>
          <span className="carnet-qr-caption" style={{ color: theme.accentColor }}>
            ESCANEAR PARA VALIDAR O SOS
          </span>
        </div>

        {/* Datos de Emergencia y Contacto */}
        <div className="carnet-emergency-details">
          {data.bloodType && (
            <div className="carnet-blood-badge" style={{ background: theme.badgeBg, borderColor: theme.borderColor }}>
              <span className="blood-icon">🩸</span>
              <span className="blood-label" style={{ color: theme.subtextColor }}>TIPO DE SANGRE:</span>
              <strong className="blood-val" style={{ color: theme.accentColor }}>{data.bloodType}</strong>
            </div>
          )}

          {data.emergencyContact && (
            <div className="carnet-emergency-item">
              <span className="em-label" style={{ color: theme.subtextColor }}>CONTACTO SOS:</span>
              <span className="em-val" style={{ color: theme.textColor }}>{data.emergencyContact}</span>
            </div>
          )}

            {data.emergencyPhone && (
            <div className="carnet-emergency-item">
              <span className="em-label" style={{ color: theme.subtextColor }}>TEL. EMERGENCIA:</span>
              <span className="em-val" style={{ color: theme.accentColor }}>📞 {data.emergencyPhone}</span>
            </div>
          )}

          {data.allergiesOrNotes && (
            <div className="carnet-emergency-item">
              <span className="em-label" style={{ color: theme.subtextColor }}>OBSERVACIONES / ALERGIAS:</span>
              <span className="em-val notes-truncate" style={{ color: theme.textColor }}>{data.allergiesOrNotes}</span>
            </div>
          )}
        </div>
      </div>

      {/* Términos y Aviso Legal al pie */}
      <div className="carnet-footer-back">
        <p className="carnet-legal-notice" style={{ color: theme.subtextColor }}>
          Esta credencial es propiedad de {data.institutionName || 'la institución emisora'}. Es personal, intransferible y de porte obligatorio. En caso de emergencia o extravío favor comunicarse a los números registrados.
        </p>
        <div className="carnet-back-bar">
          <span className="volckan-seal" style={{ color: theme.accentColor }}>POWERED BY VOLCKAN SMART ID</span>
          <span className="serial-number" style={{ color: theme.subtextColor }}>{data.idNumber || 'CR80-STD'}</span>
        </div>
      </div>
    </div>
  );
};

export default CarnetCardPreview;
