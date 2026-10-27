import React, { useState, useRef, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StoreTopBar from '../components/StoreTopBar';
import CarnetCardPreview, { type CarnetCardData } from '../components/carnet/CarnetCardPreview';
import { CARNET_THEMES } from '../data/carnetThemes';
import { useStoreConfig } from '../context/StoreConfigContext';
import { shrinkBase64Image } from '../utils/imageUpload';
import { 
  exportSingleCarnetPdf, 
  captureElementToPng, 
  downloadImage 
} from '../utils/carnetExport';
import { soundEffects } from '../utils/soundEffects';
import type { CarnetSubmission, CarnetTheme } from '../types/carnet';
import './CarnetServicePage.css';

const BLOOD_TYPES = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'No Determinado'];
const ROLE_SUGGESTIONS = [
  'Estudiante',
  'Docente',
  'Colaborador / Staff',
  'Gerencia / Dirección',
  'Seguridad & Logística',
  'Miembro / Socio',
  'Visitante Autorizado'
];

export default function CarnetServicePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { carnetConfig, saveCarnetSubmission, storeConfig } = useStoreConfig();

  // Referencias para captura de PNG y PDF
  const frontRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Estados del Formulario
  const [fullName, setFullName] = useState<string>('');
  const [idNumber, setIdNumber] = useState<string>('');
  const [role, setRole] = useState<string>('Colaborador / Staff');
  const [gradeOrArea, setGradeOrArea] = useState<string>('');
  const [bloodType, setBloodType] = useState<string>('O+');
  const [emergencyContact, setEmergencyContact] = useState<string>('');
  const [emergencyPhone, setEmergencyPhone] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('2025 - 2026');
  const [allergiesOrNotes, setAllergiesOrNotes] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [selectedThemeId, setSelectedThemeId] = useState<string>(carnetConfig.defaultThemeId || 'volckan-cyber');

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

  // Datos en vivo para la vista previa
  const previewData: CarnetCardData = useMemo(() => {
    return {
      fullName: fullName.trim() || 'NOMBRE Y APELLIDO',
      idNumber: idNumber.trim() || 'DPI / CÓDIGO',
      role: role.trim() || 'CARGO / ROL',
      gradeOrArea: gradeOrArea.trim() || undefined,
      bloodType: bloodType,
      emergencyContact: emergencyContact.trim() || undefined,
      emergencyPhone: emergencyPhone.trim() || undefined,
      expirationDate: expirationDate.trim() || '2025 - 2026',
      allergiesOrNotes: allergiesOrNotes.trim() || undefined,
      photoUrl: photoUrl || undefined,
      institutionName: carnetConfig.institutionName || 'VOLCKAN TECHNOLOGIES',
      logoUrl: carnetConfig.logoUrl || undefined,
      qrToken: `VOLCKAN-PASS-${idNumber || 'DEMO'}-${Date.now().toString().slice(-4)}`
    };
  }, [fullName, idNumber, role, gradeOrArea, bloodType, emergencyContact, emergencyPhone, expirationDate, allergiesOrNotes, photoUrl, carnetConfig]);

  // Manejo de carga de foto con compresión automática
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (JPG, PNG o WEBP).');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        const rawBase64 = evt.target?.result as string;
        if (rawBase64) {
          // Comprimir a máximo 500px para que quepa en localStorage / Firestore sin problemas
          const compressed = await shrinkBase64Image(rawBase64, 500, 0.85);
          setPhotoUrl(compressed);
          soundEffects.playSuccess();
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error procesando imagen:', err);
      alert('Ocurrió un error al cargar la fotografía.');
    }
  };

  // Validación y Envío del Formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('Por favor ingresa tu nombre completo.');
      return;
    }
    if (!idNumber.trim()) {
      setErrorMessage('Por favor ingresa tu número de identificación, DPI o carnet.');
      return;
    }
    if (carnetConfig.fields.requirePhoto && !photoUrl) {
      setErrorMessage('Es obligatorio subir una fotografía para emitir tu credencial.');
      return;
    }

    setIsSubmitting(true);
    soundEffects.playClick();

    try {
      const submission: CarnetSubmission = {
        id: `carnet-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        formId: carnetConfig.id || 'form-carnets-principal',
        createdAt: new Date().toISOString(),
        fullName: fullName.trim(),
        idNumber: idNumber.trim(),
        role: role.trim(),
        gradeOrArea: gradeOrArea.trim() || undefined,
        bloodType: bloodType || undefined,
        emergencyContact: emergencyContact.trim() || undefined,
        emergencyPhone: emergencyPhone.trim() || undefined,
        expirationDate: expirationDate.trim() || undefined,
        allergiesOrNotes: allergiesOrNotes.trim() || undefined,
        photoUrl: photoUrl || '',
        themeId: selectedThemeId,
        qrToken: `https://volckan.com/tienda/#/carnet/verify?id=${encodeURIComponent(idNumber.trim())}`,
        status: 'pendiente',
        institutionName: carnetConfig.institutionName
      };

      await saveCarnetSubmission(submission);
      setSubmittedData(submission);
      setIsSuccessModalOpen(true);
      soundEffects.playSuccessFanfare();
    } catch (err) {
      console.error('Error guardando carnet:', err);
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
      downloadImage(pngData, `Carnet_Digital_${previewData.fullName.replace(/\s+/g, '_')}.png`);
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

  // Enviar comprobante a WhatsApp
  const handleShareToWhatsApp = () => {
    const phone = carnetConfig.supportPhone || storeConfig.whatsappPhone || '50246741239';
    const text = [
      `¡Hola ${carnetConfig.institutionName}! 👋`,
      `He completado mi formulario de carnetización oficial:`,
      `🪪 *Nombre:* ${fullName}`,
      `🆔 *ID/DPI:* ${idNumber}`,
      `🏷️ *Rol/Cargo:* ${role}`,
      gradeOrArea ? `🏢 *Área/Grado:* ${gradeOrArea}` : '',
      `📅 *Fecha de Envío:* ${new Date().toLocaleDateString()}`,
      '',
      `Agradezco la confirmación de impresión de mi credencial PVC. ¡Muchas gracias!`
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="carnet-page-root animate-fade-in">
      <StoreTopBar slogan="Servicio Oficial de Carnetización & Credenciales Inteligentes" />

      {/* Hero Header de la Página de Carnetización */}
      <section className="carnet-hero-banner">
        <div className="carnet-hero-container">
          <div className="carnet-hero-badge">
            <span>🪪</span> SISTEMA OFICIAL DE CARNETIZACIÓN VOLCKAN
          </div>
          <h1 className="carnet-hero-title">
            {carnetConfig.title || 'Emisión de Credenciales Inteligentes'}
          </h1>
          <p className="carnet-hero-subtitle">
            {carnetConfig.subtitle || 'Ingresa tus datos personales y sube tu fotografía para generar tu carnet imprimible y digital.'}
          </p>
          <div className="carnet-institution-pill">
            <span className="inst-icon">🏛️</span>
            <span>Institución: <strong>{carnetConfig.institutionName}</strong></span>
          </div>
        </div>
      </section>

      {/* Contenedor Principal: Formulario + Vista Previa 3D en Vivo */}
      <main className="carnet-main-layout">
        {/* Columna Izquierda: Vista Previa Interactiva */}
        <aside className="carnet-preview-sticky-col">
          <div className="preview-card-wrapper">
            <div className="preview-header-bar">
              <span className="live-indicator"><span className="pulse-dot" /> VISTA PREVIA EN TIEMPO REAL</span>
              <span className="cr80-tag">FORMATO CR80 BANCARIO</span>
            </div>

            <CarnetCardPreview
              data={previewData}
              theme={currentTheme}
              side="front"
              interactiveFlip={true}
              frontRef={frontRef}
              backRef={backRef}
            />

            <div className="preview-features-list">
              <div className="preview-feature-item">
                <span className="feature-icon">✨</span>
                <span>Resolución Ultra HD a 300 DPI para impresión en PVC</span>
              </div>
              <div className="preview-feature-item">
                <span className="feature-icon">📱</span>
                <span>Código QR dinámico escaneable para validación o SOS</span>
              </div>
              <div className="preview-feature-item">
                <span className="feature-icon">🔄</span>
                <span>Toca o haz clic sobre el carnet para voltearlo</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Columna Derecha: Formulario de Registro */}
        <section className="carnet-form-col">
          <form onSubmit={handleSubmit} className="carnet-submission-form">
            <div className="form-section-header">
              <h3><span>📋</span> Datos del Titular de la Credencial</h3>
              <p>Verifica que tus nombres y apellidos estén escritos correctamente para la impresión final.</p>
            </div>

            {errorMessage && (
              <div className="carnet-alert-error animate-shake">
                <span>⚠️</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* SECCIÓN 1: Fotografía del Titular */}
            <div className="carnet-photo-upload-block">
              <div className="photo-preview-box">
                {photoUrl ? (
                  <img src={photoUrl} alt="Foto subida" className="uploaded-photo-img" />
                ) : (
                  <div className="photo-empty-placeholder">
                    <span className="photo-empty-icon">📷</span>
                    <span>Sin fotografía</span>
                  </div>
                )}
              </div>

              <div className="photo-upload-controls">
                <label className="photo-upload-label">
                  Fotografía de Frente (Fondo Claro Recomendado)
                </label>
                <p className="photo-upload-hint">
                  Sube una foto tipo documento con buena iluminación. Rostro centrado y sin gorras.
                </p>
                <div className="photo-btn-group">
                  <button
                    type="button"
                    className="btn-upload-photo"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span>📁</span> {photoUrl ? 'Cambiar Fotografía' : 'Subir Fotografía'}
                  </button>
                  {photoUrl && (
                    <button
                      type="button"
                      className="btn-remove-photo"
                      onClick={() => setPhotoUrl('')}
                      title="Eliminar foto"
                    >
                      ✕ Quitar
                    </button>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/png,image/jpeg,image/webp,image/jpg"
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            {/* SECCIÓN 2: Selector de Diseño de Portada */}
            {carnetConfig.allowUserThemeSelection && (
              <div className="carnet-theme-selector-block">
                <label className="field-label">
                  <span>🎨</span> Selecciona el Fondo de Diseño para tu Carnet
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

            {/* SECCIÓN 3: Datos Personales */}
            <div className="form-fields-grid">
              <div className="carnet-input-group full-width">
                <label className="field-label">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Lic. Juan Carlos Morales Rivera"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="carnet-input"
                />
              </div>

              <div className="carnet-input-group">
                <label className="field-label">Número de Identificación (DPI / Carnet / Código) *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: 3045 89123 0101 o 2025-048"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  className="carnet-input"
                />
              </div>

              <div className="carnet-input-group">
                <label className="field-label">Rol / Cargo Institucional *</label>
                <input
                  type="text"
                  list="roles-list"
                  placeholder="Ej: Docente de Primaria, Gerente..."
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="carnet-input"
                />
                <datalist id="roles-list">
                  {ROLE_SUGGESTIONS.map(r => <option key={r} value={r} />)}
                </datalist>
              </div>

              {carnetConfig.fields.requireGradeOrArea && (
                <div className="carnet-input-group">
                  <label className="field-label">Grado, Área o Departamento</label>
                  <input
                    type="text"
                    placeholder="Ej: Tecnología / Nivel Medio / Planta Central"
                    value={gradeOrArea}
                    onChange={(e) => setGradeOrArea(e.target.value)}
                    className="carnet-input"
                  />
                </div>
              )}

              {carnetConfig.fields.requireExpirationDate && (
                <div className="carnet-input-group">
                  <label className="field-label">Vigencia de la Credencial</label>
                  <input
                    type="text"
                    placeholder="Ej: 2025 - 2026 o Dic 2026"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    className="carnet-input"
                  />
                </div>
              )}
            </div>

            {/* SECCIÓN 4: Datos Médicos y de Emergencia SOS */}
            <div className="form-sub-header">
              <h4><span>🆘</span> Información Médica y de Emergencia (Para el Reverso con QR)</h4>
              <p>Estos datos se imprimen en el reverso y se codifican en el código QR para emergencias.</p>
            </div>

            <div className="form-fields-grid">
              {carnetConfig.fields.requireBloodType && (
                <div className="carnet-input-group">
                  <label className="field-label">Tipo de Sangre</label>
                  <select
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="carnet-input carnet-select"
                  >
                    {BLOOD_TYPES.map(bt => <option key={bt} value={bt}>{bt}</option>)}
                  </select>
                </div>
              )}

              {carnetConfig.fields.requireEmergencyContact && (
                <div className="carnet-input-group">
                  <label className="field-label">Nombre de Contacto en Caso de Emergencia</label>
                  <input
                    type="text"
                    placeholder="Ej: María José de Morales (Madre/Esposa)"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    className="carnet-input"
                  />
                </div>
              )}

              {carnetConfig.fields.requireEmergencyPhone && (
                <div className="carnet-input-group">
                  <label className="field-label">Teléfono de Emergencia</label>
                  <input
                    type="tel"
                    placeholder="Ej: +502 5555-1234"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    className="carnet-input"
                  />
                </div>
              )}

              <div className="carnet-input-group full-width">
                <label className="field-label">Alergias o Condiciones Médicas Relevantes (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ej: Alérgico a penicilina, asmático, uso de lentes..."
                  value={allergiesOrNotes}
                  onChange={(e) => setAllergiesOrNotes(e.target.value)}
                  className="carnet-input"
                />
              </div>
            </div>

            {/* Notas de Producción y Entrega */}
            {carnetConfig.deliveryNotes && (
              <div className="carnet-delivery-note">
                <span className="note-icon">ℹ️</span>
                <span>{carnetConfig.deliveryNotes}</span>
              </div>
            )}

            {/* Botón de Envío */}
            <div className="form-actions-bar">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-submit-carnet"
              >
                {isSubmitting ? (
                  <span>⏳ Generando Credencial y Enviando...</span>
                ) : (
                  <span>✨ Generar y Enviar Solicitud de Carnet</span>
                )}
              </button>
            </div>
          </form>
        </section>
      </main>

      {/* MODAL DE ÉXITO Y DESCARGA DIGITAL */}
      {isSuccessModalOpen && submittedData && (
        <div className="carnet-modal-overlay animate-fade-in">
          <div className="carnet-success-modal">
            <div className="success-modal-header">
              <div className="success-icon-badge">🎉</div>
              <h3>¡Tu Carnet ha sido Generado con Éxito!</h3>
              <p>
                Los datos se han registrado correctamente en el sistema de <strong>{carnetConfig.institutionName}</strong>.
              </p>
            </div>

            {/* Visualización del Carnet Digital Generado */}
            <div className="success-preview-wrap">
              <CarnetCardPreview
                data={previewData}
                theme={currentTheme}
                side="front"
                interactiveFlip={true}
                scale={0.92}
                frontRef={frontRef}
                backRef={backRef}
              />
            </div>

            {/* Opciones de Descarga y Compartir */}
            <div className="success-actions-grid">
              <button
                type="button"
                className="btn-export-option primary"
                onClick={handleDownloadDigitalPng}
                disabled={exportingType !== null}
              >
                <span>📱</span>
                <div>
                  <strong>Descargar Carnet Digital (PNG)</strong>
                  <small>Guárdalo en tu teléfono o billetera virtual</small>
                </div>
              </button>

              <button
                type="button"
                className="btn-export-option secondary"
                onClick={handleDownloadPdf}
                disabled={exportingType !== null}
              >
                <span>🖨️</span>
                <div>
                  <strong>Descargar PDF Imprimible CR80</strong>
                  <small>Formato oficial estándar con frente y reverso</small>
                </div>
              </button>

              <button
                type="button"
                className="btn-export-option whatsapp"
                onClick={handleShareToWhatsApp}
              >
                <span>💬</span>
                <div>
                  <strong>Confirmar Solicitud por WhatsApp</strong>
                  <small>Notifica a la institución de tu envío</small>
                </div>
              </button>
            </div>

            <div className="success-modal-footer">
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => {
                  soundEffects.playClick();
                  setIsSuccessModalOpen(false);
                }}
              >
                Cerrar Ventana
              </button>
              <button
                type="button"
                className="btn-modal-return"
                onClick={() => {
                  soundEffects.playClick();
                  navigate('/tienda');
                }}
              >
                Explorar Tienda Volckan →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
