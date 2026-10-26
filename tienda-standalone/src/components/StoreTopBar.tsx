import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoVolckan from '../assets/logo-volckan.png';
import { CONTACT } from '../constants';
import { soundEffects } from '../utils/soundEffects';
import './StoreTopBar.css';

interface StoreTopBarProps {
  slogan?: string;
}

export default function StoreTopBar({ slogan = 'Ecosistema de Software, Licencias y Soluciones QR' }: StoreTopBarProps) {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState<boolean>(() => soundEffects.isMuted());

  useEffect(() => {
    return soundEffects.subscribe((muted) => setIsMuted(muted));
  }, []);

  const handleToggleSound = () => {
    const next = soundEffects.toggleMute();
    setIsMuted(next);
  };

  return (
    <header className="store-top-bar">
      <div className="store-top-bar-content">
        <div 
          className="store-brand" 
          onClick={() => {
            soundEffects.playClick();
            navigate('/');
          }} 
          title="Ir al inicio de la tienda"
        >
          <div className="store-logo-wrap">
            <img
              src={logoVolckan}
              alt="Tecno Volckánica"
              className="store-logo-img"
              width="160"
              height="40"
            />
          </div>
          <div className="store-brand-texts">
            <span className="store-brand-title">Volckan Store</span>
            <span className="store-brand-subtitle">{slogan}</span>
          </div>
        </div>

        <div className="store-top-actions">
          {/* Volver a Web Principal */}
          <a
            href="../index.html"
            className="store-top-portal-btn"
            title="Volver a la web principal de Volckan"
          >
            <span className="portal-icon">⬅️</span>
            <span className="portal-label">Web Volckan</span>
          </a>

          {/* Botón de Sonido */}
          <button 
            type="button" 
            className="store-top-icon-btn"
            onClick={handleToggleSound}
            title={isMuted ? "Activar efectos sonoros" : "Silenciar efectos sonoros"}
            aria-label="Alternar sonido"
          >
            {isMuted ? '🔇' : '🔊'}
          </button>

          {/* Enlace WhatsApp Directo */}
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="store-top-wa-btn"
            title="Escríbenos por WhatsApp"
          >
            <span className="wa-icon">💬</span>
            <span className="wa-label">WhatsApp</span>
          </a>

          {/* Enlace Admin CMS */}
          <button
            type="button"
            className="store-top-admin-btn"
            onClick={() => {
              soundEffects.playClick();
              navigate('/admin');
            }}
            title="Panel de Administración del Mercado"
          >
            <span>⚙️ Panel</span>
          </button>
        </div>
      </div>
    </header>
  );
}

