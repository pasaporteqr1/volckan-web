import React, { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreTopBar from '../components/StoreTopBar';
import CarnetCardPreview, { type CarnetCardData, formatDpiString, formatPhoneString } from '../components/carnet/CarnetCardPreview';
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
  const { carnetConfig, saveCarnetSubmission, storeConfig } = useStoreConfig();

  // Referencias para captura de PNG y PDF en segundo plano
  const frontRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Estados del Formulario (Centrado en datos comerciales y contacto directo)
  const [fullName, setFullName] = useState<string>('');
  const [idNumber, setIdNumber] = useState<string>(''); // Exactamente 13 dígitos numéricos
  const [phoneDigits, setPhoneDigits] = useState<string>(''); // Exactamente 8 dígitos numéricos (+502 fijo)
  const [institutionRepresented, setInstitutionRepresented] = useState<string>('');
  const [departmentMunicipality, setDepartmentMunicipality] = useState<string>('Guatemala (Ciudad Capital)');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // El diseño de portada lo define el administrador desde el panel (sin selector en el formulario público)
  const selectedThemeId = carnetConfig.defaultThemeId || 'volckan-cyber';

  // Estados del Modal de Encuadre Fotográfico tipo Red Social
  const [isCropModalOpen, setIsCropModalOpen] = useState<boolean>(false);
  const [rawImageSrcForCrop, setRawImageSrcForCrop] = useState<string>('');

  // Estados de proceso y éxito
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<CarnetSubmission | null>(null);
  const [exportingType, setExportingType] = useState<'png' | 'pdf' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Tema activo predeterminado
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

  // Manejo estricto de Teléfono con prefijo fijo +502 y exactamente 8 dígitos restantes
  const cleanPhone = phoneDigits.replace(/\D/g, '').slice(0, 8);
  const isPhoneValid = cleanPhone.length === 8;
  const fullPhoneString = `+502 ${cleanPhone}`;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 8);
    setPhoneDigits(digitsOnly);
  };

  // Datos para la credencial y generación del código QR
  const previewData: CarnetCardData = useMemo(() => {
    return {
      fullName: fullName.trim() || 'NOMBRE DEL TITULAR',
      idNumber: cleanDpi || '0000000000000',
      phone: fullPhoneString,
      institutionRepresented: institutionRepresented.trim() || undefined,
      departmentMunicipality: departmentMunicipality.trim() || undefined,
      photoUrl: photoUrl || undefined,
      institutionName: carnetConfig.institutionName || 'VOLCKAN SUMMIT & NETWORKING',
      logoUrl: carnetConfig.logoUrl || undefined,
      qrToken: `VOLCKAN-PASS-${cleanDpi || 'PASS'}-${Date.now().toString().slice(-4)}`
    };
  }, [fullName, cleanDpi, fullPhoneString, institutionRepresented, departmentMunicipality, photoUrl, carnetConfig]);

  // Manejo de selección inicial de foto: abre automáticamente el modal de encuadre social
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
      setErrorMessage(`El DPI debe contener exactamente 13 dígitos numéricos. Has ingresado ${cleanDpi.length} de 13 dígitos.`);
      return;
    }

    if (carnetConfig.fields.requirePhone && !isPhoneValid) {
      setErrorMessage(`El número de teléfono debe contener exactamente 8 dígitos después de +502. Has ingresado ${cleanPhone.length} de 8 dígitos.`);
      return;
    }

    if (carnetConfig.fields.requirePhoto && !photoUrl) {
      setErrorMessage('Es obligatorio subir y encuadrar una fotografía para emitir tu credencial.');
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
        schemaVersion: 3, // Versión 3: comercial, telefónico sin selectores visuales
        fullName: fullName.trim(),
        idNumber: cleanDpi,
        phone: fullPhoneString,
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
      console.error('Error guardando credencial:', err);
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
      downloadImage(pngData, `Credencial_${previewData.fullName.replace(/\s+/g, '_')}.png`);
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
      `He completado mi registro de acreditación y credencial oficial:`,
      `🪪 *Nombre:* ${fullName}`,
      `🆔 *DPI:* ${formatDpiString(cleanDpi)}`,
      `📱 *Teléfono:* +502 ${cleanPhone}`,
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
      <StoreTopBar slogan="Acreditación Oficial & Emisión de Credenciales con Código QR" />

      {/* Renderizado fuera de pantalla para captura de PNG y PDF al enviar */}
      <div style={{ position: 'fixed', top: '-9999px', left: '-9999px', pointerEvents: 'none', opacity: 0 }}>
        <CarnetCardPreview
          data={previewData}
          theme={currentTheme}
          frontRef={frontRef}
          backRef={backRef}
          side="both"
        />
      </div>

      {/* Hero Header Limpio */}
      <section className="carnet-hero-banner clean-form-hero">
        <div className="carnet-hero-container">
          <div className="carnet-hero-badge">
            <span>🪪</span> SISTEMA OFICIAL DE REGISTRO & ACREDITACIÓN
          </div>
          <h1 className="carnet-hero-title">
            {carnetConfig.title || 'Acreditación Oficial & Emisión de Credenciales'}
          </h1>
          <p className="carnet-hero-subtitle">
            {carnetConfig.subtitle || 'Ingresa tus datos personales y encuadra tu fotografía oficial para generar tu credencial con código QR.'}
          </p>
          <div className="carnet-institution-pill">
            <span className="inst-icon">🏛️</span>
            <span>Entidad Emisora: <strong>{carnetConfig.institutionName || 'Volckan Technologies'}</strong></span>
          </div>
        </div>
      </section>

      {/* Layout Centrado Exclusivo para Formulario de Grupo (Sin vista previa lateral) */}
      <main className="carnet-standalone-form-layout">
        <div className="carnet-form-centered-container">
          <form className="carnet-form-card standalone-card" onSubmit={handleSubmit}>
            <div className="carnet-form-header">
              <h2>Formulario de Registro de Asistentes</h2>
              <p>Por favor completa cada uno de los campos solicitados para tu credencial oficial.</p>
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
                <h4>Fotografía para Credencial Oficial (Proporción 3:4)</h4>
                <p>
                  Sube tu fotografía y ajústala fácilmente con nuestro recortador interactivo con guía de rostro.
                </p>

                <div className="upload-actions-cluster">
                  <button
                    type="button"
                    className="btn-upload-photo"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span>📷</span> {photoUrl ? 'Cambiar / Re-encuadrar Foto' : 'Subir y Encuadrar Foto'}
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

            {/* SECCIÓN 2: Datos del Titular (Sin selectores de diseño de portada) */}
            <div className="form-sub-header">
              <h4><span>📋</span> Datos para la Credencial</h4>
              <p>Ingresa la información exactamente como debe aparecer en tu carnet impreso y digital.</p>
            </div>

            <div className="form-fields-grid">
              {/* Nombre Completo */}
              <div className="carnet-input-group full-width">
                <label className="field-label">Nombre Completo del Titular *</label>
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

              {/* Teléfono Móvil con Prefijo Fijo +502 y 8 dígitos restantes */}
              <div className="carnet-input-group">
                <label className="field-label">
                  <span>Número de Teléfono Celular *</span>
                </label>
                <div className="phone-fixed-group">
                  <span className="phone-prefix-fixed">+502</span>
                  <input
                    type="tel"
                    required
                    maxLength={9}
                    placeholder="5555 1234"
                    value={cleanPhone.length > 4 ? `${cleanPhone.slice(0, 4)} ${cleanPhone.slice(4)}` : cleanPhone}
                    onChange={handlePhoneChange}
                    className={`carnet-input phone-number-input ${cleanPhone.length > 0 && !isPhoneValid ? 'input-warning' : ''}`}
                  />
                </div>
                <div className="dpi-validation-helper">
                  <span className={isPhoneValid ? 'dpi-valid' : 'dpi-pending'}>
                    {isPhoneValid 
                      ? '✓ Teléfono de 8 dígitos verificado' 
                      : `Faltan dígitos: ${cleanPhone.length} de 8`}
                  </span>
                </div>
              </div>

              {/* Institución o Empresa que Representa */}
              <div className="carnet-input-group">
                <label className="field-label">Institución o Empresa a la que Representa *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Banco Continental, CMI, Empresa Propia..."
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

            {/* Botón Principal de Envío */}
            <div className="carnet-form-submit-row">
              <button
                type="submit"
                className="btn-submit-carnet"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="btn-spinner-content">
                    <span className="spinner-circle" /> Procesando y Registrando Credencial...
                  </span>
                ) : (
                  <span>🚀 Enviar Datos y Registrar Credencial</span>
                )}
              </button>
            </div>
          </form>
        </div>
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

            <h2 className="modal-title">¡Tu Credencial ha sido Registrada!</h2>
            <p className="modal-desc">
              Hola <strong>{submittedData.fullName}</strong>, tus datos han sido procesados y tu pase con código QR ha sido emitido.
            </p>

            <div className="modal-card-display">
              <CarnetCardPreview
                data={{
                  fullName: submittedData.fullName,
                  idNumber: submittedData.idNumber,
                  phone: submittedData.phone,
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
                💬 Confirmar Registro por WhatsApp
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
