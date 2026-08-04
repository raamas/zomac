'use client';

import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { cn } from '@/lib/utils';

export const CategoryFilter = () => {
  const { activeCategory, setActiveCategory, sortBy, setSortBy } = useShop();

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'flagship', label: 'Gama Alta' },
    { id: 'midrange', label: 'Calidad-Precio' },
    { id: 'gaming', label: 'Gaming' },
    { id: 'ofertas', label: 'Ofertas' },
  ];

  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              'cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              activeCategory === cat.id
                ? 'border-whatsapp bg-whatsapp text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:text-foreground'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <ArrowUpDown className="size-4 text-muted-foreground" />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Destacados</SelectItem>
            <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
            <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
            <SelectItem value="name">Nombre (A-Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
