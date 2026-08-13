'use client';

import React from 'react';
import { HeartHandshake, MessageSquare, Truck, Zap } from 'lucide-react';
import { Badge } from './ui/badge';

export const Hero = () => {
  return (
    <section className="px-4 py-9">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-8 rounded-2xl border bg-card p-8 shadow-md md:flex-row md:px-10">
        <div className="max-w-xl">
          <Badge className="mb-3 border-amber-accent/30 bg-amber-accent/10 px-3 py-1 text-amber-accent">
            <MessageSquare size={14} /> Campaña de Donación tras el sismo
          </Badge>
          <h2 className="font-display text-3xl font-extrabold leading-tight text-foreground">
            Ofrece tu donación a un clic por WhatsApp
          </h2>
          <p className="mt-2 text-muted-foreground">
            Dona artículos y servicios: protección, alimentos no perecederos, agua, primeros auxilios,
            revisión estructural, asistencia médica y más. Envíanos tu oferta por WhatsApp
            y coordinamos la recolección.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 rounded-xl border bg-background px-4 py-3">
            <Zap className="shrink-0 text-whatsapp" size={24} />
            <div>
              <strong className="block text-sm">Donación Fácil</strong>
              <span className="text-sm text-muted-foreground">Sin crear cuenta</span>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border bg-background px-4 py-3">
            <Truck className="shrink-0 text-whatsapp" size={24} />
            <div>
              <strong className="block text-sm">Recolección Coordinada</strong>
              <span className="text-sm text-muted-foreground">Recogemos tu donación</span>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border bg-background px-4 py-3">
            <HeartHandshake className="shrink-0 text-amber-accent" size={24} />
            <div>
              <strong className="block text-sm">Ayuda Real</strong>
              <span className="text-sm text-muted-foreground">Llega a quien más lo necesita</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
