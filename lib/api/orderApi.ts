import axiosInstance from './axios';
import { ApiResponse } from './categoryApi';

export interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: {
    id: string;
    name: string;
    image?: string;
  };
}

export interface Order {
  id: string;
  order_number: string;
  customer_id?: string;
  guest_email?: string;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  payment_method: string;
  payment_status: 'PENDING' | 'PAID' | 'FAILED';
  subtotal: number;
  shipping: number;
  tax?: number;
  total: number;
  shipping_address?: {
    address: string;
    city: string;
    postal_code?: string;
    phone?: string;
  };
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface CreateGuestOrderData {
  items: Array<{
    id: string;
    productId?: string;
    name: string;
    price: number;
    quantity: number;
    gramsPerUnit?: number;
    unitName?: string;
    image?: string;
  }>;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shipping: {
    address: string;
    city: string;
    postalCode?: string;
  };
  paymentMethod: 'cash' | 'card' | 'bank_transfer';
  subtotal: number;
  shippingCost: number;
  total: number;
  orderNotes?: string;
}

export interface GuestOrderResponse extends Order {
  payment?: {
    provider: 'alfalah';
    actionUrl: string;
    method: 'POST';
    fields: Record<string, string>;
  };
}

export interface CreateOrderData {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  paymentMethod?: 'cash' | 'card' | 'bank_transfer';
  shippingAddress?: {
    address: string;
    city: string;
    postal_code?: string;
    phone?: string;
  };
}

export type TrackableOrderStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
export type TrackablePaymentStatus = 'PAID' | 'PARTIAL' | 'PENDING' | 'OVERDUE' | 'FAILED';

export interface TrackOrderRequest {
  orderNumber: string;
  email?: string;
  phone?: string;
}

export interface TrackOrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total_price: number;
  unit_name?: string | null;
  grams_per_unit?: number | null;
}

export interface TrackOrderResult {
  id: string;
  order_number: string;
  status: TrackableOrderStatus;
  payment_method: string | null;
  payment_status: TrackablePaymentStatus;
  total_amount: number;
  created_at: string;
  updated_at: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shipping: {
    address: string;
    city: string;
    postalCode: string;
  };
  items: TrackOrderItem[];
}

class OrderApi {
  async getMyOrders(): Promise<Order[]> {
    const response = await axiosInstance.get<ApiResponse<Order[]>>('/app/customer/order');
    return response.data.data;
  }

  async getMyOrderById(orderId: string): Promise<Order> {
    const response = await axiosInstance.get<ApiResponse<Order>>(`/app/customer/order/${orderId}`);
    return response.data.data;
  }

  async createGuestOrder(data: CreateGuestOrderData): Promise<GuestOrderResponse> {
    const response = await axiosInstance.post<ApiResponse<GuestOrderResponse>>('/guest/order', data);
    return response.data.data;
  }

  async createOrder(data: CreateOrderData): Promise<Order> {
    const response = await axiosInstance.post<ApiResponse<Order>>('/app/customer/order', data);
    return response.data.data;
  }

  async trackOrder(data: TrackOrderRequest): Promise<TrackOrderResult> {
    const response = await axiosInstance.post<ApiResponse<TrackOrderResult>>('/guest/order/track', {
      orderNumber: data.orderNumber.trim(),
      email: data.email?.trim() || undefined,
      phone: data.phone?.trim() || undefined,
    });
    return response.data.data;
  }
}

export const orderApi = new OrderApi();
