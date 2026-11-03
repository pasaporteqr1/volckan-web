import React from 'react';
import type { StoreOrder } from '../../types/order';
import { soundEffects } from '../../utils/soundEffects';
import './AdminOrdersTab.css';

interface AdminOrdersTabProps {
  orders: StoreOrder[];
  onUpdateStatus: (id: string, status: StoreOrder['status']) => Promise<void>;
}

export const AdminOrdersTab: React.FC<AdminOrdersTabProps> = ({ orders, onUpdateStatus }) => {
  const getStatusBadge = (status: StoreOrder['status'], method?: string) => {
    switch (status) {
      case 'nuevo':
        return <span className="order-badge nuevo">🟡 Nuevo Pedido</span>;
      case 'pendiente_pago':
        return <span className="order-badge pendiente_pago">⏳ Pendiente de Pago (Recurrente)</span>;
      case 'pagado':
        return <span className="order-badge pagado">💳 Pagado con Tarjeta</span>;
      case 'contactado':
        return <span className="order-badge contactado">🔵 Contactado WhatsApp</span>;
      case 'en_proceso':
        return <span className="order-badge en_proceso">🟣 En Preparación / FEL</span>;
      case 'completado':
        return <span className="order-badge completado">🟢 Entregado & Facturado</span>;
      case 'cancelado':
        return <span className="order-badge cancelado">⚪ Cancelado</span>;
      default:
        return <span className="order-badge">{status}</span>;
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: StoreOrder['status']) => {
    soundEffects.playClick();
    await onUpdateStatus(orderId, newStatus);
  };

  return (
    <div className="admin-orders-tab animate-fade-in">
      <div className="orders-header-banner">
        <span className="orders-header-icon">📑</span>
        <div>
          <h3>Registro de Pedidos y Cobros de Recurrente</h3>
          <p>
            Historial de pedidos recibidos con tarjeta vía <strong>Recurrente</strong> o por cotización de WhatsApp con desglose de precios y facturación FEL.
          </p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="admin-orders-empty">
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.75rem' }}>🛒</span>
          <h4>No hay pedidos registrados aún</h4>
          <p>Los pedidos que los clientes confirmen o paguen desde el carrito web aparecerán aquí en tiempo real.</p>
        </div>
      ) : (
        <div className="admin-orders-list">
          {orders.map((ord) => (
            <div key={ord.id} className="admin-order-card">
              <div className="order-card-header">
                <div>
                  <div className="order-id-line">
                    <strong>#{ord.orderNumber}</strong>
                    <span className="order-date">
                      {new Date(ord.createdAt).toLocaleString('es-GT', { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                    {ord.channel === 'recurrente' ? (
                      <span className="order-channel-badge recurrente">💳 Recurrente GT</span>
                    ) : (
                      <span className="order-channel-badge whatsapp">💬 WhatsApp</span>
                    )}
                  </div>
                  <div className="order-customer-line">
                    <span className="customer-name">👤 {ord.customer.name}</span>
                    <a 
                      href={`https://wa.me/${ord.customer.phone.replace(/\D/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="customer-phone-link"
                    >
                      💬 {ord.customer.phone}
                    </a>
                    {ord.customer.nit && <span className="customer-nit">🧾 NIT: {ord.customer.nit}</span>}
                    {ord.payment?.recurrenteCheckoutUrl && (
                      <a
                        href={ord.payment.recurrenteCheckoutUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="customer-paylink"
                        title="Abrir enlace de pago de Recurrente"
                      >
                        🔗 Link Recurrente ↗
                      </a>
                    )}
                  </div>
                </div>

                <div className="order-card-header-right">
                  {getStatusBadge(ord.status, ord.payment?.method)}
                  <select
                    className="order-status-select"
                    value={ord.status}
                    onChange={(e) => handleStatusChange(ord.id, e.target.value as StoreOrder['status'])}
                  >
                    <option value="nuevo">🟡 Nuevo</option>
                    <option value="pendiente_pago">⏳ Pendiente de Pago</option>
                    <option value="pagado">💳 Pagado</option>
                    <option value="contactado">🔵 Contactado</option>
                    <option value="en_proceso">🟣 En Proceso</option>
                    <option value="completado">🟢 Completado</option>
                    <option value="cancelado">⚪ Cancelado</option>
                  </select>
                </div>
              </div>

              {(ord.customer.address || ord.customer.notes) && (
                <div className="order-extra-info">
                  {ord.customer.address && (
                    <p><strong>📍 Entrega:</strong> {ord.customer.address}</p>
                  )}
                  {ord.customer.notes && (
                    <p><strong>📝 Notas:</strong> {ord.customer.notes}</p>
                  )}
                </div>
              )}

              <div className="order-items-table">
                <table>
                  <thead>
                    <tr>
                      <th>Cant.</th>
                      <th>Producto / Módulo</th>
                      <th>Precio Unit.</th>
                      <th style={{ textAlign: 'right' }}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ord.items.map((item, idx) => (
                      <tr key={idx}>
                        <td><strong>{item.quantity}x</strong></td>
                        <td>{item.title}</td>
                        <td>Q {item.price.toFixed(2)}</td>
                        <td style={{ textAlign: 'right' }}><strong>Q {item.subtotal.toFixed(2)}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="order-card-footer">
                <span className="order-total-count">{ord.totalCount} artículos</span>
                {ord.savings > 0 && (
                  <span className="order-savings-pill">Ahorro: Q {ord.savings.toFixed(2)}</span>
                )}
                <span className="order-final-total">
                  Total: <strong>Q {ord.total.toFixed(2)}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersTab;
