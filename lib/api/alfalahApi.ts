import axiosInstance from './axios';
import { ApiResponse } from './categoryApi';
import { Order } from './orderApi';

export type AlfalahFormPayload = {
  provider: 'alfalah';
  actionUrl: string;
  method: 'POST';
  fields: Record<string, string>;
};

export type AlfalahVerifyResult = {
  order: Order & { payment_status?: string };
  transactionStatus: string;
  paid: boolean;
};

class AlfalahApi {
  async getConfig(): Promise<{ enabled: boolean; env: string; provider: string }> {
    const response = await axiosInstance.get<ApiResponse<{ enabled: boolean; env: string; provider: string }>>(
      '/payments/alfalah/config',
    );
    return response.data.data;
  }

  async getSsoForm(ref: string, authToken: string): Promise<AlfalahFormPayload> {
    const response = await axiosInstance.get<ApiResponse<AlfalahFormPayload>>('/payments/alfalah/sso', {
      params: { ref, auth_token: authToken },
    });
    return response.data.data;
  }

  async verifyPayment(payload: { orderNumber?: string; path?: string }): Promise<AlfalahVerifyResult> {
    const response = await axiosInstance.post<ApiResponse<AlfalahVerifyResult>>(
      '/payments/alfalah/verify',
      payload,
    );
    return response.data.data;
  }
}

export const alfalahApi = new AlfalahApi();

export function submitAlfalahForm(actionUrl: string, fields: Record<string, string>) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = actionUrl;
  form.acceptCharset = 'UTF-8';
  form.style.display = 'none';

  Object.entries(fields).forEach(([name, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.id = name;
    input.value = value ?? '';
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}
