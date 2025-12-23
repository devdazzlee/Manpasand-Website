import axiosInstance from './axios';

export interface GuestOrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface GuestOrderRequest {
  items: GuestOrderItem[];
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
  paymentMethod: 'cash' | 'card';
  subtotal: number;
  shippingCost: number;
  total: number;
  orderNotes?: string;
}

export interface OrderResponse {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  payment_method: string;
  created_at: string;
}

class OrderApi {
  /**
   * Create a guest order (no authentication required)
   */
  async createGuestOrder(orderData: GuestOrderRequest): Promise<OrderResponse> {
    const response = await axiosInstance.post<{ data: OrderResponse }>('/guest/order', orderData);
    return response.data.data;
  }
}

export const orderApi = new OrderApi();

