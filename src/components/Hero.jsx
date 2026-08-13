'use client';

import React from 'react';
import { HeartHandshake, MessageSquare, MapPin, Zap, ArrowRight, Building2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useShop } from '../context/ShopContext';

export const Hero = () => {
  const { setIsCartOpen, config } = useShop();

  return (
    <section className="px-4 py-9">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-8 rounded-2xl border bg-card p-8 shadow-md md:flex-row md:px-10">
        <div className="max-w-xl">
          <Badge className="mb-3 border-amber-accent/30 bg-amber-accent/10 px-3 py-1 text-amber-accent">
            <MessageSquare size={14} /> Estamos para ayudarte
          </Badge>
          <h2 className="font-display text-3xl font-extrabold leading-tight text-foreground">
            Cuéntanos qué necesitas y te ayudamos
          </h2>
          <p className="mt-2 text-muted-foreground">
            Dinos qué te hace falta en este momento: protección, alimentos, agua, primeros auxilios,
            asistencia médica y más. Envía tu petición por WhatsApp con tus datos de contacto y
            nuestro equipo te atenderá lo antes posible.
          </p>
          {config.fulfillingOrganization && (
            <p className="mt-3 inline-flex flex-wrap items-center gap-1.5 rounded-full border border-whatsapp/30 bg-whatsapp/10 px-3 py-1 text-sm font-semibold text-whatsapp">
              <Building2 size={16} /> Ayuda proporcionada por: {config.fulfillingOrganization}
            </p>
          )}
          <Button
            size="lg"
            onClick={() => setIsCartOpen(true)}
            className="mt-4 rounded-full bg-gradient-to-br from-whatsapp to-whatsapp-hover font-semibold text-white shadow-[0_4px_15px_rgba(14,165,233,0.35)] hover:opacity-90"
          >
            Enviar mi Petición <ArrowRight size={18} />
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 rounded-xl border bg-background px-4 py-3">
            <Zap className="shrink-0 text-whatsapp" size={24} />
            <div>
              <strong className="block text-sm">Petición Rápida</strong>
              <span className="text-sm text-muted-foreground">Sin crear cuenta</span>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border bg-background px-4 py-3">
            <MapPin className="shrink-0 text-whatsapp" size={24} />
            <div>
              <strong className="block text-sm">Te ubicamos</strong>
              <span className="text-sm text-muted-foreground">Escríbenos tu localidad</span>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border bg-background px-4 py-3">
            <HeartHandshake className="shrink-0 text-amber-accent" size={24} />
            <div>
              <strong className="block text-sm">Ayuda Real</strong>
              <span className="text-sm text-muted-foreground">Te contactamos para apoyarte</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
