import { Inter, Outfit } from 'next/font/google';
import CONFIG from '../config.json';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });

export const metadata = {
  title: `${CONFIG.shopName} - Tienda de Celulares WhatsApp`,
  description: 'Compra smartphones y envía tu pedido directamente por WhatsApp.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`dark ${inter.variable} ${outfit.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
