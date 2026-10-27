import React, { useState, useRef, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StoreTopBar from '../components/StoreTopBar';
import CarnetCardPreview, { type CarnetCardData, formatDpiString } from '../components/carnet/CarnetCardPreview';
import PhotoCropModal from '../components/carnet/PhotoCropModal';
import { CARNET_THEMES } from '../data/carnetThemes';
import { useStoreConfig } from '../context/StoreConfigContext';
import { uploadCarnetPhoto } from '../utils/imageUpload';
import { 
  exportSingleCarnetPdf, 
  captureElementToPng, 
  downloadImage 
} from '../utils/carnetExport';
import { soundEffects } from '../utils/soundEffects';
import type { CarnetSubmission, CarnetTheme } from '../types/carnet';
import './CarnetServicePage.css';

const CONFERENCE_ROLE_SUGGESTIONS = [
  'Conferencista / Speaker',
  'Delegado / Asistente VIP',
  'Empresario / Ejecutivo',
  'Expositor / Stand Comercial',
  'Prensa / Cobertura de Medios',
  'Organizador / Comité Staff',
  'Invitado Especial'
];

const GUATEMALA_DEPARTAMENTOS = [
  'Guatemala (Ciudad Capital)',
  'Sacatepéquez (Antigua Guatemala)',
  'Quetzaltenango',
  'Escuintla',
  'Chimaltenango',
  'Alta Verapaz (Cobán)',
  'Baja Verapaz (Salamá)',
  'Huehuetenango',
  'San Marcos',
  'Petén (Flores)',
  'Izabal (Puerto Barrios)',
  'Zacapa',
  'Chiquimula',
  'Jalapa',
  'Jutiapa',
  'Santa Rosa',
  'Retalhuleu',
  'Suchitepéquez (Mazatenango)',
  'Sololá (Panajachel)',
  'Totonicapán',
  'Quiché (Santa Cruz)',
  'El Progreso (Guastatoya)',
  'Internacional / Extranjero'
];

export default function CarnetServicePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { carnetConfig, saveCarnetSubmission, storeConfig } = useStoreConfig();

  // Referencias para captura de PNG y PDF
  const frontRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Estados del Formulario Comercial y de Conferencia
  const [fullName, setFullName] = useState<string>('');
  const [idNumber, setIdNumber] = useState<string>(''); // Exactamente 13 dígitos numéricos
  const [role, setRole] = useState<string>('Delegado / Asistente VIP');
  const [institutionRepresented, setInstitutionRepresented] = useState<string>('');
  const [departmentMunicipality, setDepartmentMunicipality] = useState<string>('Guatemala (Ciudad Capital)');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [selectedThemeId, setSelectedThemeId] = useState<string>(carnetConfig.defaultThemeId || 'volckan-cyber');

  // Estados del Modal de Encuadre Fotográfico tipo Red Social
  const [isCropModalOpen, setIsCropModalOpen] = useState<boolean>(false);
  const [rawImageSrcForCrop, setRawImageSrcForCrop] = useState<string>('');

  // Estados de proceso y éxito
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<CarnetSubmission | null>(null);
  const [exportingType, setExportingType] = useState<'png' | 'pdf' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Tema activo
  const currentTheme = useMemo<CarnetTheme>(() => {
    return CARNET_THEMES.find(t => t.id === selectedThemeId) || CARNET_THEMES[0];
  }, [selectedThemeId]);

  // Manejo estricto de DPI con exactamente 13 dígitos
  const cleanDpi = idNumber.replace(/\D/g, '');
  const isDpiValid = cleanDpi.length === 13;

  const handleDpiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digitsOnly = raw.replace(/\D/g, '').slice(0, 13);
    setIdNumber(digitsOnly);
  };

  // Datos en vivo para la vista previa 3D
  const previewData: CarnetCardData = useMemo(() => {
    return {
      fullName: fullName.trim() || 'NOMBRE DEL ASISTENTE',
      idNumber: cleanDpi || '0000000000000',
      role: role.trim() || 'ASISTENTE VIP',
      institutionRepresented: institutionRepresented.trim() || undefined,
      departmentMunicipality: departmentMunicipality.trim() || undefined,
      photoUrl: photoUrl || undefined,
      institutionName: carnetConfig.institutionName || 'VOLCKAN SUMMIT & NETWORKING',
      logoUrl: carnetConfig.logoUrl || undefined,
      qrToken: `VOLCKAN-CONF-${cleanDpi || 'PASS'}-${Date.now().toString().slice(-4)}`
    };
  }, [fullName, cleanDpi, role, institutionRepresented, departmentMunicipality, photoUrl, carnetConfig]);

  // Manejo de selección inicial de foto: abre el modal de encuadre social
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (JPG, PNG o WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const src = evt.target?.result as string;
      if (src) {
        setRawImageSrcForCrop(src);
        setIsCropModalOpen(true);
        soundEffects.playClick();
      }
    };
    reader.readAsDataURL(file);

    // Reset input para permitir seleccionar la misma foto si se desea
    e.target.value = '';
  };

  // Callback al confirmar el encuadre y recorte
  const handleCropComplete = ({ dataUrl, file }: { dataUrl: string; file: File }) => {
    setPhotoUrl(dataUrl);
    setPhotoFile(file);
    setIsCropModalOpen(false);
    soundEffects.playSuccess();
  };

  // Validación y Envío del Formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('Por favor ingresa tu nombre completo.');
      return;
    }

    if (carnetConfig.fields.requireIdNumber && !isDpiValid) {
      setErrorMessage(`El DPI debe tener exactamente 13 dígitos numéricos. Has ingresado ${cleanDpi.length} de 13 dígitos.`);
      return;
    }

    if (carnetConfig.fields.requirePhoto && !photoUrl) {
      setErrorMessage('Es obligatorio subir y encuadrar una fotografía para tu credencial oficial.');
      return;
    }

    setIsSubmitting(true);
    soundEffects.playClick();

    try {
      const submissionId = `carnet-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      let finalPhotoUrl = photoUrl || '';
      let photoStoragePath: string | undefined = undefined;

      // Subir imagen encuadrada a Firebase Storage
      if (photoFile) {
        try {
          const uploadRes = await uploadCarnetPhoto(photoFile, submissionId);
          finalPhotoUrl = uploadRes.url;
          photoStoragePath = uploadRes.storagePath;
        } catch (uploadErr) {
          console.warn('[CarnetServicePage] Fallback a Base64 local para foto:', uploadErr);
        }
      }

      const submission: CarnetSubmission = {
        id: submissionId,
        formId: carnetConfig.id || 'form-carnets-principal',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        schemaVersion: 2, // Versión 2: comercial y conferencias
        fullName: fullName.trim(),
        idNumber: cleanDpi,
        role: role.trim(),
        institutionRepresented: institutionRepresented.trim() || undefined,
        departmentMunicipality: departmentMunicipality.trim() || undefined,
        photoUrl: finalPhotoUrl,
        photoStoragePath,
        themeId: selectedThemeId,
        themeSnapshot: currentTheme, // Congela la paleta y diseño exactos al momento de emisión
        qrToken: `https://volckan.com/tienda/#/carnet/verify?id=${encodeURIComponent(cleanDpi)}`,
        status: 'pendiente',
        institutionName: carnetConfig.institutionName
      };

      await saveCarnetSubmission(submission);
      setSubmittedData(submission);
      setIsSuccessModalOpen(true);
      soundEffects.playSuccessFanfare();
    } catch (err) {
      console.error('Error guardando credencial comercial:', err);
      setErrorMessage('No se pudo enviar la solicitud. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Descargar Carnet Digital en PNG
  const handleDownloadDigitalPng = async () => {
    if (!frontRef.current) return;
    setExportingType('png');
    soundEffects.playClick();
    try {
      const pngData = await captureElementToPng(frontRef.current);
      downloadImage(pngData, `Credencial_Conferencia_${previewData.fullName.replace(/\s+/g, '_')}.png`);
      soundEffects.playSuccess();
    } catch (err) {
      console.error('Error exportando PNG:', err);
      alert('Hubo un problema al exportar la imagen.');
    } finally {
      setExportingType(null);
    }
  };

  // Descargar Carnet Imprimible en PDF (CR80)
  const handleDownloadPdf = async () => {
    if (!frontRef.current || !backRef.current || !submittedData) return;
    setExportingType('pdf');
    soundEffects.playClick();
    try {
      await exportSingleCarnetPdf(frontRef.current, backRef.current, submittedData);
      soundEffects.playSuccess();
    } catch (err) {
      console.error('Error exportando PDF:', err);
      alert('Hubo un problema al exportar el PDF.');
    } finally {
      setExportingType(null);
    }
  };

  // Enviar confirmación comercial a WhatsApp
  const handleShareToWhatsApp = () => {
    const phone = carnetConfig.supportPhone || storeConfig.whatsappPhone || '50246741239';
    const text = [
      `¡Hola ${carnetConfig.institutionName}! 👋`,
      `He completado mi registro de acreditación para la conferencia / evento comercial:`,
      `🪪 *Nombre:* ${fullName}`,
      `🆔 *DPI:* ${formatDpiString(cleanDpi)}`,
      `🏷️ *Rol / Cargo:* ${role}`,
      institutionRepresented ? `🏢 *Empresa / Institución:* ${institutionRepresented}` : '',
      departmentMunicipality ? `📍 *Procedencia:* ${departmentMunicipality}` : '',
      `📅 *Fecha de Registro:* ${new Date().toLocaleDateString()}`,
      '',
      `Agradezco la confirmación e impresión de mi carnet PVC oficial. ¡Muchas gracias!`
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="carnet-page-root animate-fade-in">
      <StoreTopBar slogan="Acreditación Oficial de Conferencias & Credenciales Comerciales con QR" />

      {/* Hero Header de la Página */}
      <section className="carnet-hero-banner">
        <div className="carnet-hero-container">
          <div className="carnet-hero-badge">
            <span>🎟️</span> PLATAFORMA DE ACREDITACIÓN & CREDENCIALES VOLCKAN
          </div>
          <h1 className="carnet-hero-title">
            {carnetConfig.title || 'Acreditación Oficial & Credenciales de Conferencia'}
          </h1>
          <p className="carnet-hero-subtitle">
            {carnetConfig.subtitle || 'Ingresa tus datos profesionales, encuadra tu fotografía oficial y genera tu credencial digital y carnet imprimible CR80 con código QR.'}
          </p>
          <div className="carnet-institution-pill">
            <span className="inst-icon">🏛️</span>
            <span>Evento / Anfitrión: <strong>{carnetConfig.institutionName || 'Volckan Summit'}</strong></span>
          </div>
        </div>
      </section>

      {/* Contenedor Principal: Vista Previa 3D + Formulario */}
      <main className="carnet-main-layout">
        {/* Columna Izquierda: Vista Previa Interactiva */}
        <aside className="carnet-preview-sticky-col">
          <div className="preview-card-wrapper">
            <div className="preview-header-bar">
              <span className="live-indicator"><span className="pulse-dot" /> VISTA PREVIA EN VIVO</span>
              <span className="cr80-tag">FORMATO CR80 COMERCIAL</span>
            </div>

            <CarnetCardPreview
              data={previewData}
              theme={currentTheme}
              frontRef={frontRef}
              backRef={backRef}
              interactiveFlip={true}
            />

            <div className="preview-tip-box">
              <span className="tip-icon">💡</span>
              <p>
                Haz clic sobre la credencial para voltearla. El frente contiene tus datos de acreditación y el reverso tu pase digital con código QR.
              </p>
            </div>
          </div>
        </aside>

        {/* Columna Derecha: Formulario de Registro */}
        <section className="carnet-form-col">
          <form className="carnet-form-card" onSubmit={handleSubmit}>
            <div className="carnet-form-header">
              <h2>Formulario de Acreditación Oficial</h2>
              <p>Todos los datos se verificarán al ingresar a las conferencias y eventos.</p>
            </div>

            {errorMessage && (
              <div className="carnet-error-banner animate-shake">
                <span>⚠️</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* SECCIÓN 1: Fotografía con Encuadre Profesional tipo Red Social */}
            <div className="carnet-upload-hero-box">
              <div className="upload-hero-avatar-wrap">
                {photoUrl ? (
                  <img src={photoUrl} alt="Fotografía Oficial" className="avatar-preview-img" />
                ) : (
                  <div className="avatar-placeholder">
                    <span>👤</span>
                    <small>Sin Foto</small>
                  </div>
                )}
              </div>

              <div className="upload-hero-content">
                <h4>Fotografía del Titular (Proporción 3:4)</h4>
                <p>
                  Sube tu foto y utiliza nuestro encuadre interactivo para recortarla centrada y con calidad profesional.
                </p>

                <div className="upload-actions-cluster">
                  <button
                    type="button"
                    className="btn-upload-photo"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span>📷</span> {photoUrl ? 'Cambiar / Re-encuadrar Foto' : 'Subir Fotografía'}
                  </button>

                  {photoUrl && rawImageSrcForCrop && (
                    <button
                      type="button"
                      className="btn-reframe-photo"
                      onClick={() => setIsCropModalOpen(true)}
                    >
                      <span>✂️</span> Reajustar Encuadre
                    </button>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoSelect}
                  accept="image/png,image/jpeg,image/webp,image/jpg"
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            {/* SECCIÓN 2: Selector de Fondo de Portada */}
            {carnetConfig.allowUserThemeSelection && (
              <div className="carnet-theme-selector-block">
                <label className="field-label">
                  <span>🎨</span> Selecciona el Estilo de Portada para tu Credencial
                </label>
                <div className="theme-chips-grid">
                  {CARNET_THEMES.filter(t => carnetConfig.allowedThemes?.includes(t.id) ?? true).map(th => {
                    const isSelected = selectedThemeId === th.id;
                    return (
                      <button
                        key={th.id}
                        type="button"
                        className={`theme-chip-btn ${isSelected ? 'active' : ''}`}
                        onClick={() => {
                          soundEffects.playClick();
                          setSelectedThemeId(th.id);
                        }}
                      >
                        <span 
                          className="theme-chip-swatch" 
                          style={{ background: th.frontBg, borderColor: th.accentColor }} 
                        />
                        <div className="theme-chip-info">
                          <span className="theme-chip-title">{th.name}</span>
                          <span className="theme-chip-desc">{th.description}</span>
                        </div>
                        {isSelected && <span className="theme-selected-mark">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SECCIÓN 3: Datos de Acreditación y Procedencia */}
            <div className="form-sub-header">
              <h4><span>🪪</span> Información del Asistente / Titular</h4>
              <p>Datos impresos en el frente oficial de la tarjeta PVC y asociados al código QR.</p>
            </div>

            <div className="form-fields-grid">
              {/* Nombre Completo */}
              <div className="carnet-input-group full-width">
                <label className="field-label">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Lic. Carlos Roberto Méndez Morales"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="carnet-input"
                />
              </div>

              {/* DPI de exactamente 13 dígitos */}
              <div className="carnet-input-group">
                <label className="field-label">
                  <span>DPI / CUI Oficial (13 dígitos numéricos) *</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={15}
                  placeholder="Ej: 2948 12345 0101"
                  value={formatDpiString(cleanDpi)}
                  onChange={handleDpiChange}
                  className={`carnet-input ${cleanDpi.length > 0 && !isDpiValid ? 'input-warning' : ''}`}
                />
                <div className="dpi-validation-helper">
                  <span className={isDpiValid ? 'dpi-valid' : 'dpi-pending'}>
                    {isDpiValid 
                      ? '✓ DPI de 13 dígitos completado' 
                      : `Faltan dígitos: ${cleanDpi.length} de 13`}
                  </span>
                </div>
              </div>

              {/* Rol / Acreditación */}
              <div className="carnet-input-group">
                <label className="field-label">Cargo o Tipo de Acreditación *</label>
                <input
                  type="text"
                  required
                  list="conference-roles-list"
                  placeholder="Ej: Conferencista, Delegado VIP..."
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="carnet-input"
                />
                <datalist id="conference-roles-list">
                  {CONFERENCE_ROLE_SUGGESTIONS.map(r => <option key={r} value={r} />)}
                </datalist>
              </div>

              {/* Institución o Empresa que Representa */}
              <div className="carnet-input-group">
                <label className="field-label">Institución o Empresa a la que Representa *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Banco Continental, CMI, Universidad..."
                  value={institutionRepresented}
                  onChange={(e) => setInstitutionRepresented(e.target.value)}
                  className="carnet-input"
                />
              </div>

              {/* Departamento / Municipio de Procedencia */}
              <div className="carnet-input-group">
                <label className="field-label">Departamento / Municipio de Procedencia *</label>
                <input
                  type="text"
                  required
                  list="departamentos-list"
                  placeholder="Ej: Guatemala (Ciudad Capital) o Quetzaltenango"
                  value={departmentMunicipality}
                  onChange={(e) => setDepartmentMunicipality(e.target.value)}
                  className="carnet-input"
                />
                <datalist id="departamentos-list">
                  {GUATEMALA_DEPARTAMENTOS.map(d => <option key={d} value={d} />)}
                </datalist>
              </div>
            </div>

            {/* Aviso de Entrega */}
            <div className="carnet-delivery-note">
              <span className="delivery-icon">🚚</span>
              <div>
                <strong>Acreditación & Entrega de Credencial:</strong>
                <p>
                  {carnetConfig.deliveryNotes || 'Tu credencial digital con código QR de acceso estará lista inmediatamente al enviar este formulario. La credencial física en PVC se entregará en la recepción del evento.'}
                </p>
              </div>
            </div>

            {/* Botón Principal de Envío */}
            <div className="carnet-form-submit-row">
              <button
                type="submit"
                className="btn-submit-carnet"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="btn-spinner-content">
                    <span className="spinner-circle" /> Procesando y Generando Credencial...
                  </span>
                ) : (
                  <span>🚀 Emitir Credencial Oficial de Conferencia</span>
                )}
              </button>
            </div>
          </form>
        </section>
      </main>

      {/* Modal Interactivo de Encuadre y Recorte tipo Red Social */}
      <PhotoCropModal
        isOpen={isCropModalOpen}
        imageSrc={rawImageSrcForCrop}
        onCropComplete={handleCropComplete}
        onCancel={() => setIsCropModalOpen(false)}
      />

      {/* Modal de Éxito con Descargas y QR */}
      {isSuccessModalOpen && submittedData && (
        <div className="carnet-modal-overlay animate-fade-in">
          <div className="carnet-success-modal">
            <div className="modal-top-badge">
              <span>🎉</span> REGISTRO COMPLETADO EXITOSAMENTE
            </div>

            <h2 className="modal-title">¡Tu Credencial ha sido Generada!</h2>
            <p className="modal-desc">
              Hola <strong>{submittedData.fullName}</strong>, tu registro comercial ha sido procesado de forma segura en los servidores de Volckan.
            </p>

            <div className="modal-card-display">
              <CarnetCardPreview
                data={{
                  fullName: submittedData.fullName,
                  idNumber: submittedData.idNumber,
                  role: submittedData.role,
                  institutionRepresented: submittedData.institutionRepresented,
                  departmentMunicipality: submittedData.departmentMunicipality,
                  photoUrl: submittedData.photoUrl,
                  institutionName: submittedData.institutionName || carnetConfig.institutionName,
                  logoUrl: carnetConfig.logoUrl,
                  qrToken: submittedData.qrToken
                }}
                theme={currentTheme}
                interactiveFlip={true}
                scale={0.92}
              />
            </div>

            <div className="modal-download-actions">
              <button
                type="button"
                className="btn-modal-download png"
                onClick={handleDownloadDigitalPng}
                disabled={exportingType !== null}
              >
                {exportingType === 'png' ? '⏳ Exportando...' : '📥 Descargar Pase Digital (PNG)'}
              </button>

              <button
                type="button"
                className="btn-modal-download pdf"
                onClick={handleDownloadPdf}
                disabled={exportingType !== null}
              >
                {exportingType === 'pdf' ? '⏳ Generando...' : '🖨️ Descargar Carnet Imprimible (PDF CR80)'}
              </button>

              <button
                type="button"
                className="btn-modal-whatsapp"
                onClick={handleShareToWhatsApp}
              >
                💬 Confirmar Acreditación por WhatsApp
              </button>
            </div>

            <button
              type="button"
              className="btn-modal-close"
              onClick={() => setIsSuccessModalOpen(false)}
            >
              Cerrar Ventana
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
