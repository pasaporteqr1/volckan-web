export interface MercadoProduct {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  soldCount?: number;
  deliveryTime?: string;
  description: string;
  longDescription: string;
  badge?: string;
  icon: string;
  image?: string;
  gradeOrAge: string;
  features: string[];
  contents?: string[];
  featured?: boolean;
  inStock?: boolean;
  collectionId?: string;
  collectionName?: string;
  author?: string;
  pages?: number;
  formatType?: string;
  isbn?: string;
  coverTheme?: 'amber' | 'cyan' | 'emerald' | 'purple' | 'ruby';
  onlySoldAsPack?: boolean;
}

export interface CollectionIncludedBook {
  id: string;
  title: string;
  subtitle?: string;
  author?: string;
  pages?: number;
  gradeOrAge?: string;
  description?: string;
  image?: string;
  coverTheme?: 'amber' | 'cyan' | 'emerald' | 'purple' | 'ruby';
  isbn?: string;
}

export interface BookCollection {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  price: number;
  originalPrice: number;
  currency: string;
  gradeOrAge: string;
  rating: number;
  reviewsCount: number;
  soldCount: number;
  bookIds?: string[];
  includedBooks?: CollectionIncludedBook[];
  image?: string;
  themeColor?: string;
  accentGradient?: string;
  features: string[];
  onlySoldAsPack?: boolean;
}

export interface MercadoCategory {
  id: string;
  label: string;
  icon: string;
  description?: string;
  order?: number;
}

export const DEFAULT_MERCADO_DEPARTMENTS: MercadoCategory[] = [
  { id: 'software', label: 'Software & SaaS', icon: '💻', description: 'Plataformas en la nube, licencias y módulos digitales', order: 1 },
  { id: 'hardware', label: 'Hardware & Equipamiento', icon: '🖨️', description: 'Lectores QR, impresoras térmicas y terminales de punto de venta', order: 2 },
  { id: 'insumos', label: 'Insumos & Credenciales', icon: '🏷️', description: 'Gafetes PVC, llaveros token y stickers de alta resistencia', order: 3 },
  { id: 'servicios', label: 'Servicios & Automatizaciones', icon: '⚙️', description: 'Automatización con IA, consultoría técnica y ciberseguridad', order: 4 }
];

export const MERCADO_CATEGORIES = [
  { id: 'todos', label: 'Todo el Ecosistema', icon: '⚡' },
  { id: 'software', label: 'Software & SaaS', icon: '💻' },
  { id: 'hardware', label: 'Hardware & POS', icon: '🖨️' },
  { id: 'insumos', label: 'Credenciales & QR', icon: '🏷️' },
  { id: 'servicios', label: 'Servicios e IA', icon: '⚙️' }
] as const;

export const DEFAULT_BOOK_COLLECTIONS: BookCollection[] = [
  {
    id: 'suite-retail-pos',
    title: 'Kit Punto de Venta Llave en Mano',
    subtitle: 'Módulo POS + Impresora Térmica 80mm + Lector Láser QR',
    badge: 'KIT POPULAR',
    description: 'Solución integral para comercios, tiendas y sucursales. Incluye licencia del software de ventas con FEL, impresora térmica de alta velocidad y lector láser de códigos.',
    price: 3450.00,
    originalPrice: 4200.00,
    currency: 'Q',
    gradeOrAge: 'Comercios & Retail',
    rating: 5.0,
    reviewsCount: 48,
    soldCount: 85,
    themeColor: '#6b21a8',
    accentGradient: 'linear-gradient(135deg, #0a1128 0%, #6b21a8 50%, #dc2626 100%)',
    features: [
      'Licencia Anual Módulo POS con facturación electrónica FEL ilimitada',
      'Impresora Térmica USB/Ethernet 80mm con autocorte industrial',
      'Lector Láser 2D para QR y códigos de barra de alta velocidad',
      'Configuración inicial, carga de inventario y capacitación remota'
    ],
    bookIds: ['volckan-pos', 'volckan-impresora-pos', 'volckan-lector-qr']
  },
  {
    id: 'suite-seguridad-escolar',
    title: 'Suite SOSQR Colegio Seguro',
    subtitle: 'Plataforma SOSQR + 300 Carnets PVC + 2 Lectores QR',
    badge: 'SUITE ESCOLAR',
    description: 'Blindaje integral de seguridad para colegios e instituciones educativas. Alertas en tiempo real, fichas médicas encriptadas y carnetización para estudiantes y personal.',
    price: 5800.00,
    originalPrice: 7200.00,
    currency: 'Q',
    gradeOrAge: 'Colegios e Institutos',
    rating: 5.0,
    reviewsCount: 36,
    soldCount: 42,
    themeColor: '#dc2626',
    accentGradient: 'linear-gradient(135deg, #7f1d1d 0%, #dc2626 50%, #facc15 100%)',
    features: [
      'Licencia Anual Sistema SOSQR con alertas SMS y push ilimitadas',
      '300 Credenciales de PVC de alta duración con código QR único',
      '2 Lectores QR para portón principal y control de salidas',
      'Fichas médicas de emergencia y app para coordinadores'
    ],
    bookIds: ['volckan-sosqr', 'volckan-carnets-pvc', 'volckan-lector-qr']
  },
  {
    id: 'suite-ecosistema-total',
    title: 'Volckan Suite Empresarial Total',
    subtitle: 'Acceso Integral a las 6 Plataformas de Software Volckan',
    badge: 'CORPORATIVO',
    description: 'El paquete definitivo para organizaciones en crecimiento. Centraliza ventas, tiendas online, control de parqueos, asistencia de personal y fidelización de clientes.',
    price: 9900.00,
    originalPrice: 13500.00,
    currency: 'Q',
    gradeOrAge: 'Empresas & Franquicias',
    rating: 5.0,
    reviewsCount: 29,
    soldCount: 18,
    themeColor: '#0a1128',
    accentGradient: 'linear-gradient(135deg, #0a1128 0%, #1e1b4b 50%, #6b21a8 100%)',
    features: [
      'Acceso a Sistema SOSQR, Parqueos Digitales, Módulo POS y Tiendas',
      'Módulo de Control de Personal y Nutrición de Clientes (CRM)',
      'Soporte técnico VIP con tiempo de respuesta prioritario menor a 2 horas',
      'Actualizaciones continuas y copias de seguridad automáticas diarias'
    ],
    bookIds: ['volckan-sosqr', 'volckan-parqueos', 'volckan-pos', 'volckan-tiendas', 'volckan-personal', 'volckan-nutricion']
  }
];

export const DEFAULT_MERCADO_PRODUCTS: MercadoProduct[] = [
  {
    id: 'volckan-sosqr',
    title: 'Sistema SOSQR: Plataforma de Alertas y Emergencias Escolares',
    category: 'software',
    categoryLabel: 'Software & SaaS',
    price: 3500.00,
    originalPrice: 4500.00,
    currency: 'Q',
    rating: 5.0,
    reviewsCount: 52,
    soldCount: 94,
    deliveryTime: 'Activación Inmediata en la Nube',
    description: 'Plataforma líder para gestión de emergencias médicas, protocolos de evacuación y alertas escolares con fichas médicas protegidas.',
    longDescription: 'SOSQR transforma la seguridad en instituciones educativas y empresas. Permite a docentes, enfermeros y brigadistas escanear el carnet de cualquier alumno o colaborador para ver instantáneamente su historial médico, alergias, tipo de sangre y contactos de emergencia. Además, cuenta con botón de pánico geolocalizado que envía notificaciones automáticas por WhatsApp, SMS y correo a las autoridades del plantel.',
    badge: 'MÁS POPULAR',
    icon: '🚨',
    gradeOrAge: 'Instituciones & Empresas',
    features: [
      'Fichas médicas encriptadas accesibles vía QR',
      'Botón de pánico digital multi-canal (SMS/Push)',
      'Panel web con trazabilidad de eventos e incidencias',
      'Soporte técnico y capacitación inicial incluidos'
    ],
    featured: true,
    inStock: true,
    author: 'Tecno Volckánica',
    formatType: 'Licencia Anual Cloud SaaS'
  },
  {
    id: 'volckan-parqueos',
    title: 'Parqueos Digitales: Control de Acceso, Barreras y Tickets QR',
    category: 'software',
    categoryLabel: 'Software & SaaS',
    price: 2800.00,
    originalPrice: 3500.00,
    currency: 'Q',
    rating: 4.9,
    reviewsCount: 38,
    soldCount: 63,
    deliveryTime: 'Instalación en 24-48 horas',
    description: 'Control de tráfico vehicular, tarificación por minutos/horas, emisión de tickets con código QR dinámico y apertura de barreras.',
    longDescription: 'Diseñado para centros comerciales, edificios corporativos, universidades y parqueos públicos. Ofrece liquidación rápida en caja o cobro móvil, sincronización con barreras electromecánicas, reportes de aforo en vivo y auditoría que evita fraudes y pérdidas de tickets.',
    badge: 'ALTO TRÁFICO',
    icon: '🅿️',
    gradeOrAge: 'Edificios & Centros Comerciales',
    features: [
      'Tarificación flexible por minutos, horas o tarifa plana',
      'Integración con barreras automáticas y sensores',
      'Módulo de cobro rápido con factura FEL',
      'Reportes de ocupación y caja en tiempo real'
    ],
    featured: true,
    inStock: true,
    author: 'Tecno Volckánica',
    formatType: 'Licencia Anual + Módulo POS'
  },
  {
    id: 'volckan-pos',
    title: 'Módulo de Ventas POS: Facturación Electrónica Cero Fricción',
    category: 'software',
    categoryLabel: 'Software & SaaS',
    price: 1800.00,
    originalPrice: 2400.00,
    currency: 'Q',
    rating: 5.0,
    reviewsCount: 67,
    soldCount: 140,
    deliveryTime: 'Activación Inmediata',
    description: 'Punto de venta ultrarrápido con emisión instantánea de Factura Electrónica (FEL), cortes de caja automáticos y modo offline.',
    longDescription: 'El sistema POS de Tecno Volckánica está concebido para negocios con alto volumen de atención. Opera sin demoras al emitir facturas electrónicas avaladas por SAT, soporta múltiples métodos de pago (efectivo, tarjetas, transferencias, QR) y sigue cobrando sin internet, sincronizando los datos cuando regrese la conexión.',
    badge: 'CERO FRICCIÓN',
    icon: '💳',
    gradeOrAge: 'Comercios, Tiendas & Restaurantes',
    features: [
      'Emisión automática de Factura Electrónica (FEL)',
      'Arqueos de caja X y Z con control de turnos',
      'Compatible con cualquier lector de barras o QR',
      'Modo offline ultra resiliente sin interrupción'
    ],
    featured: true,
    inStock: true,
    author: 'Tecno Volckánica',
    formatType: 'Licencia Anual Cloud SaaS'
  },
  {
    id: 'volckan-tiendas',
    title: 'Administración de Tiendas Omnicanal: Sincronización Web + Físico',
    category: 'software',
    categoryLabel: 'Software & SaaS',
    price: 2200.00,
    originalPrice: 2900.00,
    currency: 'Q',
    rating: 4.9,
    reviewsCount: 41,
    soldCount: 78,
    deliveryTime: 'Activación Inmediata',
    description: 'Tienda en línea integrada con inventario en tiempo real, catálogo interactivo y pedidos automatizados por WhatsApp.',
    longDescription: 'Conecta tus sucursales físicas con tu tienda web. Cuando un producto se vende en tu mostrador físico, el stock se descuenta automáticamente en tu catálogo web en milisegundos. Tus clientes pueden comprar directamente desde el celular y enviar el pedido listo a tu WhatsApp oficial con desglose de precios y dirección de entrega.',
    badge: 'OMNICANAL',
    icon: '🛍️',
    gradeOrAge: 'Retail, Distribuidoras & E-commerce',
    features: [
      'Sincronización de stock en tiempo real con Firestore',
      'Generación de pedidos automáticos a WhatsApp',
      'Panel de administración de productos y promociones',
      'Diseño móvil responsivo ultra rápido'
    ],
    featured: true,
    inStock: true,
    author: 'Tecno Volckánica',
    formatType: 'Licencia Anual Cloud SaaS'
  },
  {
    id: 'volckan-personal',
    title: 'Control de Personal: Asistencia por QR y Gafetes Digitales',
    category: 'software',
    categoryLabel: 'Software & SaaS',
    price: 1600.00,
    originalPrice: 2100.00,
    currency: 'Q',
    rating: 4.8,
    reviewsCount: 33,
    soldCount: 57,
    deliveryTime: 'Activación Inmediata',
    description: 'Registro de entradas y salidas de colaboradores mediante código QR dinámico o carnet PVC, con cálculo de retardos y horas extra.',
    longDescription: 'Elimina los viejos relojes biométricos que se dañan con el sudor o huellas desgastadas. Con el sistema de control de personal de Volckan, cada trabajador cuenta con un código QR seguro que se escanea en menos de un segundo en cualquier tablet o lector USB en portería.',
    badge: 'GESTIÓN RRHH',
    icon: '👥',
    gradeOrAge: 'Empresas, Fábricas & Colegios',
    features: [
      'Marcaje instantáneo por código QR personal',
      'Control de retardos, ausencias y permisos',
      'Módulo de exportación directa a Excel / Nómina',
      'Generador automático de gafetes digitales para imprimir'
    ],
    featured: false,
    inStock: true,
    author: 'Tecno Volckánica',
    formatType: 'Licencia Anual Cloud SaaS'
  },
  {
    id: 'volckan-nutricion',
    title: 'Nutrición de Clientes: CRM Post-Venta y Retención Activa',
    category: 'software',
    categoryLabel: 'Software & SaaS',
    price: 1950.00,
    originalPrice: 2600.00,
    currency: 'Q',
    rating: 4.9,
    reviewsCount: 27,
    soldCount: 45,
    deliveryTime: 'Activación Inmediata',
    description: 'Automatización de seguimiento post-venta, encuestas de satisfacción y campañas de re-activación para maximizar el valor del cliente.',
    longDescription: 'Conseguir un nuevo cliente cuesta hasta 7 veces más que retener a uno actual. Este módulo automatiza el contacto después de una compra o servicio, enviando recordatorios de recompra, encuestas de calidad del servicio y cupones exclusivos que aumentan el ticket promedio.',
    badge: 'CRM ACTIVO',
    icon: '❤️',
    gradeOrAge: 'Servicios, Clínicas & Tiendas',
    features: [
      'Secuencias automatizadas de seguimiento post-compra',
      'Encuestas de satisfacción con alerta inmediata a gerencia',
      'Historial de consumo y valor de vida del cliente (LTV)',
      'Integración con WhatsApp y correo electrónico'
    ],
    featured: false,
    inStock: true,
    author: 'Tecno Volckánica',
    formatType: 'Licencia Anual Cloud SaaS'
  },
  {
    id: 'volckan-automatizacion',
    title: 'Ingeniería de Automatizaciones y Agentes de IA a la Medida',
    category: 'servicios',
    categoryLabel: 'Servicios & Automatizaciones',
    price: 4500.00,
    originalPrice: 6000.00,
    currency: 'Q',
    rating: 5.0,
    reviewsCount: 22,
    soldCount: 31,
    deliveryTime: 'Entrega en 10-15 días hábiles',
    description: 'Automatización integral de flujos de trabajo repetitivos, conexión de APIs y creación de agentes inteligentes de atención al cliente.',
    longDescription: 'Conectamos tus sistemas existentes (CRM, ERP, WhatsApp, hojas de cálculo de Google, bases de datos) para que trabajen en piloto automático. Reducimos el tiempo administrativo hasta en un 80% y eliminamos errores humanos en facturación, cotizaciones y atención a prospectos.',
    badge: 'INNOVACIÓN IA',
    icon: '⚡',
    gradeOrAge: 'Empresas & Negocios B2B',
    features: [
      'Auditoría y levantamiento de procesos actuales',
      'Construcción de agentes de IA entrenados con tus manuales',
      'Conexión de APIs empresariales y webhooks',
      'Garantía de funcionamiento y soporte continuo'
    ],
    featured: true,
    inStock: true,
    author: 'Tecno Volckánica',
    formatType: 'Servicio Profesional de Ingeniería'
  },
  {
    id: 'volckan-ciberseguridad',
    title: 'Auditoría de Ciberseguridad, Pentesting y Blindaje Web',
    category: 'servicios',
    categoryLabel: 'Servicios & Automatizaciones',
    price: 3900.00,
    originalPrice: 5200.00,
    currency: 'Q',
    rating: 5.0,
    reviewsCount: 19,
    soldCount: 28,
    deliveryTime: 'Informe en 7 días hábiles',
    description: 'Evaluación exhaustiva de vulnerabilidades, pruebas de intrusión éticas (pentesting) y remediación de brechas de seguridad.',
    longDescription: 'Protege la información confidencial de tu empresa y la de tus clientes frente a ciberataques, ransomware e inyecciones de código. Entregamos un diagnóstico técnico detallado con matriz de riesgos y aplicamos los parches de seguridad necesarios para blindar tus servidores y sitios web.',
    badge: 'BLINDAJE TOTAL',
    icon: '🛡️',
    gradeOrAge: 'Finanzas, Salud & E-commerce',
    features: [
      'Escaneo integral de vulnerabilidades en código y servidores',
      'Simulaciones de ataque controlado (Pentesting)',
      'Configuración de firewalls y protección anti-DDoS',
      'Informe ejecutivo y técnico de mitigación con certificación'
    ],
    featured: false,
    inStock: true,
    author: 'Tecno Volckánica',
    formatType: 'Servicio Profesional de Ciberseguridad'
  },
  {
    id: 'volckan-lector-qr',
    title: 'Lector Láser 2D QR / Código de Barras Industrial USB & Bluetooth',
    category: 'hardware',
    categoryLabel: 'Hardware & Equipamiento',
    price: 850.00,
    originalPrice: 1050.00,
    currency: 'Q',
    rating: 4.9,
    reviewsCount: 84,
    soldCount: 260,
    deliveryTime: 'Envío en 24-48 horas a todo el país',
    description: 'Lector de uso rudo para mostrador o portería. Lee códigos QR y de barras tanto impresos como en pantallas de teléfonos celulares con brillo bajo.',
    longDescription: 'Construido para resistir caídas de hasta 1.5 metros sobre concreto y jornadas continuas de trabajo. Compatible con Windows, Android, Mac y Linux sin necesidad de drivers adicionales (Plug & Play). Ideal para control de entradas escolares, arqueos de parqueos y puntos de venta.',
    badge: 'USO RUDO',
    icon: '🔦',
    gradeOrAge: 'Cajas, Porterías & Bodegas',
    features: [
      'Lectura omnidireccional de códigos 1D y 2D (QR, DataMatrix, PDF417)',
      'Escaneo directo en pantallas de celular y papel deteriorado',
      'Conexión dual USB con cable o inalámbrica Bluetooth',
      'Garantía directa de 12 meses por Tecno Volckánica'
    ],
    featured: true,
    inStock: true,
    author: 'Tecno Volckánica',
    formatType: 'Dispositivo Físico con Garantía'
  },
  {
    id: 'volckan-impresora-pos',
    title: 'Impresora Térmica POS 80mm de Alta Velocidad (Tickets y Facturas)',
    category: 'hardware',
    categoryLabel: 'Hardware & Equipamiento',
    price: 1100.00,
    originalPrice: 1350.00,
    currency: 'Q',
    rating: 4.8,
    reviewsCount: 61,
    soldCount: 195,
    deliveryTime: 'Envío en 24-48 horas a todo el país',
    description: 'Impresora térmica industrial de 80mm con autocorte y puerto Ethernet/USB para emisión de facturas FEL y tickets de parqueo.',
    longDescription: 'Impresión térmica limpia sin cartuchos de tinta ni cintas costosas. Velocidad de impresión de hasta 260 mm/s con guillotina de autocorte garantizada para más de 1.5 millones de cortes. Compatible con todos los sistemas operativos y mandos de apertura de gaveta de dinero.',
    badge: 'ALTA VELOCIDAD',
    icon: '🧾',
    gradeOrAge: 'Restaurantes, Cajas & Mostradores',
    features: [
      'Impresión térmica directa en papel estándar de 80mm',
      'Velocidad de hasta 260 mm por segundo con bajo nivel de ruido',
      'Conectividad múltiple: USB, Red Ethernet y puerto RJ11 de gaveta',
      'Guillotina de autocorte automático de larga duración'
    ],
    featured: false,
    inStock: true,
    author: 'Tecno Volckánica',
    formatType: 'Dispositivo Físico con Garantía'
  },
  {
    id: 'volckan-carnets-pvc',
    title: 'Pack 100 Carnets PVC Ultra Durables con Código QR Único',
    category: 'insumos',
    categoryLabel: 'Insumos & Credenciales',
    price: 950.00,
    originalPrice: 1200.00,
    currency: 'Q',
    rating: 5.0,
    reviewsCount: 73,
    soldCount: 310,
    deliveryTime: 'Producción y entrega en 3 a 5 días',
    description: 'Credenciales en material PVC calibre 30 (tipo tarjeta bancaria) con impresión digital a full color, laminado protector y código QR intransferible.',
    longDescription: 'Material de grado bancario resistente al agua, rayos solares, rayaduras y doblado. Incluyen perforación redonda o ranurada para cordón o clip. Cada carnet se vincula de manera única a la plataforma SOSQR o Control de Personal.',
    badge: 'CALIDAD BANCARIA',
    icon: '🪪',
    gradeOrAge: 'Colegios, Institutos & Empresas',
    features: [
      'Impresión offset digital HD a doble cara full color',
      'Laminado brillante o mate anti-rayas de larga durabilidad',
      'Código QR único de alta resolución por credencial',
      'Compatibilidad total con el ecosistema SOSQR y Volckan'
    ],
    featured: true,
    inStock: true,
    author: 'Tecno Volckánica',
    formatType: 'Insumo Físico Personalizado'
  },
  {
    id: 'volckan-llaveros-token',
    title: 'Pack 50 Llaveros Token QR en Resina Epóxica para Accesos y Parqueos',
    category: 'insumos',
    categoryLabel: 'Insumos & Credenciales',
    price: 650.00,
    originalPrice: 850.00,
    currency: 'Q',
    rating: 4.9,
    reviewsCount: 45,
    soldCount: 180,
    deliveryTime: 'Entrega en 3 a 4 días',
    description: 'Tokens compactos con código QR encapsulado en resina cristalina de alta resistencia. Ideales para llaves de vehículos o accesos a parqueos.',
    longDescription: 'La solución más práctica para usuarios frecuentes de parqueos o colaboradores en áreas operativas donde llevar un gafete de pecho es incómodo. No se borra ni se desgasta gracias al encapsulado epóxico impermeable.',
    badge: 'RESINA CRISTAL',
    icon: '🔑',
    gradeOrAge: 'Conductores, Vecinos & Personal',
    features: [
      'Encapsulado en resina epóxica anti-golpes e impermeable',
      'Argolla metálica reforzada para llavero',
      'Lectura rápida en lectores de tótem y de mano',
      'Diseño personalizado con logotipo de tu empresa'
    ],
    featured: false,
    inStock: true,
    author: 'Tecno Volckánica',
    formatType: 'Insumo Físico Personalizado'
  }
];

export const getCollectionBooks = (
  collectionOrId: BookCollection | string | undefined,
  products: MercadoProduct[] = DEFAULT_MERCADO_PRODUCTS,
  allCollections: BookCollection[] = DEFAULT_BOOK_COLLECTIONS
): MercadoProduct[] => {
  if (!collectionOrId) return [];

  const collection = typeof collectionOrId === 'string'
    ? allCollections.find(c => c.id === collectionOrId)
    : collectionOrId;

  if (!collection) return [];

  if (collection.includedBooks && collection.includedBooks.length > 0) {
    return collection.includedBooks.map((b, idx) => ({
      id: b.id || `inc-prod-${collection.id}-${idx}`,
      title: b.title,
      category: 'software',
      categoryLabel: 'Producto de Colección',
      price: collection.onlySoldAsPack ? 0 : (collection.price / collection.includedBooks!.length),
      originalPrice: collection.onlySoldAsPack ? undefined : (collection.originalPrice / collection.includedBooks!.length),
      currency: collection.currency || 'Q',
      rating: collection.rating || 5.0,
      reviewsCount: collection.reviewsCount || 1,
      deliveryTime: 'Incluido en la colección',
      description: b.description || '',
      longDescription: b.description || '',
      badge: collection.onlySoldAsPack ? 'EXCLUSIVO DEL PACK' : 'PARTE DE SUITE',
      icon: '📦',
      image: b.image || collection.image,
      gradeOrAge: b.gradeOrAge || collection.gradeOrAge,
      features: collection.features || [],
      collectionId: collection.id,
      collectionName: collection.title,
      author: b.author || 'Tecno Volckánica',
      pages: b.pages,
      formatType: 'Licencia / Dispositivo Oficial',
      coverTheme: b.coverTheme || (idx % 2 === 0 ? 'cyan' : 'purple'),
      isbn: b.isbn,
      inStock: true,
      onlySoldAsPack: collection.onlySoldAsPack
    }));
  }

  if (collection.bookIds && collection.bookIds.length > 0) {
    return collection.bookIds
      .map(id => products.find(p => p.id === id))
      .filter((p): p is MercadoProduct => Boolean(p));
  }

  return [];
};

