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
    { id: 'proteccion', label: 'Protección' },
    { id: 'primeros-auxilios', label: 'Primeros Auxilios' },
    { id: 'agua', label: 'Agua' },
    { id: 'alimentos', label: 'Alimentos' },
    { id: 'iluminacion', label: 'Iluminación' },
    { id: 'comunicacion', label: 'Comunicación' },
    { id: 'herramientas', label: 'Herramientas' },
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
            <SelectItem value="name">Nombre (A-Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
