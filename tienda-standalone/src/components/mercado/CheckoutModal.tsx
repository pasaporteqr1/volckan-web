import React, { useState } from 'react';
import type { CartItem } from '../../pages/StorePage';
import type { CustomerInfo, StoreOrder, OrderItem } from '../../types/order';
import { CONTACT, RECURRENTE_CONFIG } from '../../constants';
import { soundEffects } from '../../utils/soundEffects';
import { createRecurrenteCheckout } from '../../utils/recurrente';
import './CheckoutModal.css';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalPrice: number;
  totalSavings: number;
  totalCount: number;
  whatsappPhone: string;
  initialMethod?: 'recurrente_card' | 'whatsapp';
  onOrderCreated: (order: StoreOrder) => Promise<void>;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  totalPrice,
  totalSavings,
  totalCount,
  whatsappPhone,
  initialMethod = 'recurrente_card',
  onOrderCreated,
  onOrderCompleted
}) => {
  const [customer, setCustomer] = useState<CustomerInfo>(() => {
    try {
      const saved = localStorage.getItem('volckan_checkout_customer');
      return saved ? JSON.parse(saved) : { name: '', phone: '', email: '', nit: '', address: '', notes: '' };
    } catch {
      return { name: '', phone: '', email: '', nit: '', address: '', notes: '' };
    }
  });

  const [paymentMethod, setPaymentMethod] = useState<'recurrente_card' | 'whatsapp'>(initialMethod);

  // Sincronizar si cambia initialMethod al abrirse
  React.useEffect(() => {
    if (initialMethod) {
      setPaymentMethod(initialMethod);
    }
  }, [initialMethod, isOpen]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!customer.name.trim()) {
      setError('Por favor indica tu nombre completo o de la empresa.');
      return;
    }

    const cleanPhone = customer.phone.replace(/\D/g, '');
    if (cleanPhone.length < 8) {
      setError('Por favor ingresa un número de teléfono válido de contacto.');
      return;
    }

    setSubmitting(true);
    soundEffects.playClick();

    try {
      // Guardar datos para conveniencia futura
      try {
        localStorage.setItem('volckan_checkout_customer', JSON.stringify(customer));
      } catch {}

      // Generar identificadores únicos
      const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
      const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const orderNumber = `ORD-${datePart}-${randomSuffix}`;
      const orderId = `order-${Date.now()}-${randomSuffix}`;

      const items: OrderItem[] = cartItems.map(item => ({
        productId: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity,
        categoryLabel: item.product.categoryLabel
      }));

      const baseOrder: StoreOrder = {
        id: orderId,
        orderNumber,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: paymentMethod === 'recurrente_card' ? 'pendiente_pago' : 'nuevo',
        customer: {
          name: customer.name.trim(),
          phone: customer.phone.trim(),
          email: customer.email?.trim() || undefined,
          nit: customer.nit?.trim() || 'C/F',
          address: customer.address?.trim() || undefined,
          notes: customer.notes?.trim() || undefined
        },
        items,
        totalCount,
        subtotal: totalPrice + totalSavings,
        savings: totalSavings,
        total: totalPrice,
        currency: 'Q',
        channel: paymentMethod === 'recurrente_card' ? 'recurrente' : 'whatsapp',
        payment: {
          method: paymentMethod
        }
      };

      if (paymentMethod === 'recurrente_card') {
        // 1. Crear sesión de checkout en Recurrente con los precios en Quetzales
        const recurrenteRes = await createRecurrenteCheckout({
          order: baseOrder
        });

        // 2. Asociar el checkout_id y url generados a la orden
        const updatedOrder: StoreOrder = {
          ...baseOrder,
          payment: {
            method: 'recurrente_card',
            recurrenteCheckoutId: recurrenteRes.id,
            recurrenteCheckoutUrl: recurrenteRes.checkout_url,
            liveMode: recurrenteRes.live_mode
          }
        };

        // 3. Persistir la orden en Firestore
        await onOrderCreated(updatedOrder);

        soundEffects.playSuccessFanfare();
        onOrderCompleted();
        onClose();

        // 4. Redirigir al cliente a la pasarela segura de pago de Recurrente
        window.location.href = recurrenteRes.checkout_url;

      } else {
        // Flujo tradicional por WhatsApp / Cotización formal
        await onOrderCreated(baseOrder);

        const lines = [
          '¡Hola Tecno Volckánica! 👋',
          `Acabo de registrar el pedido *#${orderNumber}* en Volckan Store:`,
          '',
          `👤 *Cliente:* ${baseOrder.customer.name}`,
          `📞 *Teléfono:* ${baseOrder.customer.phone}`,
          baseOrder.customer.nit ? `🧾 *NIT para Facturación:* ${baseOrder.customer.nit}` : '',
          baseOrder.customer.address ? `📍 *Dirección de Entrega:* ${baseOrder.customer.address}` : '',
          baseOrder.customer.notes ? `📝 *Observaciones:* ${baseOrder.customer.notes}` : '',
          '',
          '📦 *Productos Solicitados:*',
          ...items.map(item => `   • ${item.quantity}x ${item.title} — Q ${item.subtotal.toFixed(2)}`),
          '',
          `💰 *Total a Pagar:* Q ${totalPrice.toFixed(2)}`,
          totalSavings > 0 ? `🎉 *Ahorro Aplicado:* Q ${totalSavings.toFixed(2)}` : '',
          '',
          '¿Podrían confirmarme la disponibilidad, emisión de factura FEL y tiempos de entrega? ¡Muchas gracias!'
        ].filter(Boolean);

        const message = encodeURIComponent(lines.join('\n'));
        const targetPhone = whatsappPhone || CONTACT.whatsappPhone || '50246741239';
        const waUrl = `https://wa.me/${targetPhone}?text=${message}`;

        soundEffects.playSuccessFanfare();
        onOrderCompleted();
        window.open(waUrl, '_blank');
        onClose();
      }

    } catch (err: any) {
      console.error('[CheckoutModal] Error al procesar pago:', err);
      setError(err.message || 'Ocurrió un error al conectar con la pasarela de pagos. Por favor intenta de nuevo o escoge WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="checkout-modal-overlay animate-fade-in" onClick={onClose} role="dialog" aria-modal="true">
      <div className="checkout-modal-card animate-scale-up" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="checkout-modal-close" 
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        <div className="checkout-modal-header">
          <span className="checkout-header-icon">💳</span>
          <div>
            <h3>Finalizar Compra & Facturación</h3>
            <p>Elige tu método de pago y registra tus datos para facturación electrónica (FEL)</p>
          </div>
        </div>

        {error && (
          <div className="checkout-error-banner">
            <span>⚠️ {error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="checkout-form">
          {/* Selector de Método de Pago */}
          <div className="checkout-payment-methods">
            <label className="checkout-section-label">Método de Pago</label>
            <div className="payment-options-grid">
              <label className={`payment-option-card ${paymentMethod === 'recurrente_card' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="payment_method"
                  value="recurrente_card"
                  checked={paymentMethod === 'recurrente_card'}
                  onChange={() => setPaymentMethod('recurrente_card')}
                />
                <div className="payment-option-content">
                  <div className="payment-option-title-row">
                    <span className="payment-icon">💳</span>
                    <strong>Tarjeta de Crédito / Débito</strong>
                    <span className="payment-secure-chip">Recurrente</span>
                  </div>
                  <p className="payment-option-desc">
                    Pago inmediato con Visa o Mastercard en Quetzales. Protección bancaria cifrada.
                  </p>
                </div>
              </label>

              <label className={`payment-option-card ${paymentMethod === 'whatsapp' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="payment_method"
                  value="whatsapp"
                  checked={paymentMethod === 'whatsapp'}
                  onChange={() => setPaymentMethod('whatsapp')}
                />
                <div className="payment-option-content">
                  <div className="payment-option-title-row">
                    <span className="payment-icon">💬</span>
                    <strong>WhatsApp & Transferencia</strong>
                    <span className="payment-transfer-chip">FEL / Cheque</span>
                  </div>
                  <p className="payment-option-desc">
                    Coordina pago por transferencia bancaria (Banrural, BI, BAM) o solicitud formal para empresas.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Formulario de Datos del Cliente */}
          <div className="checkout-fields-grid">
            <div className="checkout-field-wrap full">
              <label htmlFor="chk-name">Nombre Completo o Razón Social *</label>
              <input
                id="chk-name"
                type="text"
                required
                placeholder="Ej. Juan Pérez / Colegio Los Próceres / Distribuidora S.A."
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                disabled={submitting}
              />
            </div>

            <div className="checkout-field-wrap">
              <label htmlFor="chk-phone">Teléfono / Celular de Contacto *</label>
              <input
                id="chk-phone"
                type="tel"
                required
                placeholder="Ej. 4674-1239"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                disabled={submitting}
              />
            </div>

            <div className="checkout-field-wrap">
              <label htmlFor="chk-nit">NIT para Facturación Electrónica (FEL)</label>
              <input
                id="chk-nit"
                type="text"
                placeholder="C/F o número de NIT"
                value={customer.nit}
                onChange={(e) => setCustomer({ ...customer, nit: e.target.value })}
                disabled={submitting}
              />
            </div>

            <div className="checkout-field-wrap">
              <label htmlFor="chk-email">Correo Electrónico (Para envío de comprobante)</label>
              <input
                id="chk-email"
                type="email"
                placeholder="cliente@ejemplo.com"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                disabled={submitting}
              />
            </div>

            <div className="checkout-field-wrap">
              <label htmlFor="chk-address">Dirección o Municipio de Entrega</label>
              <input
                id="chk-address"
                type="text"
                placeholder="Ej. Quetzaltenango / Envío por Cargo Expreso"
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                disabled={submitting}
              />
            </div>

            <div className="checkout-field-wrap full">
              <label htmlFor="chk-notes">Instrucciones o Notas Especiales</label>
              <textarea
                id="chk-notes"
                rows={2}
                placeholder="Detalles sobre entrega, requerimientos específicos o especificaciones técnicas..."
                value={customer.notes}
                onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                disabled={submitting}
              />
            </div>
          </div>

          {/* Resumen del Pedido */}
          <div className="checkout-summary-strip">
            <div>
              <span className="summary-count">{totalCount} productos en tu pedido</span>
              <strong className="summary-total">Total: Q {totalPrice.toFixed(2)}</strong>
            </div>
            {totalSavings > 0 && (
              <span className="summary-savings">Ahorro: Q {totalSavings.toFixed(2)}</span>
            )}
          </div>

          <div className="checkout-actions">
            <button
              type="button"
              className="checkout-cancel-btn"
              onClick={onClose}
              disabled={submitting}
            >
              Regresar al Carrito
            </button>

            <button
              type="submit"
              className={`checkout-submit-btn ${paymentMethod === 'recurrente_card' ? 'btn-card' : 'btn-wa'}`}
              disabled={submitting}
            >
              {submitting
                ? (paymentMethod === 'recurrente_card' ? '💳 Conectando con Recurrente...' : 'Registrando Pedido...')
                : (paymentMethod === 'recurrente_card' ? '🔒 Pagar con Tarjeta (Recurrente)' : '📱 Confirmar Pedido en WhatsApp')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
