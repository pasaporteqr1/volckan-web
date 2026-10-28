import QRCode from 'qrcode';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import type { CarnetSubmission } from '../types/carnet';

/**
 * Genera un código QR en Data URL (PNG base64) de alta resolución.
 */
export async function generateQrDataUrl(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 400,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });
  } catch (err) {
    console.error('Error generando QR:', err);
    return '';
  }
}

/**
 * Captura un elemento DOM como PNG de alta resolución (3x DPI para impresión profesional).
 */
export async function captureElementToPng(element: HTMLElement): Promise<string> {
  return await toPng(element, {
    pixelRatio: 3,
    cacheBust: true,
    quality: 1.0,
    backgroundColor: 'transparent'
  });
}

/**
 * Descarga una imagen PNG al navegador del usuario.
 */
export function downloadImage(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Dibuja una cruz de registro (prepress registration cross) para calibración de doble cara.
 */
function drawRegistrationCross(pdf: jsPDF, cx: number, cy: number, radius = 3.5) {
  pdf.setDrawColor(40, 40, 40);
  pdf.setLineWidth(0.15);
  // Círculo exterior
  pdf.circle(cx, cy, radius);
  // Cruz central
  pdf.line(cx - radius - 2, cy, cx + radius + 2, cy);
  pdf.line(cx, cy - radius - 2, cx, cy + radius + 2);
  // Círculo interno pequeño
  pdf.circle(cx, cy, radius * 0.4);
}

/**
 * Dibuja guías de corte en las 4 esquinas de un carnet (corner crop marks).
 */
function drawCornerCropMarks(
  pdf: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  markLen = 4,
  offset = 1.5
) {
  pdf.setDrawColor(120, 120, 120);
  pdf.setLineWidth(0.15);

  // Esquina superior izquierda
  pdf.line(x - offset - markLen, y, x - offset, y);
  pdf.line(x, y - offset - markLen, x, y - offset);

  // Esquina superior derecha
  pdf.line(x + w + offset, y, x + w + offset + markLen, y);
  pdf.line(x + w, y - offset - markLen, x + w, y - offset);

  // Esquina inferior izquierda
  pdf.line(x - offset - markLen, y + h, x - offset, y + h);
  pdf.line(x, y + h + offset, x, y + h + offset + markLen);

  // Esquina inferior derecha
  pdf.line(x + w + offset, y + h, x + w + offset + markLen, y + h);
  pdf.line(x + w, y + h + offset, x + w, y + h + offset + markLen);
}

/**
 * Dibuja barra de calibración de color (CMYK + escala de grises) al borde del pliego.
 */
function drawCmykColorBar(pdf: jsPDF, x: number, y: number, totalW: number, h = 2.5) {
  const swatches = [
    [0, 180, 230], // Cyan
    [230, 0, 120], // Magenta
    [250, 220, 0], // Yellow
    [20, 20, 20],   // Black
    [100, 100, 100],// Gray 60%
    [180, 180, 180],// Gray 30%
    [235, 50, 35],  // Red
    [40, 160, 60],  // Green
    [30, 80, 190]   // Blue
  ];
  const swatchW = totalW / swatches.length;
  swatches.forEach(([r, g, b], i) => {
    pdf.setFillColor(r, g, b);
    pdf.rect(x + i * swatchW, y, swatchW, h, 'F');
  });
}

/**
 * Exporta un carnet individual a PDF en tamaño estándar bancario CR80.
 * Soporta orientación Vertical (53.98 x 85.60 mm) u Horizontal (85.60 x 53.98 mm).
 * Página 1: Frente
 * Página 2: Reverso
 */
export async function exportSingleCarnetPdf(
  frontElement: HTMLElement,
  backElement: HTMLElement,
  submission: CarnetSubmission,
  orientation: 'vertical' | 'horizontal' = 'vertical'
): Promise<void> {
  const frontImg = await captureElementToPng(frontElement);
  const backImg = await captureElementToPng(backElement);

  const isVertical = orientation === 'vertical';
  const cardW = isVertical ? 53.98 : 85.60;
  const cardH = isVertical ? 85.60 : 53.98;

  const pdf = new jsPDF({
    orientation: isVertical ? 'portrait' : 'landscape',
    unit: 'mm',
    format: [cardW, cardH]
  });

  // Página 1: Frente Oficial
  pdf.addImage(frontImg, 'PNG', 0, 0, cardW, cardH);

  // Página 2: Reverso con QR
  pdf.addPage([cardW, cardH], isVertical ? 'portrait' : 'landscape');
  pdf.addImage(backImg, 'PNG', 0, 0, cardW, cardH);

  const cleanName = (submission.fullName || 'carnet').replace(/[^a-zA-Z0-9]/g, '_');
  pdf.save(`Carnet_CR80_${isVertical ? 'Vertical' : 'Horizontal'}_${cleanName}_${submission.idNumber || 'id'}.pdf`);
}

/**
 * EXPORTACIÓN NATIVA A PLIEGO INDUSTRIAL ARCH B (12 x 18 pulgadas / 304.8 x 457.2 mm).
 * Disposición: 4 Columnas x 4 Filas = 16 Carnets Verticales por Pliego.
 * Incluye tiro y retiro con alineación dúplex exacta (espejado de columnas).
 * Incorpora marcas de corte, cruces de registro y barra de color preimpresión.
 */
export async function exportArchBBatchCarnetsPdf(
  cardsData: { frontDataUrl: string; backDataUrl: string; submission: CarnetSubmission }[],
  institutionName = 'Acreditación Oficial'
): Promise<void> {
  if (cardsData.length === 0) return;

  // Medidas exactas Arch B en milímetros
  const sheetW = 304.8;
  const sheetH = 457.2;

  // Medidas exactas CR80 Vertical
  const cardW = 53.98;
  const cardH = 85.60;

  // Grilla 4 x 4 = 16 carnets por pliego
  const cols = 4;
  const rows = 4;
  const cardsPerPage = cols * rows;

  const gapX = 12.0;
  const gapY = 12.0;

  // Cálculo de márgenes centrados
  const totalGridW = cols * cardW + (cols - 1) * gapX; // 251.92 mm
  const totalGridH = rows * cardH + (rows - 1) * gapY; // 378.40 mm
  const marginX = (sheetW - totalGridW) / 2; // 26.44 mm
  const marginY = (sheetH - totalGridH) / 2; // 39.40 mm

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [sheetW, sheetH]
  });

  const totalSheets = Math.ceil(cardsData.length / cardsPerPage);

  for (let s = 0; s < totalSheets; s++) {
    const startIdx = s * cardsPerPage;
    const slice = cardsData.slice(startIdx, startIdx + cardsPerPage);
    const sheetNum = s + 1;

    // ========================================================================
    // HOJA A: FRENTES (TIRO)
    // ========================================================================
    if (s > 0) {
      pdf.addPage([sheetW, sheetH], 'portrait');
    }

    // Cruces de Registro en bordes
    drawRegistrationCross(pdf, sheetW / 2, 14); // Arriba centro
    drawRegistrationCross(pdf, sheetW / 2, sheetH - 14); // Abajo centro
    drawRegistrationCross(pdf, 12, sheetH / 2); // Izquierda centro
    drawRegistrationCross(pdf, sheetW - 12, sheetH / 2); // Derecha centro

    // Barra de Calibración de Color
    drawCmykColorBar(pdf, marginX, sheetH - 18, totalGridW, 3);

    // Slug / Información técnica para la imprenta
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8.5);
    pdf.setTextColor(30, 41, 59);
    pdf.text(
      `VOLCKAN PRINT STUDIO · PLIEGO INDUSTRIAL ARCH B (12" x 18" / 304.8 x 457.2 mm) · TIRO (FRENTES CR80)`,
      marginX,
      18
    );

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(100, 116, 139);
    pdf.text(
      `Institución: ${institutionName}  |  Pliego: ${sheetNum} de ${totalSheets}  |  Carnets: ${slice.length}/16  |  Resolución: 300 DPI  |  Corte: 53.98 x 85.60 mm`,
      marginX,
      22
    );

    // Posicionamiento de cada carnet
    slice.forEach((card, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const x = marginX + col * (cardW + gapX);
      const y = marginY + row * (cardH + gapY);

      // Guías de corte en esquinas
      drawCornerCropMarks(pdf, x, y, cardW, cardH, 4, 1.8);

      // Marco guía muy fino (0.1 mm)
      pdf.setDrawColor(210, 215, 225);
      pdf.setLineWidth(0.1);
      pdf.rect(x, y, cardW, cardH);

      // Imagen del Frente en alta resolución
      pdf.addImage(card.frontDataUrl, 'PNG', x, y, cardW, cardH);

      // Pequeño indicador de corte y CUI bajo el carnet
      pdf.setFontSize(5);
      pdf.setTextColor(140, 150, 160);
      pdf.text(
        `[#${startIdx + idx + 1}] ${card.submission.fullName?.slice(0, 24) || ''}`,
        x + 1,
        y + cardH + 2.5
      );
    });

    // ========================================================================
    // HOJA B: REVERSOS (RETIRO / DUPLEX MIRRORED)
    // ========================================================================
    pdf.addPage([sheetW, sheetH], 'portrait');

    // Cruces de Registro exactamente idénticas
    drawRegistrationCross(pdf, sheetW / 2, 14);
    drawRegistrationCross(pdf, sheetW / 2, sheetH - 14);
    drawRegistrationCross(pdf, 12, sheetH / 2);
    drawRegistrationCross(pdf, sheetW - 12, sheetH / 2);

    // Barra de Calibración
    drawCmykColorBar(pdf, marginX, sheetH - 18, totalGridW, 3);

    // Slug / Información técnica Reverso
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8.5);
    pdf.setTextColor(30, 41, 59);
    pdf.text(
      `VOLCKAN PRINT STUDIO · PLIEGO INDUSTRIAL ARCH B (12" x 18" / 304.8 x 457.2 mm) · RETIRO (REVERSOS CR80)`,
      marginX,
      18
    );

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(100, 116, 139);
    pdf.text(
      `ALINEACIÓN DÚPLEX ESPEJADA (GIRO BORDE LARGO)  |  Pliego: ${sheetNum} de ${totalSheets}  |  QR Validación Oficial`,
      marginX,
      22
    );

    // Posicionamiento de cada reverso con inversión horizontal de columnas (duplex registration)
    slice.forEach((card, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      // Inversión de columna para coincidencia perfecta al imprimir frente/vuelta
      const mirrorCol = cols - 1 - col;
      const x = marginX + mirrorCol * (cardW + gapX);
      const y = marginY + row * (cardH + gapY);

      drawCornerCropMarks(pdf, x, y, cardW, cardH, 4, 1.8);

      pdf.setDrawColor(210, 215, 225);
      pdf.setLineWidth(0.1);
      pdf.rect(x, y, cardW, cardH);

      pdf.addImage(card.backDataUrl, 'PNG', x, y, cardW, cardH);

      pdf.setFontSize(5);
      pdf.setTextColor(140, 150, 160);
      pdf.text(
        `[#${startIdx + idx + 1} REVERSO] DPI: ${card.submission.idNumber || ''}`,
        x + 1,
        y + cardH + 2.5
      );
    });
  }

  const cleanInst = institutionName.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 20);
  pdf.save(`Pliego_ArchB_12x18_${cleanInst}_${Date.now()}.pdf`);
}

/**
 * Exporta múltiples carnets en hoja tamaño Carta (Letter: 215.9 x 279.4 mm).
 * Disposición: 3 Columnas x 2 Filas = 6 Carnets Verticales por Hoja.
 * Incluye alineación dúplex por el borde largo.
 */
export async function exportBatchCarnetsPdf(
  cardsData: { frontDataUrl: string; backDataUrl: string; submission: CarnetSubmission }[],
  institutionName = 'Acreditación Oficial'
): Promise<void> {
  if (cardsData.length === 0) return;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter'
  });

  const cardW = 53.98;
  const cardH = 85.60;
  const cols = 3;
  const rows = 2;
  const cardsPerPage = cols * rows; // 6 tarjetas verticales por página Carta

  const gapX = 14.0;
  const gapY = 16.0;

  const totalGridW = cols * cardW + (cols - 1) * gapX; // 189.94 mm
  const totalGridH = rows * cardH + (rows - 1) * gapY; // 187.20 mm
  const marginX = (215.9 - totalGridW) / 2; // ~12.98 mm
  const marginY = (279.4 - totalGridH) / 2; // ~46.10 mm

  for (let i = 0; i < cardsData.length; i += cardsPerPage) {
    if (i > 0) pdf.addPage('letter', 'portrait');

    const slice = cardsData.slice(i, i + cardsPerPage);
    const pageNum = Math.floor(i / cardsPerPage) + 1;

    // Hoja de Frentes
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8.5);
    pdf.setTextColor(30, 41, 59);
    pdf.text(`Volckan Print Studio · Lote Carta (Frentes Verticales CR80) · Hoja ${pageNum}`, marginX, 22);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(120, 120, 120);
    pdf.text(`${institutionName} · Corte estándar 53.98 x 85.60 mm`, marginX, 27);

    slice.forEach((card, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const x = marginX + col * (cardW + gapX);
      const y = marginY + row * (cardH + gapY);

      drawCornerCropMarks(pdf, x, y, cardW, cardH, 3.5, 1.5);

      pdf.setDrawColor(210, 215, 225);
      pdf.setLineWidth(0.1);
      pdf.rect(x, y, cardW, cardH);

      pdf.addImage(card.frontDataUrl, 'PNG', x, y, cardW, cardH);
    });

    // Hoja de Reversos
    pdf.addPage('letter', 'portrait');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8.5);
    pdf.setTextColor(30, 41, 59);
    pdf.text(`Volckan Print Studio · Lote Carta (Reversos Verticales CR80) · Hoja ${pageNum}`, marginX, 22);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(120, 120, 120);
    pdf.text(`Alineación Dúplex (Espejado por borde largo) · QR de Acceso`, marginX, 27);

    slice.forEach((card, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const mirrorCol = cols - 1 - col;
      const x = marginX + mirrorCol * (cardW + gapX);
      const y = marginY + row * (cardH + gapY);

      drawCornerCropMarks(pdf, x, y, cardW, cardH, 3.5, 1.5);

      pdf.setDrawColor(210, 215, 225);
      pdf.setLineWidth(0.1);
      pdf.rect(x, y, cardW, cardH);

      pdf.addImage(card.backDataUrl, 'PNG', x, y, cardW, cardH);
    });
  }

  pdf.save(`Lote_Carta_Carnets_Volckan_${Date.now()}.pdf`);
}
