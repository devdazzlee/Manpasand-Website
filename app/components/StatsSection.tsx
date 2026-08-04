'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Users, Award, ShoppingBag } from 'lucide-react';
import { useProductMetaStore } from '../../lib/store/productMetaStore';

interface StatsSectionProps {
  initialProductCount?: number;
}

export default function StatsSection({ initialProductCount }: StatsSectionProps) {
  const [productCount, setProductCount] = useState<string>(
    initialProductCount && initialProductCount > 0 ? `${initialProductCount}+` : '1400+'
  );
  const { getProductCount } = useProductMetaStore();

  useEffect(() => {
    if (initialProductCount && initialProductCount > 0) {
      setProductCount(`${initialProductCount}+`);
      return;
    }

    const fetchCount = async () => {
      try {
        const count = await getProductCount();
        setProductCount(count > 0 ? `${count}+` : '1400+');
      } catch {
        // keep default
      }
    };
    fetchCount();
  }, [getProductCount, initialProductCount]);

  const stats = [
    { icon: Users, number: '10K+', label: 'Happy Customers', color: '#1A73A8' },
    { icon: Award, number: '25+', label: 'Years Experience', color: '#F97316' },
    { icon: ShoppingBag, number: productCount, label: 'Products Available', color: '#0D2B3A' },
    { icon: TrendingUp, number: '98%', label: 'Satisfaction Rate', color: '#1A73A8' },
  ];

  return (
    <section className="py-10 sm:py-14 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center p-5 sm:p-7 bg-gradient-to-br from-[#F8F2DE]/50 to-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm"
                  style={{ background: stat.color }}
                >
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D2B3A] mb-1">
                  {stat.number}
                </p>
                <p className="text-[#4B5563] font-medium text-xs sm:text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
