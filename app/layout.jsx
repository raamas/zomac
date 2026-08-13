import { Inter, Outfit } from 'next/font/google';
import CONFIG from '../config.json';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });

export const metadata = {
  title: `${CONFIG.shopName} - Campaña de Donación`,
  description: 'Tras el sismo, dona artículos y servicios de apoyo: protección, alimentos no perecederos, agua, primeros auxilios y más. Ofrécelos por WhatsApp.'
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
