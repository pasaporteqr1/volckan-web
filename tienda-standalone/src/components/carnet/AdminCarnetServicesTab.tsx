import React, { useState, useRef } from 'react';
import { useStoreConfig } from '../../context/StoreConfigContext';
import { CARNET_THEMES } from '../../data/carnetThemes';
import CarnetCardPreview, { type CarnetCardData } from './CarnetCardPreview';
import { 
  exportSingleCarnetPdf, 
  exportBatchCarnetsPdf, 
  captureElementToPng, 
  downloadImage,
  generateQrDataUrl
} from '../../utils/carnetExport';
import { shrinkBase64Image } from '../../utils/imageUpload';
import { soundEffects } from '../../utils/soundEffects';
import type { CarnetSubmission, CarnetTheme, CarnetServiceFormConfig } from '../../types/carnet';
import './AdminCarnetServicesTab.css';

export const AdminCarnetServicesTab: React.FC = () => {
  const { 
    carnetConfig, 
    saveCarnetConfig, 
    carnetSubmissions, 
    updateCarnetSubmissionStatus, 
    deleteCarnetSubmission,
    storeConfig
  } = useStoreConfig();

  // Estados de edición de configuración
  const [localFormConfig, setLocalFormConfig] = useState<CarnetServiceFormConfig>(carnetConfig);
  const [isSavingConfig, setIsSavingConfig] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Estados de gestión de envíos recibidos
  const [statusFilter, setStatusFilter] = useState<'todos' | 'pendiente' | 'aprobado' | 'impreso'>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [previewSubmission, setPreviewSubmission] = useState<CarnetSubmission | null>(null);
  const [isBatchGenerating, setIsBatchGenerating] = useState<boolean>(false);

  // Referencias para captura de credencial seleccionada
  const modalFrontRef = useRef<HTMLDivElement | null>(null);
  const modalBackRef = useRef<HTMLDivElement | null>(null);
  const logoInputRef = useRef<HTMLInputElement | null>(null);

  // Enlace oficial directo para compartir
  const origin = window.location.origin;
  const pathname = window.location.pathname.replace(/\/admin\/?$/, '');
  const publicFormUrl = `${origin}${pathname}#/carnet`;

  // Actualizar configuración local
  const updateConfigField = <K extends keyof CarnetServiceFormConfig>(key: K, val: CarnetServiceFormConfig[K]) => {
    setLocalFormConfig(prev => ({ ...prev, [key]: val }));
  };

  const updateFieldRequirement = (fieldKey: keyof CarnetServiceFormConfig['fields'], val: boolean) => {
    setLocalFormConfig(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [fieldKey]: val
      }
    }));
  };

  // Guardar configuración en Firestore / Caché
  const handleSaveFormConfig = async () => {
    setIsSavingConfig(true);
    soundEffects.playClick();
    try {
      await saveCarnetConfig(localFormConfig);
      soundEffects.playSuccess();
      alert('¡Configuración del Servicio de Carnets guardada exitosamente!');
    } catch (err) {
      console.error('Error guardando configuración:', err);
      alert('Error al guardar la configuración.');
    } finally {
      setIsSavingConfig(false);
    }
  };

  // Cargar logotipo institucional
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        const raw = evt.target?.result as string;
        if (raw) {
          const compressed = await shrinkBase64Image(raw, 400, 0.9);
          updateConfigField('logoUrl', compressed);
          soundEffects.playSuccess();
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error cargando logo:', err);
      alert('Error procesando imagen del logo.');
    }
  };

  // Copiar enlace directo
  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicFormUrl);
    soundEffects.playSuccess();
    setCopyFeedback('¡Enlace copiado al portapapeles!');
    setTimeout(() => setCopyFeedback(null), 3000);
  };

  // Compartir enlace por WhatsApp
  const handleShareLinkWhatsApp = () => {
    const text = [
      `¡Hola! 👋`,
      `Te compartimos el enlace oficial para ingresar tus datos y emitir tu credencial oficial:`,
      `🔗 ${publicFormUrl}`,
      ``,
      `Por favor sube tu fotografía con fondo claro y verifica que tus datos estén correctos. ¡Gracias!`
    ].join('\n');
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Filtrado de envíos
  const filteredSubmissions = carnetSubmissions.filter(sub => {
    if (statusFilter !== 'todos' && sub.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        sub.fullName.toLowerCase().includes(q) ||
        sub.idNumber.toLowerCase().includes(q) ||
        sub.role.toLowerCase().includes(q) ||
        (sub.gradeOrArea && sub.gradeOrArea.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Exportar lote masivo en PDF
  const handleExportBatch = async () => {
    const targetSubs = filteredSubmissions.length > 0 ? filteredSubmissions : carnetSubmissions;
    if (targetSubs.length === 0) {
      alert('No hay credenciales registradas para generar el lote.');
      return;
    }

    setIsBatchGenerating(true);
    soundEffects.playClick();

    try {
      // Crear contenedor temporal fuera de pantalla para renderizar cada carnet
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.top = '-9999px';
      container.style.left = '-9999px';
      container.style.width = '400px';
      container.style.zIndex = '-100';
      document.body.appendChild(container);

      const cardsData: { frontDataUrl: string; backDataUrl: string; submission: CarnetSubmission }[] = [];

      // Procesar cada carnet de forma secuencial
      for (const sub of targetSubs) {
        const theme = CARNET_THEMES.find(t => t.id === sub.themeId) || CARNET_THEMES[0];
        const qrUrl = await generateQrDataUrl(sub.qrToken || `https://volckan.com/tienda/#/carnet/verify?id=${sub.idNumber}`);

        // Crear elemento Front
        const frontEl = document.createElement('div');
        frontEl.style.width = '323px';
        frontEl.style.height = '204px';
        frontEl.style.borderRadius = '14px';
        frontEl.style.background = theme.frontBg;
        frontEl.style.border = `1.5px solid ${theme.borderColor}`;
        frontEl.style.overflow = 'hidden';
        frontEl.style.boxSizing = 'border-box';
        frontEl.style.padding = '8px 12px';
        frontEl.style.display = 'flex';
        frontEl.style.flexDirection = 'column';
        frontEl.style.justifyContent = 'space-between';
        frontEl.style.fontFamily = 'sans-serif';
        frontEl.style.color = theme.textColor;

        frontEl.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.15); padding-bottom:4px;">
            <div style="font-size:10px; font-weight:800;">${sub.institutionName || localFormConfig.institutionName}</div>
            <div style="font-size:8px; color:${theme.accentColor}; font-weight:700;">SECURE ID</div>
          </div>
          <div style="display:flex; gap:10px; align-items:center; margin:4px 0;">
            <div style="width:68px; height:80px; border-radius:6px; border:2px solid ${theme.accentColor}; overflow:hidden; background:#000; flex-shrink:0;">
              ${sub.photoUrl ? `<img src="${sub.photoUrl}" style="width:100%; height:100%; object-fit:cover;" />` : `<div style="color:#666; font-size:9px; text-align:center; padding-top:28px;">FOTO</div>`}
            </div>
            <div style="display:flex; flex-direction:column; gap:2px; min-width:0;">
              <span style="font-size:8px; background:${theme.badgeBg}; color:${theme.badgeText}; padding:2px 6px; border-radius:4px; font-weight:800; align-self:flex-start;">${sub.role}</span>
              <strong style="font-size:12px; font-weight:800; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${sub.fullName}</strong>
              <span style="font-size:9px; color:${theme.subtextColor};">ID: <strong>${sub.idNumber}</strong></span>
              ${sub.gradeOrArea ? `<span style="font-size:8px; color:${theme.subtextColor};">${sub.gradeOrArea}</span>` : ''}
              <span style="font-size:8px; color:${theme.accentColor}; font-weight:700;">VIGENCIA: ${sub.expirationDate || '2025-2026'}</span>
            </div>
          </div>
          <div style="font-size:7px; font-family:monospace; display:flex; justify-content:space-between; border-top:1px solid rgba(255,255,255,0.1); padding-top:2px;">
            <span>VOLCKAN CR80</span>
            <span style="color:${theme.accentColor};">◈ VERIFIED ◈</span>
          </div>
        `;

        // Crear elemento Back
        const backEl = document.createElement('div');
        backEl.style.width = '323px';
        backEl.style.height = '204px';
        backEl.style.borderRadius = '14px';
        backEl.style.background = theme.backBg;
        backEl.style.border = `1.5px solid ${theme.borderColor}`;
        backEl.style.overflow = 'hidden';
        backEl.style.boxSizing = 'border-box';
        backEl.style.padding = '8px 12px';
        backEl.style.display = 'flex';
        backEl.style.flexDirection = 'column';
        backEl.style.justifyContent = 'space-between';
        backEl.style.fontFamily = 'sans-serif';
        backEl.style.color = theme.textColor;

        backEl.innerHTML = `
          <div style="height:12px; background:#000; margin:-8px -12px 4px -12px;"></div>
          <div style="display:flex; gap:12px; align-items:center;">
            <div style="width:70px; height:70px; background:#fff; padding:3px; border-radius:4px; border:2px solid ${theme.accentColor}; flex-shrink:0;">
              <img src="${qrUrl}" style="width:100%; height:100%; object-fit:contain;" />
            </div>
            <div style="display:flex; flex-direction:column; gap:2px; font-size:8px;">
              ${sub.bloodType ? `<span style="font-size:9px; font-weight:800; color:${theme.accentColor};">🩸 TIPO: ${sub.bloodType}</span>` : ''}
              ${sub.emergencyContact ? `<span>SOS: <strong>${sub.emergencyContact}</strong></span>` : ''}
              ${sub.emergencyPhone ? `<span>TEL: <strong>${sub.emergencyPhone}</strong></span>` : ''}
              ${sub.allergiesOrNotes ? `<span style="color:${theme.subtextColor}; font-size:7px;">OBS: ${sub.allergiesOrNotes}</span>` : ''}
            </div>
          </div>
          <div style="font-size:6px; opacity:0.8; text-align:justify; border-top:1px solid rgba(255,255,255,0.1); padding-top:2px;">
            Credencial intransferible de ${sub.institutionName || localFormConfig.institutionName}. En caso de extravío o emergencia notificar a la administración.
          </div>
        `;

        container.appendChild(frontEl);
        container.appendChild(backEl);

        const frontPng = await captureElementToPng(frontEl);
        const backPng = await captureElementToPng(backEl);

        cardsData.push({
          frontDataUrl: frontPng,
          backDataUrl: backPng,
          submission: sub
        });

        container.removeChild(frontEl);
        container.removeChild(backEl);
      }

      document.body.removeChild(container);

      // Exportar PDF
      await exportBatchCarnetsPdf(cardsData);
      soundEffects.playSuccessFanfare();
      alert(`¡Lote de ${cardsData.length} credenciales generado exitosamente en PDF tamaño Carta!`);
    } catch (err) {
      console.error('Error generando lote de carnets:', err);
      alert('Ocurrió un error al generar el lote masivo.');
    } finally {
      setIsBatchGenerating(false);
    }
  };

  // Exportar solicitudes a Excel / CSV (con BOM UTF-8 para acentos correctos en Excel)
  const handleExportCsv = () => {
    const targetSubs = filteredSubmissions.length > 0 ? filteredSubmissions : carnetSubmissions;
    if (targetSubs.length === 0) {
      alert('No hay credenciales registradas para exportar.');
      return;
    }
    soundEffects.playClick();

    const headers = [
      'ID Registro',
      'Fecha Registro',
      'Estado',
      'Nombre Completo',
      'Identificación / DPI',
      'Rol / Cargo',
      'Área / Grado',
      'Tipo de Sangre',
      'Contacto Emergencia',
      'Teléfono Emergencia',
      'Vigencia',
      'Alergias / Notas',
      'Tema Carnet',
      'URL Fotografía',
      'Token QR'
    ];

    const escapeCsv = (str?: string) => {
      if (!str) return '""';
      return `"${str.toString().replace(/"/g, '""')}"`;
    };

    const rows = targetSubs.map(s => [
      escapeCsv(s.id),
      escapeCsv(new Date(s.createdAt).toLocaleString()),
      escapeCsv(s.status),
      escapeCsv(s.fullName),
      escapeCsv(s.idNumber),
      escapeCsv(s.role),
      escapeCsv(s.gradeOrArea || ''),
      escapeCsv(s.bloodType || ''),
      escapeCsv(s.emergencyContact || ''),
      escapeCsv(s.emergencyPhone || ''),
      escapeCsv(s.expirationDate || ''),
      escapeCsv(s.allergiesOrNotes || ''),
      escapeCsv(s.themeId),
      escapeCsv(s.photoUrl),
      escapeCsv(s.qrToken)
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Carnets_Volckan_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    soundEffects.playSuccess();
  };

  // Exportar copia de seguridad en JSON completo
  const handleExportJson = () => {
    const targetSubs = filteredSubmissions.length > 0 ? filteredSubmissions : carnetSubmissions;
    if (targetSubs.length === 0) {
      alert('No hay credenciales registradas para exportar.');
      return;
    }
    soundEffects.playClick();
    const jsonStr = JSON.stringify(targetSubs, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Respaldo_Carnets_Volckan_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    soundEffects.playSuccess();
  };

  // Convertir submission a preview data
  const getSubmissionPreviewData = (sub: CarnetSubmission): CarnetCardData => ({
    fullName: sub.fullName,
    idNumber: sub.idNumber,
    role: sub.role,
    gradeOrArea: sub.gradeOrArea,
    bloodType: sub.bloodType,
    emergencyContact: sub.emergencyContact,
    emergencyPhone: sub.emergencyPhone,
    expirationDate: sub.expirationDate || '2025 - 2026',
    allergiesOrNotes: sub.allergiesOrNotes,
    photoUrl: sub.photoUrl,
    institutionName: sub.institutionName || localFormConfig.institutionName,
    logoUrl: localFormConfig.logoUrl,
    qrToken: sub.qrToken
  });

  return (
    <div className="admin-carnets-container animate-fade-in">
      {/* 1. Encabezado del Servicio de Carnets */}
      <div className="carnets-admin-header-card">
        <div className="carnets-header-left">
          <div className="carnets-header-icon-box">🪪</div>
          <div>
            <h3>Servicios en Línea · Carnetización y Credenciales Inteligentes</h3>
            <p>
              Configura el formulario público de recepción de datos, personaliza logos y temas de credenciales, y gestiona o imprime las solicitudes recibidas.
            </p>
          </div>
        </div>

        <div className="carnets-header-actions">
          <button
            type="button"
            className="btn-carnets-save-config"
            onClick={handleSaveFormConfig}
            disabled={isSavingConfig}
          >
            {isSavingConfig ? '⏳ Guardando...' : '💾 Guardar Configuración'}
          </button>
        </div>
      </div>

      {/* 2. Tarjeta del Enlace Compartible Directo */}
      <div className="carnets-link-share-card">
        <div className="link-share-info">
          <span className="link-badge">🔗 ENLACE OFICIAL DEL FORMULARIO PÚBLICO</span>
          <h4>Comparte este link con tus usuarios, estudiantes o colaboradores</h4>
          <p>
            Al abrir este enlace, las personas completan su información, suben su foto y ven su carnet en tiempo real antes de enviarlo.
          </p>
          <div className="link-display-row">
            <input 
              type="text" 
              readOnly 
              value={publicFormUrl} 
              className="public-url-input" 
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <button 
              type="button" 
              className="btn-copy-carnet-link" 
              onClick={handleCopyLink}
              title="Copiar enlace al portapapeles"
            >
              📋 Copiar Enlace
            </button>
            <button 
              type="button" 
              className="btn-wa-carnet-link" 
              onClick={handleShareLinkWhatsApp}
              title="Compartir por WhatsApp"
            >
              💬 Enviar por WhatsApp
            </button>
            <a 
              href={publicFormUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-open-form-external"
              title="Abrir formulario en una pestaña nueva"
            >
              👁️ Probar Formulario ↗
            </a>
          </div>
          {copyFeedback && (
            <span className="copy-feedback-msg animate-fade-in">✓ {copyFeedback}</span>
          )}
        </div>
      </div>

      {/* 3. Panel de Configuración del Formulario y Credencial */}
      <div className="carnets-config-accordion-card">
        <div className="card-section-title">
          <span>⚙️</span>
          <h4>Parámetros de la Institución y Diseño de Carnet</h4>
        </div>

        <div className="carnets-config-grid">
          {/* Nombre de Institución */}
          <div className="admin-field-group">
            <label>Nombre de la Institución / Empresa *</label>
            <input
              type="text"
              value={localFormConfig.institutionName}
              onChange={(e) => updateConfigField('institutionName', e.target.value)}
              placeholder="Ej: Colegio Metropolitano o Corporación Volckan"
            />
          </div>

          {/* Título del Formulario */}
          <div className="admin-field-group">
            <label>Título del Formulario Público *</label>
            <input
              type="text"
              value={localFormConfig.title}
              onChange={(e) => updateConfigField('title', e.target.value)}
              placeholder="Ej: Formulario Oficial de Carnetización 2025"
            />
          </div>

          {/* Logo Institucional */}
          <div className="admin-field-group">
            <label>Logotipo Institucional (Se estampa en cada carnet)</label>
            <div className="logo-preview-upload-row">
              {localFormConfig.logoUrl ? (
                <img src={localFormConfig.logoUrl} alt="Logo" className="institution-logo-thumb" />
              ) : (
                <div className="institution-logo-empty">Sin Logo</div>
              )}
              <div className="logo-buttons-group">
                <button
                  type="button"
                  className="btn-upload-logo-action"
                  onClick={() => logoInputRef.current?.click()}
                >
                  📁 {localFormConfig.logoUrl ? 'Cambiar Logo' : 'Subir Logo PNG'}
                </button>
                {localFormConfig.logoUrl && (
                  <button
                    type="button"
                    className="btn-remove-logo-action"
                    onClick={() => updateConfigField('logoUrl', '')}
                  >
                    ✕ Quitar
                  </button>
                )}
              </div>
              <input
                type="file"
                ref={logoInputRef}
                onChange={handleLogoUpload}
                accept="image/png,image/jpeg,image/webp"
                style={{ display: 'none' }}
              />
            </div>
          </div>

          {/* Teléfono de Soporte */}
          <div className="admin-field-group">
            <label>Teléfono de Soporte WhatsApp para Notificaciones</label>
            <input
              type="text"
              value={localFormConfig.supportPhone || ''}
              onChange={(e) => updateConfigField('supportPhone', e.target.value)}
              placeholder="Ej: 50246741239"
            />
          </div>

          {/* Tema Predeterminado */}
          <div className="admin-field-group full-width">
            <label>Diseño de Fondo Predeterminado del Carnet</label>
            <div className="admin-theme-presets-row">
              {CARNET_THEMES.map(theme => (
                <button
                  key={theme.id}
                  type="button"
                  className={`admin-theme-preset-card ${localFormConfig.defaultThemeId === theme.id ? 'active' : ''}`}
                  onClick={() => {
                    soundEffects.playClick();
                    updateConfigField('defaultThemeId', theme.id);
                  }}
                >
                  <span className="preset-swatch" style={{ background: theme.frontBg, borderColor: theme.accentColor }} />
                  <strong>{theme.name}</strong>
                  <small>{theme.description}</small>
                </button>
              ))}
            </div>
          </div>

          {/* Opciones y Campos Exigidos */}
          <div className="admin-field-group full-width">
            <label>Campos Requeridos en el Formulario</label>
            <div className="admin-checkboxes-grid">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={localFormConfig.allowUserThemeSelection}
                  onChange={(e) => updateConfigField('allowUserThemeSelection', e.target.checked)}
                />
                <span>Permitir que el usuario elija su diseño de fondo</span>
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={localFormConfig.fields.requirePhoto}
                  onChange={(e) => updateFieldRequirement('requirePhoto', e.target.checked)}
                />
                <span>Exigir Fotografía Obligatoria</span>
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={localFormConfig.fields.requireBloodType}
                  onChange={(e) => updateFieldRequirement('requireBloodType', e.target.checked)}
                />
                <span>Incluir Tipo de Sangre en el Reverso</span>
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={localFormConfig.fields.requireEmergencyContact}
                  onChange={(e) => updateFieldRequirement('requireEmergencyContact', e.target.checked)}
                />
                <span>Incluir Contacto de Emergencia SOS</span>
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={localFormConfig.fields.requireEmergencyPhone}
                  onChange={(e) => updateFieldRequirement('requireEmergencyPhone', e.target.checked)}
                />
                <span>Incluir Teléfono de Emergencia</span>
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={localFormConfig.fields.requireGradeOrArea}
                  onChange={(e) => updateFieldRequirement('requireGradeOrArea', e.target.checked)}
                />
                <span>Incluir Grado / Área de Trabajo</span>
              </label>
            </div>
          </div>

          {/* Notas de Entrega */}
          <div className="admin-field-group full-width">
            <label>Aviso o Nota de Entrega Mostrada al Final del Formulario</label>
            <textarea
              rows={2}
              value={localFormConfig.deliveryNotes || ''}
              onChange={(e) => updateConfigField('deliveryNotes', e.target.value)}
              placeholder="Ej: Producción en PVC en 2 a 3 días hábiles. El carnet digital se descarga al instante."
            />
          </div>
        </div>
      </div>

      {/* 4. Lista de Carnets Recibidos y Gestión de Impresión */}
      <div className="carnets-submissions-section">
        <div className="submissions-section-header">
          <div className="submissions-title-group">
            <h4><span>🗂️</span> Carnets Recibidos y Solicitudes ({carnetSubmissions.length})</h4>
            <span className="submissions-subtitle">
              Gestiona, valida y exporta las credenciales enviadas por los usuarios.
            </span>
          </div>

          <div className="submissions-top-actions">
            <button
              type="button"
              className="btn-export-csv"
              onClick={handleExportCsv}
              disabled={carnetSubmissions.length === 0}
              title="Descargar base de datos completa compatible con Microsoft Excel y Google Sheets"
            >
              📊 Exportar a Excel (CSV)
            </button>
            <button
              type="button"
              className="btn-export-json"
              onClick={handleExportJson}
              disabled={carnetSubmissions.length === 0}
              title="Descargar respaldo estructurado en JSON"
            >
              💾 Respaldo JSON
            </button>
            <button
              type="button"
              className="btn-batch-print"
              onClick={handleExportBatch}
              disabled={isBatchGenerating || carnetSubmissions.length === 0}
              title="Generar PDF tamaño Carta con todos los carnets para imprenta"
            >
              {isBatchGenerating ? '⏳ Generando Lote PDF...' : '🖨️ Imprimir Lote Masivo en PDF'}
            </button>
          </div>
        </div>

        {/* Barra de Filtros y Búsqueda */}
        <div className="submissions-filters-bar">
          <div className="submissions-search-wrap">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Buscar por nombre, DPI, ID o cargo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="status-filter-buttons">
            <button
              type="button"
              className={`btn-filter-pill ${statusFilter === 'todos' ? 'active' : ''}`}
              onClick={() => setStatusFilter('todos')}
            >
              Todos ({carnetSubmissions.length})
            </button>
            <button
              type="button"
              className={`btn-filter-pill pending ${statusFilter === 'pendiente' ? 'active' : ''}`}
              onClick={() => setStatusFilter('pendiente')}
            >
              Pendientes ({carnetSubmissions.filter(s => s.status === 'pendiente').length})
            </button>
            <button
              type="button"
              className={`btn-filter-pill approved ${statusFilter === 'aprobado' ? 'active' : ''}`}
              onClick={() => setStatusFilter('aprobado')}
            >
              Aprobados ({carnetSubmissions.filter(s => s.status === 'aprobado').length})
            </button>
            <button
              type="button"
              className={`btn-filter-pill printed ${statusFilter === 'impreso' ? 'active' : ''}`}
              onClick={() => setStatusFilter('impreso')}
            >
              Impresos ({carnetSubmissions.filter(s => s.status === 'impreso').length})
            </button>
          </div>
        </div>

        {/* Tabla / Grid de Solicitudes */}
        {filteredSubmissions.length === 0 ? (
          <div className="submissions-empty-state">
            <span className="empty-state-icon">📭</span>
            <h5>No hay solicitudes de carnet registradas</h5>
            <p>
              Comparte el enlace del formulario con tus clientes o usuarios para empezar a recibir datos y fotografías.
            </p>
            <button 
              type="button" 
              className="btn-copy-carnet-link"
              onClick={handleCopyLink}
              style={{ marginTop: '10px' }}
            >
              📋 Copiar Enlace del Formulario
            </button>
          </div>
        ) : (
          <div className="submissions-cards-grid">
            {filteredSubmissions.map((sub) => {
              const theme = CARNET_THEMES.find(t => t.id === sub.themeId) || CARNET_THEMES[0];
              return (
                <div key={sub.id} className="submission-card-item">
                  <div className="sub-card-top">
                    <div className="sub-photo-thumb">
                      {sub.photoUrl ? (
                        <img src={sub.photoUrl} alt={sub.fullName} />
                      ) : (
                        <span className="empty-sub-avatar">👤</span>
                      )}
                    </div>
                    <div className="sub-main-info">
                      <strong className="sub-name">{sub.fullName}</strong>
                      <span className="sub-role-badge">{sub.role}</span>
                      <span className="sub-meta-id">ID: {sub.idNumber}</span>
                    </div>
                  </div>

                  <div className="sub-card-details">
                    {sub.gradeOrArea && <div><span>Área:</span> {sub.gradeOrArea}</div>}
                    {sub.bloodType && <div><span>Sangre:</span> 🩸 {sub.bloodType}</div>}
                    {sub.emergencyPhone && <div><span>Tel. SOS:</span> {sub.emergencyPhone}</div>}
                    <div><span>Diseño:</span> {theme.name}</div>
                    <div><span>Fecha:</span> {new Date(sub.createdAt).toLocaleDateString()}</div>
                  </div>

                  <div className="sub-card-status-bar">
                    <label>Estado:</label>
                    <select
                      value={sub.status}
                      onChange={(e) => updateCarnetSubmissionStatus(sub.id, e.target.value as any)}
                      className={`status-select ${sub.status}`}
                    >
                      <option value="pendiente">🟡 Pendiente</option>
                      <option value="aprobado">🟢 Aprobado</option>
                      <option value="impreso">🔵 Impreso</option>
                    </select>
                  </div>

                  <div className="sub-card-actions">
                    <button
                      type="button"
                      className="btn-sub-action view"
                      onClick={() => setPreviewSubmission(sub)}
                      title="Ver credencial frente y reverso"
                    >
                      👁️ Ver Carnet
                    </button>
                    <button
                      type="button"
                      className="btn-sub-action delete"
                      onClick={() => {
                        if (confirm(`¿Eliminar la solicitud de ${sub.fullName}?`)) {
                          deleteCarnetSubmission(sub.id);
                        }
                      }}
                      title="Eliminar solicitud"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL DE VISTA PREVIA Y EXPORTACIÓN INDIVIDUAL */}
      {previewSubmission && (
        <div className="admin-carnet-modal-overlay animate-fade-in">
          <div className="admin-carnet-modal">
            <div className="admin-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>🪪</span>
                <h4 style={{ margin: 0, color: '#ffffff' }}>{previewSubmission.fullName}</h4>
              </div>
              <button 
                type="button" 
                className="btn-close-modal-x"
                onClick={() => setPreviewSubmission(null)}
              >
                ✕
              </button>
            </div>

            <div className="admin-modal-card-stage">
              <CarnetCardPreview
                data={getSubmissionPreviewData(previewSubmission)}
                theme={CARNET_THEMES.find(t => t.id === previewSubmission.themeId) || CARNET_THEMES[0]}
                side="front"
                interactiveFlip={true}
                scale={0.96}
                frontRef={modalFrontRef}
                backRef={modalBackRef}
              />
            </div>

            <div className="admin-modal-actions-row">
              <button
                type="button"
                className="btn-modal-action print-pdf"
                onClick={async () => {
                  if (modalFrontRef.current && modalBackRef.current) {
                    await exportSingleCarnetPdf(modalFrontRef.current, modalBackRef.current, previewSubmission);
                    soundEffects.playSuccess();
                  }
                }}
              >
                🖨️ Descargar PDF (CR80 Bancario)
              </button>

              <button
                type="button"
                className="btn-modal-action digital-png"
                onClick={async () => {
                  if (modalFrontRef.current) {
                    const png = await captureElementToPng(modalFrontRef.current);
                    downloadImage(png, `Carnet_${previewSubmission.fullName.replace(/\s+/g, '_')}.png`);
                    soundEffects.playSuccess();
                  }
                }}
              >
                📱 Descargar PNG
              </button>

              <button
                type="button"
                className="btn-modal-action close"
                onClick={() => setPreviewSubmission(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCarnetServicesTab;
