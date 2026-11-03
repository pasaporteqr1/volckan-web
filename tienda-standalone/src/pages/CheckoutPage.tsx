import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreTopBar from '../components/StoreTopBar';
import { useStoreConfig } from '../context/StoreConfigContext';
import { CONTACT } from '../constants';
import { soundEffects } from '../utils/soundEffects';
import { createRecurrenteCheckout } from '../utils/recurrente';
import type { CustomerInfo, OrderItem, StoreOrder } from '../types/order';
import type { MercadoProduct } from '../data/mercadoData';
import './CheckoutPage.css';

interface CartItem {
  product: MercadoProduct;
  quantity: number;
}

const CART_STORAGE_KEY = 'mercado_cart_v1';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { storeConfig: mercadoConfig, createOrder } = useStoreConfig();

  // Cargar carrito de compras desde localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customer, setCustomer] = useState<CustomerInfo>(() => {
    try {
      const saved = localStorage.getItem('volckan_checkout_customer');
      return saved ? JSON.parse(saved) : { name: '', phone: '', email: '', nit: '', address: '', notes: '' };
    } catch {
      return { name: '', phone: '', email: '', nit: '', address: '', notes: '' };
    }
  });

  const [paymentMethod, setPaymentMethod] = useState<'recurrente' | 'whatsapp'>('recurrente');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cálculos financieros
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const totalSavings = cartItems.reduce((acc, item) => {
    const orig = item.product.originalPrice || item.product.price;
    return acc + (orig > item.product.price ? (orig - item.product.price) * item.quantity : 0);
  }, 0);

  // Modificar cantidades directamente en la página de checkout
  const handleUpdateQuantity = (productId: string, delta: number) => {
    soundEffects.playClick();
    setCartItems(prev => {
      const next = prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter((item): item is CartItem => item !== null);
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleRemoveItem = (productId: string) => {
    soundEffects.playClick();
    setCartItems(prev => {
      const next = prev.filter(item => item.product.id !== productId);
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (cartItems.length === 0) {
      setError('Tu carrito de compras está vacío. Agrega productos antes de continuar.');
      return;
    }

    if (!customer.name.trim()) {
      setError('Por favor indica tu nombre completo o razón social.');
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
      try {
        localStorage.setItem('volckan_checkout_customer', JSON.stringify(customer));
      } catch {}

      const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
      const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const orderNumber = `ORD-${datePart}-${randomSuffix}`;
      const orderId = `order-${Date.now()}-${randomSuffix}`;

      const items: OrderItem[] = cartItems.map(item => ({
        productId: item.product.id,
        title: item.product.title,
        price: item.product.price,
        originalPrice: item.product.originalPrice,
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity,
        categoryLabel: item.product.categoryLabel,
        image: item.product.image,
        icon: item.product.icon
      }));

      const baseOrder: StoreOrder = {
        id: orderId,
        orderNumber,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: paymentMethod === 'recurrente' ? 'pendiente_pago' : 'nuevo',
        customer: {
          name: customer.name.trim(),
          phone: customer.phone.trim(),
          email: customer.email?.trim() || undefined,
          nit: customer.nit?.trim() || 'C/F',
          address: customer.address?.trim() || undefined,
          notes: customer.notes?.trim() || undefined
        },
        items,
        totalCount: totalCartCount,
        subtotal: totalCartPrice + totalSavings,
        savings: totalSavings,
        total: totalCartPrice,
        currency: 'Q',
        channel: paymentMethod === 'recurrente' ? 'recurrente' : 'whatsapp',
        payment: {
          method: paymentMethod
        }
      };

      if (paymentMethod === 'recurrente') {
        // Generar checkout dinámico en Recurrente (soporta Tarjeta y Transferencia ACH automática)
        const recurrenteRes = await createRecurrenteCheckout({
          order: baseOrder
        });

        const updatedOrder: StoreOrder = {
          ...baseOrder,
          payment: {
            method: 'recurrente',
            recurrenteCheckoutId: recurrenteRes.id,
            recurrenteCheckoutUrl: recurrenteRes.checkout_url,
            liveMode: recurrenteRes.live_mode
          }
        };

        await createOrder(updatedOrder);

        // Limpiar carrito antes de redirigir
        try {
          localStorage.removeItem(CART_STORAGE_KEY);
        } catch {}

        soundEffects.playSuccessFanfare();
        // Redirigir al cliente a la pasarela segura de Recurrente
        window.location.href = recurrenteRes.checkout_url;

      } else {
        // Modalidad tradicional de cotización por WhatsApp / Transferencia directa manual
        await createOrder(baseOrder);

        const lines = [
          '¡Hola Tecno Volckánica! 👋',
          `Acabo de registrar el pedido *#${orderNumber}* en la tienda web:`,
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
          `💰 *Total:* Q ${totalCartPrice.toFixed(2)}`,
          totalSavings > 0 ? `🎉 *Ahorro Aplicado:* Q ${totalSavings.toFixed(2)}` : '',
          '',
          '¿Podrían confirmarme la disponibilidad, emisión de factura FEL y tiempos de entrega? ¡Muchas gracias!'
        ].filter(Boolean);

        const message = encodeURIComponent(lines.join('\n'));
        const targetPhone = mercadoConfig.whatsappPhone || CONTACT.whatsappPhone || '50246741239';
        const waUrl = `https://wa.me/${targetPhone}?text=${message}`;

        try {
          localStorage.removeItem(CART_STORAGE_KEY);
        } catch {}

        soundEffects.playSuccessFanfare();
        window.open(waUrl, '_blank');
        navigate('/');
      }

    } catch (err: any) {
      console.error('[CheckoutPage] Error al procesar pago:', err);
      setError(err.message || 'Ocurrió un error al procesar el pago. Por favor intenta de nuevo o escoge WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="checkout-page-root animate-fade-in">
      <StoreTopBar slogan="Finalizar Pedido · Pasarela Segura Recurrente & WhatsApp" />

      <main className="checkout-page-container">
        {/* Encabezado y Regreso */}
        <div className="checkout-page-topbar">
          <button
            type="button"
            className="btn-back-store"
            onClick={() => {
              soundEffects.playClick();
              navigate('/');
            }}
          >
            ← Volver a la Tienda
          </button>
          <div className="checkout-page-title-wrap">
            <h1>Finalizar Compra & Facturación</h1>
            <p>Verifica los artículos de tu pedido y completa tus datos para pago con tarjeta, transferencia ACH o factura electrónica FEL.</p>
          </div>
        </div>

        {error && (
          <div className="checkout-page-error animate-shake">
            <span>⚠️ {error}</span>
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="checkout-page-empty animate-scale-up">
            <span className="empty-cart-emoji">🛒</span>
            <h2>Tu carrito está vacío</h2>
            <p>No tienes productos agregados para proceder con el pago.</p>
            <button
              type="button"
              className="btn-back-store primary"
              onClick={() => navigate('/')}
            >
              Explorar Catálogo de Productos
            </button>
          </div>
        ) : (
          <div className="checkout-two-columns-layout">
            
            {/* ==============================================================
                COLUMNA 1: FORMULARIO DE PAGO & FACTURACIÓN FEL
                ============================================================== */}
            <div className="checkout-main-column">
              <form onSubmit={handleSubmit} className="checkout-page-form">
                
                {/* 1. Selector de Método de Pago */}
                <div className="checkout-box">
                  <div className="checkout-box-header">
                    <span className="checkout-box-num">1</span>
                    <div>
                      <h3>Método de Pago Preferido</h3>
                      <p>Recurrente procesa pagos inmediatos con tarjeta y transferencias bancarias ACH automáticas.</p>
                    </div>
                  </div>

                  <div className="checkout-methods-grid">
                    {/* Opción Recurrente */}
                    <label className={`checkout-method-card ${paymentMethod === 'recurrente' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="checkout_payment"
                        value="recurrente"
                        checked={paymentMethod === 'recurrente'}
                        onChange={() => setPaymentMethod('recurrente')}
                      />
                      <div className="method-card-content">
                        <div className="method-card-title-row">
                          <span className="method-card-icon">💳</span>
                          <strong>Pasarela Recurrente (Tarjeta & Transferencia ACH)</strong>
                          <span className="badge-recommended">RECOMENDADO</span>
                        </div>
                        <p className="method-card-desc">
                          Acepta <strong>Tarjetas de Débito y Crédito</strong> (Visa / Mastercard) y <strong>Transferencias Bancarias ACH</strong> conciliadas automáticamente en minutos sin enviar capturas.
                        </p>
                        <div className="method-badges-row">
                          <span className="micro-badge">Visa</span>
                          <span className="micro-badge">Mastercard</span>
                          <span className="micro-badge">ACH Banrural</span>
                          <span className="micro-badge">ACH Banco Industrial</span>
                          <span className="micro-badge">ACH BAM / G&T</span>
                        </div>
                      </div>
                    </label>

                    {/* Opción WhatsApp / Manual */}
                    <label className={`checkout-method-card ${paymentMethod === 'whatsapp' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="checkout_payment"
                        value="whatsapp"
                        checked={paymentMethod === 'whatsapp'}
                        onChange={() => setPaymentMethod('whatsapp')}
                      />
                      <div className="method-card-content">
                        <div className="method-card-title-row">
                          <span className="method-card-icon">💬</span>
                          <strong>Cotización WhatsApp & Cheque / Depósito Manual</strong>
                        </div>
                        <p className="method-card-desc">
                          Para colegios, empresas u organizaciones que requieran coordinar crédito corporativo, orden de compra o emitir cheque con un asesor oficial.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* 2. Datos de Facturación Electrónica (FEL) y Entrega */}
                <div className="checkout-box">
                  <div className="checkout-box-header">
                    <span className="checkout-box-num">2</span>
                    <div>
                      <h3>Datos del Cliente & Factura Electrónica (FEL)</h3>
                      <p>Información necesaria para emitir tu comprobante contable y coordinar entrega o activación.</p>
                    </div>
                  </div>

                  <div className="checkout-fields-grid">
                    <div className="field-group full">
                      <label htmlFor="chk-name">Nombre Completo o Razón Social *</label>
                      <input
                        id="chk-name"
                        type="text"
                        required
                        placeholder="Ej. Ing. Juan Pérez / Colegio Los Próceres / Distribuidora S.A."
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        disabled={submitting}
                      />
                    </div>

                    <div className="field-group">
                      <label htmlFor="chk-phone">Teléfono / WhatsApp de Contacto *</label>
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

                    <div className="field-group">
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

                    <div className="field-group">
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

                    <div className="field-group">
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

                    <div className="field-group full">
                      <label htmlFor="chk-notes">Instrucciones o Notas Especiales</label>
                      <textarea
                        id="chk-notes"
                        rows={2}
                        placeholder="Detalles sobre entrega, especificaciones técnicas o requisitos de activación..."
                        value={customer.notes}
                        onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                        disabled={submitting}
                      />
                    </div>
                  </div>
                </div>

                {/* Botón de Acción Principal */}
                <div className="checkout-submit-box">
                  <button
                    type="submit"
                    className={`btn-checkout-submit ${paymentMethod === 'recurrente' ? 'btn-recurrente' : 'btn-wa'}`}
                    disabled={submitting}
                  >
                    {submitting
                      ? (paymentMethod === 'recurrente' ? '⏳ Conectando con Pasarela Recurrente...' : '⏳ Registrando Pedido...')
                      : (paymentMethod === 'recurrente'
                          ? `🔒 Continuar al Pago Seguro (Q ${totalCartPrice.toFixed(2)})`
                          : `📱 Confirmar Pedido en WhatsApp (Q ${totalCartPrice.toFixed(2)})`)}
                  </button>
                  <p className="checkout-secure-notice">
                    🛡️ Transacción protegida mediante cifrado SSL de 256 bits y conciliación bancaria oficial.
                  </p>
                </div>
              </form>
            </div>

            {/* ==============================================================
                COLUMNA 2: RESUMEN DEL PEDIDO & LISTA DE PRODUCTOS
                ============================================================== */}
            <aside className="checkout-sidebar-column">
              <div className="order-summary-card">
                <div className="order-summary-header">
                  <h3>Resumen del Pedido</h3>
                  <span className="order-summary-count">{totalCartCount} artículos</span>
                </div>

                {/* Lista de productos con controles de cantidad */}
                <div className="order-items-scroll-list">
                  {cartItems.map(({ product, quantity }) => (
                    <div key={product.id} className="checkout-product-row">
                      <div className="checkout-product-thumb">
                        {product.image ? (
                          <img src={product.image} alt={product.title} />
                        ) : (
                          <span className="product-thumb-emoji">{product.icon || '📦'}</span>
                        )}
                      </div>

                      <div className="checkout-product-info">
                        <h4 className="checkout-product-title">{product.title}</h4>
                        <span className="checkout-product-category">{product.categoryLabel}</span>

                        <div className="checkout-product-pricing">
                          <span className="checkout-unit-price">
                            Q {product.price.toFixed(2)} c/u
                            {product.originalPrice && product.originalPrice > product.price && (
                              <del className="checkout-orig-price">Q {product.originalPrice.toFixed(2)}</del>
                            )}
                          </span>
                          <strong className="checkout-subtotal-price">
                            Q {(product.price * quantity).toFixed(2)}
                          </strong>
                        </div>

                        {/* Modificador de cantidad */}
                        <div className="checkout-item-controls">
                          <div className="checkout-qty-picker">
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(product.id, -1)}
                              title="Disminuir cantidad"
                            >
                              -
                            </button>
                            <span className="qty-val">{quantity}</span>
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(product.id, 1)}
                              title="Aumentar cantidad"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            className="btn-checkout-remove"
                            onClick={() => handleRemoveItem(product.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desglose de Precios */}
                <div className="order-totals-breakdown">
                  <div className="breakdown-line">
                    <span>Subtotal del Catálogo:</span>
                    <strong>Q {(totalCartPrice + totalSavings).toFixed(2)}</strong>
                  </div>

                  {totalSavings > 0 && (
                    <div className="breakdown-line savings">
                      <span>Ahorro Promocional Aplicado:</span>
                      <strong className="savings-tag">- Q {totalSavings.toFixed(2)}</strong>
                    </div>
                  )}

                  <div className="breakdown-line">
                    <span>Envío / Activación:</span>
                    <strong className="free-shipping">GRATIS</strong>
                  </div>

                  <div className="breakdown-line total-final">
                    <span>Total a Pagar:</span>
                    <strong className="total-amount">Q {totalCartPrice.toFixed(2)}</strong>
                  </div>
                </div>

                {/* Métodos de pago aceptados en Recurrente */}
                <div className="order-security-badges">
                  <span className="security-title">Pasarela Homologada en Guatemala</span>
                  <p className="security-desc">
                    Al proceder con Recurrente podrás pagar con tarjetas locales o internacionales, o con transferencia interbancaria ACH (Banco Industrial, Banrural, G&T, BAC, BAM).
                  </p>
                </div>
              </div>
            </aside>

          </div>
        )}
      </main>
    </div>
  );
}

