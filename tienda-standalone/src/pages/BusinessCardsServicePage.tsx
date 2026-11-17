import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreTopBar from '../components/StoreTopBar';
import { CardEditorModal } from '../components/tarjetas/CardEditorModal';
import {
  exportPrintSheetPdf,
  PRINT_FORMATS,
  type PrintFormatId
} from '../utils/businessCardExport';
import { useStoreConfig } from '../context/StoreConfigContext';
import { CONTACT } from '../constants';
import { soundEffects } from '../utils/soundEffects';
import './BusinessCardsServicePage.css';

export default function BusinessCardsServicePage() {
  const navigate = useNavigate();
  const { storeConfig } = useStoreConfig();

  const [formatId, setFormatId] = useState<PrintFormatId>('arch_b_90x50');
  const [doubleSided, setDoubleSided] = useState<boolean>(false);
  const [sheetsCount, setSheetsCount] = useState<number>(1);
  const [clientName, setClientName] = useState<string>('');

  // Imágenes originales y recortadas/editadas
  const [frontRawSrc, setFrontRawSrc] = useState<string>('');
  const [frontFinalUrl, setFrontFinalUrl] = useState<string>('');
  const [backRawSrc, setBackRawSrc] = useState<string>('');
  const [backFinalUrl, setBackFinalUrl] = useState<string>('');

  // Control del modal de edición y corte
  const [editorTarget, setEditorTarget] = useState<'front' | 'back' | null>(null);
  const [previewSide, setPreviewSide] = useState<'front' | 'back'>('front');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const spec = PRINT_FORMATS[formatId];
  const isFlyer = spec.category === 'flyer';
  const pieceWord = isFlyer ? 'volantes' : 'tarjetas';
  const sheetWord = isFlyer ? 'Hoja' : 'Pliego';
  const sheetWordPlural = isFlyer ? 'Hojas' : 'Pliegos';

  const notify = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(prev => (prev === msg ? null : prev)), 4000);
  };

  const handleSelectFormat = (nextId: PrintFormatId) => {
    if (nextId === formatId) return;
    const prevCategory = spec.category;
    const nextSpec = PRINT_FORMATS[nextId];
    setFormatId(nextId);
    soundEffects.playClick();

    // Si cambia entre tarjeta (horizontal) y volante (vertical), avisar si ya había diseño subido
    if (prevCategory !== nextSpec.category && (frontRawSrc || backRawSrc)) {
      if (frontRawSrc) {
        setEditorTarget('front');
      }
      notify(`📐 Formato cambiado a ${nextSpec.label}. Ajusta el recorte a la nueva proporción.`);
    }
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      notify('⚠️ Por favor sube una imagen válida (PNG, JPG o WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      if (side === 'front') {
        setFrontRawSrc(dataUrl);
      } else {
        setBackRawSrc(dataUrl);
      }
      setEditorTarget(side);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleApplyCrop = (croppedDataUrl: string) => {
    if (editorTarget === 'front') {
      setFrontFinalUrl(croppedDataUrl);
      setPreviewSide('front');
    } else if (editorTarget === 'back') {
      setBackFinalUrl(croppedDataUrl);
      setPreviewSide('back');
    }
    setEditorTarget(null);
    notify(`✅ Diseño ajustado al formato ${spec.trimW} × ${spec.trimH} mm con sangrado.`);
  };

  const totalPieces = sheetsCount * spec.perSheet;
  const trimLabel = `${spec.trimW} × ${spec.trimH} mm`;

  const handleDownloadPdf = async () => {
    if (!frontFinalUrl) {
      notify('⚠️ Primero sube y ajusta el diseño frontal.');
      return;
    }
    if (doubleSided && !backFinalUrl) {
      notify('⚠️ Seleccionaste 2 caras: sube y ajusta también el diseño del reverso.');
      return;
    }

    setIsGeneratingPdf(true);
    soundEffects.playClick();
    try {
      await exportPrintSheetPdf({
        frontDataUrl: frontFinalUrl,
        backDataUrl: doubleSided ? backFinalUrl : undefined,
        sheetsCount,
        formatId,
        doubleSided,
        clientName: clientName.trim() || 'Volckan_Print'
      });
      soundEffects.playSuccessFanfare();
      notify(
        `✅ PDF generado con compresión 300 DPI: ${sheetsCount} ${sheetsCount === 1 ? sheetWord.toLowerCase() : sheetWordPlural.toLowerCase()} · ${totalPieces} ${pieceWord}.`
      );
    } catch (err) {
      console.error('Error generando PDF:', err);
      notify('❌ Ocurrió un error al generar el PDF.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const targetPhone = storeConfig.whatsappPhone || CONTACT.whatsappPhone || '50252493030';
  const waText = encodeURIComponent(
    [
      '¡Hola Tecno Volckánica! 👋',
      `Deseo solicitar impresión de *${isFlyer ? 'Volantes 1/4 de Carta' : 'Tarjetas de Presentación'}*:`,
      `• Formato de papel: ${spec.sheetLabel}`,
      `• Medida final de corte: ${trimLabel}`,
      `• Cantidad: *${sheetsCount} ${sheetsCount === 1 ? sheetWord.toLowerCase() : sheetWordPlural.toLowerCase()}* (${totalPieces} ${pieceWord} en total, ${spec.perSheet} por hoja)`,
      `• Modalidad: ${doubleSided ? 'Doble Cara (Tiro y Retiro)' : '1 Cara (Solo Frente)'}`,
      clientName.trim() ? `• Referencia: ${clientName.trim()}` : '',
      '',
      'Ya preparé mi PDF con guías de corte desde la tienda web. ¿Me confirman precio y tiempo de entrega?'
    ]
      .filter(Boolean)
      .join('\n')
  );
  const waUrl = `https://wa.me/${targetPhone}?text=${waText}`;

  const activePreviewImg = previewSide === 'back' && doubleSided && backFinalUrl ? backFinalUrl : frontFinalUrl;
  const quickCounts = isFlyer ? [5, 10, 25, 50, 100] : [1, 2, 4, 8, 10, 20];

  return (
    <div className="cards-service-root animate-fade-in">
      <StoreTopBar slogan="Estudio de Impresión · Tarjetas (Arch B) y Volantes 1/4 Carta (US Letter / A4)" />

      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            top: '84px',
            right: '20px',
            zIndex: 1300,
            background: '#0f172a',
            border: '1px solid rgba(249, 115, 22, 0.5)',
            color: '#f8fafc',
            padding: '12px 18px',
            borderRadius: '12px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.45)',
            fontSize: '0.86rem',
            fontWeight: 600
          }}
        >
          {toastMsg}
        </div>
      )}

      <main className="cards-service-container">
        <div className="cards-hero-bar">
          <div>
            <span className="cards-hero-badge">Volckan Print Studio · Imposición Automática + Compresión 300 DPI</span>
            <h1>
              {isFlyer
                ? '📄 Volantes 1/4 de Carta (US Letter / A4)'
                : '🪪 Tarjetas de Presentación en Pliego Arch B'}
            </h1>
            <p>
              {isFlyer
                ? `Aprovechamiento óptimo de 4 volantes por hoja (2×2 en ${spec.id === 'flyer_a4' ? 'A4' : 'US Letter'}) con editor de ajuste, corte y marcas de guillotina.`
                : 'Aprovechamiento máximo de 24 tarjetas por pliego (3×8 en 304.8 × 457.2 mm) con editor de ajuste, corte y marcas de guillotina.'}
            </p>
          </div>
          <button
            type="button"
            className="cards-back-btn"
            onClick={() => {
              soundEffects.playClick();
              navigate('/');
            }}
          >
            ← Volver a la Tienda
          </button>
        </div>

        <div className="cards-workspace-grid">
          {/* COLUMNA IZQUIERDA: Configuración, Subida y Edición */}
          <div className="cards-panel-box">
            {/* Paso 1: Producto / Formato */}
            <div>
              <h2 className="cards-section-title">
                <span className="cards-step-pill">1</span> Elige el Formato de Impresión y Caras
              </h2>

              <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 700 }}>
                🪪 Tarjetas de Presentación (Pliego Arch B · 24/pliego)
              </div>
              <div className="cards-options-row" style={{ marginBottom: '12px' }}>
                <button
                  type="button"
                  className={`cards-option-btn ${formatId === 'arch_b_90x50' ? 'active' : ''}`}
                  onClick={() => handleSelectFormat('arch_b_90x50')}
                >
                  <strong>90 × 50 mm (Estándar)</strong>
                  <span>Arch B · 24 tarjetas/pliego</span>
                </button>
                <button
                  type="button"
                  className={`cards-option-btn ${formatId === 'arch_b_88.9x50.8' ? 'active' : ''}`}
                  onClick={() => handleSelectFormat('arch_b_88.9x50.8')}
                >
                  <strong>88.9 × 50.8 mm (3.5"×2")</strong>
                  <span>Arch B · 24 tarjetas/pliego</span>
                </button>
              </div>

              <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 700 }}>
                📄 Volantes 1/4 de Carta (4 por hoja · Grilla 2×2)
              </div>
              <div className="cards-options-row" style={{ marginBottom: '12px' }}>
                <button
                  type="button"
                  className={`cards-option-btn ${formatId === 'flyer_letter' ? 'active' : ''}`}
                  onClick={() => handleSelectFormat('flyer_letter')}
                >
                  <strong>US Letter (1/4 Carta)</strong>
                  <span>215.9 × 279.4 mm · 4/hoja (100×131 mm)</span>
                </button>
                <button
                  type="button"
                  className={`cards-option-btn ${formatId === 'flyer_a4' ? 'active' : ''}`}
                  onClick={() => handleSelectFormat('flyer_a4')}
                >
                  <strong>A4 (2ª Opción)</strong>
                  <span>210 × 297 mm · 4/hoja (97×140 mm)</span>
                </button>
              </div>

              <div className="cards-options-row">
                <button
                  type="button"
                  className={`cards-option-btn ${!doubleSided ? 'active' : ''}`}
                  onClick={() => {
                    setDoubleSided(false);
                    setPreviewSide('front');
                  }}
                >
                  <strong>1 Cara (Solo Frente)</strong>
                  <span>Tiro a todo color</span>
                </button>
                <button
                  type="button"
                  className={`cards-option-btn ${doubleSided ? 'active' : ''}`}
                  onClick={() => setDoubleSided(true)}
                >
                  <strong>2 Caras (Tiro y Retiro)</strong>
                  <span>Espejado dúplex automático</span>
                </button>
              </div>
            </div>

            {/* Paso 2: Subir y Ajustar Diseño */}
            <div>
              <h2 className="cards-section-title">
                <span className="cards-step-pill">2</span> Sube tu Diseño y Ajústalo para Corte
              </h2>

              <div className="cards-upload-box" style={{ marginBottom: doubleSided ? '10px' : '0' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#e2e8f0' }}>
                  Diseño Frontal (Tiro) *
                </div>
                <input
                  ref={frontInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileSelected(e, 'front')}
                />

                {frontFinalUrl ? (
                  <div className="cards-upload-preview">
                    <img
                      src={frontFinalUrl}
                      alt="Frente ajustado"
                      className="cards-upload-thumb"
                      style={{
                        aspectRatio: `${spec.trimW + spec.bleed * 2} / ${spec.trimH + spec.bleed * 2}`,
                        width: isFlyer ? '95px' : '145px'
                      }}
                    />
                    <div className="cards-upload-actions">
                      <button
                        type="button"
                        className="btn-cards-edit"
                        onClick={() => setEditorTarget('front')}
                      >
                        ✂️ Ajustar / Recortar
                      </button>
                      <button
                        type="button"
                        className="btn-cards-upload"
                        onClick={() => frontInputRef.current?.click()}
                      >
                        🔄 Cambiar Imagen
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn-cards-upload"
                    onClick={() => frontInputRef.current?.click()}
                  >
                    📤 Subir Imagen de Frente (PNG / JPG)
                  </button>
                )}
              </div>

              {doubleSided && (
                <div className="cards-upload-box">
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#e2e8f0' }}>
                    Diseño Posterior (Retiro) *
                  </div>
                  <input
                    ref={backInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileSelected(e, 'back')}
                  />

                  {backFinalUrl ? (
                    <div className="cards-upload-preview">
                      <img
                        src={backFinalUrl}
                        alt="Reverso ajustado"
                        className="cards-upload-thumb"
                        style={{
                          aspectRatio: `${spec.trimW + spec.bleed * 2} / ${spec.trimH + spec.bleed * 2}`,
                          width: isFlyer ? '95px' : '145px'
                        }}
                      />
                      <div className="cards-upload-actions">
                        <button
                          type="button"
                          className="btn-cards-edit"
                          onClick={() => setEditorTarget('back')}
                        >
                          ✂️ Ajustar / Recortar
                        </button>
                        <button
                          type="button"
                          className="btn-cards-upload"
                          onClick={() => backInputRef.current?.click()}
                        >
                          🔄 Cambiar Imagen
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="btn-cards-upload"
                      onClick={() => backInputRef.current?.click()}
                    >
                      📤 Subir Imagen de Reverso (PNG / JPG)
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Paso 3: Cantidad de Pliegos / Hojas */}
            <div className="cards-sheets-selector">
              <h2 className="cards-section-title">
                <span className="cards-step-pill">3</span> ¿Cuántos {sheetWordPlural} deseas?
              </h2>

              <div className="cards-sheets-counter">
                <button
                  type="button"
                  className="cards-qty-btn"
                  onClick={() => setSheetsCount(s => Math.max(1, s - 1))}
                >
                  −
                </button>
                <div className="cards-qty-display">
                  <strong>{sheetsCount} {sheetsCount === 1 ? sheetWord : sheetWordPlural}</strong>
                  <span>{totalPieces} {pieceWord}</span>
                </div>
                <button
                  type="button"
                  className="cards-qty-btn"
                  onClick={() => setSheetsCount(s => Math.min(50, s + 1))}
                >
                  +
                </button>
              </div>

              <div className="cards-quick-chips">
                {quickCounts.map((qty) => (
                  <button
                    key={qty}
                    type="button"
                    className={`cards-chip-btn ${sheetsCount === qty ? 'active' : ''}`}
                    onClick={() => setSheetsCount(qty)}
                  >
                    {qty} {qty === 1 ? sheetWord.toLowerCase() : sheetWordPlural.toLowerCase()} ({qty * spec.perSheet})
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Nombre de referencia o empresa (opcional para el archivo PDF)"
                style={{
                  width: '100%',
                  background: '#020617',
                  border: '1px solid rgba(148, 163, 184, 0.25)',
                  borderRadius: '10px',
                  padding: '9px 12px',
                  color: '#ffffff',
                  fontSize: '0.84rem'
                }}
              />
            </div>

            {/* Resumen Técnico */}
            <div className="cards-summary-box">
              <div className="cards-summary-row">
                <span>Formato de Papel:</span>
                <strong>{spec.sheetLabel}</strong>
              </div>
              <div className="cards-summary-row">
                <span>Disposición Optimizada:</span>
                <strong>{spec.cols} Columnas × {spec.rows} Filas ({spec.perSheet} {pieceWord}/hoja)</strong>
              </div>
              <div className="cards-summary-row">
                <span>Medida de Corte:</span>
                <strong>{trimLabel} (+{spec.bleed} mm sangrado)</strong>
              </div>
              <div className="cards-summary-row">
                <span>Total a Producir:</span>
                <strong style={{ color: '#34d399' }}>
                  {sheetsCount} {sheetsCount === 1 ? sheetWord.toLowerCase() : sheetWordPlural.toLowerCase()} · {totalPieces} {pieceWord}
                </strong>
              </div>
            </div>

            {/* Acciones Finales */}
            <div className="cards-actions-stack">
              <button
                type="button"
                className="btn-cards-pdf"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf || !frontFinalUrl}
              >
                {isGeneratingPdf
                  ? '⏳ Generando PDF Optimizado...'
                  : `📥 Descargar PDF (${sheetsCount} ${sheetsCount === 1 ? sheetWord : sheetWordPlural} · ${totalPieces} ${pieceWord})`}
              </button>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cards-wa"
                onClick={() => soundEffects.playSuccessFanfare()}
              >
                💬 Enviar Pedido de Impresión por WhatsApp ({CONTACT.phoneDisplay})
              </a>
            </div>
          </div>

          {/* COLUMNA DERECHA: Vista Previa en Vivo del Pliego / Hoja */}
          <div className="archb-preview-card">
            <div className="archb-preview-header">
              <h3>
                📄 Vista Previa ({spec.perSheet} {pieceWord} por {sheetWord.toLowerCase()})
              </h3>
              {doubleSided && (
                <div className="cards-quick-chips">
                  <button
                    type="button"
                    className={`cards-chip-btn ${previewSide === 'front' ? 'active' : ''}`}
                    onClick={() => setPreviewSide('front')}
                  >
                    Tiro (Frente)
                  </button>
                  <button
                    type="button"
                    className={`cards-chip-btn ${previewSide === 'back' ? 'active' : ''}`}
                    onClick={() => setPreviewSide('back')}
                  >
                    Retiro (Reverso)
                  </button>
                </div>
              )}
            </div>

            <div
              className="archb-sheet-paper"
              style={{
                aspectRatio: `${spec.sheetW} / ${spec.sheetH}`
              }}
            >
              <div className="archb-paper-slug">
                {spec.label.toUpperCase()} · {spec.perSheet} {pieceWord.toUpperCase()} · {previewSide === 'back' ? 'RETIRO ESPEJADO' : 'TIRO'}
              </div>

              <div className={`archb-cards-grid ${isFlyer ? 'is-flyer-grid' : ''}`}>
                {Array.from({ length: spec.perSheet }).map((_, idx) => (
                  <div key={idx} className="archb-card-slot">
                    {activePreviewImg ? (
                      <img src={activePreviewImg} alt={`${pieceWord} ${idx + 1}`} />
                    ) : (
                      <span>#{idx + 1}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="archb-cmyk-bar">
                <span style={{ background: '#00b4e6' }} />
                <span style={{ background: '#e60078' }} />
                <span style={{ background: '#fadc00' }} />
                <span style={{ background: '#141414' }} />
                <span style={{ background: '#646464' }} />
                <span style={{ background: '#b4b4b4' }} />
                <span style={{ background: '#eb3223' }} />
                <span style={{ background: '#28a03c' }} />
                <span style={{ background: '#1e50be' }} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <CardEditorModal
        isOpen={editorTarget !== null}
        imageSrc={editorTarget === 'back' ? backRawSrc : frontRawSrc}
        sideLabel={editorTarget === 'back' ? 'Reverso (Retiro)' : 'Frente (Tiro)'}
        formatSpec={spec}
        onApply={handleApplyCrop}
        onCancel={() => setEditorTarget(null)}
      />
    </div>
  );
}
