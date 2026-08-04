export const DEFAULT_PRODUCTS = [
  {
    id: 'phone-1',
    name: 'iPhone 15 Pro Max',
    category: 'flagship',
    price: 1199.00,
    stock: 8,
    badge: 'Más Vendido',
    badgeType: 'bestseller',
    description: '256GB Titanio Natural. Chip A17 Pro, cámara triple de 48MP con zoom óptico 5x y Botón de Acción.'
  },
  {
    id: 'phone-2',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'flagship',
    price: 1299.00,
    stock: 12,
    badge: 'Novedad AI',
    badgeType: 'new',
    description: '512GB Titanium Gray. Galaxy AI integrado, S-Pen, cámara principal de 200MP y pantalla QHD+ 120Hz.'
  },
  {
    id: 'phone-3',
    name: 'Xiaomi 14 Ultra 5G',
    category: 'flagship',
    price: 999.00,
    stock: 5,
    badge: 'Cámara Leica',
    badgeType: 'featured',
    description: '512GB / 16GB RAM. Cuádruple cámara Leica de 1 pulgada, procesador Snapdragon 8 Gen 3 y carga 90W.'
  },
  {
    id: 'phone-4',
    name: 'Google Pixel 8 Pro',
    category: 'flagship',
    price: 899.00,
    stock: 2,
    badge: 'Oferta 10%',
    badgeType: 'sale',
    description: '128GB Bay Blue. Procesador Google Tensor G3, IA avanzada para foto/video y 7 años de actualizaciones.'
  },
  {
    id: 'phone-5',
    name: 'POCO X6 Pro 5G',
    category: 'gaming',
    price: 349.00,
    stock: 15,
    badge: 'Poder Gamer',
    badgeType: 'featured',
    description: '512GB / 12GB RAM. Chipset Dimensity 8300-Ultra, pantalla AMOLED CrystalRes 120Hz y carga de 67W.'
  },
  {
    id: 'phone-6',
    name: 'Samsung Galaxy A55 5G',
    category: 'midrange',
    price: 429.00,
    stock: 0,
    badge: 'Agotado Temp.',
    badgeType: 'sale',
    description: '256GB Awesome Iceblue. Pantalla Super AMOLED 6.6", triple cámara 50MP y resistencia al agua IP67.'
  },
  {
    id: 'phone-7',
    name: 'OnePlus 12 5G',
    category: 'flagship',
    price: 799.00,
    stock: 7,
    badge: 'Carga 100W',
    badgeType: 'new',
    description: '512GB Silky Black. Cámara Hasselblad de 4ª Gen, pantalla 2K 120Hz ProXDR y batería masiva 5400 mAh.'
  },
  {
    id: 'phone-8',
    name: 'Motorola Edge 50 Pro',
    category: 'midrange',
    price: 549.00,
    stock: 4,
    badge: 'Oferta Especial',
    badgeType: 'sale',
    description: '512GB Black Beauty en Cuero Vegano. Pantalla pOLED curva 144Hz y carga TurboPower de 125W incluida.'
  }
];

export const DEFAULT_CONFIG = {
  shopName: "Apex Mobile",
  whatsappNumber: "5215512345678",
  currency: "$",
  storeEmail: "contacto@apexmobile.com",
  storeAddress: "Av. Insurgentes Sur 1200, CDMX",
  announcementText: "⚡ Pedidos Instantáneos por WhatsApp • Envíos Rápidos • Pago Contra Entrega Disponible",
  messageTemplate: "🛒 *NUEVO PEDIDO DE CELULAR - {shopName}*\n----------------------------------\n👤 *Cliente:* {customerName}\n📱 *Teléfono:* {customerPhone}\n📦 *Tipo de Pedido:* {orderType}\n📍 *Dirección:* {deliveryAddress}\n💳 *Método de Pago:* {paymentMethod}\n----------------------------------\n\n📱 *CELULARES SOLICITADOS:*\n{itemList}\n\n----------------------------------\n💵 *MONTO TOTAL:* {currency}{totalAmount}\n----------------------------------\n📝 *Notas:* {orderNotes}\n\n¡Gracias! Quedo a la espera de la confirmación de mi pedido."
};
