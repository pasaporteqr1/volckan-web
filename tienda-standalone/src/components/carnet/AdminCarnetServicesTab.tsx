import React, { useState, useRef } from 'react';
import { useStoreConfig } from '../../context/StoreConfigContext';
import { CARNET_THEMES } from '../../data/carnetThemes';
import CarnetCardPreview, { type CarnetCardData, formatDpiString, formatPhoneString } from './CarnetCardPreview';
import { 
  exportSingleCarnetPdf, 
  exportBatchCarnetsPdf, 
  exportArchBBatchCarnetsPdf,
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
    refreshCarnetSubmissions,
    storeConfig
  } = useStoreConfig();

  // Estados de edición de configuración
  const [localFormConfig, setLocalFormConfig] = useState<CarnetServiceFormConfig>(carnetConfig);
  const [isSavingConfig, setIsSavingConfig] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
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

  // Enlace oficial directo para compartir (Formulario limpio sin vista previa lateral)
  const origin = window.location.origin;
  const pathname = window.location.pathname.replace(/\/admin\/?$/, '');
  const publicFormUrl = `${origin}${pathname}#/registro`;

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
      `¡Hola a todos! 👋`,
      `Les compartimos el enlace oficial para ingresar sus datos y fotografía para la acreditación y credencial oficial:`,
      `🔗 ${publicFormUrl}`,
      ``,
      `Por favor ingresen su nombre, DPI (13 dígitos), teléfono, empresa y departamento, y encuadren su fotografía con fondo claro. ¡Muchas gracias!`
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
        (sub.phone && sub.phone.toLowerCase().includes(q)) ||
        (sub.institutionRepresented && sub.institutionRepresented.toLowerCase().includes(q)) ||
        (sub.departmentMunicipality && sub.departmentMunicipality.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Función auxiliar para renderizar y capturar los carnets en formato vertical CR80
  const prepareVerticalCardsData = async (targetSubs: CarnetSubmission[]) => {
    // Contenedor temporal fuera de pantalla
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '-9999px';
    container.style.left = '-9999px';
    container.style.width = '350px';
    container.style.zIndex = '-100';
    document.body.appendChild(container);

    const cardsData: { frontDataUrl: string; backDataUrl: string; submission: CarnetSubmission }[] = [];

    for (const sub of targetSubs) {
      const theme = CARNET_THEMES.find(t => t.id === sub.themeId) || CARNET_THEMES[0];
      const qrUrl = await generateQrDataUrl(
        sub.qrToken || `https://volckan.com/tienda/#/carnet/verify?id=${encodeURIComponent(sub.idNumber)}&phone=${encodeURIComponent(sub.phone || '')}`
      );

      const logoSrc = localFormConfig.logoUrl || carnetConfig.logoUrl;

      // Elemento Frente Vertical (216px x 342px - Proporción CR80 53.98 x 85.60 mm)
      const frontEl = document.createElement('div');
      frontEl.style.width = '216px';
      frontEl.style.height = '342px';
      frontEl.style.borderRadius = '14px';
      frontEl.style.background = theme.frontBg;
      frontEl.style.border = `1.5px solid ${theme.borderColor}`;
      frontEl.style.overflow = 'hidden';
      frontEl.style.boxSizing = 'border-box';
      frontEl.style.padding = '8px 10px 10px 10px';
      frontEl.style.display = 'flex';
      frontEl.style.flexDirection = 'column';
      frontEl.style.justifyContent = 'space-between';
      frontEl.style.fontFamily = "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif";
      frontEl.style.color = theme.textColor;
      frontEl.style.textAlign = 'center';
      frontEl.style.position = 'relative';

      frontEl.innerHTML = `
        <!-- Fondo Cumbres SVG -->
        <svg style="position:absolute; top:0; left:0; width:100%; height:130px; opacity:0.18; pointer-events:none; z-index:0;" viewBox="0 0 400 220" fill="none">
          <path d="M-20 220L95 55L215 220H-20Z" fill="${theme.accentColor}" fill-opacity="0.5" />
          <path d="M120 220L245 35L380 220H120Z" fill="${theme.borderColor || '#38bdf8'}" fill-opacity="0.4" />
          <path d="M230 220L335 85L430 220H230Z" fill="${theme.accentColor}" fill-opacity="0.5" />
        </svg>

        <!-- Ranura Lanyard -->
        <div style="position:relative; z-index:2; display:flex; justify-content:center; margin-bottom:2px;">
          <div style="width:44px; height:6px; border-radius:999px; background:rgba(7,17,32,0.9); border:1px solid rgba(255,255,255,0.22); box-shadow:inset 0 1px 3px rgba(0,0,0,0.7);"></div>
        </div>

        <!-- 1. Cabecera Institucional: Logotipo Prominente + Organizador + Evento -->
        <div style="position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; gap:2px;">
          ${logoSrc ? `
            <div style="display:flex; justify-content:center; align-items:center; margin-bottom:1px;">
              <img src="${logoSrc}" style="height:32px; max-width:80px; object-fit:contain; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.45));" />
            </div>
          ` : `
            <div style="width:30px; height:30px; border-radius:6px; background:${theme.badgeBg}; border:1px solid ${theme.borderColor}; display:flex; align-items:center; justify-content:center; font-size:14px; margin-bottom:1px;">⚡</div>
          `}
          
          <div style="display:inline-flex; align-items:center; gap:4px; padding:2px 8px; border-radius:999px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.16); max-width:98%;">
            <span style="width:5px; height:5px; border-radius:50%; background:${theme.accentColor}; box-shadow:0 0 6px ${theme.accentColor}; flex-shrink:0;"></span>
            <span style="font-size:5.8px; font-weight:700; text-transform:uppercase; letter-spacing:0.04em; white-space:normal; line-height:1.15; word-break:break-word;">
              ${sub.institutionName || localFormConfig.institutionName}
            </span>
          </div>

          <div style="font-size:8.5px; font-weight:800; line-height:1.15; text-transform:uppercase; letter-spacing:-0.01em; margin-top:1px; white-space:normal; word-break:break-word;">
            SUMMIT DE COMPETITIVIDAD <span style="color:${theme.accentColor}; font-weight:800;">2026</span>
          </div>
          <div style="font-size:5px; color:${theme.subtextColor}; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; white-space:normal; line-height:1.18;">
            Innovación · Productividad · Desarrollo Regional
          </div>
        </div>

        <!-- 2. Foto con Anillo Rectangular Vertical (Proporción 3:4) y Sello de Verificación -->
        <div style="position:relative; z-index:2; display:flex; justify-content:center; margin:3px 0;">
          <div style="width:78px; height:104px; border-radius:16px; padding:2.5px; background:linear-gradient(135deg, ${theme.accentColor} 0%, rgba(56,189,248,0.85) 100%); box-shadow:0 6px 16px rgba(0,0,0,0.55); position:relative;">
            <div style="width:100%; height:100%; border-radius:13.5px; overflow:hidden; background:#020617; display:flex; align-items:center; justify-content:center;">
              ${sub.photoUrl ? `<img src="${sub.photoUrl}" style="width:100%; height:100%; object-fit:cover;" />` : `<div style="color:${theme.subtextColor}; font-size:8px; font-weight:700;">FOTOGRAFÍA</div>`}
            </div>
            <div style="position:absolute; bottom:-2px; right:-2px; width:18px; height:18px; border-radius:5px; background:${theme.accentColor}; color:#071120; font-size:9px; font-weight:900; display:flex; align-items:center; justify-content:center; border:1.5px solid #071120;">
              ✓
            </div>
          </div>
        </div>

        <!-- 3. Jerarquía del Titular (Sin corte de textos y con mayor tamaño) -->
        <div style="position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; gap:3px;">
          <div style="font-size:11px; font-weight:800; line-height:1.15; text-transform:uppercase; letter-spacing:-0.01em; margin:1px 0 2px 0; white-space:normal; word-break:break-word;">
            ${sub.fullName}
          </div>
          ${sub.institutionRepresented ? `
            <div style="width:100%; padding:4px 8px; border-radius:8px; background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.15); box-sizing:border-box;">
              <div style="font-size:5.2px; font-weight:800; color:${theme.accentColor}; text-transform:uppercase; letter-spacing:0.07em;">EMPRESA / INSTITUCIÓN</div>
              <div style="font-size:9.5px; font-weight:800; white-space:normal; line-height:1.24; word-break:break-word; text-align:center;">${sub.institutionRepresented}</div>
            </div>
          ` : ''}
          <div style="width:100%; display:flex; justify-content:space-between; align-items:center; padding:4px 8px; border-radius:8px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); box-sizing:border-box;">
            ${sub.phone ? `
              <div style="display:flex; align-items:center; gap:4px;">
                <span style="font-size:8px;">📱</span>
                <span style="font-size:8.8px; font-family:'JetBrains Mono', monospace; font-weight:800; letter-spacing:0.02em;">${formatPhoneString(sub.phone)}</span>
              </div>
            ` : '<span></span>'}
            ${sub.departmentMunicipality ? `
              <div style="font-size:8.5px; font-weight:800; white-space:normal; line-height:1.18; word-break:break-word; text-align:right; max-width:115px;">
                📍 ${sub.departmentMunicipality}
              </div>
            ` : ''}
          </div>
        </div>

        <!-- 4. Pie de Seguridad -->
        <div style="position:relative; z-index:2; display:flex; justify-content:space-between; font-size:5.5px; border-top:1px solid rgba(255,255,255,0.12); padding-top:2px;">
          <span style="font-weight:800; color:${theme.accentColor};">volckan.com</span>
          <span style="font-family:'JetBrains Mono', monospace; color:${theme.subtextColor};">◈ OFICIAL CR80 ◈</span>
        </div>
      `;

      // Elemento Reverso Vertical
      const backEl = document.createElement('div');
      backEl.style.width = '216px';
      backEl.style.height = '342px';
      backEl.style.borderRadius = '14px';
      backEl.style.background = theme.backBg;
      backEl.style.border = `1.5px solid ${theme.borderColor}`;
      backEl.style.overflow = 'hidden';
      backEl.style.boxSizing = 'border-box';
      backEl.style.padding = '8px 10px 10px 10px';
      backEl.style.display = 'flex';
      backEl.style.flexDirection = 'column';
      backEl.style.justifyContent = 'space-between';
      backEl.style.fontFamily = "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif";
      backEl.style.color = theme.textColor;
      backEl.style.textAlign = 'center';
      backEl.style.position = 'relative';

      backEl.innerHTML = `
        <!-- Ranura Lanyard -->
        <div style="display:flex; justify-content:center; margin-bottom:2px;">
          <div style="width:44px; height:6px; border-radius:999px; background:rgba(7,17,32,0.9); border:1px solid rgba(255,255,255,0.22); box-shadow:inset 0 1px 3px rgba(0,0,0,0.7);"></div>
        </div>

        <!-- Banda Magnética -->
        <div style="height:10px; background:#000; margin:-2px -10px 3px -10px;"></div>

        <!-- QR de Validación -->
        <div style="display:flex; flex-direction:column; align-items:center; gap:2px; margin:2px 0;">
          <div style="width:84px; height:84px; background:#fff; padding:4px; border-radius:10px; border:2px solid ${theme.accentColor}; box-shadow:0 4px 12px rgba(0,0,0,0.45);">
            <img src="${qrUrl}" style="width:100%; height:100%; object-fit:contain;" />
          </div>
          <span style="font-size:5.5px; font-weight:800; color:${theme.accentColor}; letter-spacing:0.06em; text-transform:uppercase;">
            ESCANEAR PARA VALIDAR ACCESO
          </span>
        </div>

        <!-- Rejilla de Zonas Habilitadas -->
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:4px; width:100%;">
          <div style="padding:2.5px 0; border-radius:5px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); font-size:5px; font-weight:800;">CONFERENCIA</div>
          <div style="padding:2.5px 0; border-radius:5px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); font-size:5px; font-weight:800;">PANELES</div>
          <div style="padding:2.5px 0; border-radius:5px; background:rgba(245,158,11,0.14); border:1px solid ${theme.accentColor}; color:${theme.accentColor}; font-size:5px; font-weight:800;">NETWORKING</div>
        </div>

        <!-- Normativa Oficial -->
        <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:7px; padding:4px 6px; font-size:5px; text-align:left; line-height:1.35;">
          <strong style="color:${theme.textColor}; text-transform:uppercase; letter-spacing:0.03em;">CREDENCIAL PERSONAL E INTRANSFERIBLE</strong>
          <div style="color:${theme.subtextColor};">Pase oficial emitido para ${sub.institutionName || localFormConfig.institutionName}. Su portación es obligatoria para el acceso a salones y actividades.</div>
        </div>

        <!-- Resumen del Titular -->
        <div style="background:rgba(0,0,0,0.3); border-radius:6px; padding:3px 6px; font-size:5.5px; text-align:left; display:flex; flex-direction:column; gap:1px;">
          <div style="font-weight:800; color:${theme.accentColor}; font-size:6.5px;">${sub.fullName}</div>
          ${sub.phone ? `<div>TEL: <strong>${formatPhoneString(sub.phone)}</strong></div>` : ''}
          ${sub.institutionRepresented ? `<div>ENTIDAD: <strong>${sub.institutionRepresented}</strong></div>` : ''}
        </div>

        <!-- Pie Reverso -->
        <div style="display:flex; justify-content:space-between; font-size:5.5px; border-top:1px solid rgba(255,255,255,0.1); padding-top:2px;">
          <span style="color:${theme.accentColor}; font-weight:800;">volckan.com</span>
          <span style="color:${theme.subtextColor};">VERIFICACIÓN OFICIAL</span>
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
    return cardsData;
  };

  // Exportar lote en Pliego Arch B (12" x 18" / 16 carnets por pliego con tiro y retiro)
  const handleExportBatchArchB = async () => {
    const targetSubs = filteredSubmissions.length > 0 ? filteredSubmissions : carnetSubmissions;
    if (targetSubs.length === 0) {
      alert('No hay credenciales registradas para generar el lote.');
      return;
    }

    setIsBatchGenerating(true);
    soundEffects.playClick();

    try {
      const cardsData = await prepareVerticalCardsData(targetSubs);
      await exportArchBBatchCarnetsPdf(cardsData, localFormConfig.institutionName);
      soundEffects.playSuccessFanfare();
      alert(`¡Pliego Industrial Arch B (12"x18") generado exitosamente para ${cardsData.length} credenciales!`);
    } catch (err) {
      console.error('Error generando pliego Arch B:', err);
      alert('Ocurrió un error al generar el pliego Arch B.');
    } finally {
      setIsBatchGenerating(false);
    }
  };

  // Exportar lote en Hoja Carta (Letter: 6 carnets verticales por hoja con tiro y retiro)
  const handleExportBatchLetter = async () => {
    const targetSubs = filteredSubmissions.length > 0 ? filteredSubmissions : carnetSubmissions;
    if (targetSubs.length === 0) {
      alert('No hay credenciales registradas para generar el lote.');
      return;
    }

    setIsBatchGenerating(true);
    soundEffects.playClick();

    try {
      const cardsData = await prepareVerticalCardsData(targetSubs);
      await exportBatchCarnetsPdf(cardsData, localFormConfig.institutionName);
      soundEffects.playSuccessFanfare();
      alert(`¡Lote de ${cardsData.length} credenciales generado exitosamente en PDF tamaño Carta!`);
    } catch (err) {
      console.error('Error generando lote tamaño Carta:', err);
      alert('Ocurrió un error al generar el lote tamaño Carta.');
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
      'DPI (13 Dígitos)',
      'Teléfono (+502)',
      'Empresa / Institución',
      'Departamento / Municipio',
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
      escapeCsv(formatDpiString(s.idNumber)),
      escapeCsv(formatPhoneString(s.phone)),
      escapeCsv(s.institutionRepresented || ''),
      escapeCsv(s.departmentMunicipality || ''),
      escapeCsv(s.themeId),
      escapeCsv(s.photoUrl),
      escapeCsv(s.qrToken)
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Carnets_Conferencia_${new Date().toISOString().slice(0, 10)}.csv`;
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
    phone: sub.phone,
    role: sub.role,
    institutionRepresented: sub.institutionRepresented,
    departmentMunicipality: sub.departmentMunicipality,
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
            Al abrir este enlace, los interesados ingresan a un formulario ágil y optimizado para móviles (sin vista previa pesada), ideal para compartir en grupos de WhatsApp y redes.
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
            <label>Campos Requeridos en el Formulario (Uso Comercial / Conferencias)</label>
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
                <span>Exigir Fotografía Oficial (con encuadre)</span>
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={localFormConfig.fields.requireIdNumber}
                  onChange={(e) => updateFieldRequirement('requireIdNumber', e.target.checked)}
                />
                <span>Exigir DPI de 13 dígitos numéricos</span>
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={localFormConfig.fields.requirePhone}
                  onChange={(e) => updateFieldRequirement('requirePhone', e.target.checked)}
                />
                <span>Exigir Teléfono Móvil (+502 con 8 dígitos)</span>
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={localFormConfig.fields.requireInstitutionRepresented}
                  onChange={(e) => updateFieldRequirement('requireInstitutionRepresented', e.target.checked)}
                />
                <span>Exigir Institución o Empresa que Representa</span>
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={localFormConfig.fields.requireDepartmentMunicipality}
                  onChange={(e) => updateFieldRequirement('requireDepartmentMunicipality', e.target.checked)}
                />
                <span>Exigir Departamento / Municipio de Procedencia</span>
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
              className="btn-sync-cloud"
              onClick={async () => {
                setIsRefreshing(true);
                soundEffects.playClick();
                await refreshCarnetSubmissions();
                setTimeout(() => setIsRefreshing(false), 800);
                soundEffects.playSuccess();
              }}
              disabled={isRefreshing}
              title="Sincronizar y recargar registros directamente desde la nube Firestore"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(34, 197, 94, 0.15)',
                color: '#4ade80',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                padding: '8px 14px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              <span>{isRefreshing ? '⏳' : '🔄'}</span>
              <span>{isRefreshing ? 'Sincronizando...' : 'Sincronizar Nube'}</span>
            </button>
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
              className="btn-batch-archb"
              onClick={handleExportBatchArchB}
              disabled={isBatchGenerating || carnetSubmissions.length === 0}
              title="Generar pliego industrial Arch B (12x18 pulgadas) con 16 credenciales por pliego y guías de corte"
            >
              {isBatchGenerating ? '⏳ Procesando...' : '🖨️ Pliego Arch B (12"×18")'}
            </button>
            <button
              type="button"
              className="btn-batch-print"
              onClick={handleExportBatchLetter}
              disabled={isBatchGenerating || carnetSubmissions.length === 0}
              title="Generar PDF tamaño Carta con credenciales verticales y alineación dúplex"
            >
              {isBatchGenerating ? '⏳ Procesando...' : '📄 Hoja Carta (6/hoja)'}
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
                      <span className="sub-role-badge">📱 {formatPhoneString(sub.phone)}</span>
                      <span className="sub-meta-id">DPI: {formatDpiString(sub.idNumber)}</span>
                    </div>
                  </div>

                  <div className="sub-card-details">
                    {sub.phone && <div><span>Teléfono:</span> 📞 {formatPhoneString(sub.phone)}</div>}
                    {sub.institutionRepresented && <div><span>Empresa:</span> {sub.institutionRepresented}</div>}
                    {sub.departmentMunicipality && <div><span>Procedencia:</span> 📍 {sub.departmentMunicipality}</div>}
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
                orientation="vertical"
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
                    await exportSingleCarnetPdf(modalFrontRef.current, modalBackRef.current, previewSubmission, 'vertical');
                    soundEffects.playSuccess();
                  }
                }}
              >
                🖨️ Descargar PDF (CR80 Vertical)
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
