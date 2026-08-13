'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_PRODUCTS, DEFAULT_CONFIG } from '../data/defaultProducts';
import CONFIG from '../../config.json';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Config state
  const [config, setConfig] = useState(() => {
    let savedConfig = {};
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wa_shop_config');
      if (saved) {
        try { savedConfig = JSON.parse(saved); } catch (e) { savedConfig = {}; }
      }
    }
    return { ...DEFAULT_CONFIG, ...savedConfig, ...CONFIG };
  });

  // Products state
  const [products, setProducts] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wa_shop_products_v3');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return DEFAULT_PRODUCTS;
  });

  // Cart state
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wa_shop_cart_v3');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return [];
  });

  // UI Filter states
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState('');

  // Toasts state
  const [toasts, setToasts] = useState([]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('wa_shop_products_v3', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('wa_shop_cart_v3', JSON.stringify(cart));
  }, [cart]);

  // Toast Helper
  const showToast = (message, isError = false) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, isError }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Request Selection Actions
  const setCartQty = (productId, qty) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const clamped = Math.max(0, Math.min(qty, product.stock));
    setCart(prev => {
      const exists = prev.find(i => i.product.id === productId);
      if (clamped === 0) return prev.filter(i => i.product.id !== productId);
      if (exists) return prev.map(i => i.product.id === productId ? { ...i, quantity: clamped } : i);
      return [...prev, { product, quantity: clamped }];
    });
  };

  const clearCart = () => {
    if (cart.length === 0) return;
    setCart([]);
  };

  // Inventory / Stock Actions
  const updateStock = (productId, newStock) => {
    const stockVal = Math.max(1, isNaN(newStock) ? 1 : newStock);
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: stockVal } : p));
  };

  const deleteProduct = (productId) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    if (window.confirm(`¿Eliminar "${prod.name}" del catálogo?`)) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      setCart(prev => prev.filter(item => item.product.id !== productId));
      showToast(`"${prod.name}" eliminado.`);
    }
  };

  const addProduct = (newProdData) => {
    const newProd = {
      id: 'item-' + Date.now(),
      ...newProdData,
      stock: Math.max(1, parseInt(newProdData.stock, 10) || 1),
    };
    setProducts(prev => [newProd, ...prev]);
    showToast(`¡Artículo "${newProd.name}" agregado al catálogo!`);
  };

  const resetDemoStock = () => {
    if (window.confirm('¿Restablecer inventario demo?')) {
      setProducts(DEFAULT_PRODUCTS);
      showToast('Inventario restablecido.');
    }
  };

  const clearAllProducts = () => {
    if (window.confirm('¿Vaciar todo el catálogo? Esta acción elimina TODOS los productos y no se puede deshacer.')) {
      setProducts([]);
      setCart([]);
      showToast('Catálogo vaciado. Listo para empezar desde cero.');
    }
  };

  const importProducts = (importedProducts) => {
    if (!Array.isArray(importedProducts)) return;
    setProducts(importedProducts);
    setCart(prev => prev.filter(item => importedProducts.some(p => p.id === item.product.id)));
    showToast(`Inventario actualizado desde Excel (${importedProducts.length} productos).`);
  };

  const updateConfig = (newConfig) => {
    const updated = { ...config, ...newConfig };
    setConfig(updated);
    localStorage.setItem('wa_shop_config', JSON.stringify({
      shopName: updated.shopName,
      whatsappNumber: updated.whatsappNumber
    }));
    showToast('¡Configuración guardada!');
  };

  // WhatsApp Link Builder
  const generateWhatsAppUrl = (customerInfo) => {
    const { custName, custPhone, custLocation, notes } = customerInfo;

    if (!custName) {
      showToast('Por favor escribe tu Nombre Completo antes de enviar tu petición', true);
      return null;
    }
    if (!custPhone) {
      showToast('Por favor escribe tu Teléfono para que podamos contactarte', true);
      return null;
    }
    if (!custLocation) {
      showToast('Por favor escribe tu Ubicación para saber dónde enviarte ayuda', true);
      return null;
    }

    const itemListStr = cart.map(item => `• ${item.quantity}x ${item.product.name}`).join('\n');

    const template = config.messageTemplate || DEFAULT_CONFIG.messageTemplate;

    const formatted = template
      .replace(/{shopName}/g, (config.shopName || '').toUpperCase())
      .replace(/{customerName}/g, custName)
      .replace(/{customerPhone}/g, custPhone)
      .replace(/{location}/g, custLocation)
      .replace(/{itemList}/g, itemListStr)
      .replace(/{orderNotes}/g, notes || 'Ninguna');

    // Deduct stock
    setProducts(prev => prev.map(p => {
      const cartItem = cart.find(ci => ci.product.id === p.id);
      if (cartItem) {
        return { ...p, stock: Math.max(1, p.stock - cartItem.quantity) };
      }
      return p;
    }));

    const phone = config.whatsappNumber.replace(/[^0-9]/g, '');
    const encodedText = encodeURIComponent(formatted);
    return `https://api.whatsapp.com/send?phone=${phone}&text=${encodedText}`;
  };

  return (
    <ShopContext.Provider value={{
      config,
      products,
      cart,
      activeCategory, setActiveCategory,
      searchQuery, setSearchQuery,
      sortBy, setSortBy,
      isCartOpen, setIsCartOpen,
      isQrOpen, setIsQrOpen,
      qrUrl, setQrUrl,
      toasts,
      showToast,
      setCartQty,
      clearCart,
      updateStock,
      deleteProduct,
      addProduct,
      resetDemoStock,
      clearAllProducts,
      importProducts,
      updateConfig,
      generateWhatsAppUrl
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
