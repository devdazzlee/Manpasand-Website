'use client';

import { useEffect } from 'react';
import { useCategoryStore } from '../../lib/store/categoryStore';
import { useProductMetaStore } from '../../lib/store/productMetaStore';

export default function AppDataBootstrap() {
  const { getCategories } = useCategoryStore();
  const { getProductCount } = useProductMetaStore();

  useEffect(() => {
    // Preload shared app data once so downstream components read from cache.
    Promise.allSettled([
      getCategories(),
      getProductCount(),
    ]);
  }, [getCategories, getProductCount]);

  return null;
}
