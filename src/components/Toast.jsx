'use client';

import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Toast = () => {
  const { toasts } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed right-4 top-4 z-[60] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium shadow-lg backdrop-blur ${
            toast.isError
              ? 'border-rose-accent/50 bg-rose-accent/15 text-rose-accent'
              : 'border-whatsapp/50 bg-whatsapp/15 text-whatsapp'
          }`}
        >
          {toast.isError ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
