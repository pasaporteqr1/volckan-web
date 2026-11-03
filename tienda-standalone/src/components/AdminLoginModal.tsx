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
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

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

  return (
    <div className="admin-login-overlay">
      <div className="admin-login-card animate-scale-up">
        {onClose && (
          <button 
            type="button" 
            className="admin-login-close-btn" 
            onClick={onClose}
            aria-label="Cerrar modal de acceso"
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

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-login-field">
            <label htmlFor="admin-email">Correo Electrónico</label>
            <input
              id="admin-email"
              type="email"
              required
              autoFocus
              autoComplete="username"
              placeholder="grupovolckan@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="admin-login-submit-btn" 
            disabled={loading}
          >
            {loading ? 'Verificando credenciales...' : 'Iniciar Sesión en el Panel'}
          </button>
        </form>

        <div className="admin-login-footer">
          <small>
            Protegido mediante Firebase Authentication con permisos estrictos de Firestore y Storage.
          </small>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginModal;
