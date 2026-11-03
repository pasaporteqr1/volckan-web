import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut, 
  type User 
} from 'firebase/auth';
import { auth } from '../firebase';
import { CONTACT } from '../constants';

// Cuentas y dominios autorizados para administrar el panel
const AUTHORIZED_ADMIN_EMAILS = [
  'grupovolckan@gmail.com',
  'pasaportealacultura@gmail.com',
  'lluviadeideaseditorial@gmail.com'
];

export const isAuthorizedAdmin = (email: string | null | undefined): boolean => {
  if (!email) return false;
  const normalized = email.toLowerCase().trim();
  if (normalized === CONTACT.email.toLowerCase().trim()) return true;
  if (normalized.endsWith('@volckan.com')) return true;
  if (AUTHORIZED_ADMIN_EMAILS.includes(normalized)) return true;
  return false;
};

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  isAdmin: false,
  login: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Si el usuario ingresó por Google, validar que sea cuenta autorizada
        const isPasswordAuth = user.providerData.some(p => p.providerId === 'password');
        if (!isPasswordAuth && !isAuthorizedAdmin(user.email)) {
          console.warn('[AuthContext] Cuenta no autorizada para administración:', user.email);
          await firebaseSignOut(auth);
          setCurrentUser(null);
          setLoading(false);
          return;
        }
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    if (!auth) {
      throw new Error('El servicio de autenticación de Firebase no está disponible.');
    }
    await signInWithEmailAndPassword(auth, email.trim(), pass);
  };

  const loginWithGoogle = async () => {
    if (!auth) {
      throw new Error('El servicio de autenticación de Firebase no está disponible.');
    }
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Validación estricta de seguridad
    if (!isAuthorizedAdmin(user.email)) {
      await firebaseSignOut(auth);
      throw new Error(`La cuenta (${user.email}) no está autorizada para acceder al panel de administración.`);
    }
  };

  const logout = async () => {
    if (!auth) return;
    await firebaseSignOut(auth);
  };

  const isAdmin = Boolean(currentUser);

  return (
    <AuthContext.Provider value={{ currentUser, loading, isAdmin, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
