import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { collection, deleteDoc, doc, onSnapshot, setDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { 
  DEFAULT_MERCADO_PRODUCTS, 
  DEFAULT_BOOK_COLLECTIONS, 
  DEFAULT_MERCADO_DEPARTMENTS,
  type MercadoProduct,
  type BookCollection,
  type MercadoCategory
} from '../data/mercadoData';
import { DEFAULT_CARNET_FORM_CONFIG } from '../data/carnetThemes';
import type { CarnetServiceFormConfig, CarnetSubmission } from '../types/carnet';
import type { StoreOrder } from '../types/order';
import { CONTACT } from '../constants';

export interface StoreAnnouncementConfig {
  announcement: string;
  whatsappPhone: string;
  bannerTitle: string;
  bannerSubtitle: string;
  showPromoStrip: boolean;
  recurrenteSecretKey?: string;
  recurrentePublicKey?: string;
}

interface StoreConfigContextProps {
  products: MercadoProduct[];
  collections: BookCollection[];
  categories: MercadoCategory[];
  storeConfig: StoreAnnouncementConfig;
  carnetConfig: CarnetServiceFormConfig;
  carnetSubmissions: CarnetSubmission[];
  orders: StoreOrder[];
  loading: boolean;
  saveProducts: (products: MercadoProduct[]) => Promise<void>;
  saveCollections: (collections: BookCollection[]) => Promise<void>;
  saveCategories: (categories: MercadoCategory[]) => Promise<void>;
  saveStoreConfig: (config: Partial<StoreAnnouncementConfig>) => Promise<void>;
  saveCarnetConfig: (config: Partial<CarnetServiceFormConfig>) => Promise<void>;
  saveCarnetSubmission: (submission: CarnetSubmission) => Promise<void>;
  updateCarnetSubmissionStatus: (id: string, status: 'pendiente' | 'aprobado' | 'impreso') => Promise<void>;
  deleteCarnetSubmission: (id: string) => Promise<void>;
  refreshCarnetSubmissions: () => Promise<void>;
  subscribeToCarnetSubmissions: () => () => void;
  createOrder: (order: StoreOrder) => Promise<void>;
  updateOrderStatus: (id: string, status: StoreOrder['status']) => Promise<void>;
  subscribeToOrders: () => () => void;
}

// Sanitizador seguro para Firestore (elimina recursivamente undefined)
export function sanitizeFirestoreData<T extends Record<string, any>>(obj: T): T {
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        result[key] = sanitizeFirestoreData(value);
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}

const DEFAULT_STORE_CONFIG: StoreAnnouncementConfig = {
  announcement: "Ecosistema Tecnológico Volckan · Software SaaS, Carnetización Inteligente y Soluciones QR",
  whatsappPhone: CONTACT.whatsappPhone,
  bannerTitle: "Volckan Store & Ecosistema de Soluciones",
  bannerSubtitle: "Licencias de software, módulos POS, carnetización con QR de emergencia y hardware para empresas e instituciones",
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

  const [carnetConfig, setCarnetConfig] = useState<CarnetServiceFormConfig>(() => {
    try {
      const saved = localStorage.getItem('store_carnet_config_cache');
      const parsed = saved ? { ...DEFAULT_CARNET_FORM_CONFIG, ...JSON.parse(saved) } : DEFAULT_CARNET_FORM_CONFIG;
      if (!parsed.institutionName || parsed.institutionName.toLowerCase().includes('summit')) {
        parsed.institutionName = 'Mesa de Competitividad de Quetzaltenango';
      }
      return parsed;
    } catch {
      return DEFAULT_CARNET_FORM_CONFIG;
    }
  });

  const [carnetSubmissions, setCarnetSubmissions] = useState<CarnetSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('store_carnet_submissions_cache');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<StoreOrder[]>(() => {
    try {
      const saved = localStorage.getItem('store_orders_cache');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState<boolean>(Boolean(db));

  // Sincronización en tiempo real pública con Firestore (catálogos y anuncios)
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

      // 4. Configuración general / Anuncios (Soporta mercado_config y portal)
      const unsubPortal = onSnapshot(doc(db, 'config', 'mercado_config'), (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          const cfg = data?.mercadoConfig || data;
          if (cfg) {
            setStoreConfig(prev => {
              const updated = { ...prev, ...cfg };
              try { localStorage.setItem('store_announcement_cache', JSON.stringify(updated)); } catch {}
              return updated;
            });
          }
        }
        setLoading(false);
      }, (err) => {
        console.warn('[StoreConfig] Error leyendo config/mercado_config de Firestore:', err);
        setLoading(false);
      });
      unsubs.push(unsubPortal);

      // 5. Configuración de Carnets
      const unsubCarnetConfig = onSnapshot(doc(db, 'config', 'servicios_carnets'), (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data?.carnetConfig) {
            setCarnetConfig(prev => {
              const updated = { ...prev, ...data.carnetConfig };
              try { localStorage.setItem('store_carnet_config_cache', JSON.stringify(updated)); } catch {}
              return updated;
            });
          }
        }
      }, (err) => console.warn('[StoreConfig] Error leyendo servicios_carnets:', err));
      unsubs.push(unsubCarnetConfig);

    } catch (err) {
      console.warn('[StoreConfig] Excepción al suscribir a Firestore:', err);
      setLoading(false);
    }

    return () => {
      unsubs.forEach(unsub => unsub());
    };
  }, []);

  // Suscripción bajo demanda a carnet_submissions (SOLO activa cuando un administrador autenticado ingresa al panel)
  const subscribeToCarnetSubmissions = useCallback(() => {
    if (!db) return () => {};

    try {
      const carnetSubmissionsCol = collection(db, 'carnet_submissions');
      const unsub = onSnapshot(carnetSubmissionsCol, (snapshot) => {
        const subs: CarnetSubmission[] = [];
        snapshot.forEach((docSnap) => {
          subs.push({ ...(docSnap.data() as CarnetSubmission), id: docSnap.id });
        });
        subs.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        setCarnetSubmissions(subs);
        try {
          localStorage.setItem('store_carnet_submissions_cache', JSON.stringify(subs));
        } catch {
          try {
            const lightweight = subs.map(s => ({
              ...s,
              photoUrl: s.photoUrl && s.photoUrl.startsWith('data:') ? '' : s.photoUrl
            }));
            localStorage.setItem('store_carnet_submissions_cache', JSON.stringify(lightweight));
          } catch {}
        }
      }, (err) => {
        console.warn('[StoreConfig] Permiso denegado o error leyendo carnet_submissions:', err);
      });

      return unsub;
    } catch (err) {
      console.warn('[StoreConfig] Error iniciando suscripción a carnet_submissions:', err);
      return () => {};
    }
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
      const docRef = doc(db, 'config', 'mercado_config');
      await setDoc(docRef, { ...updated, updatedAt: new Date().toISOString() }, { merge: true });
    }
  };

  const saveCarnetConfig = async (newConfig: Partial<CarnetServiceFormConfig>) => {
    const updated: CarnetServiceFormConfig = { ...carnetConfig, ...newConfig, updatedAt: new Date().toISOString() };
    const cleanConfig = sanitizeFirestoreData(updated);
    setCarnetConfig(cleanConfig);
    try { localStorage.setItem('store_carnet_config_cache', JSON.stringify(cleanConfig)); } catch {}
    if (db) {
      const docRef = doc(db, 'config', 'servicios_carnets');
      await setDoc(docRef, { carnetConfig: cleanConfig, updatedAt: new Date().toISOString() }, { merge: true });
    }
  };

  const saveCarnetSubmission = async (submission: CarnetSubmission) => {
    const cleanSubmission = sanitizeFirestoreData(submission);
    const updated = [cleanSubmission, ...carnetSubmissions.filter(s => s.id !== cleanSubmission.id)];
    setCarnetSubmissions(updated);
    try {
      localStorage.setItem('store_carnet_submissions_cache', JSON.stringify(updated));
    } catch {
      try {
        const lightweight = updated.map(s => ({
          ...s,
          photoUrl: s.photoUrl && s.photoUrl.startsWith('data:') ? '' : s.photoUrl
        }));
        localStorage.setItem('store_carnet_submissions_cache', JSON.stringify(lightweight));
      } catch {}
    }
    if (db) {
      const docRef = doc(db, 'carnet_submissions', cleanSubmission.id);
      await setDoc(docRef, { ...cleanSubmission, updatedAt: new Date().toISOString() }, { merge: true });
    }
  };

  const updateCarnetSubmissionStatus = async (id: string, status: 'pendiente' | 'aprobado' | 'impreso') => {
    const updated = carnetSubmissions.map(s => s.id === id ? { ...s, status, updatedAt: new Date().toISOString() } : s);
    setCarnetSubmissions(updated);
    try { localStorage.setItem('store_carnet_submissions_cache', JSON.stringify(updated)); } catch {}
    if (db) {
      const docRef = doc(db, 'carnet_submissions', id);
      await setDoc(docRef, { status, updatedAt: new Date().toISOString() }, { merge: true });
    }
  };

  const deleteCarnetSubmission = async (id: string) => {
    const updated = carnetSubmissions.filter(s => s.id !== id);
    setCarnetSubmissions(updated);
    try { localStorage.setItem('store_carnet_submissions_cache', JSON.stringify(updated)); } catch {}
    if (db) {
      const docRef = doc(db, 'carnet_submissions', id);
      await deleteDoc(docRef);
    }
  };

  // Función de sincronización forzada para el panel de administración
  const refreshCarnetSubmissions = async () => {
    if (!db) return;
    try {
      const snapshot = await getDocs(collection(db, 'carnet_submissions'));
      const subs: CarnetSubmission[] = [];
      snapshot.forEach(docSnap => {
        subs.push({ ...(docSnap.data() as CarnetSubmission), id: docSnap.id });
      });
      subs.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      setCarnetSubmissions(subs);
      try {
        localStorage.setItem('store_carnet_submissions_cache', JSON.stringify(subs));
      } catch {}
    } catch (err) {
      console.warn('[StoreConfig] Error al refrescar carnet_submissions manualmente:', err);
    }
  };

  // Suscripción bajo demanda a pedidos (exclusiva para administradores)
  const subscribeToOrders = useCallback(() => {
    if (!db) return () => {};

    try {
      const ordersCol = collection(db, 'orders');
      const unsub = onSnapshot(ordersCol, (snapshot) => {
        const ords: StoreOrder[] = [];
        snapshot.forEach((docSnap) => {
          ords.push({ ...(docSnap.data() as StoreOrder), id: docSnap.id });
        });
        ords.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        setOrders(ords);
        try {
          localStorage.setItem('store_orders_cache', JSON.stringify(ords));
        } catch {}
      }, (err) => {
        console.warn('[StoreConfig] Permiso denegado o error leyendo orders:', err);
      });

      return unsub;
    } catch (err) {
      console.warn('[StoreConfig] Error iniciando suscripción a orders:', err);
      return () => {};
    }
  }, []);

  const createOrder = async (order: StoreOrder) => {
    const cleanOrder = sanitizeFirestoreData(order);
    const updated = [cleanOrder, ...orders.filter(o => o.id !== cleanOrder.id)];
    setOrders(updated);
    try {
      localStorage.setItem('store_orders_cache', JSON.stringify(updated));
    } catch {}

    if (db) {
      const docRef = doc(db, 'orders', cleanOrder.id);
      await setDoc(docRef, cleanOrder, { merge: true });
    }
  };

  const updateOrderStatus = async (id: string, status: StoreOrder['status']) => {
    const updated = orders.map(o => o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o);
    setOrders(updated);
    try {
      localStorage.setItem('store_orders_cache', JSON.stringify(updated));
    } catch {}

    if (db) {
      const docRef = doc(db, 'orders', id);
      await setDoc(docRef, { status, updatedAt: new Date().toISOString() }, { merge: true });
    }
  };

  return (
    <StoreConfigContext.Provider value={{
      products,
      collections,
      categories,
      storeConfig,
      carnetConfig,
      carnetSubmissions,
      orders,
      loading,
      saveProducts,
      saveCollections,
      saveCategories,
      saveStoreConfig,
      saveCarnetConfig,
      saveCarnetSubmission,
      updateCarnetSubmissionStatus,
      deleteCarnetSubmission,
      refreshCarnetSubmissions,
      subscribeToCarnetSubmissions,
      createOrder,
      updateOrderStatus,
      subscribeToOrders
    }}>
      {children}
    </StoreConfigContext.Provider>
  );
};

export const useStoreConfig = () => {
  const context = useContext(StoreConfigContext);
  if (!context) {
    throw new Error('useStoreConfig debe ser utilizado dentro de un StoreConfigProvider');
  }
  return context;
};
