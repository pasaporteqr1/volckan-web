import type { MercadoProduct } from '../data/mercadoData';

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  subtotal: number;
  categoryLabel?: string;
  image?: string;
  icon?: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  nit?: string; // Para Factura Electrónica en Línea (FEL)
  address?: string;
  notes?: string;
}

export interface PaymentDetails {
  method: 'recurrente' | 'recurrente_card' | 'whatsapp';
  recurrenteCheckoutId?: string;
  recurrenteCheckoutUrl?: string;
  paidAt?: string;
  liveMode?: boolean;
}

export interface StoreOrder {
  id: string; // ej: order-1730594234567-A8F2
  orderNumber: string; // ej: ORD-20261102-A8F2
  createdAt: string;
  updatedAt?: string;
  status: 'nuevo' | 'pendiente_pago' | 'pagado' | 'contactado' | 'en_proceso' | 'completado' | 'cancelado';
  customer: CustomerInfo;
  items: OrderItem[];
  totalCount: number;
  subtotal: number;
  savings: number;
  total: number;
  currency: string;
  channel: 'whatsapp' | 'recurrente';
  payment?: PaymentDetails;
}
