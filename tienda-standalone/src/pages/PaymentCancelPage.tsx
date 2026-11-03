import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import StoreTopBar from '../components/StoreTopBar';
import { soundEffects } from '../utils/soundEffects';
import { CONTACT } from '../constants';
import './PaymentStatusPage.css';

export default function PaymentCancelPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderNum = searchParams.get('orderNum');

  return (
    <div className="payment-status-root animate-fade-in">
      <StoreTopBar slogan="Estado de la Transacción · Volckan Store" />

      <main className="payment-status-container">
        <div className="payment-status-card cancel animate-scale-up">
          <div className="status-icon-wrap cancel">
            <span>⚠️</span>
          </div>

          <span className="status-badge cancel">Pago Cancelado o Interrumpido</span>
          <h2>La transacción no se completó</h2>
          <p className="status-desc">
            No se realizó ningún cobro a tu tarjeta. Puedes intentar nuevamente con otra tarjeta o coordinar el pago directamente por transferencia bancaria o WhatsApp.
          </p>

          {orderNum && (
            <div className="status-details-box">
              <div className="status-detail-row">
                <span>Referencia de Pedido:</span>
                <strong>#{orderNum}</strong>
              </div>
            </div>
          )}

          <div className="status-actions">
            <button
              type="button"
              className="btn-status-primary"
              onClick={() => {
                soundEffects.playClick();
                navigate('/');
              }}
            >
              🔄 Reintentar en la Tienda
            </button>

            <a
              href={`https://wa.me/${CONTACT.whatsappPhone}?text=${encodeURIComponent(`Hola Tecno Volckánica, tuve dificultades al pagar el pedido #${orderNum || ''} con tarjeta. ¿Podrían apoyarme con transferencia o asesoría?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-status-whatsapp"
            >
              💬 Asistencia por WhatsApp
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

