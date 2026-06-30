import { create } from 'zustand';
import { webApi } from '../api/webApi';

interface ProductMetaState {
  productCount: number | null;
  loading: boolean;
  lastFetch: number | null;
  cacheExpiry: number;
  getProductCount: (forceRefresh?: boolean) => Promise<number>;
  /** Seed from /web/home payload to avoid a separate count request on homepage. */
  seedProductCount: (count: number) => void;
}

let inFlightProductCountRequest: Promise<number> | null = null;

export const useProductMetaStore = create<ProductMetaState>()((set, get) => ({
  productCount: null,
  loading: false,
  lastFetch: null,
  cacheExpiry: 5 * 60 * 1000,

  seedProductCount: (count: number) => {
    if (!Number.isFinite(count) || count <= 0) return;
    set({ productCount: count, lastFetch: Date.now(), loading: false });
  },

  getProductCount: async (forceRefresh = false) => {
    const state = get();

    if (!forceRefresh && state.productCount !== null && state.lastFetch) {
      const isExpired = Date.now() - state.lastFetch > state.cacheExpiry;
      if (!isExpired) {
        return state.productCount;
      }
    }

    if (inFlightProductCountRequest) {
      return inFlightProductCountRequest;
    }

    set({ loading: true });

    inFlightProductCountRequest = webApi
      .getProductCount()
      .then((count) => {
        set({
          productCount: count,
          lastFetch: Date.now(),
        });
        return count;
      })
      .catch((error) => {
        console.error('Error fetching product count:', error);
        if (state.productCount !== null) {
          return state.productCount;
        }
        throw error;
      })
      .finally(() => {
        inFlightProductCountRequest = null;
        set({ loading: false });
      });

    return inFlightProductCountRequest;
  },
}));
