'use client';

import React from 'react';
import { SearchX, CheckCircle2, AlertTriangle, Ban, Plus } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Card } from './ui/card';
import { Button } from './ui/button';

export const ProductGrid = () => {
  const { products, activeCategory, searchQuery, sortBy, cart, setCartQty } = useShop();

  let filtered = products.filter((p) => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (sortBy === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border bg-card py-16 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted">
          <SearchX size={28} className="text-muted-foreground" />
        </div>
        <h4 className="font-display text-lg font-semibold">No se encontraron artículos</h4>
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
        const qtyInCart = cart.find((i) => i.product.id === p.id)?.quantity || 0;

        return (
          <Card key={p.id} className="gap-3 p-5 transition-colors hover:border-foreground/20">
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

            <Button
              className="mt-auto w-full"
              variant={qtyInCart > 0 ? 'secondary' : 'outline'}
              onClick={() => setCartQty(p.id, qtyInCart + 1)}
              disabled={isOutOfStock}
            >
              <Plus size={16} />
              {isOutOfStock
                ? 'Agotado'
                : qtyInCart > 0
                  ? `Agregar (${qtyInCart} en petición)`
                  : 'Agregar'}
            </Button>
          </Card>
        );
      })}
    </div>
  );
};
