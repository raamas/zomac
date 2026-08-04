'use client';

import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductGrid } from './components/ProductGrid';
import { CartDrawer } from './components/CartDrawer';
import { QrModal } from './components/QrModal';
import { Toast } from './components/Toast';

export function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-16">
        <CategoryFilter />
        <ProductGrid />
      </main>
      <CartDrawer />
      <QrModal />
      <Toast />
    </div>
  );
}

export default App;
