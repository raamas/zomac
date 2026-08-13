'use client';

import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export const SettingsPanel = () => {
  const { config, updateConfig } = useShop();
  const [form, setForm] = useState(config);

  useEffect(() => {
    setForm(config);
  }, [config]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateConfig(form);
  };

  return (
    <Card>
      <div className="flex items-center gap-3 px-6">
        <Settings size={20} className="text-whatsapp" />
        <div>
          <h3 className="font-display text-lg font-bold">Configuración de la Tienda</h3>
          <p className="text-sm text-muted-foreground">
            Personaliza los datos de la campaña de donación.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="grid max-w-lg gap-4 px-6">
        <div className="space-y-2">
          <Label htmlFor="shopName">Nombre de la Tienda</Label>
          <Input
            type="text"
            id="shopName"
            value={form.shopName || ''}
            onChange={(e) => setForm({ ...form, shopName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsappNumber">Número de WhatsApp (con Código de País)</Label>
          <Input
            type="text"
            id="whatsappNumber"
            value={form.whatsappNumber || ''}
            onChange={(e) =>
              setForm({ ...form, whatsappNumber: e.target.value.replace(/[^0-9]/g, '') })
            }
            placeholder="Ej. 5215512345678"
          />
          <p className="text-xs text-muted-foreground">
            No incluyas el signo + ni espacios. Ejemplo: 5215512345678
          </p>
        </div>

        <div className="pb-2">
          <Button type="submit">Guardar Cambios</Button>
        </div>
      </form>
    </Card>
  );
};
