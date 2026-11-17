import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreTopBar from '../components/StoreTopBar';
import { CardEditorModal } from '../components/tarjetas/CardEditorModal';
import { exportBusinessCardsArchBPdf, ARCH_B_SHEET } from '../utils/businessCardExport';
import { useStoreConfig } from '../context/StoreConfigContext';
import { CONTACT } from '../constants';
import { soundEffects } from '../utils/soundEffects';
import './BusinessCardsServicePage.css';

export default function BusinessCardsServicePage() {
  const navigate = useNavigate();
  const { storeConfig } = useStoreConfig();

  const [cardFormat, setCardFormat] = useState<'90x50' | '88.9x50.8'>('90x50');
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

  const notify = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(prev => (prev === msg ? null : prev)), 4000);
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
    notify('✅ Diseño ajustado y encuadrado al tamaño estándar con sangrado.');
  };

  const totalCards = sheetsCount * ARCH_B_SHEET.cardsPerSheet;
  const trimLabel = cardFormat === '88.9x50.8' ? '88.9 × 50.8 mm (3.5" × 2")' : '90 × 50 mm';

  const handleDownloadArchBPdf = async () => {
    if (!frontFinalUrl) {
      notify('⚠️ Primero sube y ajusta el diseño del frente de tu tarjeta.');
      return;
    }
    if (doubleSided && !backFinalUrl) {
      notify('⚠️ Seleccionaste 2 caras: sube y ajusta también el diseño del reverso.');
      return;
    }

    setIsGeneratingPdf(true);
    soundEffects.playClick();
    try {
      await exportBusinessCardsArchBPdf({
        frontDataUrl: frontFinalUrl,
        backDataUrl: doubleSided ? backFinalUrl : undefined,
        sheetsCount,
        cardFormat,
        doubleSided,
        clientName: clientName.trim() || 'Volckan_Print'
      });
      soundEffects.playSuccessFanfare();
      notify(`✅ PDF Arch B generado: ${sheetsCount} pliego(s) · ${totalCards} tarjetas listas para imprenta.`);
    } catch (err) {
      console.error('Error generando PDF Arch B:', err);
      notify('❌ Ocurrió un error al generar el PDF Arch B.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const targetPhone = storeConfig.whatsappPhone || CONTACT.whatsappPhone || '50252493030';
  const waText = encodeURIComponent(
    [
      '¡Hola Tecno Volckánica! 👋',
      'Deseo solicitar impresión de *Tarjetas de Presentación en Pliego Arch B (12"×18")*:',
      `• Pliegos Arch B solicitados: *${sheetsCount}* (${totalCards} tarjetas en total, 24 por pliego)`,
      `• Medida estándar: ${trimLabel}`,
      `• Modalidad: ${doubleSided ? 'Doble Cara (Tiro y Retiro)' : '1 Cara (Solo Frente)'}`,
      clientName.trim() ? `• A nombre de: ${clientName.trim()}` : '',
      '',
      'Ya preparé mi PDF Arch B con guías de corte desde la tienda web. ¿Me confirman precio y tiempo de entrega?'
    ]
      .filter(Boolean)
      .join('\n')
  );
  const waUrl = `https://wa.me/${targetPhone}?text=${waText}`;

  const activePreviewImg = previewSide === 'back' && doubleSided && backFinalUrl ? backFinalUrl : frontFinalUrl;

  return (
    <div className="cards-service-root animate-fade-in">
      <StoreTopBar slogan="Tarjetas de Presentación · Impresión en Pliego Arch B (12×18)" />

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
            <span className="cards-hero-badge">Volckan Print Studio · Formato Industrial Arch B</span>
            <h1>🪪 Tarjetas de Presentación en Pliego Arch B</h1>
            <p>
              Aprovechamiento máximo de <strong>24 tarjetas por pliego</strong> (3×8 en 304.8 × 457.2 mm) con editor de ajuste, corte y marcas de guillotina.
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
            {/* Paso 1: Medida y Caras */}
            <div>
              <h2 className="cards-section-title">
                <span className="cards-step-pill">1</span> Medida Estándar y Caras
              </h2>
              <div className="cards-options-row" style={{ marginBottom: '10px' }}>
                <button
                  type="button"
                  className={`cards-option-btn ${cardFormat === '90x50' ? 'active' : ''}`}
                  onClick={() => setCardFormat('90x50')}
                >
                  <strong>90 × 50 mm (Estándar)</strong>
                  <span>9 × 5 cm · 24 tarjetas/pliego</span>
                </button>
                <button
                  type="button"
                  className={`cards-option-btn ${cardFormat === '88.9x50.8' ? 'active' : ''}`}
                  onClick={() => setCardFormat('88.9x50.8')}
                >
                  <strong>88.9 × 50.8 mm (3.5"×2")</strong>
                  <span>Formato USA · 24 tarjetas/pliego</span>
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

              {/* Frente */}
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
                    <img src={frontFinalUrl} alt="Frente ajustado" className="cards-upload-thumb" />
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

              {/* Reverso opcional */}
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
                      <img src={backFinalUrl} alt="Reverso ajustado" className="cards-upload-thumb" />
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

            {/* Paso 3: Cantidad de Pliegos Arch B */}
            <div className="cards-sheets-selector">
              <h2 className="cards-section-title">
                <span className="cards-step-pill">3</span> ¿Cuántos Pliegos Arch B deseas?
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
                  <strong>{sheetsCount} {sheetsCount === 1 ? 'Pliego' : 'Pliegos'}</strong>
                  <span>{totalCards} tarjetas</span>
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
                {[1, 2, 4, 8, 10, 20].map((qty) => (
                  <button
                    key={qty}
                    type="button"
                    className={`cards-chip-btn ${sheetsCount === qty ? 'active' : ''}`}
                    onClick={() => setSheetsCount(qty)}
                  >
                    {qty} {qty === 1 ? 'pliego' : 'pliegos'} ({qty * 24} tarj.)
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
                <span>Formato de Pliego:</span>
                <strong>Arch B (12" × 18" / 304.8 × 457.2 mm)</strong>
              </div>
              <div className="cards-summary-row">
                <span>Disposición Optimizada:</span>
                <strong>3 Columnas × 8 Filas (24 tarjetas/pliego)</strong>
              </div>
              <div className="cards-summary-row">
                <span>Medida de Corte:</span>
                <strong>{trimLabel} (+1 mm sangrado)</strong>
              </div>
              <div className="cards-summary-row">
                <span>Total a Producir:</span>
                <strong style={{ color: '#34d399' }}>
                  {sheetsCount} {sheetsCount === 1 ? 'pliego' : 'pliegos'} · {totalCards} tarjetas
                </strong>
              </div>
            </div>

            {/* Acciones Finales */}
            <div className="cards-actions-stack">
              <button
                type="button"
                className="btn-cards-pdf"
                onClick={handleDownloadArchBPdf}
                disabled={isGeneratingPdf || !frontFinalUrl}
              >
                {isGeneratingPdf
                  ? '⏳ Generando Pliego PDF Arch B...'
                  : `📥 Descargar PDF Arch B (${sheetsCount} ${sheetsCount === 1 ? 'Pliego' : 'Pliegos'} · ${totalCards} Tarjetas)`}
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

          {/* COLUMNA DERECHA: Vista Previa en Vivo del Pliego Arch B */}
          <div className="archb-preview-card">
            <div className="archb-preview-header">
              <h3>📄 Vista Previa del Pliego Arch B (24 por hoja)</h3>
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

            <div className="archb-sheet-paper">
              <div className="archb-paper-slug">
                ARCH B (304.8×457.2mm) · {trimLabel} · 24 TARJETAS · {previewSide === 'back' ? 'RETIRO ESPEJADO' : 'TIRO'}
              </div>

              <div className="archb-cards-grid">
                {Array.from({ length: 24 }).map((_, idx) => (
                  <div key={idx} className="archb-card-slot">
                    {activePreviewImg ? (
                      <img src={activePreviewImg} alt={`Tarjeta ${idx + 1}`} />
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
        cardFormat={cardFormat}
        onApply={handleApplyCrop}
        onCancel={() => setEditorTarget(null)}
      />
    </div>
  );
}
