import jsPDF from 'jspdf';

export interface BusinessCardPrintOptions {
  frontDataUrl: string;
  backDataUrl?: string;
  sheetsCount: number;
  cardFormat?: '90x50' | '88.9x50.8';
  doubleSided?: boolean;
  clientName?: string;
}

export const ARCH_B_SHEET = {
  widthMm: 304.8,  // 12 pulgadas
  heightMm: 457.2, // 18 pulgadas
  cols: 3,
  rows: 8,
  cardsPerSheet: 24,
  bleedMm: 1.0,    // +1mm por lado para guillotina sin bordes blancos
  gapXMm: 4.0,
  gapYMm: 1.5
};

function drawRegistrationCross(pdf: jsPDF, cx: number, cy: number, radius = 3.0) {
  pdf.setDrawColor(35, 35, 35);
  pdf.setLineWidth(0.15);
  pdf.circle(cx, cy, radius);
  pdf.line(cx - radius - 2, cy, cx + radius + 2, cy);
  pdf.line(cx, cy - radius - 2, cx, cy + radius + 2);
  pdf.circle(cx, cy, radius * 0.4);
}

function drawCornerCropMarks(
  pdf: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  bleed = 1.0,
  markLen = 3.0,
  offset = 0.6
) {
  // Las marcas de corte apuntan al tamaño FINAL recortado (descontando la demasía/bleed)
  const trimX = x + bleed;
  const trimY = y + bleed;
  const trimW = w - bleed * 2;
  const trimH = h - bleed * 2;

  pdf.setDrawColor(90, 90, 90);
  pdf.setLineWidth(0.15);

  // Superior izquierda
  pdf.line(trimX - offset - markLen, trimY, trimX - offset, trimY);
  pdf.line(trimX, trimY - offset - markLen, trimX, trimY - offset);

  // Superior derecha
  pdf.line(trimX + trimW + offset, trimY, trimX + trimW + offset + markLen, trimY);
  pdf.line(trimX + trimW, trimY - offset - markLen, trimX + trimW, trimY - offset);

  // Inferior izquierda
  pdf.line(trimX - offset - markLen, trimY + trimH, trimX - offset, trimY + trimH);
  pdf.line(trimX, trimY + trimH + offset, trimX, trimY + trimH + offset + markLen);

  // Inferior derecha
  pdf.line(trimX + trimW + offset, trimY + trimH, trimX + trimW + offset + markLen, trimY + trimH);
  pdf.line(trimX + trimW, trimY + trimH + offset, trimX + trimW, trimY + trimH + offset + markLen);
}

function drawCmykColorBar(pdf: jsPDF, x: number, y: number, totalW: number, h = 2.2) {
  const swatches = [
    [0, 180, 230],
    [230, 0, 120],
    [250, 220, 0],
    [20, 20, 20],
    [100, 100, 100],
    [180, 180, 180],
    [235, 50, 35],
    [40, 160, 60],
    [30, 80, 190]
  ];
  const swatchW = totalW / swatches.length;
  swatches.forEach(([r, g, b], i) => {
    pdf.setFillColor(r, g, b);
    pdf.rect(x + i * swatchW, y, swatchW, h, 'F');
  });
}

/**
 * Genera y descarga un PDF industrial en pliego ARCH B (12" x 18" / 304.8 x 457.2 mm)
 * optimizado para 24 tarjetas de presentación por pliego (3 columnas x 8 filas).
 */
export async function exportBusinessCardsArchBPdf({
  frontDataUrl,
  backDataUrl,
  sheetsCount,
  cardFormat = '90x50',
  doubleSided = false,
  clientName = 'Cliente_Volckan'
}: BusinessCardPrintOptions): Promise<void> {
  const sheetW = ARCH_B_SHEET.widthMm;
  const sheetH = ARCH_B_SHEET.heightMm;
  const cols = ARCH_B_SHEET.cols;
  const rows = ARCH_B_SHEET.rows;
  const bleed = ARCH_B_SHEET.bleedMm;

  const trimW = cardFormat === '88.9x50.8' ? 88.9 : 90.0;
  const trimH = cardFormat === '88.9x50.8' ? 50.8 : 50.0;

  // Tamaño con demasía (+1 mm por lado)
  const cardW = trimW + bleed * 2; // 92.0 mm o 90.9 mm
  const cardH = trimH + bleed * 2; // 52.0 mm o 52.8 mm

  const gapX = ARCH_B_SHEET.gapXMm;
  const gapY = ARCH_B_SHEET.gapYMm;

  const totalGridW = cols * cardW + (cols - 1) * gapX; // 284.0 mm
  const totalGridH = rows * cardH + (rows - 1) * gapY; // 426.5 mm
  const marginX = (sheetW - totalGridW) / 2; // 10.4 mm
  const marginY = (sheetH - totalGridH) / 2; // 15.35 mm

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [sheetW, sheetH]
  });

  const safeSheets = Math.max(1, Math.min(sheetsCount, 50));

  for (let s = 0; s < safeSheets; s++) {
    const sheetNum = s + 1;

    // HOJA TIRO (FRENTES)
    if (s > 0) {
      pdf.addPage([sheetW, sheetH], 'portrait');
    }

    drawRegistrationCross(pdf, sheetW / 2, 7.5);
    drawRegistrationCross(pdf, sheetW / 2, sheetH - 7.5);
    drawRegistrationCross(pdf, 5.5, sheetH / 2);
    drawRegistrationCross(pdf, sheetW - 5.5, sheetH / 2);

    drawCmykColorBar(pdf, marginX, sheetH - 11.5, totalGridW, 2.2);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.5);
    pdf.setTextColor(30, 41, 59);
    pdf.text(
      `VOLCKAN PRINT STUDIO · ARCH B (12"x18") · TARJETAS ${trimW}x${trimH}mm · TIRO (FRENTE)`,
      marginX,
      8.5
    );

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6.5);
    pdf.setTextColor(100, 116, 139);
    pdf.text(
      `Pliego ${sheetNum}/${safeSheets} · 24 tarjetas/pliego (${safeSheets * 24} total) · Sangrado +${bleed}mm`,
      marginX,
      11.8
    );

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = marginX + c * (cardW + gapX);
        const y = marginY + r * (cardH + gapY);

        pdf.addImage(frontDataUrl, 'PNG', x, y, cardW, cardH);
        drawCornerCropMarks(pdf, x, y, cardW, cardH, bleed);
      }
    }

    // HOJA RETIRO (REVERSOS ESPEJADOS DÚPLEX)
    if (doubleSided && backDataUrl) {
      pdf.addPage([sheetW, sheetH], 'portrait');

      drawRegistrationCross(pdf, sheetW / 2, 7.5);
      drawRegistrationCross(pdf, sheetW / 2, sheetH - 7.5);
      drawRegistrationCross(pdf, 5.5, sheetH / 2);
      drawRegistrationCross(pdf, sheetW - 5.5, sheetH / 2);

      drawCmykColorBar(pdf, marginX, sheetH - 11.5, totalGridW, 2.2);

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.5);
      pdf.setTextColor(30, 41, 59);
      pdf.text(
        `VOLCKAN PRINT STUDIO · ARCH B (12"x18") · TARJETAS ${trimW}x${trimH}mm · RETIRO (REVERSO DÚPLEX)`,
        marginX,
        8.5
      );

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(6.5);
      pdf.setTextColor(100, 116, 139);
      pdf.text(
        `Pliego ${sheetNum}/${safeSheets} · Alineación volteo horizontal · 24 tarjetas/pliego`,
        marginX,
        11.8
      );

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const mirroredCol = cols - 1 - c;
          const x = marginX + mirroredCol * (cardW + gapX);
          const y = marginY + r * (cardH + gapY);

          pdf.addImage(backDataUrl, 'PNG', x, y, cardW, cardH);
          drawCornerCropMarks(pdf, x, y, cardW, cardH, bleed);
        }
      }
    }
  }

  const cleanClient = clientName.replace(/[^a-zA-Z0-9_-]/g, '_');
  pdf.save(`Tarjetas_ArchB_${safeSheets}Pliegos_${safeSheets * 24}pcs_${cleanClient}.pdf`);
}
