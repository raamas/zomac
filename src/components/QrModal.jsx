'use client';

import React from 'react';
import { QrCode, ExternalLink } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';

export const QrModal = () => {
  const { isQrOpen, setIsQrOpen, qrUrl } = useShop();

  const qrApiUrl = `https://quickchart.io/qr?text=${encodeURIComponent(qrUrl || '')}&size=240`;

  return (
    <Dialog open={isQrOpen} onOpenChange={setIsQrOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode size={20} className="text-whatsapp" /> Escanea para Enviar Pedido
          </DialogTitle>
          <DialogDescription>
            Escanea este código QR con la cámara de tu celular para abrir WhatsApp con tu pedido desglosado.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <img
            src={qrApiUrl}
            alt="Código QR Pedido WhatsApp"
            className="rounded-lg bg-white p-2"
          />
          <Button asChild className="w-full">
            <a href={qrUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={18} /> Abrir Enlace de WhatsApp
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
