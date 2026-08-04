'use client';

import { ShopProvider } from '../src/context/ShopContext';

export function Providers({ children }) {
  return <ShopProvider>{children}</ShopProvider>;
}
