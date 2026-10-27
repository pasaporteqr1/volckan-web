import React, { useState, useRef, useEffect, useCallback } from 'react';
import { soundEffects } from '../../utils/soundEffects';
import './PhotoCropModal.css';

interface PhotoCropModalProps {
  isOpen: boolean;
  imageSrc: string;
  onCropComplete: (result: { dataUrl: string; file: File; width: number; height: number; quality: number }) => void;
  onCancel: () => void;
}

// Calidad de compresión WebP fija y optimizada por defecto (alta nitidez y peso liviano ~40-60 KB)
const DEFAULT_WEBP_QUALITY = 0.85;

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
  const [showFaceGuide, setShowFaceGuide] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [naturalSize, setNaturalSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Dimensiones estándar del visor de encuadre (Aspect Ratio 3:4)
  const CROP_WIDTH = 300;
  const CROP_HEIGHT = 400;
  const OUTPUT_WIDTH = 450;
  const OUTPUT_HEIGHT = 600;

  // Reset de estados al abrir una nueva fotografía
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen, imageSrc]);

  // Al cargar la imagen, calculamos las dimensiones naturales y el factor de escala base
  const handleImageLoaded = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const nw = img.naturalWidth || 600;
    const nh = img.naturalHeight || 800;
    setNaturalSize({ width: nw, height: nh });
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Factor de escala base para que la imagen cubra exactamente el visor de 300x400
  const baseScale = naturalSize.width > 0 && naturalSize.height > 0
    ? Math.max(CROP_WIDTH / naturalSize.width, CROP_HEIGHT / naturalSize.height)
    : 1;

  const displayWidth = naturalSize.width > 0 ? naturalSize.width * baseScale : CROP_WIDTH;
  const displayHeight = naturalSize.height > 0 ? naturalSize.height * baseScale : CROP_HEIGHT;

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
      setScale(prev => Math.min(prev + zoomStep, 3.0));
    } else {
      setScale(prev => Math.max(prev - zoomStep, 0.8));
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

  // Centrar y reajustar posición
  const handleReset = () => {
    soundEffects.playClick();
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  // Generar recorte definitivo a resolución fija (450x600 px) con compresión WebP automática
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

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Fondo oscuro
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);

      // Factor de ampliación entre el visor visual y el canvas de salida
      const factor = OUTPUT_WIDTH / CROP_WIDTH;

      ctx.save();
      // Trasladar al centro
      ctx.translate(OUTPUT_WIDTH / 2, OUTPUT_HEIGHT / 2);
      ctx.translate(position.x * factor, position.y * factor);
      ctx.rotate((rotation * Math.PI) / 180);

      // Escala combinada exacta: baseScale * userScale * factor
      const combinedScale = baseScale * scale * factor;
      ctx.scale(combinedScale, combinedScale);

      // Dibujar imagen centrada con su resolución nativa completa
      ctx.drawImage(
        img,
        -img.naturalWidth / 2,
        -img.naturalHeight / 2,
        img.naturalWidth,
        img.naturalHeight
      );
      ctx.restore();

      // Convertir a WebP Blob con calidad óptima por defecto
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            alert('Error generando el recorte de la imagen.');
            setIsProcessing(false);
            return;
          }

          const dataUrl = canvas.toDataURL('image/webp', DEFAULT_WEBP_QUALITY);
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
            quality: DEFAULT_WEBP_QUALITY
          });
        },
        'image/webp',
        DEFAULT_WEBP_QUALITY
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
              <h3>Encuadre y Recorte de Fotografía</h3>
              <p>Arrastra para mover y ajusta el zoom para que tu rostro quede dentro del óvalo guía.</p>
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
            {/* Imagen manipulable adaptada al visor */}
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Encuadre"
              className="crop-source-image"
              draggable={false}
              onLoad={handleImageLoaded}
              style={{
                width: `${displayWidth}px`,
                height: `${displayHeight}px`,
                maxWidth: 'none',
                maxHeight: 'none',
                transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale})`,
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
            />

            {/* Guía de tercios fotográficos */}
            <div className="crop-grid-overlay">
              <span className="grid-h line-1" />
              <span className="grid-h line-2" />
              <span className="grid-v line-1" />
              <span className="grid-v line-2" />
            </div>

            {/* Silueta de Guía Facial */}
            {showFaceGuide && (
              <div className="crop-face-guide">
                <div className="face-oval">
                  <div className="eye-line-guide" />
                </div>
                <span className="face-guide-hint">Centra tus ojos y rostro aquí</span>
              </div>
            )}
          </div>
        </div>

        {/* Barra de Controles y Zoom */}
        <div className="crop-controls-panel">
          <div className="crop-control-row">
            <label className="crop-control-label">
              <span>🔍 Zoom / Tamaño:</span>
              <strong>{Math.round(scale * 100)}%</strong>
            </label>
            <div className="crop-slider-group">
              <button
                type="button"
                className="btn-scale-step"
                onClick={() => setScale(prev => Math.max(prev - 0.1, 0.8))}
                title="Reducir zoom"
              >
                −
              </button>
              <input
                type="range"
                min="0.8"
                max="2.8"
                step="0.05"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="crop-zoom-slider"
              />
              <button
                type="button"
                className="btn-scale-step"
                onClick={() => setScale(prev => Math.min(prev + 0.1, 2.8))}
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
