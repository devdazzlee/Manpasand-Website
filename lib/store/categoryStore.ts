import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Category } from '../api/categoryApi';
import { categoryApi } from '../api/categoryApi';

interface CategoryState {
  // Cache for categories
  categoriesCache: Category[] | null;
  // Loading state
  loading: boolean;
  // Last fetch timestamp
  lastFetch: number | null;
  // Cache expiry time (5 minutes)
  cacheExpiry: number;
  
  // Get categories from cache or fetch
  getCategories: (forceRefresh?: boolean) => Promise<Category[]>;
  
  // Clear cache
  clearCache: () => void;
}

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set, get) => ({
      categoriesCache: null,
      loading: false,
      lastFetch: null,
      cacheExpiry: 5 * 60 * 1000, // 5 minutes

      getCategories: async (forceRefresh = false) => {
        const state = get();
        
        // Return cached categories if still valid and not forcing refresh
        if (!forceRefresh && state.categoriesCache && state.lastFetch) {
          const now = Date.now();
          const isExpired = now - state.lastFetch > state.cacheExpiry;
          
          if (!isExpired) {
            // Return cached data immediately
            // Fetch fresh data in background
            state.getCategories(true).catch(() => {});
            return state.categoriesCache;
          }
        }
        
        // Check if already loading
        if (state.loading) {
          // Wait for existing request
          return new Promise((resolve) => {
            const checkInterval = setInterval(() => {
              const currentState = get();
              if (!currentState.loading && currentState.categoriesCache) {
                clearInterval(checkInterval);
                resolve(currentState.categoriesCache);
              }
            }, 50);
          });
        }
        
        // Mark as loading
        set({ loading: true });
        
        try {
          // Fetch categories
          const categories = await categoryApi.getCategories();
          
          // Cache them
          set({
            categoriesCache: categories,
            lastFetch: Date.now(),
            loading: false,
          });
          
          return categories;
        } catch (error) {
          console.error('Error fetching categories:', error);
          set({ loading: false });
          
          // Return cached data if available, even if expired
          if (state.categoriesCache) {
            return state.categoriesCache;
          }
          
          throw error;
        }
      },

      clearCache: () => {
        set({
          categoriesCache: null,
          lastFetch: null,
          loading: false,
        });
      },
    }),
    {
      name: 'category-cache-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

