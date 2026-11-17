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
  isActive?: boolean;
  productType?: 'fisico' | 'digital' | 'servicio';
  sku?: string;
  warranty?: string;
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
  { id: 'servicios', label: 'Servicios & Automatizaciones', icon: '⚙️', description: 'Automatización con IA, consultoría técnica y ciberseguridad', order: 4 },
  { id: 'tarjetas', label: 'Tarjetas de Presentación', icon: '🪪', description: 'Impresión en pliego Arch B (12"×18") con editor de ajuste y corte', order: 5 }
];

export const MERCADO_CATEGORIES = [
  { id: 'todos', label: 'Todo el Ecosistema', icon: '⚡' },
  { id: 'software', label: 'Software & SaaS', icon: '💻' },
  { id: 'hardware', label: 'Hardware & POS', icon: '🖨️' },
  { id: 'insumos', label: 'Credenciales & QR', icon: '🏷️' },
  { id: 'servicios', label: 'Servicios e IA', icon: '⚙️' },
  { id: 'tarjetas', label: 'Tarjetas de Presentación', icon: '🪪' }
] as const;

// Catálogo inicial limpio: los productos y suites reales se administran desde /panel (Firestore)
export const DEFAULT_BOOK_COLLECTIONS: BookCollection[] = [];

export const DEFAULT_MERCADO_PRODUCTS: MercadoProduct[] = [];

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

