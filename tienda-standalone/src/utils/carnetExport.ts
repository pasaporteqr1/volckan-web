import QRCode from 'qrcode';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import type { CarnetSubmission, CarnetTheme } from '../types/carnet';

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
 * Exporta un carnet individual a PDF en tamaño estándar bancario CR80 (85.6mm x 53.98mm).
 * Página 1: Frente
 * Página 2: Reverso
 */
export async function exportSingleCarnetPdf(
  frontElement: HTMLElement,
  backElement: HTMLElement,
  submission: CarnetSubmission
): Promise<void> {
  const frontImg = await captureElementToPng(frontElement);
  const backImg = await captureElementToPng(backElement);

  // CR80 dimensions in mm: 85.6 x 53.98 (landscape)
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [85.6, 53.98]
  });

  // Página 1: Frente
  pdf.addImage(frontImg, 'PNG', 0, 0, 85.6, 53.98);

  // Página 2: Reverso
  pdf.addPage([85.6, 53.98], 'landscape');
  pdf.addImage(backImg, 'PNG', 0, 0, 85.6, 53.98);

  const cleanName = (submission.fullName || 'carnet').replace(/[^a-zA-Z0-9]/g, '_');
  pdf.save(`Carnet_CR80_${cleanName}_${submission.idNumber || 'id'}.pdf`);
}

/**
 * Exporta múltiples carnets en una hoja tamaño Carta (Letter) con guías de corte
 * para imprentas o cortadoras rotativas de credenciales.
 */
export async function exportBatchCarnetsPdf(
  cardsData: { frontDataUrl: string; backDataUrl: string; submission: CarnetSubmission }[]
): Promise<void> {
  if (cardsData.length === 0) return;

  // Tamaño Carta: 215.9 x 279.4 mm (portrait)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter'
  });

  const cardW = 85.6;
  const cardH = 53.98;
  const marginX = 16.5;
  const marginY = 18;
  const gapX = 11;
  const gapY = 10;
  const cols = 2;
  const rows = 4;
  const cardsPerPage = cols * rows; // 8 tarjetas por página

  for (let i = 0; i < cardsData.length; i += cardsPerPage) {
    if (i > 0) pdf.addPage('letter', 'portrait');

    const slice = cardsData.slice(i, i + cardsPerPage);

    // Hoja de Frentes
    pdf.setFontSize(8);
    pdf.setTextColor(120, 120, 120);
    pdf.text(`Volckan Print Studio · Lote de Credenciales CR80 (Frentes) · Página ${Math.floor(i / cardsPerPage) + 1}`, marginX, 10);

    slice.forEach((card, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const x = marginX + col * (cardW + gapX);
      const y = marginY + row * (cardH + gapY);

      // Marco guía de corte
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.1);
      pdf.rect(x, y, cardW, cardH);

      pdf.addImage(card.frontDataUrl, 'PNG', x, y, cardW, cardH);
    });

    // Hoja de Reversos correspondiente
    pdf.addPage('letter', 'portrait');
    pdf.text(`Volckan Print Studio · Lote de Credenciales CR80 (Reversos) · Página ${Math.floor(i / cardsPerPage) + 1}`, marginX, 10);

    slice.forEach((card, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      // Para coincidir al imprimir a doble cara por el borde largo, invertimos las columnas
      const mirrorCol = cols - 1 - col;
      const x = marginX + mirrorCol * (cardW + gapX);
      const y = marginY + row * (cardH + gapY);

      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.1);
      pdf.rect(x, y, cardW, cardH);

      pdf.addImage(card.backDataUrl, 'PNG', x, y, cardW, cardH);
    });
  }

  pdf.save(`Lote_Carnets_Imprimibles_Volckan_${Date.now()}.pdf`);
}
