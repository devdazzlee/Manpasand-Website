export type LastOrder = {
  orderId: string;
  orderNumber: string;
  orderDate: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    address: string;
    city: string;
    postalCode?: string;
  };
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: 'cash' | 'card';
  status: string;
  paymentStatus: string;
};

export function saveLastOrder(order: LastOrder) {
  localStorage.setItem('lastOrder', JSON.stringify(order));
}

export function readLastOrder(): LastOrder | null {
  const raw = localStorage.getItem('lastOrder');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as LastOrder;
  } catch {
    return null;
  }
}

export function saveLastOrderFromPaidApiOrder(apiOrder: any): LastOrder {
  const items = (apiOrder.items || []).map((item: { id: string; display_name?: string; quantity?: string | number; price?: string | number; product?: { name?: string } }) => ({
    id: item.id,
    name: item.display_name || item.product?.name || 'Item',
    quantity: Number(item.quantity) || 0,
    price: Number(item.price) || 0,
  }));
  const total = Number(apiOrder.total_amount) || 0;
  const subtotal = items.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0);
  const paymentMethod = String(apiOrder.payment_method || 'card').toLowerCase() === 'cash' ? 'cash' : 'card';

  const lastOrder: LastOrder = {
    orderId: apiOrder.id,
    orderNumber: apiOrder.order_number,
    orderDate: apiOrder.created_at || new Date().toISOString(),
    customerInfo: {
      firstName: apiOrder.customer?.firstName || '',
      lastName: apiOrder.customer?.lastName || '',
      email: apiOrder.customer?.email || apiOrder.customer_email || '',
      phone: apiOrder.customer?.phone || apiOrder.customer_phone || '',
    },
    shippingAddress: {
      address: apiOrder.shipping?.address || apiOrder.delivery_address || '',
      city: apiOrder.shipping?.city || apiOrder.delivery_city || '',
      postalCode: apiOrder.shipping?.postalCode || apiOrder.delivery_postal_code || '',
    },
    items,
    subtotal,
    shipping: Math.max(0, total - subtotal),
    total,
    paymentMethod,
    status: apiOrder.status || 'PROCESSING',
    paymentStatus: apiOrder.payment_status || 'PAID',
  };

  saveLastOrder(lastOrder);
  return lastOrder;
}
