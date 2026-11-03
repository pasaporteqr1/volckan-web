import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import StoreTopBar from '../components/StoreTopBar';
import { soundEffects } from '../utils/soundEffects';
import { CONTACT } from '../constants';
import type { StoreOrder } from '../types/order';
import './PaymentStatusPage.css';

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get('orderId');
  const orderNum = searchParams.get('orderNum');

  const [order, setOrder] = useState<StoreOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    soundEffects.playSuccessFanfare();

    async function loadOrder() {
      if (orderId && db) {
        try {
          const docSnap = await getDoc(doc(db, 'orders', orderId));
          if (docSnap.exists()) {
            setOrder({ ...(docSnap.data() as StoreOrder), id: docSnap.id });
          }
        } catch (err) {
          console.warn('[PaymentSuccessPage] Error al recuperar orden:', err);
        }
      }
      setLoading(false);
    }

    loadOrder();
  }, [orderId]);

  return (
    <div className="payment-status-root animate-fade-in">
      <StoreTopBar slogan="Comprobante de Pago Seguro · Recurrente & Volckan" />

      <main className="payment-status-container">
        <div className="payment-status-card success animate-scale-up">
          <div className="status-icon-wrap success">
            <span>✅</span>
          </div>

          <span className="status-badge success">Pago Confirmado Exitosamente</span>
          <h2>¡Gracias por tu compra!</h2>
          <p className="status-desc">
            Tu pago con tarjeta ha sido procesado de manera segura a través de <strong>Recurrente</strong>. Hemos recibido tu orden y nuestro equipo técnico iniciará la preparación de tus licencias o insumos.
          </p>

          <div className="status-details-box">
            <div className="status-detail-row">
              <span>Número de Pedido:</span>
              <strong>#{orderNum || order?.orderNumber || orderId || 'VOLCKAN-PAY'}</strong>
            </div>
            {order && (
              <>
                <div className="status-detail-row">
                  <span>Cliente / Razón Social:</span>
                  <strong>{order.customer.name}</strong>
                </div>
                <div className="status-detail-row">
                  <span>Monto Total Pagado:</span>
                  <strong className="status-amount">Q {order.total.toFixed(2)}</strong>
                </div>
                <div className="status-detail-row">
                  <span>Método:</span>
                  <strong>Tarjeta de Crédito / Débito (Recurrente)</strong>
                </div>
                {order.customer.nit && (
                  <div className="status-detail-row">
                    <span>NIT para FEL:</span>
                    <strong>{order.customer.nit}</strong>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="status-actions">
            <button
              type="button"
              className="btn-status-primary"
              onClick={() => {
                soundEffects.playClick();
                navigate('/');
              }}
            >
              🛍️ Volver a la Tienda
            </button>

            <a
              href={`https://wa.me/${CONTACT.whatsappPhone}?text=${encodeURIComponent(`Hola Tecno Volckánica, acabo de pagar el pedido #${orderNum || order?.orderNumber || ''} con tarjeta en la tienda web.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-status-whatsapp"
            >
              💬 Notificar por WhatsApp
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

