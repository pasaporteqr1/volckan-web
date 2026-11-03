import { RECURRENTE_CONFIG } from '../constants';
import type { OrderItem, StoreOrder } from '../types/order';

interface CreateRecurrenteCheckoutParams {
  order: StoreOrder;
  successUrl?: string;
  cancelUrl?: string;
  customSecretKey?: string;
}

export interface RecurrenteCheckoutResponse {
  id: string;
  checkout_url: string;
  status: string;
  total_in_cents: number;
  currency: string;
  live_mode: boolean;
}

function getRecurrenteSecretKey(): string {
  const envKey = import.meta.env.VITE_RECURRENTE_SECRET_KEY;
  if (envKey && typeof envKey === 'string' && envKey.trim().length > 0) {
    return envKey.trim();
  }
  return RECURRENTE_CONFIG.secretKey || '';
}

/**
 * Crea una sesión de pago dinámica en Recurrente para una orden de la tienda.
 * Los precios se calculan con base en cada producto del carrito (en centavos de Quetzales GTQ).
 */
export async function createRecurrenteCheckout({
  order,
  successUrl,
  cancelUrl,
  customSecretKey
}: CreateRecurrenteCheckoutParams): Promise<RecurrenteCheckoutResponse> {
  const secretKey = customSecretKey || getRecurrenteSecretKey();

  if (!secretKey) {
    throw new Error('No se ha configurado la clave de Recurrente. Por favor coordina tu pago por WhatsApp o transferencia.');
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://www.volckan.com';
  const pathname = typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') : '';

  const defaultSuccess = `${origin}${pathname}/#/pago-completado?orderId=${encodeURIComponent(order.id)}&orderNum=${encodeURIComponent(order.orderNumber)}`;
  const defaultCancel = `${origin}${pathname}/#/pago-cancelado?orderId=${encodeURIComponent(order.id)}&orderNum=${encodeURIComponent(order.orderNumber)}`;

  // Convertir items de la orden al formato requerido por la API de Recurrente
  // Recurrente requiere amount_in_cents (ej. Q 150.00 -> 15000 centavos)
  const items = order.items.map((item: OrderItem) => {
    const unitPriceInCents = Math.round(item.price * 100);
    return {
      name: item.title,
      amount_in_cents: Math.max(unitPriceInCents, 500), // Mínimo Q5.00 por política de GTQ
      currency: 'GTQ',
      quantity: item.quantity
    };
  });

  const payload = {
    items,
    metadata: {
      order_id: order.id,
      order_number: order.orderNumber,
      customer_name: order.customer.name,
      customer_phone: order.customer.phone,
      customer_nit: order.customer.nit || 'C/F',
      store: 'Volckan Store'
    },
    success_url: successUrl || defaultSuccess,
    cancel_url: cancelUrl || defaultCancel
  };

  const response = await fetch(RECURRENTE_CONFIG.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-SECRET-KEY': secretKey
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    let errorDetail = '';
    try {
      const errJson = await response.json();
      errorDetail = JSON.stringify(errJson);
    } catch {
      errorDetail = await response.text();
    }
    throw new Error(`Error en Recurrente (${response.status}): ${errorDetail}`);
  }

  const data = await response.json();
  return {
    id: data.id,
    checkout_url: data.checkout_url,
    status: data.status,
    total_in_cents: data.total_in_cents,
    currency: data.currency,
    live_mode: Boolean(data.live_mode)
  };
}
