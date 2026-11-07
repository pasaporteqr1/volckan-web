import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  LuMapPin as MapPin,
  LuCompass as Compass,
  LuMaximize2 as Maximize2,
  LuDollarSign as DollarSign,
  LuShare2 as Share2,
  LuFileDown as FileDown,
  LuSearch as Search,
  LuFilter as Filter,
  LuSun as Sun,
  LuCalculator as Calculator,
  LuCircleCheck as CheckCircle2,
  LuClock as Clock,
  LuLock as Lock,
  LuEye as Eye,
  LuLayers as Layers,
  LuSparkles as Sparkles,
  LuCopy as Copy,
  LuCheck as Check,
  LuBuilding2 as Building2,
  LuTrees as Trees,
  LuWaves as Waves,
  LuShieldCheck as ShieldCheck,
  LuNavigation as Navigation,
  LuChevronRight as ChevronRight,
  LuChevronUp as ChevronUp,
  LuChevronDown as ChevronDown,
  LuInfo as Info,
  LuSlidersHorizontal as SlidersHorizontal,
  LuGitCompare as GitCompare,
  LuX as X,
  LuPhone as Phone,
  LuUserCheck as UserCheck,
  LuCalendar as Calendar,
  LuTrendingUp as TrendingUp,
  LuZoomIn as ZoomIn,
  LuZoomOut as ZoomOut,
  LuRotateCcw as RotateCcw,
  LuMaximize as Maximize,
  LuMinimize as Minimize,
  LuLocateFixed as LocateFixed,
  LuHand as Hand
} from 'react-icons/lu';

type LotStatus = 'disponible' | 'reservado' | 'vendido';
type LotTier = 'Comercial' | 'Esquinero' | 'Frente a Parque' | 'Estándar';

interface Lot {
  id: string;
  codigoCatastral: string;
  sector: string;
  numero: number;
  label: string;
  frente: number;
  fondo: number;
  areaM2: number;
  areaV2: number;
  orientacion: 'Norte' | 'Sur' | 'Este' | 'Oeste' | 'Noreste' | 'Noroeste' | 'Sureste';
  latitud: number;
  longitud: number;
  altitud: number;
  precioGTQ: number;
  cuotaInicialPct: number;
  estado: LotStatus;
  categoria: LotTier;
  topografia: string;
  servicios: string[];
  plusvaliaAnual: number;
  asoleamiento: string;
  distanciaAmenidades: string;
  points: string;
  centerX: number;
  centerY: number;
  notasVendedor: string;
}

const TASA_CAMBIO_USD = 7.75; // 1 USD = 7.75 GTQ

const LOTES_DATA: Lot[] = [
  // MANZANA A (Norte - Bulevar Principal y Garita)
  {
    id: 'A-01',
    codigoCatastral: 'RET-2026-A001',
    sector: 'Manzana A (Bulevar)',
    numero: 1,
    label: 'A-01',
    frente: 12,
    fondo: 22,
    areaM2: 264,
    areaV2: 377.82,
    orientacion: 'Sur',
    latitud: 14.54182,
    longitud: -91.67412,
    altitud: 244,
    precioGTQ: 245000,
    cuotaInicialPct: 15,
    estado: 'disponible',
    categoria: 'Comercial',
    topografia: '100% Plano (Nivel de calzada)',
    servicios: ['Agua de pozo propio', 'Energía 110/220V subterránea', 'Drenaje pluvial y biodigestor', 'Fibra óptica'],
    plusvaliaAnual: 12.5,
    asoleamiento: 'Fachada iluminada por la mañana, sombra natural en jardín trasero por la tarde',
    distanciaAmenidades: 'A 35m de Garita Principal y Plazoleta Comercial',
    points: '110,95 185,95 185,180 110,180',
    centerX: 147,
    centerY: 137,
    notasVendedor: 'Ideal para inversión mixta o local comercial en planta baja. Alto tráfico peatonal.'
  },
  {
    id: 'A-02',
    codigoCatastral: 'RET-2026-A002',
    sector: 'Manzana A (Bulevar)',
    numero: 2,
    label: 'A-02',
    frente: 10,
    fondo: 22,
    areaM2: 220,
    areaV2: 314.85,
    orientacion: 'Sur',
    latitud: 14.54182,
    longitud: -91.67398,
    altitud: 244,
    precioGTQ: 198000,
    cuotaInicialPct: 15,
    estado: 'disponible',
    categoria: 'Estándar',
    topografia: '100% Plano',
    servicios: ['Agua de pozo propio', 'Energía 110/220V', 'Drenaje pluvial', 'Fibra óptica'],
    plusvaliaAnual: 11.2,
    asoleamiento: 'Ventilación cruzada dominante Sur-Norte fresca en tardes cálidas de Retalhuleu',
    distanciaAmenidades: 'A 50m de Garita Principal y 80m de Casa Club',
    points: '190,95 255,95 255,180 190,180',
    centerX: 222,
    centerY: 137,
    notasVendedor: 'Excelente relación precio/ubicación cerca del acceso principal.'
  },
  {
    id: 'A-03',
    codigoCatastral: 'RET-2026-A003',
    sector: 'Manzana A (Bulevar)',
    numero: 3,
    label: 'A-03',
    frente: 10,
    fondo: 22,
    areaM2: 220,
    areaV2: 314.85,
    orientacion: 'Sur',
    latitud: 14.54182,
    longitud: -91.67384,
    altitud: 243,
    precioGTQ: 198000,
    cuotaInicialPct: 15,
    estado: 'reservado',
    categoria: 'Estándar',
    topografia: '100% Plano',
    servicios: ['Agua de pozo propio', 'Energía 110/220V', 'Drenaje pluvial', 'Fibra óptica'],
    plusvaliaAnual: 11.2,
    asoleamiento: 'Orientación Sur con brisa directa del corredor ecológico',
    distanciaAmenidades: 'A 65m de Casa Club y Piscina',
    points: '260,95 325,95 325,180 260,180',
    centerX: 292,
    centerY: 137,
    notasVendedor: 'Reservado por Familia Morales (vence bloqueo en 48 hrs).'
  },
  {
    id: 'A-04',
    codigoCatastral: 'RET-2026-A004',
    sector: 'Manzana A (Bulevar)',
    numero: 4,
    label: 'A-04',
    frente: 10,
    fondo: 22,
    areaM2: 220,
    areaV2: 314.85,
    orientacion: 'Sur',
    latitud: 14.54181,
    longitud: -91.67370,
    altitud: 243,
    precioGTQ: 205000,
    cuotaInicialPct: 15,
    estado: 'vendido',
    categoria: 'Frente a Parque',
    topografia: '100% Plano',
    servicios: ['Agua de pozo propio', 'Energía 110/220V', 'Drenaje pluvial', 'Fibra óptica'],
    plusvaliaAnual: 11.8,
    asoleamiento: 'Vista despejada hacia el Parque Central La Ceiba',
    distanciaAmenidades: 'Frente al acceso norte del Parque Central',
    points: '330,95 395,95 395,180 330,180',
    centerX: 362,
    centerY: 137,
    notasVendedor: 'Escriturado en octubre 2026.'
  },
  {
    id: 'A-05',
    codigoCatastral: 'RET-2026-A005',
    sector: 'Manzana A (Bulevar)',
    numero: 5,
    label: 'A-05',
    frente: 14,
    fondo: 22,
    areaM2: 308,
    areaV2: 440.79,
    orientacion: 'Sureste',
    latitud: 14.54180,
    longitud: -91.67352,
    altitud: 242,
    precioGTQ: 268000,
    cuotaInicialPct: 20,
    estado: 'disponible',
    categoria: 'Esquinero',
    topografia: 'Plano con suave elevación panorámica (+0.5m)',
    servicios: ['Agua de pozo propio', 'Energía 110/220V subterránea', 'Drenaje pluvial', 'Fibra óptica', 'Doble acometida'],
    plusvaliaAnual: 13.0,
    asoleamiento: 'Doble fachada ventilada, ideal para casa con terraza mirador hacia Volcán Santiaguito',
    distanciaAmenidades: 'Frente a Casa Club y Piscina Semi-Olímpica',
    points: '400,95 485,95 495,180 400,180',
    centerX: 445,
    centerY: 137,
    notasVendedor: 'Lote esquinero premium con doble frente y vista directa a amenidades.'
  },

  // MANZANA B (Oeste - Residencial Las Palmas)
  {
    id: 'B-01',
    codigoCatastral: 'RET-2026-B001',
    sector: 'Manzana B (Las Palmas)',
    numero: 1,
    label: 'B-01',
    frente: 11,
    fondo: 20,
    areaM2: 220,
    areaV2: 314.85,
    orientacion: 'Este',
    latitud: 14.54145,
    longitud: -91.67415,
    altitud: 241,
    precioGTQ: 215000,
    cuotaInicialPct: 15,
    estado: 'disponible',
    categoria: 'Esquinero',
    topografia: '100% Plano',
    servicios: ['Agua de pozo propio', 'Energía 110/220V', 'Drenaje pluvial', 'Fibra óptica'],
    plusvaliaAnual: 12.0,
    asoleamiento: 'Sol de mañana en fachada principal; fachada totalmente fresca toda la tarde',
    distanciaAmenidades: 'Frente a Parque Central y Cancha Polideportiva',
    points: '110,230 195,230 195,295 110,295',
    centerX: 152,
    centerY: 262,
    notasVendedor: 'Orientación Este (la más buscada en clima cálido de Retalhuleu por sombra vespertina).'
  },
  {
    id: 'B-02',
    codigoCatastral: 'RET-2026-B002',
    sector: 'Manzana B (Las Palmas)',
    numero: 2,
    label: 'B-02',
    frente: 10,
    fondo: 20,
    areaM2: 200,
    areaV2: 286.23,
    orientacion: 'Este',
    latitud: 14.54132,
    longitud: -91.67415,
    altitud: 241,
    precioGTQ: 192000,
    cuotaInicialPct: 15,
    estado: 'disponible',
    categoria: 'Frente a Parque',
    topografia: '100% Plano',
    servicios: ['Agua de pozo propio', 'Energía 110/220V', 'Drenaje pluvial', 'Fibra óptica'],
    plusvaliaAnual: 11.8,
    asoleamiento: 'Sombra vespertina garantizada y brisa desde los jardines centrales',
    distanciaAmenidades: 'A 15m de Juegos Infantiles y Caminamientos',
    points: '110,300 195,300 195,365 110,365',
    centerX: 152,
    centerY: 332,
    notasVendedor: 'Perfecto para familias jóvenes; salida directa frente al área verde.'
  },
  {
    id: 'B-03',
    codigoCatastral: 'RET-2026-B003',
    sector: 'Manzana B (Las Palmas)',
    numero: 3,
    label: 'B-03',
    frente: 10,
    fondo: 20,
    areaM2: 200,
    areaV2: 286.23,
    orientacion: 'Este',
    latitud: 14.54118,
    longitud: -91.67415,
    altitud: 240,
    precioGTQ: 185000,
    cuotaInicialPct: 15,
    estado: 'vendido',
    categoria: 'Estándar',
    topografia: '100% Plano',
    servicios: ['Agua de pozo propio', 'Energía 110/220V', 'Drenaje pluvial', 'Fibra óptica'],
    plusvaliaAnual: 11.0,
    asoleamiento: 'Orientación Este fresca',
    distanciaAmenidades: 'A 40m de Parque Central',
    points: '110,370 195,370 195,435 110,435',
    centerX: 152,
    centerY: 402,
    notasVendedor: 'Vendido - Construcción de vivienda modelo iniciada.'
  },
  {
    id: 'B-04',
    codigoCatastral: 'RET-2026-B004',
    sector: 'Manzana B (Las Palmas)',
    numero: 4,
    label: 'B-04',
    frente: 12,
    fondo: 20,
    areaM2: 240,
    areaV2: 343.48,
    orientacion: 'Noreste',
    latitud: 14.54104,
    longitud: -91.67415,
    altitud: 239,
    precioGTQ: 210000,
    cuotaInicialPct: 15,
    estado: 'disponible',
    categoria: 'Esquinero',
    topografia: 'Plano, colinda con sendero arborizado',
    servicios: ['Agua de pozo propio', 'Energía 110/220V', 'Drenaje pluvial', 'Fibra óptica'],
    plusvaliaAnual: 11.9,
    asoleamiento: 'Rodeado de vegetación madura al sur, microclima 2°C más fresco',
    distanciaAmenidades: 'A 30m del Sendero Ecológico Río Bolas',
    points: '110,440 195,440 195,510 110,510',
    centerX: 152,
    centerY: 475,
    notasVendedor: 'Lote amplio con colindancia verde y máxima privacidad.'
  },

  // MANZANA C (Este - Sector Vista Club)
  {
    id: 'C-01',
    codigoCatastral: 'RET-2026-C001',
    sector: 'Manzana C (Vista Club)',
    numero: 1,
    label: 'C-01',
    frente: 12,
    fondo: 21,
    areaM2: 252,
    areaV2: 360.65,
    orientacion: 'Oeste',
    latitud: 14.54145,
    longitud: -91.67335,
    altitud: 242,
    precioGTQ: 228000,
    cuotaInicialPct: 15,
    estado: 'disponible',
    categoria: 'Frente a Parque',
    topografia: '100% Plano',
    servicios: ['Agua de pozo propio', 'Energía 110/220V subterránea', 'Drenaje pluvial', 'Fibra óptica'],
    plusvaliaAnual: 12.2,
    asoleamiento: 'Vista frontal al Parque Central y a pasos de la Piscina',
    distanciaAmenidades: 'A 20m de Casa Club y Piscina',
    points: '520,230 615,230 615,310 520,310',
    centerX: 567,
    centerY: 270,
    notasVendedor: 'Ubicación privilegiada junto a la Casa Club.'
  },
  {
    id: 'C-02',
    codigoCatastral: 'RET-2026-C002',
    sector: 'Manzana C (Vista Club)',
    numero: 2,
    label: 'C-02',
    frente: 10,
    fondo: 21,
    areaM2: 210,
    areaV2: 300.54,
    orientacion: 'Oeste',
    latitud: 14.54130,
    longitud: -91.67335,
    altitud: 241,
    precioGTQ: 195000,
    cuotaInicialPct: 15,
    estado: 'reservado',
    categoria: 'Frente a Parque',
    topografia: '100% Plano',
    servicios: ['Agua de pozo propio', 'Energía 110/220V', 'Drenaje pluvial', 'Fibra óptica'],
    plusvaliaAnual: 11.7,
    asoleamiento: 'Frente a pérgola social y jardines de ceibas',
    distanciaAmenidades: 'A 25m del Parque Central',
    points: '520,315 615,315 615,390 520,390',
    centerX: 567,
    centerY: 352,
    notasVendedor: 'Reserva activa con enganche fraccionado en revisión.'
  },
  {
    id: 'C-03',
    codigoCatastral: 'RET-2026-C003',
    sector: 'Manzana C (Vista Club)',
    numero: 3,
    label: 'C-03',
    frente: 11,
    fondo: 21,
    areaM2: 231,
    areaV2: 330.60,
    orientacion: 'Noroeste',
    latitud: 14.54115,
    longitud: -91.67335,
    altitud: 240,
    precioGTQ: 208000,
    cuotaInicialPct: 15,
    estado: 'disponible',
    categoria: 'Esquinero',
    topografia: 'Plano en esquina tranquila',
    servicios: ['Agua de pozo propio', 'Energía 110/220V', 'Drenaje pluvial', 'Fibra óptica'],
    plusvaliaAnual: 12.0,
    asoleamiento: 'Iluminación natural todo el día, sin vecinos en colindancia sur',
    distanciaAmenidades: 'A 45m de Cancha Polideportiva y Sendero',
    points: '520,395 615,395 605,475 520,475',
    centerX: 565,
    centerY: 435,
    notasVendedor: 'Excelente para diseño arquitectónico en L con jardín interior.'
  },

  // MANZANA D (Sur - Bosque Sur)
  {
    id: 'D-01',
    codigoCatastral: 'RET-2026-D001',
    sector: 'Manzana D (Bosque Sur)',
    numero: 1,
    label: 'D-01',
    frente: 10,
    fondo: 19,
    areaM2: 190,
    areaV2: 271.92,
    orientacion: 'Norte',
    latitud: 14.54095,
    longitud: -91.67395,
    altitud: 238,
    precioGTQ: 172000,
    cuotaInicialPct: 10,
    estado: 'disponible',
    categoria: 'Estándar',
    topografia: '100% Plano',
    servicios: ['Agua de pozo propio', 'Energía 110/220V', 'Drenaje pluvial', 'Fibra óptica'],
    plusvaliaAnual: 11.4,
    asoleamiento: 'Orientación Norte (fachada en sombra constante todo el año)',
    distanciaAmenidades: 'Frente a Parque Central y respaldado por Bosque Ecológico',
    points: '235,435 300,435 300,515 235,515',
    centerX: 267,
    centerY: 475,
    notasVendedor: 'El lote de menor enganche (10%) disponible en todo el proyecto.'
  },
  {
    id: 'D-02',
    codigoCatastral: 'RET-2026-D002',
    sector: 'Manzana D (Bosque Sur)',
    numero: 2,
    label: 'D-02',
    frente: 10,
    fondo: 19,
    areaM2: 190,
    areaV2: 271.92,
    orientacion: 'Norte',
    latitud: 14.54095,
    longitud: -91.67380,
    altitud: 238,
    precioGTQ: 175000,
    cuotaInicialPct: 10,
    estado: 'disponible',
    categoria: 'Frente a Parque',
    topografia: '100% Plano',
    servicios: ['Agua de pozo propio', 'Energía 110/220V', 'Drenaje pluvial', 'Fibra óptica'],
    plusvaliaAnual: 11.5,
    asoleamiento: 'Orientación Norte con vista al centro del parque y reserva atrás',
    distanciaAmenidades: 'A 10m de la rotonda peatonal del Parque Central',
    points: '305,435 370,435 370,515 305,515',
    centerX: 337,
    centerY: 475,
    notasVendedor: 'Enganche promocional del 10%. Alta demanda para primera vivienda.'
  },
  {
    id: 'D-03',
    codigoCatastral: 'RET-2026-D003',
    sector: 'Manzana D (Bosque Sur)',
    numero: 3,
    label: 'D-03',
    frente: 10,
    fondo: 19,
    areaM2: 190,
    areaV2: 271.92,
    orientacion: 'Norte',
    latitud: 14.54095,
    longitud: -91.67365,
    altitud: 238,
    precioGTQ: 175000,
    cuotaInicialPct: 10,
    estado: 'vendido',
    categoria: 'Frente a Parque',
    topografia: '100% Plano',
    servicios: ['Agua de pozo propio', 'Energía 110/220V', 'Drenaje pluvial', 'Fibra óptica'],
    plusvaliaAnual: 11.5,
    asoleamiento: 'Orientación Norte fresca',
    distanciaAmenidades: 'Frente a Parque Central',
    points: '375,435 440,435 440,515 375,515',
    centerX: 407,
    centerY: 475,
    notasVendedor: 'Vendido al contado.'
  },
  {
    id: 'D-04',
    codigoCatastral: 'RET-2026-D004',
    sector: 'Manzana D (Bosque Sur)',
    numero: 4,
    label: 'D-04',
    frente: 11,
    fondo: 19,
    areaM2: 209,
    areaV2: 299.11,
    orientacion: 'Norte',
    latitud: 14.54095,
    longitud: -91.67350,
    altitud: 239,
    precioGTQ: 189000,
    cuotaInicialPct: 10,
    estado: 'disponible',
    categoria: 'Esquinero',
    topografia: '100% Plano',
    servicios: ['Agua de pozo propio', 'Energía 110/220V', 'Drenaje pluvial', 'Fibra óptica'],
    plusvaliaAnual: 12.1,
    asoleamiento: 'Esquina Norte-Este: las dos orientaciones más frescas combinadas',
    distanciaAmenidades: 'Acceso inmediato a Sendero Ecológico y Parque',
    points: '445,435 505,435 505,515 445,515',
    centerX: 475,
    centerY: 475,
    notasVendedor: 'Joya bioclimática: esquina Norte-Este junto a reserva natural.'
  }
];

export default function LotificacionApp() {
  // Main Data & Selection State
  const [lots, setLots] = useState<Lot[]>(LOTES_DATA);
  const [selectedLotId, setSelectedLotId] = useState<string>('A-01');
  const [currency, setCurrency] = useState<'GTQ' | 'USD'>('GTQ');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [filterSector, setFilterSector] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mapLayer, setMapLayer] = useState<'estado' | 'categoria' | 'precio' | 'solar'>('estado');
  const [activeTab, setActiveTab] = useState<'ficha' | 'cotizador' | 'plusvalia' | 'ideas'>('ficha');
  const [sunHour, setSunHour] = useState<number>(15);

  // Mobile Bottom Sheet state ('peek' | 'expanded' | 'hidden')
  const [mobileSheet, setMobileSheet] = useState<'peek' | 'expanded'>('peek');
  const [isMapFullscreen, setIsMapFullscreen] = useState<boolean>(false);

  // High-performance Gesture Engine State (in Container Screen Pixels)
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scale, setScale] = useState<number>(1.0);

  // Financial Form State
  const [plazoAnios, setPlazoAnios] = useState<number>(10);
  const [tasaInteresAnual, setTasaInteresAnual] = useState<number>(8.5);
  const [engancheCustomPct, setEngancheCustomPct] = useState<number | null>(null);
  const [clienteNombre, setClienteNombre] = useState<string>('Carlos Méndez');
  const [clienteTelefono, setClienteTelefono] = useState<string>('+502 5544-8899');
  const [asesorNombre, setAsesorNombre] = useState<string>('Ing. Sofía Barrios');

  // Modals & Feedback
  const [compareList, setCompareList] = useState<string[]>(['A-01', 'B-01']);
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [selectFlash, setSelectFlash] = useState<boolean>(false);

  // DOM References
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const scaleIndicatorRef = useRef<HTMLSpanElement>(null);

  // Mutable refs for touch tracking with 0-lag and active preventDefault
  const panRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1.0);

  // Unified Clamping: keeps at least 45% of the map in viewport so it NEVER gets lost
  const clampPan = useCallback((px: number, py: number, currentScale: number, containerW: number, containerH: number) => {
    const marginX = containerW * 0.45;
    const marginY = containerH * 0.45;
    const contentW = containerW * currentScale;
    const contentH = containerH * currentScale;

    const minX = marginX - contentW;
    const maxX = containerW - marginX;
    const minY = marginY - contentH;
    const maxY = containerH - marginY;

    return {
      x: Math.min(Math.max(px, minX), maxX),
      y: Math.min(Math.max(py, minY), maxY)
    };
  }, []);

  // Direct GPU Transform (60-120 FPS hardware accelerated, zero React re-render lag)
  const applyTransformDirect = useCallback((px: number, py: number, s: number, animate = false) => {
    panRef.current = { x: px, y: py };
    scaleRef.current = s;

    if (contentWrapperRef.current) {
      contentWrapperRef.current.style.transition = animate
        ? 'transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)'
        : 'none';
      contentWrapperRef.current.style.transform = `translate3d(${px}px, ${py}px, 0px) scale(${s})`;
    }
    if (scaleIndicatorRef.current) {
      scaleIndicatorRef.current.textContent = `${Math.round(s * 100)}%`;
    }
  }, []);

  // Touch gesture session tracking
  const touchSessionRef = useRef<{
    mode: 'none' | 'pan' | 'pinch';
    startX: number;
    startY: number;
    panStartX: number;
    panStartY: number;
    initialDistance: number;
    scaleStart: number;
    contentPoint: { x: number; y: number };
    hasMoved: boolean;
    lastTapTime: number;
  }>({
    mode: 'none',
    startX: 0,
    startY: 0,
    panStartX: 0,
    panStartY: 0,
    initialDistance: 0,
    scaleStart: 1.0,
    contentPoint: { x: 0, y: 0 },
    hasMoved: false,
    lastTapTime: 0
  });

  // Keep refs in sync with state
  useEffect(() => {
    panRef.current = pan;
  }, [pan]);

  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  // Dynamic Theme according to selected lot status and category
  const lotHeaderTheme = useMemo(() => {
    if (selectedLot.estado === 'disponible') {
      return {
        headerBg: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700',
        borderColor: 'border-emerald-400/50',
        dotColor: 'bg-emerald-300',
        statusBadge: 'bg-emerald-950/60 text-emerald-200 border-emerald-400/30',
        handleBg: 'bg-emerald-300/80',
        label: 'DISPONIBLE'
      };
    } else if (selectedLot.estado === 'reservado') {
      return {
        headerBg: 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700',
        borderColor: 'border-amber-400/50',
        dotColor: 'bg-amber-300',
        statusBadge: 'bg-amber-950/60 text-amber-200 border-amber-400/30',
        handleBg: 'bg-amber-300/80',
        label: 'RESERVADO'
      };
    } else {
      return {
        headerBg: 'bg-gradient-to-r from-rose-700 via-red-700 to-rose-800',
        borderColor: 'border-rose-400/50',
        dotColor: 'bg-rose-300',
        statusBadge: 'bg-rose-950/60 text-rose-200 border-rose-400/30',
        handleBg: 'bg-rose-300/80',
        label: 'VENDIDO'
      };
    }
  }, [selectedLot.estado]);

  const selectedLot = useMemo(
    () => lots.find((l) => l.id === selectedLotId) || lots[0],
    [lots, selectedLotId]
  );

  const effectiveEnganchePct = engancheCustomPct !== null ? engancheCustomPct : selectedLot.cuotaInicialPct;

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const formatMoney = (amountGTQ: number) => {
    if (currency === 'GTQ') {
      return `Q${Math.round(amountGTQ).toLocaleString('es-GT')}`;
    }
    const usd = amountGTQ / TASA_CAMBIO_USD;
    return `$${Math.round(usd).toLocaleString('en-US')} USD`;
  };

  // Filtered lots
  const filteredLots = useMemo(() => {
    return lots.filter((lot) => {
      const matchesStatus = filterStatus === 'todos' || lot.estado === filterStatus;
      const matchesSector = filterSector === 'todos' || lot.sector === filterSector;
      const matchesSearch =
        searchQuery.trim() === '' ||
        lot.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lot.codigoCatastral.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lot.categoria.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lot.orientacion.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSector && matchesSearch;
    });
  }, [lots, filterStatus, filterSector, searchQuery]);

  // Financial Calculations
  const financialData = useMemo(() => {
    const precioTotal = selectedLot.precioGTQ;
    const cuotaInicial = (precioTotal * effectiveEnganchePct) / 100;
    const saldoFinanciar = precioTotal - cuotaInicial;
    const meses = plazoAnios * 12;
    const tasaMensual = tasaInteresAnual / 100 / 12;
    const cuotaMensual =
      tasaMensual > 0
        ? (saldoFinanciar * (tasaMensual * Math.pow(1 + tasaMensual, meses))) /
          (Math.pow(1 + tasaMensual, meses) - 1)
        : saldoFinanciar / meses;
    const iusiTrimestral = (precioTotal * 0.009) / 4;
    const valor5Anios = precioTotal * Math.pow(1 + selectedLot.plusvaliaAnual / 100, 5);

    return {
      precioTotal,
      cuotaInicial,
      saldoFinanciar,
      cuotaMensual,
      meses,
      iusiTrimestral,
      valor5Anios,
      gananciaPlusvalia5A: valor5Anios - precioTotal
    };
  }, [selectedLot, effectiveEnganchePct, plazoAnios, tasaInteresAnual]);

  // =========================================================================
  // CENTER LOT ACCURATELY ON ANY SCREEN
  // =========================================================================
  const centerOnLot = useCallback((lot: Lot, targetScale = 1.6) => {
    const container = mapContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;

    // SVG aspect ratio calculation (viewBox 0 0 720 590)
    const ratio = Math.min(W / 720, H / 590);
    const offsetX = (W - 720 * ratio) / 2;
    const offsetY = (H - 590 * ratio) / 2;

    const lotScreenX = offsetX + lot.centerX * ratio;
    const lotScreenY = offsetY + lot.centerY * ratio;

    const zoom = Math.min(Math.max(targetScale, 1.2), 3.5);
    const rawPanX = W / 2 - lotScreenX * zoom;
    const rawPanY = H / 2 - lotScreenY * zoom;
    const clamped = clampPan(rawPanX, rawPanY, zoom, W, H);

    applyTransformDirect(clamped.x, clamped.y, zoom, true);
    setScale(zoom);
    setPan(clamped);
  }, [clampPan, applyTransformDirect]);

  const handleSelectLot = (lot: Lot) => {
    // If the finger was deliberately dragging/panning the map, ignore selection
    if (touchSessionRef.current.hasMoved) return;

    setSelectedLotId(lot.id);
    setSelectFlash(true);
    setTimeout(() => setSelectFlash(false), 700);
    setEngancheCustomPct(null);
    setMobileSheet('peek');
    centerOnLot(lot, 1.5);
  };

  const handleResetView = () => {
    applyTransformDirect(0, 0, 1.0, true);
    setScale(1.0);
    setPan({ x: 0, y: 0 });
  };

  const handleZoom = (delta: number) => {
    const container = mapContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const currScale = scaleRef.current;
    const newScale = Math.min(Math.max(currScale + delta, 0.75), 4.5);
    const factor = newScale / currScale;

    const rawPanX = midX - (midX - panRef.current.x) * factor;
    const rawPanY = midY - (midY - panRef.current.y) * factor;
    const clamped = clampPan(rawPanX, rawPanY, newScale, rect.width, rect.height);

    applyTransformDirect(clamped.x, clamped.y, newScale, true);
    setScale(newScale);
    setPan(clamped);
  };

  // =========================================================================
  // NATIVE NON-PASSIVE TOUCH LISTENER REGISTRATION (Fluid Pinch & Seamless Pan)
  // =========================================================================
  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      // ONLY prevent default on multi-touch pinch to avoid browser-level page zoom
      // DO NOT prevent default on 1 finger, allowing mobile click and tap events to pass through
      if (e.touches.length > 1 && e.cancelable) {
        e.preventDefault();
      }

      const rect = el.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;

      if (e.touches.length === 1) {
        const t = e.touches[0];
        touchSessionRef.current.mode = 'pan';
        touchSessionRef.current.startX = t.clientX;
        touchSessionRef.current.startY = t.clientY;
        touchSessionRef.current.panStartX = panRef.current.x;
        touchSessionRef.current.panStartY = panRef.current.y;
        touchSessionRef.current.hasMoved = false;
      } else if (e.touches.length >= 2) {
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        const midX = (t1.clientX + t2.clientX) / 2 - rect.left;
        const midY = (t1.clientY + t2.clientY) / 2 - rect.top;

        touchSessionRef.current.mode = 'pinch';
        touchSessionRef.current.initialDistance = Math.max(dist, 10);
        touchSessionRef.current.scaleStart = scaleRef.current;
        touchSessionRef.current.panStartX = panRef.current.x;
        touchSessionRef.current.panStartY = panRef.current.y;
        touchSessionRef.current.contentPoint = {
          x: (midX - panRef.current.x) / scaleRef.current,
          y: (midY - panRef.current.y) / scaleRef.current
        };
        touchSessionRef.current.hasMoved = true;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      const rect = el.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;

      if (e.touches.length === 1 && touchSessionRef.current.mode === 'pan') {
        const t = e.touches[0];
        const dx = t.clientX - touchSessionRef.current.startX;
        const dy = t.clientY - touchSessionRef.current.startY;

        // Threshold of 10px prevents finger squish/tap from triggering pan mode
        if (Math.hypot(dx, dy) > 10) {
          touchSessionRef.current.hasMoved = true;
          // Prevent webpage scroll while actively panning the map
          if (e.cancelable) e.preventDefault();

          const rawX = touchSessionRef.current.panStartX + dx;
          const rawY = touchSessionRef.current.panStartY + dy;
          const clamped = clampPan(rawX, rawY, scaleRef.current, W, H);
          applyTransformDirect(clamped.x, clamped.y, scaleRef.current, false);
        }
      } else if (e.touches.length >= 2) {
        if (e.cancelable) e.preventDefault();
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const currentDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        const currMidX = (t1.clientX + t2.clientX) / 2 - rect.left;
        const currMidY = (t1.clientY + t2.clientY) / 2 - rect.top;

        const distanceRatio = currentDist / touchSessionRef.current.initialDistance;
        const nextScale = Math.min(Math.max(touchSessionRef.current.scaleStart * distanceRatio, 0.75), 4.5);

        const targetPanX = currMidX - touchSessionRef.current.contentPoint.x * nextScale;
        const targetPanY = currMidY - touchSessionRef.current.contentPoint.y * nextScale;
        const clamped = clampPan(targetPanX, targetPanY, nextScale, W, H);

        touchSessionRef.current.hasMoved = true;
        applyTransformDirect(clamped.x, clamped.y, nextScale, false);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      const rect = el.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;

      if (e.touches.length === 1) {
        // SEAMLESS TRANSITION: If 1 finger was lifted during pinch, re-baseline immediately to prevent jumping!
        const t = e.touches[0];
        touchSessionRef.current.mode = 'pan';
        touchSessionRef.current.startX = t.clientX;
        touchSessionRef.current.startY = t.clientY;
        touchSessionRef.current.panStartX = panRef.current.x;
        touchSessionRef.current.panStartY = panRef.current.y;
        touchSessionRef.current.hasMoved = true;
      } else if (e.touches.length === 0) {
        const wasTap = !touchSessionRef.current.hasMoved;
        touchSessionRef.current.mode = 'none';

        // Clean double tap detector without accidental triggers
        const now = Date.now();
        if (wasTap) {
          const timeSinceLast = now - touchSessionRef.current.lastTapTime;
          if (timeSinceLast > 50 && timeSinceLast < 320) {
            // Double-tap zoom/reset
            const targetScale = scaleRef.current > 1.6 ? 1.0 : 2.2;
            if (targetScale === 1.0) {
              applyTransformDirect(0, 0, 1.0, true);
              setPan({ x: 0, y: 0 });
              setScale(1.0);
            } else {
              const midX = W / 2;
              const midY = H / 2;
              const factor = targetScale / scaleRef.current;
              const newPanX = midX - (midX - panRef.current.x) * factor;
              const newPanY = midY - (midY - panRef.current.y) * factor;
              const clamped = clampPan(newPanX, newPanY, targetScale, W, H);
              applyTransformDirect(clamped.x, clamped.y, targetScale, true);
              setPan(clamped);
              setScale(targetScale);
            }
            touchSessionRef.current.lastTapTime = 0;
            return;
          }
          touchSessionRef.current.lastTapTime = now;
        }

        // Commit final coordinates to state
        setPan({ x: panRef.current.x, y: panRef.current.y });
        setScale(scaleRef.current);
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: false });
    el.addEventListener('touchcancel', onTouchEnd, { passive: false });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [clampPan, applyTransformDirect]);

  // Desktop Mouse Drag and Wheel zoom
  const isMouseDownRef = useRef(false);
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isMouseDownRef.current = true;
    touchSessionRef.current.startX = e.clientX;
    touchSessionRef.current.startY = e.clientY;
    touchSessionRef.current.panStartX = panRef.current.x;
    touchSessionRef.current.panStartY = panRef.current.y;
    touchSessionRef.current.hasMoved = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDownRef.current) return;
    const container = mapContainerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();

    const dx = e.clientX - touchSessionRef.current.startX;
    const dy = e.clientY - touchSessionRef.current.startY;

    if (Math.hypot(dx, dy) > 4) {
      touchSessionRef.current.hasMoved = true;
      const rawX = touchSessionRef.current.panStartX + dx;
      const rawY = touchSessionRef.current.panStartY + dy;
      const clamped = clampPan(rawX, rawY, scaleRef.current, rect.width, rect.height);
      applyTransformDirect(clamped.x, clamped.y, scaleRef.current, false);
    }
  };

  const handleMouseUp = () => {
    if (!isMouseDownRef.current) return;
    isMouseDownRef.current = false;
    setPan({ x: panRef.current.x, y: panRef.current.y });
    setScale(scaleRef.current);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const zoomDelta = e.deltaY < 0 ? 0.2 : -0.2;
    handleZoom(zoomDelta);
  };

  // Salesperson status toggle
  const handleToggleStatus = (newStatus: LotStatus) => {
    setLots((prev) =>
      prev.map((lot) => (lot.id === selectedLot.id ? { ...lot, estado: newStatus } : lot))
    );
    triggerToast(`Estado del Lote ${selectedLot.label} actualizado a ${newStatus.toUpperCase()}`);
  };

  // Toggle compare lot
  const handleToggleCompare = (lotId: string) => {
    setCompareList((prev) => {
      if (prev.includes(lotId)) {
        return prev.filter((id) => id !== lotId);
      }
      if (prev.length >= 3) {
        triggerToast('Puedes comparar hasta 3 lotes simultáneamente');
        return prev;
      }
      return [...prev, lotId];
    });
  };

  // Polygon Color Layer
  const getPolygonFill = (lot: Lot, isSelected: boolean, isMatched: boolean) => {
    if (!isMatched) return 'rgba(148, 163, 184, 0.22)';

    if (mapLayer === 'estado') {
      if (lot.estado === 'disponible') return isSelected ? '#059669' : '#10b981';
      if (lot.estado === 'reservado') return isSelected ? '#d97706' : '#f59e0b';
      return isSelected ? '#dc2626' : '#ef4444';
    }

    if (mapLayer === 'categoria') {
      if (lot.categoria === 'Comercial') return isSelected ? '#7c3aed' : '#8b5cf6';
      if (lot.categoria === 'Esquinero') return isSelected ? '#0284c7' : '#0ea5e9';
      if (lot.categoria === 'Frente a Parque') return isSelected ? '#0d9488' : '#14b8a6';
      return isSelected ? '#475569' : '#64748b';
    }

    if (mapLayer === 'precio') {
      const priceM2 = lot.precioGTQ / lot.areaM2;
      if (priceM2 > 910) return isSelected ? '#4f46e5' : '#6366f1';
      if (priceM2 > 880) return isSelected ? '#0284c7' : '#38bdf8';
      return isSelected ? '#059669' : '#34d399';
    }

    // Solar comfort layer
    if (lot.orientacion === 'Norte' || lot.orientacion === 'Este' || lot.orientacion === 'Noreste') {
      return isSelected ? '#0284c7' : '#38bdf8';
    }
    return isSelected ? '#ea580c' : '#fb923c';
  };

  // Share Text Generator
  const shareText = useMemo(() => {
    return `🌴 *RESIDENCIAL PASEO LAS PALMAS - RETALHULEU, GUATEMALA* 🌴
📍 *Cotización Oficial — Lote ${selectedLot.label} (${selectedLot.sector})*
👤 Preparado para: ${clienteNombre}

📐 *MEDIDAS Y UBICACIÓN:*
• Código Catastral: ${selectedLot.codigoCatastral}
• Dimensiones: ${selectedLot.frente}m de frente × ${selectedLot.fondo}m de fondo
• Área Total: ${selectedLot.areaM2} m² (${selectedLot.areaV2.toFixed(2)} varas²)
• Orientación: ${selectedLot.orientacion} (${selectedLot.categoria})
• Coordenadas GPS: ${selectedLot.latitud}° N, ${selectedLot.longitud}° W
• Altitud: ${selectedLot.altitud} msnm (Clima cálido tropical, Retalhuleu)

💰 *PLAN FINANCIERO (${currency}):*
• Precio de Lista: ${formatMoney(financialData.precioTotal)}
• Cuota Inicial (${effectiveEnganchePct}%): *${formatMoney(financialData.cuotaInicial)}*
• Saldo a Financiar: ${formatMoney(financialData.saldoFinanciar)}
• Cuota Mensual Estimada (${plazoAnios} años al ${tasaInteresAnual}%): *${formatMoney(financialData.cuotaMensual)}/mes*
• Proyección de Valor a 5 años (+${selectedLot.plusvaliaAnual}% anual): ${formatMoney(financialData.valor5Anios)}

✨ *Servicios Incluidos:* ${selectedLot.servicios.join(', ')}.
📞 *Asesor Inmobiliario:* ${asesorNombre} | Tel: ${clienteTelefono}`;
  }, [selectedLot, clienteNombre, currency, effectiveEnganchePct, financialData, plazoAnios, tasaInteresAnual, asesorNombre, clienteTelefono]);

  const handleCopyShareText = () => {
    try {
      navigator.clipboard.writeText(shareText);
      setCopiedText(true);
      triggerToast('Ficha digital copiada al portapapeles para WhatsApp / Correo');
      setTimeout(() => setCopiedText(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = shareText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedText(true);
      triggerToast('Ficha digital copiada al portapapeles');
      setTimeout(() => setCopiedText(false), 2500);
    }
  };

  // Download PDF / Print
  const handleDownloadPdfFile = () => {
    const fechaActual = new Date().toLocaleDateString('es-GT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const htmlDocument = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Ficha_Tecnica_Lote_${selectedLot.label}_Retalhuleu.html</title>
  <style>
    @page { size: A4; margin: 14mm; }
    body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; margin: 0; padding: 24px; background: #f8fafc; }
    .sheet { max-width: 780px; margin: 0 auto; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #059669; padding-bottom: 18px; margin-bottom: 24px; }
    .brand h1 { margin: 0; font-size: 24px; color: #065f46; letter-spacing: -0.5px; }
    .brand p { margin: 4px 0 0; font-size: 13px; color: #475569; }
    .badge { background: #ecfdf5; color: #047857; border: 1px solid #6ee7b7; padding: 6px 14px; border-radius: 999px; font-weight: 700; font-size: 13px; text-transform: uppercase; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 22px; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; }
    .card h3 { margin: 0 0 12px; font-size: 14px; text-transform: uppercase; color: #0f766e; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
    .row { display: flex; justify-content: space-between; font-size: 13.5px; margin-bottom: 8px; }
    .row span:first-child { color: #64748b; }
    .row span:last-child { font-weight: 600; color: #0f172a; }
    .highlight-box { background: linear-gradient(135deg, #065f46, #047857); color: white; border-radius: 10px; padding: 20px; margin-bottom: 22px; display: flex; justify-content: space-between; align-items: center; }
    .highlight-box .price { font-size: 28px; font-weight: 800; margin-top: 4px; }
    .footer { margin-top: 28px; border-top: 1px solid #e2e8f0; padding-top: 14px; display: flex; justify-content: space-between; font-size: 12px; color: #64748b; }
    .print-btn { display: inline-block; margin-bottom: 16px; background: #059669; color: white; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 600; cursor: pointer; }
    @media print { body { background: white; padding: 0; } .sheet { border: none; box-shadow: none; padding: 0; } .print-btn { display: none; } }
  </style>
</head>
<body>
  <div style="max-width: 780px; margin: 0 auto;">
    <button class="print-btn" onclick="window.print()">🖨️ Imprimir / Guardar como PDF</button>
  </div>
  <div class="sheet">
    <div class="header">
      <div class="brand">
        <h1>PASEO LAS PALMAS — RETALHULEU</h1>
        <p>Km 182.5 Carretera CA-2 Occidente, Santa Cruz Muluá / Retalhuleu, Guatemala</p>
        <p style="margin-top:4px;font-weight:600;color:#0f172a;">Cliente: ${clienteNombre} | Fecha: ${fechaActual}</p>
      </div>
      <div class="badge">Lote ${selectedLot.label} • ${selectedLot.estado.toUpperCase()}</div>
    </div>

    <div class="highlight-box">
      <div>
        <div style="font-size:12px;text-transform:uppercase;opacity:0.9;">Precio Total del Lote (${selectedLot.categoria})</div>
        <div class="price">${formatMoney(financialData.precioTotal)}</div>
        <div style="font-size:12px;opacity:0.85;">Equivalente a ${formatMoney(selectedLot.precioGTQ / selectedLot.areaM2)} por m²</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:12px;text-transform:uppercase;opacity:0.9;">Cuota Inicial (${effectiveEnganchePct}%)</div>
        <div class="price" style="color:#a7f3d0;">${formatMoney(financialData.cuotaInicial)}</div>
        <div style="font-size:12px;opacity:0.9;">Cuota mensual a ${plazoAnios} años: <strong>${formatMoney(financialData.cuotaMensual)}/mes</strong></div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <h3>📐 Medidas y Datos Catastrales</h3>
        <div class="row"><span>Identificación del Lote:</span><span>Lote ${selectedLot.label} (${selectedLot.sector})</span></div>
        <div class="row"><span>Código Catastral:</span><span>${selectedLot.codigoCatastral}</span></div>
        <div class="row"><span>Frente × Fondo:</span><span>${selectedLot.frente}.00 m × ${selectedLot.fondo}.00 m</span></div>
        <div class="row"><span>Área en Metros Cuadrados:</span><span>${selectedLot.areaM2.toFixed(2)} m²</span></div>
        <div class="row"><span>Área en Varas Cuadradas:</span><span>${selectedLot.areaV2.toFixed(2)} v²</span></div>
        <div class="row"><span>Topografía:</span><span>${selectedLot.topografia}</span></div>
      </div>

      <div class="card">
        <h3>🧭 Georreferenciación y Clima</h3>
        <div class="row"><span>Orientación Solar:</span><span>${selectedLot.orientacion}</span></div>
        <div class="row"><span>Latitud Norte:</span><span>${selectedLot.latitud}° N</span></div>
        <div class="row"><span>Longitud Oeste:</span><span>${selectedLot.longitud}° W</span></div>
        <div class="row"><span>Altitud sobre el nivel del mar:</span><span>${selectedLot.altitud} msnm</span></div>
        <div class="row"><span>Jurisdicción:</span><span>Retalhuleu, Guatemala</span></div>
        <div class="row"><span>Plusvalía Anual Estimada:</span><span>+${selectedLot.plusvaliaAnual}% anual</span></div>
      </div>
    </div>

    <div class="card" style="margin-bottom:20px;">
      <h3>💰 Desglose Financiero y Proyección de Inversión</h3>
      <div class="row"><span>Precio de Contado / Lista:</span><span>${formatMoney(financialData.precioTotal)}</span></div>
      <div class="row"><span>Enganche / Cuota Inicial (${effectiveEnganchePct}%):</span><span>${formatMoney(financialData.cuotaInicial)}</span></div>
      <div class="row"><span>Saldo a Financiar (${plazoAnios} años / ${financialData.meses} cuotas):</span><span>${formatMoney(financialData.saldoFinanciar)}</span></div>
      <div class="row"><span>Tasa de Interés Anual Referencial:</span><span>${tasaInteresAnual}%</span></div>
      <div class="row"><span>Cuota Mensual Nivelada:</span><span>${formatMoney(financialData.cuotaMensual)} / mes</span></div>
      <div class="row"><span>Valor Proyectado del Lote en 5 Años:</span><span style="color:#059669;">${formatMoney(financialData.valor5Anios)} (+${formatMoney(financialData.gananciaPlusvalia5A)})</span></div>
    </div>

    <div class="card">
      <h3>✨ Urbanización, Servicios y Observaciones Técnicas</h3>
      <p style="font-size:13px;margin:0 0 8px;"><strong>Infraestructura Instalada:</strong> ${selectedLot.servicios.join(' • ')}.</p>
      <p style="font-size:13px;margin:0 0 8px;"><strong>Confort Bioclimático:</strong> ${selectedLot.asoleamiento}.</p>
      <p style="font-size:13px;margin:0;"><strong>Nota del Asesor Comercial:</strong> ${selectedLot.notasVendedor}</p>
    </div>

    <div class="footer">
      <div>Asesor Comercial: <strong>${asesorNombre}</strong> | Contacto: ${clienteTelefono}</div>
      <div>Cotización válida por 7 días calendario • Retalhuleu, Guatemala</div>
    </div>
  </div>
  <script>setTimeout(() => { window.print(); }, 400);</script>
</body>
</html>`;

    const blob = new Blob([htmlDocument], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ficha_Tecnica_Lote_${selectedLot.label}_Retalhuleu.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerToast(`Ficha PDF del Lote ${selectedLot.label} descargada`);
  };

  const stats = useMemo(() => {
    const disponibles = lots.filter((l) => l.estado === 'disponible').length;
    const reservados = lots.filter((l) => l.estado === 'reservado').length;
    const vendidos = lots.filter((l) => l.estado === 'vendido').length;
    return { disponibles, reservados, vendidos, total: lots.length };
  }, [lots]);

  const sunPosition = useMemo(() => {
    const progress = (sunHour - 7) / 11;
    const x = 670 - progress * 600;
    const y = 75 + Math.sin(progress * Math.PI) * -45;
    return { x, y, progress };
  }, [sunHour]);

  return (
    <div
      className={`w-full bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-all ${
        isMapFullscreen
          ? 'fixed inset-0 z-50 overflow-hidden flex flex-col bg-slate-950'
          : 'rounded-none sm:rounded-2xl shadow-2xl border-y sm:border border-slate-800'
      }`}
    >
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 flex items-center gap-2.5 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl border border-emerald-400/40 animate-bounce">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-xs font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* Top Application Toolbar */}
      <div className="border-b border-slate-800 bg-slate-900/95 backdrop-blur px-3 sm:px-4 py-2.5 sm:py-3 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-900/40 shrink-0">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-sm sm:text-base font-bold tracking-tight text-white truncate">
                  Paseo Las Palmas • Retalhuleu
                </h1>
                <span className="hidden xs:inline-block text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium shrink-0">
                  v2.6 Gestos
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                Km 182.5 CA-2 • 14.5414° N, 91.6738° W
              </p>
            </div>
          </div>

          {/* Quick Controls: Currency, Status Pill & Compare */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto">
            {/* KPI Status Summary (Mobile compact) */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 rounded-lg px-2 py-1 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              <strong className="text-white">{stats.disponibles}</strong>
              <span className="text-slate-600">/</span>
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
              <strong className="text-white">{stats.reservados}</strong>
              <span className="text-slate-600">/</span>
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
              <strong className="text-white">{stats.vendidos}</strong>
            </div>

            {/* Currency Toggle */}
            <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
              <button
                onClick={() => setCurrency('GTQ')}
                className={`px-2 py-1 rounded-md text-[11px] font-bold transition ${
                  currency === 'GTQ' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                GTQ
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 rounded-md text-[11px] font-bold transition ${
                  currency === 'USD' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                USD
              </button>
            </div>

            {/* Fullscreen Mobile Toggle */}
            <button
              onClick={() => setIsMapFullscreen((prev) => !prev)}
              title={isMapFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa móvil'}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition"
            >
              {isMapFullscreen ? <Minimize className="w-4 h-4 text-emerald-400" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main App Body */}
      <div
        className={`w-full ${
          isMapFullscreen
            ? 'flex-grow relative overflow-hidden flex flex-col'
            : 'grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6 p-0 sm:p-4 lg:p-6'
        }`}
      >
        {/* =================================================================== */}
        {/* LEFT / MAIN COLUMN: Interactive Map with Full Mobile Gestures       */}
        {/* =================================================================== */}
        <section
          className={`${
            isMapFullscreen
              ? 'flex-grow relative w-full h-full'
              : 'lg:col-span-7 flex flex-col gap-3 sm:gap-4'
          }`}
        >
          {/* Mobile Filter Strip (Horizontal touch-friendly scroll) */}
          <div className="bg-slate-900 border-b lg:border lg:rounded-2xl border-slate-800 p-2.5 sm:p-3 flex flex-col gap-2 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="relative flex-1 min-w-[140px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar lote (ej. A-01, Esquinero)..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-2 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="todos">Todos ({lots.length})</option>
                <option value="disponible">Disponibles ({stats.disponibles})</option>
                <option value="reservado">Reservados ({stats.reservados})</option>
                <option value="vendido">Vendidos ({stats.vendidos})</option>
              </select>

              {/* Sector Filter */}
              <select
                value={filterSector}
                onChange={(e) => setFilterSector(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 max-w-[130px] sm:max-w-none truncate"
              >
                <option value="todos">Todas las Manzanas</option>
                <option value="Manzana A (Bulevar)">Manzana A</option>
                <option value="Manzana B (Las Palmas)">Manzana B</option>
                <option value="Manzana C (Vista Club)">Manzana C</option>
                <option value="Manzana D (Bosque Sur)">Manzana D</option>
              </select>
            </div>

            {/* Layer Buttons & Solar Simulation Slider */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-0.5 text-xs">
              <div className="flex items-center gap-1 shrink-0">
                {(
                  [
                    { id: 'estado', label: 'Disponibilidad' },
                    { id: 'categoria', label: 'Categoría' },
                    { id: 'precio', label: 'Valor m²' },
                    { id: 'solar', label: 'Confort Solar' }
                  ] as const
                ).map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => setMapLayer(layer.id)}
                    className={`px-2 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition ${
                      mapLayer === layer.id
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {layer.label}
                  </button>
                ))}
              </div>

              {/* Solar Slider */}
              <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 shrink-0">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] text-slate-300 font-bold whitespace-nowrap">
                  {sunHour}:00h
                </span>
                <input
                  type="range"
                  min={7}
                  max={18}
                  step={1}
                  value={sunHour}
                  onChange={(e) => setSunHour(Number(e.target.value))}
                  className="w-16 sm:w-20 accent-amber-400 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* =================================================================== */}
          {/* MASTERPLAN CANVAS: Full Touch Gestures (Pinch to Zoom & Drag Pan)    */}
          {/* =================================================================== */}
          <div
            ref={mapContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onWheel={handleWheel}
            className={`relative w-full bg-slate-950 overflow-hidden select-none border-b sm:border border-slate-800 sm:rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing touch-none ${
              isMapFullscreen
                ? 'flex-grow h-full'
                : 'h-[54vh] sm:h-[580px] lg:h-[620px]'
            }`}
          >
            {/* North Compass Indicator */}
            <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-2 pointer-events-none">
              <div className="bg-slate-950/85 backdrop-blur border border-slate-800 rounded-xl px-2.5 py-1.5 flex items-center gap-2 shadow-lg">
                <Compass className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="text-[10px] leading-tight">
                  <div className="font-bold text-white">NORTE ↑</div>
                  <div className="text-slate-400 hidden xs:block">Brisa Sur → Norte</div>
                </div>
              </div>
            </div>

            {/* REAL-TIME SCALE INDICATOR & QUICK TOOLS */}
            {/* (Notice: Zoom + and - are completely hidden on mobile as requested!) */}
            <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 bg-slate-950/90 backdrop-blur border border-slate-800 rounded-xl p-1 shadow-xl">
              {/* Dynamic Scale Indicator responding in real time to pinch gestures */}
              <div
                title="Escala actual del mapa (usa 2 dedos para pellizcar y escalar)"
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] font-bold"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span ref={scaleIndicatorRef}>{Math.round(scale * 100)}%</span>
              </div>

              {/* Desktop Only Zoom In / Out Buttons (HIDDEN ON MOBILE) */}
              <button
                onClick={() => handleZoom(0.3)}
                title="Acercar (Solo escritorio)"
                className="hidden sm:flex w-7 h-7 rounded-lg hover:bg-slate-800 active:bg-slate-700 items-center justify-center text-slate-200 transition"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleZoom(-0.3)}
                title="Alejar (Solo escritorio)"
                className="hidden sm:flex w-7 h-7 rounded-lg hover:bg-slate-800 active:bg-slate-700 items-center justify-center text-slate-200 transition"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              {/* Center on Selected Lot button */}
              <button
                onClick={() => centerOnLot(selectedLot, 1.8)}
                title="Centrar en lote seleccionado"
                className="w-7 h-7 rounded-lg hover:bg-slate-800 active:bg-slate-700 flex items-center justify-center text-emerald-400 transition"
              >
                <LocateFixed className="w-4 h-4" />
              </button>

              {/* Reset to 100% Full View */}
              <button
                onClick={handleResetView}
                title="Restablecer vista a 100%"
                className="w-7 h-7 rounded-lg hover:bg-slate-800 active:bg-slate-700 flex items-center justify-center text-slate-300 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Transformed Content Wrapper: Hardware accelerated with translate3d and scale */}
            <div
              ref={contentWrapperRef}
              style={{
                transform: `translate3d(${pan.x}px, ${pan.y}px, 0px) scale(${scale})`,
                transformOrigin: '0 0',
                width: '100%',
                height: '100%'
              }}
              className="w-full h-full select-none"
            >
              <svg
                viewBox="0 0 720 590"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full select-none"
              >
                <defs>
                  <pattern id="grassPattern3" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="4" cy="4" r="1" fill="#065f46" opacity="0.35" />
                    <circle cx="16" cy="14" r="1.2" fill="#047857" opacity="0.35" />
                  </pattern>
                  <linearGradient id="riverGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0.45" />
                  </linearGradient>
                  <filter id="glowSelected3" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#34d399" floodOpacity="0.95" />
                  </filter>
                </defs>

                {/* Background Terrain */}
                <rect x="0" y="0" width="720" height="590" fill="url(#grassPattern3)" />

                {/* Carretera CA-2 Occidente */}
                <rect x="0" y="18" width="720" height="42" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                <line x1="0" y1="39" x2="720" y2="39" stroke="#fbbf24" strokeWidth="2" strokeDasharray="14,10" />
                <text x="24" y="34" fill="#94a3b8" fontSize="10" fontWeight="700" letterSpacing="1">
                  ← HACIA RETALHULEU / IRTRA (8 MIN)
                </text>
                <text x="445" y="54" fill="#94a3b8" fontSize="10" fontWeight="700" letterSpacing="1">
                  CA-2 OCCIDENTE • HACIA COATEPEQUE →
                </text>

                {/* Garita de Acceso */}
                <rect x="52" y="60" width="44" height="55" rx="6" fill="#0f766e" stroke="#2dd4bf" strokeWidth="1.5" />
                <text x="74" y="85" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="700">
                  GARITA
                </text>
                <text x="74" y="96" textAnchor="middle" fill="#99f6e4" fontSize="7.5">
                  CONTROL
                </text>

                {/* Paved Roads */}
                <path
                  d="M 74 60 L 74 525 L 650 525 L 650 190 L 74 190"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="34"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="215" y1="190" x2="215" y2="525" stroke="#334155" strokeWidth="28" />
                <line x1="502" y1="190" x2="502" y2="430" stroke="#334155" strokeWidth="26" />
                <line x1="215" y1="418" x2="515" y2="418" stroke="#334155" strokeWidth="26" />

                {/* Road Dashed Lines */}
                <line x1="95" y1="198" x2="630" y2="198" stroke="#64748b" strokeWidth="1.2" strokeDasharray="6,6" />
                <line x1="215" y1="210" x2="215" y2="505" stroke="#64748b" strokeWidth="1.2" strokeDasharray="6,6" />
                <line x1="230" y1="418" x2="495" y2="418" stroke="#64748b" strokeWidth="1.2" strokeDasharray="6,6" />

                <text x="310" y="202" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="600" letterSpacing="1.5">
                  BULEVAR PRINCIPAL LAS PALMAS (12M)
                </text>
                <text x="365" y="421" textAnchor="middle" fill="#cbd5e1" fontSize="8.5" fontWeight="600" letterSpacing="1">
                  CALLE DEL BOSQUE SUR
                </text>

                {/* Parque Central La Ceiba */}
                <rect
                  x="235"
                  y="225"
                  width="250"
                  height="172"
                  rx="16"
                  fill="#064e3b"
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeDasharray="4,3"
                />
                <circle cx="315" cy="310" r="36" fill="#047857" opacity="0.6" />
                <circle cx="315" cy="310" r="18" fill="#10b981" opacity="0.5" />
                <text x="315" y="307" textAnchor="middle" fill="#ecfdf5" fontSize="10" fontWeight="700">
                  PARQUE CENTRAL
                </text>
                <text x="315" y="320" textAnchor="middle" fill="#a7f3d0" fontSize="8.5">
                  &quot;LA CEIBA&quot; (ÁREA VERDE)
                </text>

                {/* Cancha Polideportiva */}
                <rect
                  x="395"
                  y="252"
                  width="72"
                  height="115"
                  rx="6"
                  fill="#0f766e"
                  stroke="#5eead4"
                  strokeWidth="1.5"
                />
                <line x1="395" y1="310" x2="467" y2="310" stroke="#5eead4" strokeWidth="1" />
                <circle cx="431" cy="310" r="12" fill="none" stroke="#5eead4" strokeWidth="1" />
                <text x="431" y="245" textAnchor="middle" fill="#99f6e4" fontSize="8" fontWeight="700">
                  CANCHA
                </text>

                {/* Casa Club & Piscina */}
                <rect
                  x="520"
                  y="92"
                  width="135"
                  height="88"
                  rx="12"
                  fill="#0f172a"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                />
                <rect
                  x="535"
                  y="108"
                  width="55"
                  height="32"
                  rx="8"
                  fill="#0284c7"
                  stroke="#7dd3fc"
                  strokeWidth="1.5"
                />
                <text x="562" y="128" textAnchor="middle" fill="#e0f2fe" fontSize="8" fontWeight="700">
                  PISCINA
                </text>
                <text x="588" y="162" textAnchor="middle" fill="#bae6fd" fontSize="9.5" fontWeight="700">
                  CASA CLUB SOCIAL
                </text>

                {/* Reserva Ecológica y Río Bolas */}
                <path
                  d="M 20 555 Q 190 535, 360 555 T 700 548 L 720 590 L 0 590 Z"
                  fill="url(#riverGrad3)"
                />
                <text x="360" y="575" textAnchor="middle" fill="#bae6fd" fontSize="10" fontWeight="700" letterSpacing="1.5">
                  🌿 RESERVA ECOLÓGICA Y CORREDOR RÍO BOLAS
                </text>

                {/* Sun Trajectory Arc */}
                <path
                  d="M 670 75 Q 370 15, 70 75"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="1.2"
                  strokeDasharray="4,4"
                  opacity="0.55"
                />
                <g transform={`translate(${sunPosition.x}, ${sunPosition.y})`}>
                  <circle cx="0" cy="0" r="14" fill="#f59e0b" opacity="0.28" />
                  <circle cx="0" cy="0" r="8" fill="#fbbf24" />
                  <text x="0" y="-13" textAnchor="middle" fill="#fde68a" fontSize="8.5" fontWeight="700">
                    ☀️ {sunHour}:00
                  </text>
                </g>

                {/* LOT POLYGONS */}
                {lots.map((lot) => {
                  const isSelected = lot.id === selectedLot.id;
                  const isMatched = filteredLots.some((fl) => fl.id === lot.id);
                  const isCompared = compareList.includes(lot.id);
                  const fillColor = getPolygonFill(lot, isSelected, isMatched);
                  const shadowDx = (12.5 - sunHour) * 1.4;

                  return (
                    <g
                      key={lot.id}
                      onClick={() => handleSelectLot(lot)}
                      onTouchEnd={(e) => {
                        if (!touchSessionRef.current.hasMoved) {
                          e.stopPropagation();
                          handleSelectLot(lot);
                        }
                      }}
                      className="cursor-pointer group"
                    >
                      {/* Dynamic Solar Shadow */}
                      <polygon
                        points={lot.points}
                        transform={`translate(${shadowDx}, 3)`}
                        fill="#020617"
                        opacity="0.35"
                      />

                      {/* Main Lot Polygon */}
                      <polygon
                        points={lot.points}
                        fill={fillColor}
                        stroke={isSelected ? '#ffffff' : isCompared ? '#818cf8' : '#0f172a'}
                        strokeWidth={isSelected ? 3.5 : isCompared ? 2.5 : 1.5}
                        filter={isSelected ? 'url(#glowSelected3)' : undefined}
                        className="transition-all duration-150 hover:brightness-110 active:scale-[0.99]"
                      />

                      {/* Lot Label */}
                      <text
                        x={lot.centerX}
                        y={lot.centerY - 5}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize={isSelected ? '14' : '12'}
                        fontWeight="800"
                        style={{ textShadow: '0px 1px 3px rgba(0,0,0,0.9)' }}
                      >
                        {lot.label}
                      </text>

                      {/* Sub-label Area / Frente */}
                      <text
                        x={lot.centerX}
                        y={lot.centerY + 10}
                        textAnchor="middle"
                        fill="#f8fafc"
                        fontSize="9"
                        fontWeight="600"
                        opacity={isMatched ? 0.95 : 0.45}
                        style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.9)' }}
                      >
                        {lot.areaM2}m² • {lot.frente}×{lot.fondo}
                      </text>

                      {/* Pulse Circle for Selected Lot */}
                      {isSelected && (
                        <circle
                          cx={lot.centerX}
                          cy={lot.centerY - 22}
                          r="5"
                          fill="#ffffff"
                          stroke="#059669"
                          strokeWidth="2.5"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Quick Strip of Lots (Swipeable in map) */}
            <div className="absolute bottom-2 left-2 right-2 z-20 flex items-center gap-1.5 overflow-x-auto py-1 px-1.5 bg-slate-950/85 backdrop-blur border border-slate-800 rounded-xl">
              <span className="text-[10px] text-slate-400 font-semibold px-1 whitespace-nowrap hidden sm:inline">
                Ir a lote:
              </span>
              {filteredLots.map((lot) => (
                <button
                  key={lot.id}
                  onClick={() => {
                    setSelectedLotId(lot.id);
                    setEngancheCustomPct(null);
                    setMobileSheet('peek');
                    centerOnLot(lot, 1.5);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 border transition flex items-center gap-1 ${
                    selectedLot.id === lot.id
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      lot.estado === 'disponible'
                        ? 'bg-emerald-400'
                        : lot.estado === 'reservado'
                        ? 'bg-amber-400'
                        : 'bg-rose-400'
                    }`}
                  />
                  <span>{lot.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* RIGHT COLUMN: Desktop Detailed View (Visible on lg: screens)        */}
        {/* =================================================================== */}
        <section className="hidden lg:flex lg:col-span-5 flex-col gap-4">
          <div className={`bg-slate-900 border rounded-2xl p-5 shadow-xl transition-all duration-300 ${lotHeaderTheme.borderColor} ${selectFlash ? 'ring-2 ring-white/50' : 'border-slate-800'}`}>
            {/* Header info */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                    LOTE {selectedLot.label}
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    ID: {selectedLot.codigoCatastral}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">
                  {selectedLot.sector} • {selectedLot.categoria}
                </h2>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                  selectedLot.estado === 'disponible'
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                    : selectedLot.estado === 'reservado'
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                    : 'bg-rose-500/15 text-rose-300 border-rose-500/40'
                }`}
              >
                {selectedLot.estado}
              </span>
            </div>

            {/* Price highlight */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-gradient-to-br from-emerald-950/90 via-slate-900 to-slate-950 border border-emerald-500/30 mb-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block">
                  Precio Total
                </span>
                <div className="text-2xl font-extrabold text-white mt-0.5">
                  {formatMoney(financialData.precioTotal)}
                </div>
                <span className="text-[11px] text-emerald-400">
                  {formatMoney(selectedLot.precioGTQ / selectedLot.areaM2)} / m²
                </span>
              </div>
              <div className="border-l border-slate-800 pl-3">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block">
                  Cuota Inicial ({effectiveEnganchePct}%)
                </span>
                <div className="text-2xl font-extrabold text-emerald-400 mt-0.5">
                  {formatMoney(financialData.cuotaInicial)}
                </div>
                <span className="text-[11px] text-slate-300">
                  Desde {formatMoney(financialData.cuotaMensual)}/mes
                </span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg shadow-emerald-900/40 transition"
              >
                <Share2 className="w-4 h-4" />
                <span>Compartir Ficha Digital</span>
              </button>
              <button
                onClick={() => setShowPdfModal(true)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-semibold text-xs transition"
              >
                <FileDown className="w-4 h-4 text-emerald-400" />
                <span>Descargar Ficha PDF</span>
              </button>
            </div>

            {/* Tab navigation */}
            <div className="grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 mb-4">
              {(
                [
                  { id: 'ficha', label: 'Ficha Técnica' },
                  { id: 'cotizador', label: 'Cotizador' },
                  { id: 'plusvalia', label: 'ROI / Clima' },
                  { id: 'ideas', label: 'Innovación' }
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 rounded-lg text-xs font-semibold transition ${
                    activeTab === tab.id
                      ? 'bg-slate-800 text-emerald-400 shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Tabs */}
            {activeTab === 'ficha' && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-slate-950/90 border border-slate-800/90 p-3 rounded-xl">
                    <span className="text-slate-400 flex items-center gap-1.5 mb-1">
                      <Maximize2 className="w-3.5 h-3.5 text-emerald-400" /> Medidas (Frente × Fondo)
                    </span>
                    <div className="text-sm font-bold text-white">
                      {selectedLot.frente}.00 m × {selectedLot.fondo}.00 m
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {selectedLot.areaM2} m² • {selectedLot.areaV2.toFixed(2)} varas²
                    </div>
                  </div>

                  <div className="bg-slate-950/90 border border-slate-800/90 p-3 rounded-xl">
                    <span className="text-slate-400 flex items-center gap-1.5 mb-1">
                      <Compass className="w-3.5 h-3.5 text-emerald-400" /> Orientación y Categoría
                    </span>
                    <div className="text-sm font-bold text-white">
                      Orientación {selectedLot.orientacion}
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-0.5">
                      Categoría: {selectedLot.categoria}
                    </div>
                  </div>

                  <div className="bg-slate-950/90 border border-slate-800/90 p-3 rounded-xl">
                    <span className="text-slate-400 flex items-center gap-1.5 mb-1">
                      <Navigation className="w-3.5 h-3.5 text-emerald-400" /> Latitud y Longitud GPS
                    </span>
                    <div className="text-sm font-bold text-white">
                      {selectedLot.latitud}° N
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {selectedLot.longitud}° W (Retalhuleu)
                    </div>
                  </div>

                  <div className="bg-slate-950/90 border border-slate-800/90 p-3 rounded-xl">
                    <span className="text-slate-400 flex items-center gap-1.5 mb-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Altitud y Topografía
                    </span>
                    <div className="text-sm font-bold text-white">
                      {selectedLot.altitud} msnm
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {selectedLot.topografia}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/90 border border-slate-800/90 p-3.5 rounded-xl space-y-2">
                  <div className="font-semibold text-slate-200 flex items-center justify-between">
                    <span>Servicios a Pie de Lote</span>
                    <span className="text-[11px] text-emerald-400">Entrega Inmediata</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedLot.servicios.map((srv, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-[11px]"
                      >
                        ✓ {srv}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-400 pt-1 border-t border-slate-800/80 leading-relaxed">
                    <strong className="text-slate-200">Argumento de Venta:</strong> {selectedLot.notasVendedor}
                  </p>
                </div>

                {/* Salesperson Quick Controls */}
                <div className="bg-slate-950/90 border border-slate-800/90 p-3.5 rounded-xl flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-300">Control de Sala de Ventas:</span>
                    <button
                      onClick={() => handleToggleCompare(selectedLot.id)}
                      className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                    >
                      <GitCompare className="w-3.5 h-3.5" />
                      {compareList.includes(selectedLot.id) ? 'Quitar de comparar' : '+ Comparar lote'}
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleToggleStatus('disponible')}
                      className={`py-1.5 rounded-lg font-semibold border transition ${
                        selectedLot.estado === 'disponible'
                          ? 'bg-emerald-600 text-white border-emerald-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      Disponible
                    </button>
                    <button
                      onClick={() => handleToggleStatus('reservado')}
                      className={`py-1.5 rounded-lg font-semibold border transition ${
                        selectedLot.estado === 'reservado'
                          ? 'bg-amber-600 text-white border-amber-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      Reservar Lote
                    </button>
                    <button
                      onClick={() => handleToggleStatus('vendido')}
                      className={`py-1.5 rounded-lg font-semibold border transition ${
                        selectedLot.estado === 'vendido'
                          ? 'bg-rose-600 text-white border-rose-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      Marcar Vendido
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cotizador' && (
              <div className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-slate-400 block mb-1">Prospecto / Cliente</label>
                    <input
                      type="text"
                      value={clienteNombre}
                      onChange={(e) => setClienteNombre(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">WhatsApp Cliente</label>
                    <input
                      type="text"
                      value={clienteTelefono}
                      onChange={(e) => setClienteTelefono(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300">Cuota Inicial (Enganche):</span>
                      <strong className="text-emerald-400">
                        {effectiveEnganchePct}% ({formatMoney(financialData.cuotaInicial)})
                      </strong>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={50}
                      step={5}
                      value={effectiveEnganchePct}
                      onChange={(e) => setEngancheCustomPct(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300">Plazo de Financiamiento:</span>
                      <strong className="text-white">{plazoAnios} años ({financialData.meses} meses)</strong>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={20}
                      step={1}
                      value={plazoAnios}
                      onChange={(e) => setPlazoAnios(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300">Tasa Anual Referencial:</span>
                      <strong className="text-white">{tasaInteresAnual}% anual</strong>
                    </div>
                    <input
                      type="range"
                      min={6.5}
                      max={12.5}
                      step={0.5}
                      value={tasaInteresAnual}
                      onChange={(e) => setTasaInteresAnual(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Saldo a Financiar:</span>
                    <span className="font-bold text-white">{formatMoney(financialData.saldoFinanciar)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cuota Mensual Nivelada:</span>
                    <span className="font-bold text-emerald-400 text-sm">
                      {formatMoney(financialData.cuotaMensual)} / mes
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ingreso Familiar Sugerido:</span>
                    <span className="font-semibold text-slate-200">
                      {formatMoney(financialData.cuotaMensual * 3)} / mes
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">IUSI Trimestral Estimado:</span>
                    <span className="font-semibold text-slate-300">
                      {formatMoney(financialData.iusiTrimestral)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'plusvalia' && (
              <div className="space-y-3 text-xs">
                <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl">
                  <div className="font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
                    <Sun className="w-4 h-4" /> Análisis Bioclimático en Retalhuleu
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-2">
                    {selectedLot.asoleamiento}.
                  </p>
                  <div className="text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    💡 <strong>Tip Arquitectónico:</strong> Orientación <strong>{selectedLot.orientacion}</strong> permite ubicar dormitorios hacia la sombra vespertina, ahorrando energía en climatización.
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-2">
                  <div className="font-semibold text-white flex items-center justify-between">
                    <span>Proyección de Plusvalía a 5 Años</span>
                    <span className="text-emerald-400">+{selectedLot.plusvaliaAnual}% Anual</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[11px]">Valor Actual</span>
                      <strong className="text-sm text-white">{formatMoney(financialData.precioTotal)}</strong>
                    </div>
                    <div className="bg-emerald-950/50 p-2.5 rounded-lg border border-emerald-500/30">
                      <span className="text-emerald-300 block text-[11px]">Valor Proyectado (5A)</span>
                      <strong className="text-sm text-emerald-400">{formatMoney(financialData.valor5Anios)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ideas' && (
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-emerald-400">Gestos Táctiles 100% Móviles</div>
                  <p className="text-slate-400 mt-0.5">Pellizca con 2 dedos para zoom fluido o desliza con 1 dedo. En tablets y smartphones el mapa es totalmente libre y sensible.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-sky-400">Bottom Sheet para Vendedores</div>
                  <p className="text-slate-400 mt-0.5">Permite a los asesores tocar cualquier lote y desplegar cotización instantánea sin perder visibilidad del masterplan.</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* =================================================================== */}
      {/* MOBILE BOTTOM SHEET: Interactive Floating Drawer for Touch Screens  */}
      {/* =================================================================== */}
      <div className="block lg:hidden">
        {/* Bottom Drawer Wrapper with strict max width and centered alignment */}
        <div className="fixed bottom-0 left-0 right-0 z-40 w-full max-w-full pointer-events-none flex justify-center">
          <div
            className={`pointer-events-auto w-full max-w-xl bg-slate-900/98 backdrop-blur-2xl border-t sm:border-x border-slate-800 shadow-[0_-10px_35px_rgba(0,0,0,0.6)] transition-all duration-300 overflow-x-hidden ${
              mobileSheet === 'expanded'
                ? 'h-[82vh] max-h-[82vh] rounded-t-3xl overflow-y-auto'
                : 'h-auto rounded-t-2xl'
            }`}
          >
            {/* DYNAMIC COLORED MODAL HEADER: Changes color with every selected terrain for instant visual confirmation */}
            <div
              onClick={() => setMobileSheet((prev) => (prev === 'peek' ? 'expanded' : 'peek'))}
              className={`w-full pt-2 pb-2.5 px-3.5 flex flex-col cursor-pointer select-none rounded-t-2xl border-b transition-all duration-300 ${
                lotHeaderTheme.headerBg
              } ${lotHeaderTheme.borderColor} ${
                selectFlash ? 'brightness-125 ring-2 ring-white/70 shadow-xl' : 'shadow'
              }`}
            >
              {/* Center Handle Bar */}
              <div className="flex justify-center mb-1.5">
                <div className={`w-10 h-1 rounded-full ${lotHeaderTheme.handleBg}`}></div>
              </div>

              {/* Title & Status Badge Bar */}
              <div className="flex items-center justify-between gap-2 text-white">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  <span className="text-xs font-black tracking-wide uppercase truncate">
                    LOTE {selectedLot.label} • {selectedLot.sector}
                  </span>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase shrink-0 ${lotHeaderTheme.statusBadge}`}>
                    {lotHeaderTheme.label}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-white/95 shrink-0">
                  <span>{mobileSheet === 'peek' ? 'Ver Ficha' : 'Minimizar'}</span>
                  {mobileSheet === 'peek' ? (
                    <ChevronUp className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-white" />
                  )}
                </div>
              </div>
            </div>

            {/* Compact Peek Summary Bar */}
            <div className="px-3.5 pb-3 pt-1 w-full max-w-full overflow-hidden">
              <div className="flex items-center justify-between gap-2 w-full">
                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black shrink-0">
                    {selectedLot.label}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border shrink-0 ${
                      selectedLot.estado === 'disponible'
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                        : selectedLot.estado === 'reservado'
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                        : 'bg-rose-500/15 text-rose-300 border-rose-500/40'
                    }`}
                  >
                    {selectedLot.estado}
                  </span>
                  <span className="text-[11px] text-slate-400 truncate hidden sm:inline">
                    {selectedLot.frente}×{selectedLot.fondo}m ({selectedLot.areaM2}m²)
                  </span>
                </div>

                {/* Price & Monthly quote */}
                <div className="text-right shrink-0">
                  <div className="text-sm sm:text-base font-extrabold text-white leading-tight">
                    {formatMoney(financialData.precioTotal)}
                  </div>
                  <div className="text-[10px] font-semibold text-emerald-400">
                    Desde {formatMoney(financialData.cuotaMensual)}/m
                  </div>
                </div>
              </div>

              {/* Quick Actions Row: fluid flex without rigid grids that overflow */}
              <div className="flex items-center gap-2 mt-2 w-full">
                <button
                  onClick={() => setMobileSheet((prev) => (prev === 'peek' ? 'expanded' : 'peek'))}
                  className="flex-1 min-w-0 py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition active:scale-[0.98]"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{mobileSheet === 'expanded' ? 'Minimizar' : 'Cotizar y Ficha'}</span>
                </button>
                <button
                  onClick={handleCopyShareText}
                  className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-emerald-900/30 transition active:scale-[0.98] shrink-0"
                  title="Compartir datos del lote"
                >
                  <Share2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Compartir</span>
                </button>
                <button
                  onClick={handleDownloadPdfFile}
                  className="py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1 border border-slate-700 transition active:scale-[0.98] shrink-0"
                  title="Descargar Ficha PDF"
                >
                  <FileDown className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>PDF</span>
                </button>
              </div>
            </div>

            {/* Expanded Drawer Content (When swiped up) */}
            {mobileSheet === 'expanded' && (
              <div className="px-3.5 sm:px-4 pb-8 space-y-3.5 pt-1 border-t border-slate-800/80 overflow-x-hidden max-w-full">
                {/* Tab Selector */}
                <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 w-full max-w-full">
                  {(
                    [
                      { id: 'ficha', label: 'Ficha Técnica' },
                      { id: 'cotizador', label: 'Cotizador' },
                      { id: 'plusvalia', label: 'Clima & ROI' }
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-1.5 px-1 rounded-lg text-[11px] sm:text-xs font-bold transition text-center truncate min-w-0 ${
                        activeTab === tab.id ? 'bg-slate-800 text-emerald-400 shadow' : 'text-slate-400'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Mobile Tab 1: Ficha */}
                {activeTab === 'ficha' && (
                  <div className="space-y-3 text-xs w-full max-w-full">
                    <div className="grid grid-cols-2 gap-2 w-full max-w-full">
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 min-w-0 overflow-hidden">
                        <span className="text-slate-400 text-[10px] block">Medidas</span>
                        <strong className="text-white text-xs block truncate">{selectedLot.frente}m × {selectedLot.fondo}m</strong>
                        <div className="text-[10px] text-slate-400 mt-0.5 truncate">{selectedLot.areaM2} m² ({selectedLot.areaV2.toFixed(1)} v²)</div>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 min-w-0 overflow-hidden">
                        <span className="text-slate-400 text-[10px] block">Orientación</span>
                        <strong className="text-white text-xs block truncate">{selectedLot.orientacion}</strong>
                        <div className="text-[10px] text-emerald-400 mt-0.5 truncate">{selectedLot.categoria}</div>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 min-w-0 overflow-hidden">
                        <span className="text-slate-400 text-[10px] block">Topografía</span>
                        <strong className="text-white text-xs block break-words leading-tight">{selectedLot.topografia}</strong>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 min-w-0 overflow-hidden">
                        <span className="text-slate-400 text-[10px] block">Altitud GPS</span>
                        <strong className="text-white text-xs block truncate">{selectedLot.altitud} msnm</strong>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 w-full max-w-full overflow-hidden">
                      <div className="text-[11px] font-bold text-slate-200 mb-1">Servicios Incluidos</div>
                      <div className="flex flex-wrap gap-1 max-w-full">
                        {selectedLot.servicios.map((s, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-[10px] text-slate-300 rounded max-w-full truncate">
                            ✓ {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Status Toggle for mobile sales agent */}
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 w-full max-w-full">
                      <div className="text-[11px] font-bold text-slate-300">Cambiar Estado (Sala de Ventas):</div>
                      <div className="grid grid-cols-3 gap-1.5 w-full max-w-full">
                        <button
                          onClick={() => handleToggleStatus('disponible')}
                          className={`py-1.5 px-1 rounded-lg text-xs font-bold border truncate min-w-0 ${
                            selectedLot.estado === 'disponible' ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          Disponible
                        </button>
                        <button
                          onClick={() => handleToggleStatus('reservado')}
                          className={`py-1.5 px-1 rounded-lg text-xs font-bold border truncate min-w-0 ${
                            selectedLot.estado === 'reservado' ? 'bg-amber-600 text-white border-amber-400' : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          Reservar
                        </button>
                        <button
                          onClick={() => handleToggleStatus('vendido')}
                          className={`py-1.5 px-1 rounded-lg text-xs font-bold border truncate min-w-0 ${
                            selectedLot.estado === 'vendido' ? 'bg-rose-600 text-white border-rose-400' : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          Vendido
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Tab 2: Cotizador */}
                {activeTab === 'cotizador' && (
                  <div className="space-y-3 text-xs w-full max-w-full">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3 w-full max-w-full">
                      <div>
                        <div className="flex justify-between items-center mb-1 text-xs">
                          <span className="text-slate-300">Enganche ({effectiveEnganchePct}%):</span>
                          <strong className="text-emerald-400">{formatMoney(financialData.cuotaInicial)}</strong>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={50}
                          step={5}
                          value={effectiveEnganchePct}
                          onChange={(e) => setEngancheCustomPct(Number(e.target.value))}
                          className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1 text-xs">
                          <span className="text-slate-300">Plazo:</span>
                          <strong className="text-white">{plazoAnios} años ({financialData.meses} meses)</strong>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={20}
                          step={1}
                          value={plazoAnios}
                          onChange={(e) => setPlazoAnios(Number(e.target.value))}
                          className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 w-full max-w-full">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Saldo a Financiar:</span>
                        <strong className="text-white">{formatMoney(financialData.saldoFinanciar)}</strong>
                      </div>
                      <div className="flex justify-between text-xs items-center">
                        <span className="text-slate-400">Cuota Mensual Estimada:</span>
                        <strong className="text-emerald-400 text-sm">{formatMoney(financialData.cuotaMensual)}/mes</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Tab 3: Clima & ROI */}
                {activeTab === 'plusvalia' && (
                  <div className="space-y-3 text-xs w-full max-w-full">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 w-full max-w-full">
                      <div className="font-bold text-amber-400 mb-1 flex items-center gap-1">
                        <Sun className="w-4 h-4 shrink-0" /> Confort Bioclimático
                      </div>
                      <p className="text-slate-300 leading-relaxed text-[11px] break-words">
                        {selectedLot.asoleamiento}.
                      </p>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 w-full max-w-full">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Plusvalía estimada:</span>
                        <strong className="text-emerald-400">+{selectedLot.plusvaliaAnual}% anual</strong>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Proyección a 5 años:</span>
                        <strong className="text-white">{formatMoney(financialData.valor5Anios)}</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL 1: SHARE DIGITAL */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-4 sm:p-5 shadow-2xl space-y-3 sm:space-y-4 max-w-[calc(100vw-1.5rem)] overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-sm sm:text-base">
                  Compartir Ficha — Lote {selectedLot.label}
                </h3>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <pre className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-[11px] text-slate-200 whitespace-pre-wrap font-mono max-h-56 overflow-y-auto break-all max-w-full">
              {shareText}
            </pre>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={handleCopyShareText}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
              >
                {copiedText ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedText ? '¡Copiado!' : 'Copiar para WhatsApp'}</span>
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PDF PREVIEW */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-4 sm:p-5 shadow-2xl space-y-3 sm:space-y-4 max-w-[calc(100vw-1.5rem)] overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <FileDown className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-sm sm:text-base">
                  Ficha Oficial PDF — Lote {selectedLot.label}
                </h3>
              </div>
              <button
                onClick={() => setShowPdfModal(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white text-slate-900 rounded-xl p-4 border border-slate-300 space-y-2 text-xs">
              <div className="font-extrabold text-sm text-emerald-900 border-b pb-1">
                PASEO LAS PALMAS • LOTE {selectedLot.label}
              </div>
              <div className="text-[11px] text-slate-600">
                {selectedLot.frente}m × {selectedLot.fondo}m ({selectedLot.areaM2}m² / {selectedLot.areaV2.toFixed(1)} v²) • {selectedLot.orientacion}
              </div>
              <div className="flex justify-between bg-emerald-900 text-white p-2.5 rounded-lg">
                <div>
                  <div className="text-[9px] text-emerald-200">Precio</div>
                  <strong className="text-xs">{formatMoney(financialData.precioTotal)}</strong>
                </div>
                <div>
                  <div className="text-[9px] text-emerald-200">Enganche ({effectiveEnganchePct}%)</div>
                  <strong className="text-xs text-emerald-300">{formatMoney(financialData.cuotaInicial)}</strong>
                </div>
                <div>
                  <div className="text-[9px] text-emerald-200">Mensualidad</div>
                  <strong className="text-xs">{formatMoney(financialData.cuotaMensual)}/mes</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={handleDownloadPdfFile}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition"
              >
                <FileDown className="w-4 h-4" />
                <span>Descargar PDF</span>
              </button>
              <button
                onClick={() => setShowPdfModal(false)}
                className="px-3 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: COMPARE */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-4 sm:p-5 shadow-2xl space-y-3 max-w-[calc(100vw-1.5rem)] overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white text-sm sm:text-base">
                  Comparador ({compareList.length}/3)
                </h3>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {compareList.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">
                No hay lotes en el comparador. Usa &quot;+ Comparar lote&quot; en la ficha técnica.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-1.5 px-2">Dato</th>
                      {compareList.map((id) => (
                        <th key={id} className="py-1.5 px-2 text-white font-bold">
                          Lote {id}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    <tr>
                      <td className="py-1.5 px-2 text-slate-400">Área</td>
                      {compareList.map((id) => {
                        const l = lots.find((x) => x.id === id);
                        return <td key={id} className="py-1.5 px-2 text-slate-200">{l?.areaM2} m²</td>;
                      })}
                    </tr>
                    <tr>
                      <td className="py-1.5 px-2 text-slate-400">Precio</td>
                      {compareList.map((id) => {
                        const l = lots.find((x) => x.id === id);
                        return (
                          <td key={id} className="py-1.5 px-2 font-bold text-emerald-400">
                            {l ? formatMoney(l.precioGTQ) : '-'}
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td className="py-1.5 px-2 text-slate-400">Enganche</td>
                      {compareList.map((id) => {
                        const l = lots.find((x) => x.id === id);
                        return (
                          <td key={id} className="py-1.5 px-2 text-slate-200">
                            {l ? formatMoney((l.precioGTQ * l.cuotaInicialPct) / 100) : '-'}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex justify-end pt-1">
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
