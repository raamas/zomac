'use client';

import React, { useState } from 'react';
import {
  HeartHandshake,
  Minus,
  Plus,
  MessageCircle,
  QrCode,
  UserCheck,
  Trash2,
  Gift,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    setCartQty,
    clearCart,
    generateWhatsAppUrl,
    setQrUrl,
    setIsQrOpen,
    config,
  } = useShop();

  const [form, setForm] = useState({
    custName: '',
    custPhone: '',
    custLocation: '',
    notes: '',
  });
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckout = () => {
    const url = generateWhatsAppUrl(form);
    if (url) {
      window.open(url, '_blank');
      clearCart();
    }
  };

  const handleShowQr = () => {
    const url = generateWhatsAppUrl(form);
    if (url) {
      setQrUrl(url);
      setIsQrOpen(true);
    }
  };

  return (
    <>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b pr-12">
          <div className="flex items-center gap-2">
            <HeartHandshake size={20} className="text-whatsapp" />
            <SheetTitle className="text-base">Envía tu Petición</SheetTitle>
            <Badge variant="secondary">
              {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}
            </Badge>
            {totalItems > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto text-muted-foreground hover:text-rose-accent"
                onClick={() => setIsClearConfirmOpen(true)}
              >
                <Trash2 size={14} /> Vaciar
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <h4 className="flex items-center gap-2 text-sm font-semibold">
            <span className="flex size-5 items-center justify-center rounded-full bg-whatsapp/15 text-xs font-bold text-whatsapp">1</span>
            Tus artículos seleccionados
          </h4>

          <div className="mt-3 space-y-2.5">
            {cart.length === 0 ? (
              <div className="rounded-lg border bg-background px-4 py-6 text-center text-sm text-muted-foreground">
                Aún no has agregado artículos. Vuelve al catálogo y elige lo que necesitas.
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between gap-3 rounded-lg border bg-background p-3">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{item.product.name}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">máx. {item.product.stock}</div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-7 rounded-full"
                      onClick={() => setCartQty(item.product.id, item.quantity - 1)}
                      disabled={item.quantity === 0}
                    >
                      <Minus size={14} />
                    </Button>
                    <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-7 rounded-full"
                      onClick={() => setCartQty(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 space-y-4">
            <h4 className="flex items-center gap-2 text-sm font-semibold">
              <span className="flex size-5 items-center justify-center rounded-full bg-whatsapp/15 text-xs font-bold text-whatsapp">2</span>
              <UserCheck size={16} /> Tus datos de contacto
            </h4>

            <div className="space-y-2">
              <Label htmlFor="custName">Nombre Completo *</Label>
              <Input
                id="custName"
                placeholder="Ej. Carlos Mendoza"
                value={form.custName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="custPhone">Teléfono *</Label>
              <Input
                id="custPhone"
                type="tel"
                placeholder="Ej. +52 55 1234 5678"
                value={form.custPhone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="custLocation">Ubicación *</Label>
              <Input
                id="custLocation"
                placeholder="Ej. Colonia Centro, Ciudad de México"
                value={form.custLocation}
                onChange={handleInputChange}
                required
              />
              <p className="text-xs text-muted-foreground">
                Escríbenos tu colonia, localidad o ciudad para saber dónde enviarte ayuda.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas (opcional)</Label>
              <Textarea
                id="notes"
                rows={2}
                placeholder="Ej. cuéntanos más sobre tu necesidad o el horario en que pueden contactarte"
                value={form.notes}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="border-t bg-background p-4">
          <div className="flex items-center gap-2 rounded-lg border border-whatsapp/20 bg-whatsapp/10 px-3 py-2 text-sm font-medium text-whatsapp">
            <Gift size={16} />
            {config.fulfillingOrganization
              ? `Tu petición llega a ${config.fulfillingOrganization} y su equipo de ayuda`
              : 'Tu petición llega a nuestro equipo de ayuda'}
          </div>
          <Button
            className="mt-3 w-full"
            size="lg"
            onClick={handleCheckout}
            disabled={totalItems === 0}
          >
            <MessageCircle size={20} /> Enviar Petición por WhatsApp
          </Button>
          <Button
            variant="ghost"
            className="mt-2 w-full"
            onClick={handleShowQr}
            disabled={totalItems === 0}
          >
            <QrCode size={16} /> Mostrar Código QR para Escanear
          </Button>
        </div>
      </SheetContent>
    </Sheet>

    <Dialog open={isClearConfirmOpen} onOpenChange={setIsClearConfirmOpen}>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle>¿Reiniciar tu petición?</DialogTitle>
          <DialogDescription>
            Se quitarán todos los artículos que seleccionaste. Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:justify-between">
          <Button variant="secondary" onClick={() => setIsClearConfirmOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              clearCart();
              setIsClearConfirmOpen(false);
            }}
          >
            <Trash2 size={16} /> Reiniciar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
};
