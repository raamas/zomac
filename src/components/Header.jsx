'use client';

import React, { useEffect } from 'react';
import { Smartphone, Search, ShoppingCart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const Header = () => {
  const { config, cart, searchQuery, setSearchQuery, setIsCartOpen } = useShop();
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    document.title = `${config.shopName} - Tienda de Celulares WhatsApp`;
  }, [config.shopName]);

  return (
    <>
      <div className="bg-gradient-to-r from-whatsapp-dark via-[#128c7e] to-whatsapp px-4 py-1.5 text-center text-xs font-semibold tracking-wide text-white">
        {config.announcementText}
      </div>

      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-5 px-4 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-whatsapp to-whatsapp-dark text-white shadow-[0_0_15px_rgba(37,211,102,0.3)]">
              <Smartphone size={24} />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold leading-tight">{config.shopName}</h1>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-whatsapp">
                <span className="pulse-dot size-1.5 rounded-full bg-whatsapp shadow-[0_0_8px_#25d366]" />
                Tienda En Línea
              </span>
            </div>
          </div>

          <div className="relative hidden max-w-md flex-1 md:block">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar teléfonos, marcas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-full pl-10"
            />
          </div>

          <Button
            onClick={() => setIsCartOpen(true)}
            className="rounded-full bg-gradient-to-br from-whatsapp to-whatsapp-hover font-semibold text-white shadow-[0_4px_15px_rgba(37,211,102,0.3)] hover:opacity-90"
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Carrito</span>
            <span className="rounded-full bg-white px-2 py-0.5 text-xs font-extrabold text-[#0b111e]">
              {totalCartCount}
            </span>
          </Button>
        </div>
      </header>
    </>
  );
};
