'use client';

import React from 'react';
import { Plus, XCircle, SearchX, CheckCircle2, AlertTriangle, Ban } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const categoryLabel = (c) =>
  c === 'flagship' ? 'Gama Alta' : c === 'gaming' ? 'Gaming' : c === 'ofertas' ? 'Ofertas' : 'Gama Media';

const badgeVariant = (type) =>
  type === 'sale' ? 'destructive' : type === 'new' ? 'secondary' : 'default';

export const ProductGrid = () => {
  const { products, activeCategory, searchQuery, sortBy, config, addToCart } = useShop();

  let filtered = products.filter((p) => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border bg-card py-16 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted">
          <SearchX size={28} className="text-muted-foreground" />
        </div>
        <h4 className="font-display text-lg font-semibold">No se encontraron teléfonos</h4>
        <p className="text-sm text-muted-foreground">
          Intenta buscar con otra palabra clave o cambia el filtro de categoría.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filtered.map((p) => {
        const isOutOfStock = p.stock <= 0;
        const isLowStock = p.stock > 0 && p.stock < 3;

        return (
          <Card key={p.id} className="gap-3 p-5 transition-colors hover:border-foreground/20">
            <div className="flex items-start justify-between gap-2">
              <Badge variant="secondary" className="text-muted-foreground">
                {categoryLabel(p.category)}
              </Badge>
              {p.badge && <Badge variant={badgeVariant(p.badgeType)}>{p.badge}</Badge>}
            </div>

            <div className="space-y-1">
              <h3 className="font-display text-lg font-semibold leading-tight">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.description}</p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-medium">
              {isOutOfStock ? (
                <span className="inline-flex items-center gap-1 text-rose-accent">
                  <Ban size={13} /> Agotado
                </span>
              ) : isLowStock ? (
                <span className="inline-flex items-center gap-1 text-amber-accent">
                  <AlertTriangle size={13} /> Solo {p.stock} disponibles
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-whatsapp">
                  <CheckCircle2 size={13} /> {p.stock} disponibles
                </span>
              )}
            </div>

            <div className="mt-auto flex items-center justify-between border-t pt-4">
              <span className="text-lg font-bold">
                {config.currency}
                {p.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <Button
                size="sm"
                variant={isOutOfStock ? 'secondary' : 'default'}
                onClick={() => addToCart(p.id)}
                disabled={isOutOfStock}
              >
                {isOutOfStock ? <XCircle size={16} /> : <Plus size={16} />}
                {isOutOfStock ? 'Agotado' : 'Agregar'}
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
