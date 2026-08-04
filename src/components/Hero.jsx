'use client';

import React from 'react';
import { MessageSquare, Zap, Truck } from 'lucide-react';
import { Badge } from './ui/badge';

export const Hero = () => {
  return (
    <section className="px-4 py-9">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-8 rounded-2xl border bg-card p-8 shadow-md md:flex-row md:px-10">
        <div className="max-w-xl">
          <Badge className="mb-3 border-whatsapp/20 bg-whatsapp/10 px-3 py-1 text-whatsapp">
            <MessageSquare size={14} /> Compras por WhatsApp
          </Badge>
          <h2 className="font-display text-3xl font-extrabold leading-tight text-foreground">
            Tu Próximo Smartphone a un Clic por WhatsApp
          </h2>
          <p className="mt-2 text-muted-foreground">
            Elige tu smartphone preferido, agrégalo al carrito y envía tu pedido detallado
            directamente por WhatsApp en segundos.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 rounded-xl border bg-background px-4 py-3">
            <Zap className="shrink-0 text-whatsapp" size={24} />
            <div>
              <strong className="block text-sm">Pedido Fácil</strong>
              <span className="text-sm text-muted-foreground">Sin crear cuenta</span>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border bg-background px-4 py-3">
            <Truck className="shrink-0 text-whatsapp" size={24} />
            <div>
              <strong className="block text-sm">Envío Seguro</strong>
              <span className="text-sm text-muted-foreground">Entrega a domicilio</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
