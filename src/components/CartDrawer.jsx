'use client';

import React, { useState } from 'react';
import {
  ShoppingCart,
  Smartphone,
  Trash2,
  UserCheck,
  MessageCircle,
  QrCode,
  Minus,
  Plus,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
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
    updateCartQty,
    removeFromCart,
    clearCart,
    generateWhatsAppUrl,
    setQrUrl,
    setIsQrOpen,
  } = useShop();

  const [form, setForm] = useState({
    custName: '',
    custPhone: '',
    orderType: 'Envío a Domicilio',
    custAddress: '',
    paymentMethod: 'Efectivo al Entregar / Recoger',
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
            <ShoppingCart size={20} className="text-whatsapp" />
            <SheetTitle className="text-base">Tu Carrito</SheetTitle>
            <Badge variant="secondary">
              {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
            </Badge>
            {cart.length > 0 && (
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
          {cart.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-14 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                <Smartphone size={28} className="text-muted-foreground" />
              </div>
              <h4 className="font-display font-semibold">Tu carrito está vacío</h4>
              <p className="text-sm text-muted-foreground">
                Explora el catálogo y elige los artículos de emergencia que necesitas.
              </p>
              <Button variant="secondary" className="mt-2" onClick={() => setIsCartOpen(false)}>
                Ver Catálogo
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 rounded-lg border bg-background p-3">
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{item.product.name}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-7 rounded-full"
                          onClick={() => updateCartQty(item.product.id, -1)}
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-7 rounded-full"
                          onClick={() => updateCartQty(item.product.id, 1)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 text-muted-foreground hover:text-rose-accent"
                      onClick={() => removeFromCart(item.product.id)}
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                <h4 className="flex items-center gap-2 text-sm font-semibold">
                  <UserCheck size={16} /> Datos para Confirmar Pedido
                </h4>

                <div className="space-y-2">
                  <Label htmlFor="custName">Nombre Completo *</Label>
                  <Input
                    id="custName"
                    placeholder="Ej. Carlos Mendoza"
                    value={form.custName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="custPhone">Teléfono</Label>
                    <Input
                      id="custPhone"
                      type="tel"
                      placeholder="Ej. +52 55 1234 5678"
                      value={form.custPhone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orderType">Tipo de Pedido</Label>
                    <Select
                      value={form.orderType}
                      onValueChange={(v) => setForm((prev) => ({ ...prev, orderType: v }))}
                    >
                      <SelectTrigger id="orderType" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Envío a Domicilio">Envío a Domicilio</SelectItem>
                        <SelectItem value="Recoger en Tienda">Recoger en Tienda</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {form.orderType === 'Envío a Domicilio' && (
                  <div className="space-y-2">
                    <Label htmlFor="custAddress">Dirección de Entrega *</Label>
                    <Input
                      id="custAddress"
                      placeholder="Calle, número, colonia, código postal"
                      value={form.custAddress}
                      onChange={handleInputChange}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Método de Pago Preferido</Label>
                  <Select
                    value={form.paymentMethod}
                    onValueChange={(v) => setForm((prev) => ({ ...prev, paymentMethod: v }))}
                  >
                    <SelectTrigger id="paymentMethod" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Efectivo al Entregar / Recoger">Efectivo al Entregar</SelectItem>
                      <SelectItem value="Transferencia Bancaria">Transferencia Bancaria</SelectItem>
                      <SelectItem value="Tarjeta (POS al Entregar)">Tarjeta de Crédito/Débito</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notas / Instrucciones del Pedido</Label>
                  <Textarea
                    id="notes"
                    rows={2}
                    placeholder="Ej. Color preferido, horario de entrega, etc."
                    value={form.notes}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t bg-background p-4">
            <div className="flex items-center gap-2 rounded-lg border border-whatsapp/20 bg-whatsapp/10 px-3 py-2 text-sm font-medium text-whatsapp">
              <Gift size={16} /> Todos los artículos son donados — sin costo
            </div>
            <Button className="mt-3 w-full" size="lg" onClick={handleCheckout}>
              <MessageCircle size={20} /> Enviar Pedido por WhatsApp
            </Button>
            <Button variant="ghost" className="mt-2 w-full" onClick={handleShowQr}>
              <QrCode size={16} /> Mostrar Código QR para Escanear
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>

    <Dialog open={isClearConfirmOpen} onOpenChange={setIsClearConfirmOpen}>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle>¿Vaciar el carrito?</DialogTitle>
          <DialogDescription>
            Se eliminarán todos los productos de tu carrito. Esta acción no se puede deshacer.
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
            <Trash2 size={16} /> Vaciar Carrito
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
};
