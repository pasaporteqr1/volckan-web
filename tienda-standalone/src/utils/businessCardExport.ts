import jsPDF from 'jspdf';

export type PrintFormatId = 'arch_b_90x50' | 'arch_b_88.9x50.8' | 'flyer_letter' | 'flyer_a4';

export interface PrintFormatSpec {
  id: PrintFormatId;
  category: 'card' | 'flyer';
  label: string;
  sheetLabel: string;
  sheetW: number;
  sheetH: number;
  cols: number;
  rows: number;
  perSheet: number;
  trimW: number;
  trimH: number;
  bleed: number;
  gapX: number;
  gapY: number;
  outPxW: number; // 300 DPI width (con bleed)
  outPxH: number; // 300 DPI height (con bleed)
}

export const PRINT_FORMATS: Record<PrintFormatId, PrintFormatSpec> = {
  arch_b_90x50: {
    id: 'arch_b_90x50',
    category: 'card',
    label: 'Tarjeta 90 × 50 mm (Estándar)',
    sheetLabel: 'Pliego Arch B (12" × 18" / 304.8 × 457.2 mm)',
    sheetW: 304.8,
    sheetH: 457.2,
    cols: 3,
    rows: 8,
    perSheet: 24,
    trimW: 90.0,
    trimH: 50.0,
    bleed: 1.0,
    gapX: 4.0,
    gapY: 1.5,
    outPxW: 1087,
    outPxH: 614
  },
  'arch_b_88.9x50.8': {
    id: 'arch_b_88.9x50.8',
    category: 'card',
    label: 'Tarjeta 88.9 × 50.8 mm (3.5" × 2")',
    sheetLabel: 'Pliego Arch B (12" × 18" / 304.8 × 457.2 mm)',
    sheetW: 304.8,
    sheetH: 457.2,
    cols: 3,
    rows: 8,
    perSheet: 24,
    trimW: 88.9,
    trimH: 50.8,
    bleed: 1.0,
    gapX: 4.0,
    gapY: 1.5,
    outPxW: 1074,
    outPxH: 624
  },
  flyer_letter: {
    id: 'flyer_letter',
    category: 'flyer',
    label: 'Volante 1/4 Carta (100 × 131 mm)',
    sheetLabel: 'Hoja US Letter (8.5" × 11" / 215.9 × 279.4 mm)',
    sheetW: 215.9,
    sheetH: 279.4,
    cols: 2,
    rows: 2,
    perSheet: 4,
    trimW: 100.0,
    trimH: 131.0,
    bleed: 1.0,
    gapX: 2.0,
    gapY: 2.0,
    outPxW: 1205,
    outPxH: 1559
  },
  flyer_a4: {
    id: 'flyer_a4',
    category: 'flyer',
    label: 'Volante 1/4 A4 (97 × 140 mm)',
    sheetLabel: 'Hoja A4 (210 × 297 mm)',
    sheetW: 210.0,
    sheetH: 297.0,
    cols: 2,
    rows: 2,
    perSheet: 4,
    trimW: 97.0,
    trimH: 140.0,
    bleed: 1.0,
    gapX: 2.0,
    gapY: 2.0,
    outPxW: 1169,
    outPxH: 1677
  }
};

export interface BusinessCardPrintOptions {
  frontDataUrl: string;
  backDataUrl?: string;
  sheetsCount: number;
  formatId?: PrintFormatId;
  doubleSided?: boolean;
  clientName?: string;
}

function drawRegistrationCross(pdf: jsPDF, cx: number, cy: number, radius = 2.6) {
  pdf.setDrawColor(35, 35, 35);
  pdf.setLineWidth(0.15);
  pdf.circle(cx, cy, radius);
  pdf.line(cx - radius - 1.5, cy, cx + radius + 1.5, cy);
  pdf.line(cx, cy - radius - 1.5, cx, cy + radius + 1.5);
  pdf.circle(cx, cy, radius * 0.4);
}

function drawCornerCropMarks(
  pdf: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  bleed = 1.0,
  markLen = 2.5,
  offset = 0.5
) {
  const trimX = x + bleed;
  const trimY = y + bleed;
  const trimW = w - bleed * 2;
  const trimH = h - bleed * 2;

  pdf.setDrawColor(90, 90, 90);
  pdf.setLineWidth(0.15);

  pdf.line(trimX - offset - markLen, trimY, trimX - offset, trimY);
  pdf.line(trimX, trimY - offset - markLen, trimX, trimY - offset);

  pdf.line(trimX + trimW + offset, trimY, trimX + trimW + offset + markLen, trimY);
  pdf.line(trimX + trimW, trimY - offset - markLen, trimX + trimW, trimY - offset);

  pdf.line(trimX - offset - markLen, trimY + trimH, trimX - offset, trimY + trimH);
  pdf.line(trimX, trimY + trimH + offset, trimX, trimY + trimH + offset + markLen);

  pdf.line(trimX + trimW + offset, trimY + trimH, trimX + trimW + offset + markLen, trimY + trimH);
  pdf.line(trimX + trimW, trimY + trimH + offset, trimX + trimW, trimY + trimH + offset + markLen);
}

function drawCmykColorBar(pdf: jsPDF, x: number, y: number, totalW: number, h = 1.8) {
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

async function optimizeImageForPrintPdf(
  dataUrl: string,
  fallbackW: number,
  fallbackH: number,
  quality = 0.94
): Promise<{ dataUrl: string; format: 'JPEG' | 'PNG' }> {
  if (dataUrl.startsWith('data:image/jpeg') || dataUrl.startsWith('data:image/jpg')) {
    return { dataUrl, format: 'JPEG' };
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || fallbackW;
        canvas.height = img.naturalHeight || fallbackH;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({ dataUrl, format: 'PNG' });
          return;
        }
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const jpegUrl = canvas.toDataURL('image/jpeg', quality);
        resolve({ dataUrl: jpegUrl, format: 'JPEG' });
      } catch {
        resolve({ dataUrl, format: 'PNG' });
      }
    };
    img.onerror = () => resolve({ dataUrl, format: 'PNG' });
    img.src = dataUrl;
  });
}

/**
 * Genera y descarga un PDF de impresión con compresión Flate, JPEG 300 DPI y deduplicación XObject.
 * Soporta Tarjetas de Presentación en Pliego Arch B (24/pliego) y Volantes 1/4 Carta en US Letter / A4 (4/hoja).
 */
export async function exportPrintSheetPdf({
  frontDataUrl,
  backDataUrl,
  sheetsCount,
  formatId = 'arch_b_90x50',
  doubleSided = false,
  clientName = 'Cliente_Volckan'
}: BusinessCardPrintOptions): Promise<void> {
  const spec = PRINT_FORMATS[formatId] || PRINT_FORMATS.arch_b_90x50;
  const { sheetW, sheetH, cols, rows, perSheet, trimW, trimH, bleed, gapX, gapY, outPxW, outPxH } = spec;

  const itemW = trimW + bleed * 2;
  const itemH = trimH + bleed * 2;

  const totalGridW = cols * itemW + (cols - 1) * gapX;
  const totalGridH = rows * itemH + (rows - 1) * gapY;
  const marginX = (sheetW - totalGridW) / 2;
  const marginY = (sheetH - totalGridH) / 2;

  const optimizedFront = await optimizeImageForPrintPdf(frontDataUrl, outPxW, outPxH, 0.94);
  const optimizedBack = doubleSided && backDataUrl
    ? await optimizeImageForPrintPdf(backDataUrl, outPxW, outPxH, 0.94)
    : null;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [sheetW, sheetH],
    compress: true
  });

  const safeSheets = Math.max(1, Math.min(sheetsCount, 50));
  const isFlyer = spec.category === 'flyer';
  const pieceWord = isFlyer ? 'volantes' : 'tarjetas';
  const sheetWord = isFlyer ? 'Hoja' : 'Pliego';

  for (let s = 0; s < safeSheets; s++) {
    const sheetNum = s + 1;

    // HOJA TIRO (FRENTES)
    if (s > 0) {
      pdf.addPage([sheetW, sheetH], 'portrait');
    }

    if (!isFlyer) {
      drawRegistrationCross(pdf, sheetW / 2, 7.5);
      drawRegistrationCross(pdf, sheetW / 2, sheetH - 7.5);
      drawRegistrationCross(pdf, 5.5, sheetH / 2);
      drawRegistrationCross(pdf, sheetW - 5.5, sheetH / 2);
    }

    drawCmykColorBar(pdf, marginX, sheetH - (isFlyer ? 3.2 : 11.5), totalGridW, isFlyer ? 1.4 : 2.2);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(isFlyer ? 6.5 : 7.5);
    pdf.setTextColor(30, 41, 59);
    pdf.text(
      `VOLCKAN PRINT STUDIO · ${spec.label.toUpperCase()} · TIRO (FRENTE)`,
      marginX,
      isFlyer ? 3.8 : 8.5
    );

    if (!isFlyer) {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(6.5);
      pdf.setTextColor(100, 116, 139);
      pdf.text(
        `${sheetWord} ${sheetNum}/${safeSheets} · ${perSheet} ${pieceWord}/hoja (${safeSheets * perSheet} total) · Sangrado +${bleed}mm`,
        marginX,
        11.8
      );
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = marginX + c * (itemW + gapX);
        const y = marginY + r * (itemH + gapY);

        pdf.addImage(optimizedFront.dataUrl, optimizedFront.format, x, y, itemW, itemH, 'print-front', 'MEDIUM');
        drawCornerCropMarks(pdf, x, y, itemW, itemH, bleed, isFlyer ? 2.0 : 2.5, 0.4);
      }
    }

    // HOJA RETIRO (REVERSOS ESPEJADOS DÚPLEX)
    if (doubleSided && optimizedBack) {
      pdf.addPage([sheetW, sheetH], 'portrait');

      if (!isFlyer) {
        drawRegistrationCross(pdf, sheetW / 2, 7.5);
        drawRegistrationCross(pdf, sheetW / 2, sheetH - 7.5);
        drawRegistrationCross(pdf, 5.5, sheetH / 2);
        drawRegistrationCross(pdf, sheetW - 5.5, sheetH / 2);
      }

      drawCmykColorBar(pdf, marginX, sheetH - (isFlyer ? 3.2 : 11.5), totalGridW, isFlyer ? 1.4 : 2.2);

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(isFlyer ? 6.5 : 7.5);
      pdf.setTextColor(30, 41, 59);
      pdf.text(
        `VOLCKAN PRINT STUDIO · ${spec.label.toUpperCase()} · RETIRO (REVERSO DÚPLEX)`,
        marginX,
        isFlyer ? 3.8 : 8.5
      );

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const mirroredCol = cols - 1 - c;
          const x = marginX + mirroredCol * (itemW + gapX);
          const y = marginY + r * (itemH + gapY);

          pdf.addImage(optimizedBack.dataUrl, optimizedBack.format, x, y, itemW, itemH, 'print-back', 'MEDIUM');
          drawCornerCropMarks(pdf, x, y, itemW, itemH, bleed, isFlyer ? 2.0 : 2.5, 0.4);
        }
      }
    }
  }

  const cleanClient = clientName.replace(/[^a-zA-Z0-9_-]/g, '_');
  const prefix = isFlyer
    ? formatId === 'flyer_a4'
      ? 'Volantes_CuartoCarta_A4'
      : 'Volantes_CuartoCarta_USLetter'
    : 'Tarjetas_ArchB';
  pdf.save(`${prefix}_${safeSheets}Hojas_${safeSheets * perSheet}pcs_${cleanClient}.pdf`);
}
