import React, { useState, useRef, useEffect, useCallback } from 'react';
import { soundEffects } from '../../utils/soundEffects';
import './PhotoCropModal.css';

interface PhotoCropModalProps {
  isOpen: boolean;
  imageSrc: string;
  onCropComplete: (result: { dataUrl: string; file: File; width: number; height: number; quality: number }) => void;
  onCancel: () => void;
}

export const PhotoCropModal: React.FC<PhotoCropModalProps> = ({
  isOpen,
  imageSrc,
  onCropComplete,
  onCancel
}) => {
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [qualityLevel, setQualityLevel] = useState<number>(0.82); // 82% WebP recomendado
  const [showFaceGuide, setShowFaceGuide] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Dimensiones del viewport de encuadre (Aspect Ratio 3:4 estándar de credencial comercial)
  const CROP_WIDTH = 300;
  const CROP_HEIGHT = 400;
  const OUTPUT_WIDTH = 450;
  const OUTPUT_HEIGHT = 600;

  // Reset al abrir nueva imagen
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen, imageSrc]);

  // Manejo de arrastre (Pan) con Mouse y Touch
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

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

  // Zoom con rueda del ratón
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomStep = 0.08;
    if (e.deltaY < 0) {
      setScale(prev => Math.min(prev + zoomStep, 3.5));
    } else {
      setScale(prev => Math.max(prev - zoomStep, 0.6));
    }
  };

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

  // Rotar 90 grados
  const handleRotate = () => {
    soundEffects.playClick();
    setRotation(prev => (prev + 90) % 360);
  };

  // Centrar y reajustar
  const handleReset = () => {
    soundEffects.playClick();
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  // Generar recorte definitivo a resolución fija (450x600 px) con compresión WebP
  const handleApplyCrop = async () => {
    if (!imageRef.current || isProcessing) return;
    setIsProcessing(true);
    soundEffects.playClick();

    try {
      const img = imageRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = OUTPUT_WIDTH;
      canvas.height = OUTPUT_HEIGHT;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('No se pudo inicializar canvas 2D');
      }

      // Suavizado de imagen de alta calidad (Bicubic / High quality)
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Fondo oscuro neutro para márgenes si quedara algún espacio
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);

      // Calcular factor de escala entre viewport de pantalla y output
      const factor = OUTPUT_WIDTH / CROP_WIDTH;

      ctx.save();
      // Trasladar al centro del canvas de salida
      ctx.translate(OUTPUT_WIDTH / 2, OUTPUT_HEIGHT / 2);

      // Aplicar posición y escala del usuario
      ctx.translate(position.x * factor, position.y * factor);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(scale * factor, scale * factor);

      // Dibujar imagen centrada en su propio eje
      ctx.drawImage(
        img,
        -img.naturalWidth / 2,
        -img.naturalHeight / 2,
        img.naturalWidth,
        img.naturalHeight
      );
      ctx.restore();

      // Convertir a WebP Blob con la calidad seleccionada
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            alert('Error generando el recorte de la imagen.');
            setIsProcessing(false);
            return;
          }

          const dataUrl = canvas.toDataURL('image/webp', qualityLevel);
          const file = new File(
            [blob],
            `foto_credencial_${Date.now()}.webp`,
            { type: 'image/webp' }
          );

          soundEffects.playSuccess();
          setIsProcessing(false);
          onCropComplete({
            dataUrl,
            file,
            width: OUTPUT_WIDTH,
            height: OUTPUT_HEIGHT,
            quality: qualityLevel
          });
        },
        'image/webp',
        qualityLevel
      );
    } catch (err) {
      console.error('Error aplicando recorte:', err);
      alert('Ocurrió un error al procesar el encuadre.');
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="crop-modal-overlay animate-fade-in" role="dialog" aria-modal="true">
      <div className="crop-modal-card">
        {/* Cabecera del Modal */}
        <div className="crop-modal-header">
          <div className="crop-title-group">
            <span className="crop-header-icon">✂️</span>
            <div>
              <h3>Encuadre y Recorte Profesional de Fotografía</h3>
              <p>Arrastra para mover, usa el zoom para encuadrar tu rostro centrado y ajusta la calidad.</p>
            </div>
          </div>
          <button
            type="button"
            className="crop-close-btn"
            onClick={onCancel}
            aria-label="Cerrar encuadre"
          >
            ✕
          </button>
        </div>

        {/* Zona de Trabajo Visual de Encuadre */}
        <div className="crop-workspace">
          <div
            ref={containerRef}
            className="crop-viewport-frame"
            style={{ width: `${CROP_WIDTH}px`, height: `${CROP_HEIGHT}px` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
          >
            {/* Imagen manipulable */}
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Encuadre"
              className="crop-source-image"
              draggable={false}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale})`,
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
            />

            {/* Cuadrícula de tercios fotográfica */}
            <div className="crop-grid-overlay">
              <span className="grid-h line-1" />
              <span className="grid-h line-2" />
              <span className="grid-v line-1" />
              <span className="grid-v line-2" />
            </div>

            {/* Guía facial biométrica ovalada tipo red social */}
            {showFaceGuide && (
              <div className="crop-face-guide">
                <div className="face-oval" />
                <span className="face-guide-hint">Centra tu rostro dentro del óvalo</span>
              </div>
            )}

            {/* Medidas estándar */}
            <div className="crop-aspect-badge">
              <span>Proporción Estándar CR80 (3:4)</span>
            </div>
          </div>
        </div>

        {/* Barra de Controles y Herramientas */}
        <div className="crop-tools-panel">
          {/* Control de Zoom */}
          <div className="crop-control-row">
            <label className="crop-control-label">
              <span>🔍 Zoom / Escala:</span>
              <strong>{Math.round(scale * 100)}%</strong>
            </label>
            <div className="crop-slider-group">
              <button
                type="button"
                className="btn-scale-step"
                onClick={() => setScale(prev => Math.max(prev - 0.1, 0.6))}
                title="Reducir zoom"
              >
                −
              </button>
              <input
                type="range"
                min="0.6"
                max="3.0"
                step="0.05"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="crop-zoom-slider"
              />
              <button
                type="button"
                className="btn-scale-step"
                onClick={() => setScale(prev => Math.min(prev + 0.1, 3.0))}
                title="Aumentar zoom"
              >
                +
              </button>
            </div>
          </div>

          {/* Opciones Rápidas: Rotar, Centrar, Guía */}
          <div className="crop-actions-row">
            <div className="crop-quick-buttons">
              <button
                type="button"
                className="btn-crop-tool"
                onClick={handleRotate}
                title="Girar 90 grados"
              >
                🔄 Girar 90°
              </button>
              <button
                type="button"
                className="btn-crop-tool"
                onClick={handleReset}
                title="Restablecer posición inicial"
              >
                🎯 Centrar
              </button>
              <button
                type="button"
                className={`btn-crop-tool ${showFaceGuide ? 'active' : ''}`}
                onClick={() => setShowFaceGuide(prev => !prev)}
                title="Mostrar u ocultar silueta de guía facial"
              >
                👤 {showFaceGuide ? 'Ocultar Guía' : 'Ver Guía Rostro'}
              </button>
            </div>

            {/* Selector de Calidad y Compresión */}
            <div className="crop-quality-selector">
              <label>Compresión & Calidad WebP:</label>
              <div className="quality-chips">
                <button
                  type="button"
                  className={`quality-chip ${qualityLevel === 0.90 ? 'active' : ''}`}
                  onClick={() => setQualityLevel(0.90)}
                >
                  HD (90%) <small>~50 KB</small>
                </button>
                <button
                  type="button"
                  className={`quality-chip ${qualityLevel === 0.82 ? 'active' : ''}`}
                  onClick={() => setQualityLevel(0.82)}
                >
                  ⭐ Óptima (82%) <small>~35 KB</small>
                </button>
                <button
                  type="button"
                  className={`quality-chip ${qualityLevel === 0.68 ? 'active' : ''}`}
                  onClick={() => setQualityLevel(0.68)}
                >
                  Rápida (68%) <small>~20 KB</small>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de Confirmación al Pie */}
        <div className="crop-modal-footer">
          <button
            type="button"
            className="btn-crop-cancel"
            onClick={onCancel}
            disabled={isProcessing}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn-crop-confirm"
            onClick={handleApplyCrop}
            disabled={isProcessing}
          >
            {isProcessing ? '⏳ Procesando Fotografía...' : '✓ Aplicar Encuadre y Usar Foto'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoCropModal;
