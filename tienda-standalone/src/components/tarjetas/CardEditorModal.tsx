import React, { useState, useRef, useEffect, useCallback } from 'react';
import { soundEffects } from '../../utils/soundEffects';
import type { PrintFormatSpec } from '../../utils/businessCardExport';
import './CardEditorModal.css';

interface CardEditorModalProps {
  isOpen: boolean;
  imageSrc: string;
  sideLabel: string; // 'Frente (Tiro)' | 'Reverso (Retiro)'
  formatSpec: PrintFormatSpec;
  onApply: (croppedDataUrl: string) => void;
  onCancel: () => void;
}

export const CardEditorModal: React.FC<CardEditorModalProps> = ({
  isOpen,
  imageSrc,
  sideLabel,
  formatSpec,
  onApply,
  onCancel
}) => {
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [flipH, setFlipH] = useState<boolean>(false);
  const [flipV, setFlipV] = useState<boolean>(false);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [saturate, setSaturate] = useState<number>(100);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showGuides, setShowGuides] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [naturalSize, setNaturalSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const OUT_W = formatSpec.outPxW;
  const OUT_H = formatSpec.outPxH;
  const fullW = formatSpec.trimW + formatSpec.bleed * 2;
  const fullH = formatSpec.trimH + formatSpec.bleed * 2;
  const isFlyer = formatSpec.category === 'flyer';

  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setRotation(0);
      setFlipH(false);
      setFlipV(false);
      setBrightness(100);
      setContrast(100);
      setSaturate(100);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen, imageSrc, formatSpec.id]);

  const handleImageLoaded = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setNaturalSize({
      width: img.naturalWidth || 1000,
      height: img.naturalHeight || 600
    });
  };

  const getViewportSize = () => {
    if (viewportRef.current) {
      const rect = viewportRef.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        return { w: rect.width, h: rect.height };
      }
    }
    return isFlyer ? { w: 280, h: 360 } : { w: 460, h: 260 };
  };

  const vp = getViewportSize();
  const baseCoverScale =
    naturalSize.width > 0 && naturalSize.height > 0
      ? Math.max(vp.w / naturalSize.width, vp.h / naturalSize.height)
      : 1;

  const baseContainScale =
    naturalSize.width > 0 && naturalSize.height > 0
      ? Math.min(vp.w / naturalSize.width, vp.h / naturalSize.height)
      : 1;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.06 : -0.06;
    setScale(prev => Math.min(Math.max(prev + delta, 0.35), 3.0));
  };

  const handleFitCover = () => {
    soundEffects.playClick();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleFitContain = () => {
    soundEffects.playClick();
    if (baseCoverScale > 0) {
      setScale(Number((baseContainScale / baseCoverScale).toFixed(2)));
    } else {
      setScale(1);
    }
    setPosition({ x: 0, y: 0 });
  };

  const handleCenterOnly = () => {
    soundEffects.playClick();
    setPosition({ x: 0, y: 0 });
  };

  const handleResetAll = () => {
    soundEffects.playClick();
    setScale(1);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setBrightness(100);
    setContrast(100);
    setSaturate(100);
    setPosition({ x: 0, y: 0 });
  };

  const handleExportCropped = async () => {
    if (!imgRef.current || !viewportRef.current) return;
    setIsExporting(true);
    soundEffects.playClick();

    try {
      const rect = viewportRef.current.getBoundingClientRect();
      const vpW = rect.width || vp.w;
      const vpH = rect.height || vp.h;

      const canvas = document.createElement('canvas');
      canvas.width = OUT_W;
      canvas.height = OUT_H;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('No se pudo inicializar el lienzo 2D');

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, OUT_W, OUT_H);

      const ratioX = OUT_W / vpW;
      const ratioY = OUT_H / vpH;

      ctx.save();
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`;

      ctx.translate(OUT_W / 2 + position.x * ratioX, OUT_H / 2 + position.y * ratioY);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);

      const drawW = naturalSize.width * baseCoverScale * scale * ratioX;
      const drawH = naturalSize.height * baseCoverScale * scale * ratioY;

      ctx.drawImage(imgRef.current, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();

      const dataUrl = canvas.toDataURL('image/png', 1.0);
      soundEffects.playSuccessFanfare();
      onApply(dataUrl);
    } catch (err) {
      console.error('Error exportando diseño editado:', err);
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  const displayW = naturalSize.width > 0 ? naturalSize.width * baseCoverScale : vp.w;
  const displayH = naturalSize.height > 0 ? naturalSize.height * baseCoverScale : vp.h;
  const trimText = `${formatSpec.trimW} × ${formatSpec.trimH} mm`;

  return (
    <div className="card-editor-overlay" onClick={onCancel}>
      <div className="card-editor-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header del Modal */}
        <div className="card-editor-header">
          <div>
            <h3>
              <span>✂️ Editor de Ajuste y Corte · {sideLabel}</span>
              <span className="card-editor-dim-badge">{trimText}</span>
            </h3>
            <p>Arrastra la imagen para encuadrar · Sangrado de corte: +{formatSpec.bleed} mm por lado</p>
          </div>
          <button type="button" className="card-editor-close" onClick={onCancel} aria-label="Cerrar editor">
            ✕
          </button>
        </div>

        {/* Cuerpo en 2 Columnas Organizadas */}
        <div className="card-editor-body">
          {/* Columna 1: Lienzo Interactivo */}
          <div className="card-editor-stage-wrap">
            <div
              ref={viewportRef}
              className={`card-editor-viewport ${isFlyer ? 'is-flyer' : 'is-card'}`}
              style={{
                aspectRatio: `${fullW} / ${fullH}`
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}
            >
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Diseño para impresión"
                onLoad={handleImageLoaded}
                draggable={false}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: `${displayW}px`,
                  height: `${displayH}px`,
                  maxWidth: 'none',
                  maxHeight: 'none',
                  transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale * (flipH ? -1 : 1)}, ${scale * (flipV ? -1 : 1)})`,
                  filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`,
                  userSelect: 'none',
                  pointerEvents: 'none'
                }}
              />

              {showGuides && (
                <div className="card-editor-guides">
                  <div className="card-trim-line" title="Línea de corte de guillotina" />
                  <div className="card-safe-line" title="Zona segura para textos y logos" />
                </div>
              )}
            </div>

            <div className="card-guides-bar">
              <div className="card-guides-legend">
                <span>
                  <i className="legend-dot" style={{ background: '#ef4444' }} /> Corte ({trimText})
                </span>
                <span>
                  <i className="legend-dot" style={{ background: '#10b981' }} /> Zona segura
                </span>
              </div>
              <button
                type="button"
                className={`card-mini-btn ${showGuides ? 'active' : ''}`}
                onClick={() => setShowGuides(prev => !prev)}
              >
                {showGuides ? '👁️ Ocultar Guías' : '👁️ Ver Guías'}
              </button>
            </div>
          </div>

          {/* Columna 2: Panel de Herramientas Organizado */}
          <div className="card-editor-sidebar">
            {/* Bloque 1: Encuadre y Zoom */}
            <div className="card-tool-box">
              <h4>
                <span>📐 1. Encuadre y Zoom</span>
              </h4>
              <div className="card-slider-row">
                <label>Zoom:</label>
                <input
                  type="range"
                  min={0.35}
                  max={3.0}
                  step={0.02}
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                />
                <span className="card-slider-val">{Math.round(scale * 100)}%</span>
              </div>
              <div className="card-btn-grid">
                <button type="button" className="card-mini-btn" onClick={handleFitCover}>
                  ⛶ Llenar
                </button>
                <button type="button" className="card-mini-btn" onClick={handleFitContain}>
                  🖼️ Ver Todo
                </button>
                <button type="button" className="card-mini-btn" onClick={handleCenterOnly}>
                  🎯 Centrar
                </button>
              </div>
            </div>

            {/* Bloque 2: Orientación y Rotación */}
            <div className="card-tool-box">
              <h4>
                <span>🔄 2. Orientación y Giro</span>
              </h4>
              <div className="card-btn-grid-4">
                <button type="button" className="card-mini-btn" onClick={() => setRotation(r => r - 90)}>
                  ⟲ -90°
                </button>
                <button type="button" className="card-mini-btn" onClick={() => setRotation(r => r + 90)}>
                  ⟳ +90°
                </button>
                <button
                  type="button"
                  className={`card-mini-btn ${flipH ? 'active' : ''}`}
                  onClick={() => setFlipH(v => !v)}
                >
                  ⇆ Voltear H
                </button>
                <button
                  type="button"
                  className={`card-mini-btn ${flipV ? 'active' : ''}`}
                  onClick={() => setFlipV(v => !v)}
                >
                  ⇅ Voltear V
                </button>
              </div>
              <div className="card-slider-row">
                <label>Inclinación:</label>
                <input
                  type="range"
                  min={-15}
                  max={15}
                  step={0.5}
                  value={((rotation % 90) + 90) % 90 > 45 ? (rotation % 90) - 90 : rotation % 90}
                  onChange={(e) => {
                    const base90 = Math.round(rotation / 90) * 90;
                    setRotation(base90 + Number(e.target.value));
                  }}
                />
                <span className="card-slider-val">{rotation}°</span>
              </div>
            </div>

            {/* Bloque 3: Color Preimpresión */}
            <div className="card-tool-box">
              <h4>
                <span>🎨 3. Color (Preimpresión)</span>
              </h4>
              <div className="card-slider-row">
                <label>Brillo:</label>
                <input
                  type="range"
                  min={75}
                  max={135}
                  step={1}
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                />
                <span className="card-slider-val">{brightness}%</span>
              </div>
              <div className="card-slider-row">
                <label>Contraste:</label>
                <input
                  type="range"
                  min={75}
                  max={135}
                  step={1}
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                />
                <span className="card-slider-val">{contrast}%</span>
              </div>
              <div className="card-slider-row">
                <label>Saturación:</label>
                <input
                  type="range"
                  min={0}
                  max={150}
                  step={1}
                  value={saturate}
                  onChange={(e) => setSaturate(Number(e.target.value))}
                />
                <span className="card-slider-val">{saturate}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Fijo con Restablecer + Acciones */}
        <div className="card-editor-footer">
          <button type="button" className="card-mini-btn" onClick={handleResetAll}>
            ↺ Restablecer Todo
          </button>
          <div className="card-editor-footer-actions">
            <button type="button" className="btn-card-cancel" onClick={onCancel}>
              Cancelar
            </button>
            <button
              type="button"
              className="btn-card-apply"
              onClick={handleExportCropped}
              disabled={isExporting}
            >
              {isExporting ? '⏳ Procesando...' : '✅ Aplicar Recorte'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
