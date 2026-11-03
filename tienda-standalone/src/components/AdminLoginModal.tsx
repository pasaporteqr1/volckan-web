import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { soundEffects } from '../utils/soundEffects';
import './AdminLoginModal.css';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSubmit = async () => {
    setError(null);
    setLoadingGoogle(true);
    soundEffects.playClick();

    try {
      await loginWithGoogle();
      soundEffects.playSuccess();
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('[AdminLogin] Error con Google:', err);
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
        // El usuario cerró la ventana emergente intencionalmente
        return;
      }
      let msg = 'No se pudo iniciar sesión con Google.';
      if (err.code === 'auth/operation-not-allowed') {
        msg = 'El proveedor de Google aún no está habilitado en Firebase Authentication (pestaña Sign-in Method).';
      } else if (err.code === 'auth/unauthorized-domain') {
        msg = 'Este dominio web aún no está autorizado en Firebase Console (Authentication > Settings > Authorized Domains).';
      } else if (err.message) {
        msg = err.message;
      }
      setError(msg);
      soundEffects.playClick();
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    soundEffects.playClick();

    try {
      await login(email, password);
      soundEffects.playSuccess();
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('[AdminLogin] Error al iniciar sesión:', err);
      let msg = 'Credenciales incorrectas o usuario no autorizado.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        msg = 'Correo electrónico o contraseña inválidos.';
      } else if (err.code === 'auth/too-many-requests') {
        msg = 'Demasiados intentos fallidos. Inténtalo más tarde.';
      } else if (err.message) {
        msg = err.message;
      }
      setError(msg);
      soundEffects.playClick();
    } finally {
      setLoading(false);
    }
  };

  const isAnyLoading = loading || loadingGoogle;

  return (
    <div className="admin-login-overlay">
      <div className="admin-login-card animate-scale-up">
        {onClose && (
          <button 
            type="button" 
            className="admin-login-close-btn" 
            onClick={onClose}
            aria-label="Cerrar modal de acceso"
            disabled={isAnyLoading}
          >
            ✕
          </button>
        )}

        <div className="admin-login-header">
          <div className="admin-login-icon">🔐</div>
          <h2>Acceso de Administrador</h2>
          <p>Ingresa con tu cuenta de gestión autorizada de Tecno Volckánica</p>
        </div>

        {error && (
          <div className="admin-login-error">
            <span>⚠️ {error}</span>
          </div>
        )}

        {/* Botón de Google Sign-In */}
        <div className="admin-google-login-wrap">
          <button
            type="button"
            className="btn-admin-google"
            onClick={handleGoogleSubmit}
            disabled={isAnyLoading}
          >
            <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>{loadingGoogle ? 'Conectando con Google...' : 'Continuar con Google'}</span>
          </button>
        </div>

        <div className="admin-login-divider">
          <span>o ingresa con correo y contraseña</span>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-login-field">
            <label htmlFor="admin-email">Correo Electrónico</label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="username"
              placeholder="grupovolckan@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isAnyLoading}
            />
          </div>

          <div className="admin-login-field">
            <label htmlFor="admin-password">Contraseña</label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isAnyLoading}
            />
          </div>

          <button 
            type="submit" 
            className="admin-login-submit-btn" 
            disabled={isAnyLoading}
          >
            {loading ? 'Verificando credenciales...' : 'Iniciar Sesión con Contraseña'}
          </button>
        </form>

        <div className="admin-login-footer">
          <small>
            Protegido mediante Firebase Authentication con control estricto de accesos.
          </small>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginModal;
