import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { 
  DEFAULT_MERCADO_PRODUCTS, 
  DEFAULT_BOOK_COLLECTIONS, 
  DEFAULT_MERCADO_DEPARTMENTS,
  type MercadoProduct,
  type BookCollection,
  type MercadoCategory
} from '../data/mercadoData';
import { CONTACT } from '../constants';

export interface StoreAnnouncementConfig {
  announcement: string;
  whatsappPhone: string;
  bannerTitle: string;
  bannerSubtitle: string;
  showPromoStrip: boolean;
}

interface StoreConfigContextProps {
  products: MercadoProduct[];
  collections: BookCollection[];
  categories: MercadoCategory[];
  storeConfig: StoreAnnouncementConfig;
  loading: boolean;
  saveProducts: (products: MercadoProduct[]) => Promise<void>;
  saveCollections: (collections: BookCollection[]) => Promise<void>;
  saveCategories: (categories: MercadoCategory[]) => Promise<void>;
  saveStoreConfig: (config: Partial<StoreAnnouncementConfig>) => Promise<void>;
}

const DEFAULT_STORE_CONFIG: StoreAnnouncementConfig = {
  announcement: "Ecosistema Tecnológico Volckan · Implementación, Licencias y Soporte Técnico Especializado",
  whatsappPhone: CONTACT.whatsappPhone,
  bannerTitle: "Volckan Store & Ecosistema de Apps",
  bannerSubtitle: "Adquiere licencias de software SaaS, módulos POS, hardware de control de acceso y servicios de automatización",
  showPromoStrip: true
};

const StoreConfigContext = createContext<StoreConfigContextProps | undefined>(undefined);

export const StoreConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<MercadoProduct[]>(() => {
    try {
      const saved = localStorage.getItem('store_products_cache');
      return saved ? JSON.parse(saved) : DEFAULT_MERCADO_PRODUCTS;
    } catch {
      return DEFAULT_MERCADO_PRODUCTS;
    }
  });

  const [collections, setCollections] = useState<BookCollection[]>(() => {
    try {
      const saved = localStorage.getItem('store_collections_cache');
      return saved ? JSON.parse(saved) : DEFAULT_BOOK_COLLECTIONS;
    } catch {
      return DEFAULT_BOOK_COLLECTIONS;
    }
  });

  const [categories, setCategories] = useState<MercadoCategory[]>(() => {
    try {
      const saved = localStorage.getItem('store_categories_cache');
      return saved ? JSON.parse(saved) : DEFAULT_MERCADO_DEPARTMENTS;
    } catch {
      return DEFAULT_MERCADO_DEPARTMENTS;
    }
  });

  const [storeConfig, setStoreConfig] = useState<StoreAnnouncementConfig>(() => {
    try {
      const saved = localStorage.getItem('store_announcement_cache');
      return saved ? { ...DEFAULT_STORE_CONFIG, ...JSON.parse(saved) } : DEFAULT_STORE_CONFIG;
    } catch {
      return DEFAULT_STORE_CONFIG;
    }
  });

  const [loading, setLoading] = useState<boolean>(Boolean(db));

  // Sincronización en tiempo real con Firestore si db está conectado
  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const unsubs: (() => void)[] = [];

    try {
      // 1. Productos
      const unsubProducts = onSnapshot(doc(db, 'config', 'mercado_products'), (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (Array.isArray(data?.products) && data.products.length > 0) {
            setProducts(data.products);
            try { localStorage.setItem('store_products_cache', JSON.stringify(data.products)); } catch {}
          }
        }
      }, (err) => console.warn('[StoreConfig] Error leyendo productos de Firestore:', err));
      unsubs.push(unsubProducts);

      // 2. Colecciones
      const unsubCollections = onSnapshot(doc(db, 'config', 'mercado_collections'), (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (Array.isArray(data?.collections) && data.collections.length > 0) {
            setCollections(data.collections);
            try { localStorage.setItem('store_collections_cache', JSON.stringify(data.collections)); } catch {}
          }
        }
      }, (err) => console.warn('[StoreConfig] Error leyendo colecciones de Firestore:', err));
      unsubs.push(unsubCollections);

      // 3. Categorías
      const unsubCategories = onSnapshot(doc(db, 'config', 'mercado_categories'), (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (Array.isArray(data?.categories) && data.categories.length > 0) {
            setCategories(data.categories);
            try { localStorage.setItem('store_categories_cache', JSON.stringify(data.categories)); } catch {}
          }
        }
      }, (err) => console.warn('[StoreConfig] Error leyendo categorías de Firestore:', err));
      unsubs.push(unsubCategories);

      // 4. Configuración general / Anuncios
      const unsubPortal = onSnapshot(doc(db, 'config', 'portal'), (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data?.mercadoConfig) {
            setStoreConfig(prev => {
              const updated = { ...prev, ...data.mercadoConfig };
              try { localStorage.setItem('store_announcement_cache', JSON.stringify(updated)); } catch {}
              return updated;
            });
          }
        }
        setLoading(false);
      }, (err) => {
        console.warn('[StoreConfig] Error leyendo config/portal de Firestore:', err);
        setLoading(false);
      });
      unsubs.push(unsubPortal);

    } catch (err) {
      console.warn('[StoreConfig] Excepción al suscribir a Firestore:', err);
      setLoading(false);
    }

    return () => {
      unsubs.forEach(unsub => unsub());
    };
  }, []);

  const saveProducts = async (newProducts: MercadoProduct[]) => {
    setProducts(newProducts);
    try { localStorage.setItem('store_products_cache', JSON.stringify(newProducts)); } catch {}
    if (db) {
      const docRef = doc(db, 'config', 'mercado_products');
      await setDoc(docRef, { products: newProducts, updatedAt: new Date().toISOString() }, { merge: true });
    }
  };

  const saveCollections = async (newCollections: BookCollection[]) => {
    setCollections(newCollections);
    try { localStorage.setItem('store_collections_cache', JSON.stringify(newCollections)); } catch {}
    if (db) {
      const docRef = doc(db, 'config', 'mercado_collections');
      await setDoc(docRef, { collections: newCollections, updatedAt: new Date().toISOString() }, { merge: true });
    }
  };

  const saveCategories = async (newCategories: MercadoCategory[]) => {
    setCategories(newCategories);
    try { localStorage.setItem('store_categories_cache', JSON.stringify(newCategories)); } catch {}
    if (db) {
      const docRef = doc(db, 'config', 'mercado_categories');
      await setDoc(docRef, { categories: newCategories, updatedAt: new Date().toISOString() }, { merge: true });
    }
  };

  const saveStoreConfig = async (newConfig: Partial<StoreAnnouncementConfig>) => {
    const updated = { ...storeConfig, ...newConfig };
    setStoreConfig(updated);
    try { localStorage.setItem('store_announcement_cache', JSON.stringify(updated)); } catch {}
    if (db) {
      const docRef = doc(db, 'config', 'portal');
      await setDoc(docRef, { mercadoConfig: updated, updatedAt: new Date().toISOString() }, { merge: true });
    }
  };

  return (
    <StoreConfigContext.Provider value={{
      products,
      collections,
      categories,
      storeConfig,
      loading,
      saveProducts,
      saveCollections,
      saveCategories,
      saveStoreConfig
    }}>
      {children}
    </StoreConfigContext.Provider>
  );
};

export const useStoreConfig = () => {
  const context = useContext(StoreConfigContext);
  if (!context) {
    throw new Error('useStoreConfig must be used within a StoreConfigProvider');
  }
  return context;
};
