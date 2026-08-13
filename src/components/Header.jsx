'use client';

import React, { useEffect } from 'react';
import { LifeBuoy, Search, ShoppingCart, Megaphone } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const Header = () => {
  const { config, cart, searchQuery, setSearchQuery, setIsCartOpen } = useShop();
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    document.title = `${config.shopName} - Campaña de Donación`;
  }, [config.shopName]);

  return (
    <>
      <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-accent to-[#fbbf24] px-4 py-1.5 text-center text-xs font-bold tracking-wide text-[#1a1203]">
        <Megaphone size={14} className="shrink-0" />
        <span>{config.announcementText}</span>
      </div>

      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-5 px-4 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-whatsapp to-whatsapp-dark text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]">
              <LifeBuoy size={24} />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold leading-tight">{config.shopName}</h1>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-accent">
                <span className="pulse-dot size-1.5 rounded-full bg-amber-accent shadow-[0_0_8px_#f59e0b]" />
                Campaña de Donación
              </span>
            </div>
          </div>

          <div className="relative hidden max-w-md flex-1 md:block">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Busca qué donar: artículos y servicios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-full pl-10"
            />
          </div>

          <Button
            onClick={() => setIsCartOpen(true)}
            className="rounded-full bg-gradient-to-br from-whatsapp to-whatsapp-hover font-semibold text-white shadow-[0_4px_15px_rgba(14,165,233,0.35)] hover:opacity-90"
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Mi Donación</span>
            <span className="rounded-full bg-white px-2 py-0.5 text-xs font-extrabold text-[#0b111e]">
              {totalCartCount}
            </span>
          </Button>
        </div>
      </header>
    </>
  );
};
